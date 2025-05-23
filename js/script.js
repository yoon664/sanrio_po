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
  
  // 마우스 팔로워 초기 설정
  gsap.set(follower, {
    xPercent: -50,
    yPercent: -50,
    scale: 0,
    opacity: 0
  });
  
  // 자연스러운 움직임을 위한 변수
  let mouseX = 0;
  let mouseY = 0;
  let currentX = 0;
  let currentY = 0;
  
  // 마우스 위치 추적 함수
  function updatePosition() {
    // 부드러운 추적을 위한 이징 적용
    const ease = 0.1;
    
    // 현재 위치와 목표 위치 사이의 거리 계산
    currentX += (mouseX - currentX) * ease;
    currentY += (mouseY - currentY) * ease;
    
    // 팔로워 위치 업데이트
    gsap.set(follower, {
      x: currentX,
      y: currentY
    });
    
    // 애니메이션 프레임 요청
    requestAnimationFrame(updatePosition);
  }
  
  // 애니메이션 프레임 시작
  updatePosition();
  
  // 마우스 진입 이벤트
  container.addEventListener("mouseenter", (e) => {
    // 현재 마우스 위치로 초기값 설정 (튀는 현상 방지)
    mouseX = e.offsetX;
    mouseY = e.offsetY;
    currentX = e.offsetX;
    currentY = e.offsetY;
    
    // 팔로워 표시 애니메이션
    gsap.to(follower, {
      scale: 1,
      opacity: 1,
      duration: 0.4,
      ease: "power2.out"
    });
    
    // 이미지 전환 애니메이션
    gsap.to(hoverImage, {
      opacity: 1,
      duration: 0.5,
      ease: "power1.inOut"
    });
    
    gsap.to(defaultImage, {
      opacity: 0,
      duration: 0.5,
      ease: "power1.inOut"
    });
  });
  
  // 마우스 이동 이벤트
  container.addEventListener("mousemove", (e) => {
    // 목표 위치 업데이트
    mouseX = e.offsetX;
    mouseY = e.offsetY;
  });
  
  // 마우스 이탈 이벤트
  container.addEventListener("mouseleave", () => {
    // 팔로워 숨김 애니메이션
    gsap.to(follower, {
      scale: 0,
      opacity: 0,
      duration: 0.3,
      ease: "power2.in"
    });
    
    // 이미지 원상복귀 애니메이션
    gsap.to(hoverImage, {
      opacity: 0,
      duration: 0.4,
      ease: "power1.inOut"
    });
    
    gsap.to(defaultImage, {
      opacity: 1,
      duration: 0.4,
      ease: "power1.inOut"
    });
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