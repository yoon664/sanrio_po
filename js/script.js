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
            const scrollableWidth = scrollWrapper.scrollWidth - window.innerWidth;
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



// 마우스 팔로워 (recruit 섹션)
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
  
  // 마우스 팔로워 초기 설정 (중앙 정렬 방식 변경)
  follower.style.position = 'absolute';
  follower.style.transform = 'scale(0)';
  follower.style.opacity = '0';
  follower.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
  follower.style.pointerEvents = 'none';
  
  // 정확한 마우스 좌표 계산 함수
  function getMousePosition(e, element) {
    const rect = element.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  }
  
  // 부드러운 애니메이션 함수
  function smoothFollow() {
    if (!isHovering) return;
    
    const ease = 0.12;
    
    // 현재 위치와 목표 위치의 차이 계산
    const deltaX = targetX - currentX;
    const deltaY = targetY - currentY;
    
    // 차이가 충분히 작으면 애니메이션 중단
    if (Math.abs(deltaX) < 0.5 && Math.abs(deltaY) < 0.5) {
      currentX = targetX;
      currentY = targetY;
      updateFollowerPosition();
      return;
    }
    
    // 부드럽게 따라가기
    currentX += deltaX * ease;
    currentY += deltaY * ease;
    
    updateFollowerPosition();
    
    // 다음 프레임 요청
    animationId = requestAnimationFrame(smoothFollow);
  }
  
  // 팔로워 위치 업데이트 함수
  function updateFollowerPosition() {
    // 팔로워 크기의 절반만큼 빼서 중앙 정렬
    const halfWidth = follower.offsetWidth / 2;
    const halfHeight = follower.offsetHeight / 2;
    
    follower.style.left = `${currentX - halfWidth}px`;
    follower.style.top = `${currentY - halfHeight}px`;
  }
  
  // 마우스 진입 이벤트
  container.addEventListener("mouseenter", (e) => {
    isHovering = true;
    
    // 정확한 마우스 위치 계산
    const mousePos = getMousePosition(e, container);
    targetX = mousePos.x;
    targetY = mousePos.y;
    currentX = mousePos.x;
    currentY = mousePos.y;
    
    // 팔로워 즉시 위치 설정
    updateFollowerPosition();
    
    // 팔로워 표시
    follower.style.opacity = '1';
    follower.style.transform = 'scale(1)';
    
    // 이미지 전환
    hoverImage.style.transition = 'opacity 0.4s ease';
    defaultImage.style.transition = 'opacity 0.4s ease';
    hoverImage.style.opacity = '1';
    defaultImage.style.opacity = '0';
    
    // 부드러운 팔로우 시작
    if (animationId) {
      cancelAnimationFrame(animationId);
    }
    smoothFollow();
  });
  
  // 마우스 이동 이벤트
  container.addEventListener("mousemove", (e) => {
    if (!isHovering) return;
    
    // 정확한 마우스 위치 계산 후 목표 위치 업데이트
    const mousePos = getMousePosition(e, container);
    targetX = mousePos.x;
    targetY = mousePos.y;
  });
  
  // 마우스 이탈 이벤트
  container.addEventListener("mouseleave", () => {
    isHovering = false;
    
    // 애니메이션 중단
    if (animationId) {
      cancelAnimationFrame(animationId);
      animationId = null;
    }
    
    // 팔로워 숨김
    follower.style.opacity = '0';
    follower.style.transform = 'scale(0)';
    
    // 이미지 원상복귀
    hoverImage.style.opacity = '0';
    defaultImage.style.opacity = '1';
  });
});

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