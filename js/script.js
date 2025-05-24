$(document).ready(function() {
    // 메뉴 열기 버튼 (메인 헤더의 햄버거 버튼)
    $('#nav-icon3').click(function() {
        $(this).addClass('open');
        $('.menu-overlay').addClass('active');
        
        // 스크롤 잠금 (스크롤바 너비 보정)
        const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
        $('body, header').css({
            'overflow': 'hidden',
            'padding-right': scrollbarWidth + 'px'
        });
    });
    
    // 메뉴 닫기 버튼 (오버레이 안의 X 버튼)
    $('#nav-icon3-menu').click(function() {
        closeMenu();
    });
    
    // 메뉴 오버레이 클릭시 닫기 (배경 클릭)
    $('.menu-overlay').click(function(e) {
        if (e.target === this) {
            closeMenu();
        }
    });
    
    // 메뉴 아이템 클릭 시 닫기
    $('.mobile-nav a, .menu-contact a').click(function() {
        closeMenu();
    });
    
    // ESC 키로 닫기
    $(document).keyup(function(e) {
        if (e.key === "Escape") {
            closeMenu();
        }
    });
    
    // 메뉴 닫기 함수
    function closeMenu() {
        $('#nav-icon3').removeClass('open');
        $('.menu-overlay').removeClass('active');
        $('body, header').css({
            'overflow': '',
            'padding-right': ''
        });
    }
});

// 가로 스크롤 시스템
document.addEventListener("DOMContentLoaded", function () {
    const scrollContainer = document.querySelector(".scroll-container");
    const scrollWrapper = document.querySelector(".scroll-wrapper");
    const imgSection = document.getElementById("imgSection");
    
    // 스크롤 컨테이너 크기 계산
    function calculateContainerSize() {
        if (!imgSection || !scrollContainer) return null;
        
        const imgSectionTop = imgSection.offsetTop;
        const scrollContainerHeight = 350 * window.innerHeight / 100; // 350vh로 변경
        
        return {
            top: imgSectionTop,
            height: scrollContainerHeight,
            bottom: imgSectionTop + scrollContainerHeight
        };
    }
    
    // 가로 스크롤 진행도 계산 및 적용
    function updateHorizontalScroll() {
        if (!scrollWrapper || !scrollContainer) return;
        
        const containerInfo = calculateContainerSize();
        if (!containerInfo) return;
        
        const scrollY = window.scrollY;
        
        // 가로 스크롤 구간 내부인지 확인 (0vh~350vh)
        const isInContainer = scrollY >= containerInfo.top && 
                             scrollY <= containerInfo.bottom;
        
        if (isInContainer) {
            // 진행도 계산 (0-1 사이 값)
            const progress = (scrollY - containerInfo.top) / (containerInfo.height - window.innerHeight);
            const normalizedProgress = Math.max(0, Math.min(1, progress));
            
            // 실제 스크롤할 수 있는 최대 너비
            const scrollableWidth = scrollWrapper.scrollWidth - window.innerWidth + 50;
            const translateX = normalizedProgress * scrollableWidth;
            
            // 가로 스크롤 적용
            scrollWrapper.style.transform = `translateX(-${translateX}px)`;
        }
    }
    
    // 스크롤 이벤트 처리
    function handleScroll() {
        updateHorizontalScroll();
    }
    
    // 초기 설정
    function initialize() {
        updateHorizontalScroll();
        window.addEventListener("scroll", handleScroll, { passive: true });
        window.addEventListener("resize", updateHorizontalScroll);
    }
    
    initialize();
});



// 마우스 팔로워 (recruit 섹션) - 간단하고 안정적인 버전
const containers = document.querySelectorAll(".recruit-image-container");

containers.forEach(container => {
  const follower = container.querySelector(".mouse-follower");
  const hoverImage = container.querySelector(".image-hover");
  const defaultImage = container.querySelector(".image-default");
  
  let isHovering = false;
  let animationId = null;
  let targetX = 0;
  let targetY = 0;
  let currentX = 0;
  let currentY = 0;
  let leaveTimeout = null;
  
  // container를 relative로 설정
  container.style.position = 'relative';
  
  // 마우스 팔로워 초기 설정
  follower.style.position = 'absolute';
  follower.style.left = '0px';
  follower.style.top = '0px';
  follower.style.transform = 'translate(-50%, -50%) scale(0)';
  follower.style.opacity = '0';
  follower.style.transition = 'opacity 0.3s ease';
  follower.style.pointerEvents = 'none';
  follower.style.zIndex = '99';
  
  // 부드러운 애니메이션 함수
  function smoothFollow() {
    if (!isHovering) {
      if (animationId) {
        cancelAnimationFrame(animationId);
        animationId = null;
      }
      return;
    }
    
    const ease = 0.12;
    
    // 현재 위치와 목표 위치의 차이 계산
    const deltaX = targetX - currentX;
    const deltaY = targetY - currentY;
    
    // 차이가 충분히 작으면 정확한 위치로 설정
    if (Math.abs(deltaX) < 0.5 && Math.abs(deltaY) < 0.5) {
      currentX = targetX;
      currentY = targetY;
      follower.style.left = `${currentX}px`;
      follower.style.top = `${currentY}px`;
      follower.style.transform = 'translate(-50%, -50%) scale(1)';
      
      // 애니메이션 계속 실행
      animationId = requestAnimationFrame(smoothFollow);
      return;
    }
    
    // 부드럽게 따라가기
    currentX += deltaX * ease;
    currentY += deltaY * ease;
    
    // 위치 업데이트
    follower.style.left = `${currentX}px`;
    follower.style.top = `${currentY}px`;
    follower.style.transform = 'translate(-50%, -50%) scale(1)';
    
    // 다음 프레임 요청
    animationId = requestAnimationFrame(smoothFollow);
  }
  
  // 팔로워 정리 함수
  function cleanupFollower() {
    isHovering = false;
    
    // 애니메이션 중단
    if (animationId) {
      cancelAnimationFrame(animationId);
      animationId = null;
    }
    
    // 팔로워 숨김
    follower.style.opacity = '0';
    follower.style.transform = 'translate(-50%, -50%) scale(0)';
    
    // 이미지 원상복귀
    hoverImage.style.opacity = '0';
    defaultImage.style.opacity = '1';
  }
  
  // 마우스 진입 이벤트
  container.addEventListener("mouseenter", (e) => {
    // 기존 leave 타이머 취소
    if (leaveTimeout) {
      clearTimeout(leaveTimeout);
      leaveTimeout = null;
    }
    
    if (isHovering) return;
    
    isHovering = true;
    
    // 현재 마우스 위치 계산
    const rect = container.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    // 즉시 설정
    targetX = mouseX;
    targetY = mouseY;
    currentX = mouseX;
    currentY = mouseY;
    
    // 팔로워 즉시 위치 설정 및 표시
    follower.style.left = `${currentX}px`;
    follower.style.top = `${currentY}px`;
    follower.style.transform = 'translate(-50%, -50%) scale(1)';
    follower.style.opacity = '1';
    
    // 이미지 전환
    hoverImage.style.transition = 'opacity 0.4s ease';
    defaultImage.style.transition = 'opacity 0.4s ease';
    hoverImage.style.opacity = '1';
    defaultImage.style.opacity = '0';
    
    // 부드러운 팔로우 시작
    if (animationId) {
      cancelAnimationFrame(animationId);
    }
    animationId = requestAnimationFrame(smoothFollow);
  });
  
  // 마우스 이동 이벤트
  container.addEventListener("mousemove", (e) => {
    if (!isHovering) return;
    
    // 마우스 위치 계산
    const rect = container.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    // 목표 위치 업데이트
    targetX = mouseX;
    targetY = mouseY;
  });
  
  // 마우스 이탈 이벤트 (지연 처리)
  container.addEventListener("mouseleave", (e) => {
    // 기존 타이머가 있으면 클리어
    if (leaveTimeout) {
      clearTimeout(leaveTimeout);
    }
    
    // 짧은 지연 후 정리 (빠른 이동 시 대응)
    leaveTimeout = setTimeout(() => {
      // 마우스가 다른 recruit-image-container에 있는지 확인
      const allContainers = document.querySelectorAll('.recruit-image-container');
      let isOverOtherContainer = false;
      
      // 현재 마우스 위치 가져오기
      const currentMouseX = window.event ? window.event.clientX : 0;
      const currentMouseY = window.event ? window.event.clientY : 0;
      
      allContainers.forEach(otherContainer => {
        if (otherContainer === container) return;
        
        const rect = otherContainer.getBoundingClientRect();
        if (currentMouseX >= rect.left && currentMouseX <= rect.right &&
            currentMouseY >= rect.top && currentMouseY <= rect.bottom) {
          isOverOtherContainer = true;
        }
      });
      
      // 다른 container 위에 있지 않으면 정리
      if (!isOverOtherContainer) {
        cleanupFollower();
      }
    }, 100); // 100ms 지연
  });
});

/*
const containers = document.querySelectorAll(".recruit-image-container");

containers.forEach(container => {
  const follower = container.querySelector(".mouse-follower");
  const hoverImage = container.querySelector(".image-hover");
  const defaultImage = container.querySelector(".image-default");
  
  let isHovering = false;
  let animationId = null;
  let targetX = 0;
  let targetY = 0;
  let currentX = 0;
  let currentY = 0;
  
  // container를 relative로 설정
  container.style.position = 'relative';
  
  // 마우스 팔로워 초기 설정
  follower.style.position = 'absolute';
  follower.style.left = '0px';
  follower.style.top = '0px';
  follower.style.transform = 'translate(-50%, -50%) scale(0)';
  follower.style.opacity = '0';
  follower.style.transition = 'opacity 0.3s ease';
  follower.style.pointerEvents = 'none'; // 중요: 마우스 이벤트 차단
  follower.style.zIndex = '99';
  
  // 부드러운 애니메이션 함수
  function smoothFollow() {
    if (!isHovering) {
      if (animationId) {
        cancelAnimationFrame(animationId);
        animationId = null;
      }
      return;
    }
    
    const ease = 0.12;
    
    // 현재 위치와 목표 위치의 차이 계산
    const deltaX = targetX - currentX;
    const deltaY = targetY - currentY;
    
    // 차이가 충분히 작으면 정확한 위치로 설정
    if (Math.abs(deltaX) < 0.5 && Math.abs(deltaY) < 0.5) {
      currentX = targetX;
      currentY = targetY;
      follower.style.left = `${currentX}px`;
      follower.style.top = `${currentY}px`;
      follower.style.transform = 'translate(-50%, -50%) scale(1)';
      
      // 애니메이션 계속 실행 (마우스 움직임 대기)
      animationId = requestAnimationFrame(smoothFollow);
      return;
    }
    
    // 부드럽게 따라가기
    currentX += deltaX * ease;
    currentY += deltaY * ease;
    
    // 위치 업데이트
    follower.style.left = `${currentX}px`;
    follower.style.top = `${currentY}px`;
    follower.style.transform = 'translate(-50%, -50%) scale(1)';
    
    // 다음 프레임 요청
    animationId = requestAnimationFrame(smoothFollow);
  }
  
  // 마우스 진입 이벤트
  container.addEventListener("mouseenter", (e) => {
    if (isHovering) return; // 이미 hover 상태면 무시
    
    isHovering = true;
    
    // 현재 마우스 위치 계산
    const rect = container.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    // 즉시 설정
    targetX = mouseX;
    targetY = mouseY;
    currentX = mouseX;
    currentY = mouseY;
    
    // 팔로워 즉시 위치 설정 및 표시
    follower.style.left = `${currentX}px`;
    follower.style.top = `${currentY}px`;
    follower.style.transform = 'translate(-50%, -50%) scale(1)';
    follower.style.opacity = '1';
    
    // 이미지 전환
    hoverImage.style.transition = 'opacity 0.4s ease';
    defaultImage.style.transition = 'opacity 0.4s ease';
    hoverImage.style.opacity = '1';
    defaultImage.style.opacity = '0';
    
    // 부드러운 팔로우 시작
    if (animationId) {
      cancelAnimationFrame(animationId);
    }
    animationId = requestAnimationFrame(smoothFollow);
  });
  
  // 마우스 이동 이벤트
  container.addEventListener("mousemove", (e) => {
    if (!isHovering) return;
    
    // 마우스 위치 계산
    const rect = container.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    // 목표 위치 업데이트
    targetX = mouseX;
    targetY = mouseY;
  });
  
  // 마우스 이탈 이벤트 (더 안정적으로)
  container.addEventListener("mouseleave", (e) => {
    // 실제로 container를 벗어났는지 확인
    const rect = container.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    // container 영역을 실제로 벗어났을 때만 처리
    if (mouseX < 0 || mouseX > container.offsetWidth || 
        mouseY < 0 || mouseY > container.offsetHeight) {
      
      isHovering = false;
      
      // 애니메이션 중단
      if (animationId) {
        cancelAnimationFrame(animationId);
        animationId = null;
      }
      
      // 팔로워 숨김
      follower.style.opacity = '0';
      follower.style.transform = 'translate(-50%, -50%) scale(0)';
      
      // 이미지 원상복귀
      hoverImage.style.opacity = '0';
      defaultImage.style.opacity = '1';
    }
  });
});
*/


// recruit 섹션 배경 이미지 제어
window.addEventListener('scroll', () => {
  const image = document.querySelector('.sticky-img');
  const recruitSection = document.querySelector('.recruit');
  
  if (!image || !recruitSection) return;
  
  const recruitRect = recruitSection.getBoundingClientRect();
  const windowHeight = window.innerHeight;
  
  // recruit 섹션이 화면에 나타나기 시작할 때부터 사라질 때까지의 범위 계산
  const sectionTop = recruitRect.top;
  const sectionBottom = recruitRect.bottom;
  
  // recruit 섹션이 화면에 있을 때만 이미지 표시
  if (sectionTop <= windowHeight && sectionBottom >= 0) {
    // 섹션이 화면에 진입하는 정도에 따라 opacity 조절
    let opacity = 0;
    
    if (sectionTop <= 0) {
      // 섹션이 완전히 화면 위로 올라갔을 때
      opacity = Math.max(0, Math.min(1, sectionBottom / windowHeight));
    } else {
      // 섹션이 화면 아래에서 올라오고 있을 때
      opacity = Math.max(0, Math.min(1, (windowHeight - sectionTop) / windowHeight));
    }
    
    image.style.opacity = opacity;
  } else {
    // recruit 섹션이 화면 밖에 있을 때는 이미지 숨김
    image.style.opacity = 0;
  }
});