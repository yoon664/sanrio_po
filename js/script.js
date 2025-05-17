// 햄버거 메뉴
$(document).ready(function(){
	$('#nav-icon1,#nav-icon2,#nav-icon3,#nav-icon4').click(function(){
		$(this).toggleClass('open');
	});
});

$(document).ready(function(){
  // Get the mobile menu overlay element
  const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
  
  // 모바일 토글 메뉴 버튼
  $('#nav-icon3').click(function(){
    $(this).toggleClass('open');
    // Toggle the mobile menu overlay
    mobileMenuOverlay.classList.toggle('active');
    // Prevent body scrolling when menu is open
    if(mobileMenuOverlay.classList.contains('active')) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  });
  
  // 데스크톱 토글 메뉴 버튼 - 기능 추가
  $('.desktop-menu-toggle').click(function(){
    $(this).toggleClass('active');
    // Toggle the mobile menu overlay
    mobileMenuOverlay.classList.toggle('active');
    // Prevent body scrolling when menu is open
    if(mobileMenuOverlay.classList.contains('active')) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  });
  
  // Close menu when clicking a link
  $('.menu-overlay a').click(function(){
    $('#nav-icon3').removeClass('open');
    $('.desktop-menu-toggle').removeClass('active');
    mobileMenuOverlay.classList.remove('active');
    document.body.style.overflow = '';
  });
});

//////////////////////////////////////////////////////////////////
  document.addEventListener("DOMContentLoaded", function () {
    const navBtn = document.getElementById("nav-icon3");
    const menuOverlay = document.querySelector(".menu-overlay");

    navBtn.addEventListener("click", function () {
      navBtn.classList.toggle("open");
      menuOverlay.classList.toggle("active");
    });

    document.querySelectorAll(".mobile-nav a").forEach(link => {
      link.addEventListener("click", () => {
        navBtn.classList.remove("open");
        menuOverlay.classList.remove("active");
      });
    });
  });


// 가로 스크롤
function updateHorizontalScroll() {
    if (!container || !scrollWrapper || !scrollContainer) return;
    
    const containerInfo = calculateContainerSize();
    const scrollY = window.scrollY;
    
    // 스크롤 컨테이너 내부인지 확인
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
    if (isScrolling) return;
    
    isScrolling = true;
    
    const containerInfo = calculateContainerSize();
    const scrollY = window.scrollY;
    
    // 스크롤 컨테이너 내부인지 확인
    if (scrollY >= containerInfo.top && scrollY <= containerInfo.bottom) {
        updateHorizontalScroll();
        
        // 가로 스크롤이 완료되지 않았다면 세로 스크롤 속도 조절
        if (Math.abs(scrollY - lastScrollY) > 5) {
            // 느린 속도로 스크롤
            const targetY = lastScrollY + (scrollY - lastScrollY) * 0.3;
            window.scrollTo(0, targetY);
        }
    }
    
    lastScrollY = window.scrollY;
    
    // 스크롤 이벤트 스로틀링
    requestAnimationFrame(() => {
        isScrolling = false;
    });
}
    
// 초기 설정
function initialize() {
    // 초기 위치 설정
    updateHorizontalScroll();
    
    // 이벤트 리스너
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", () => {
        updateHorizontalScroll();
    });
}

// 초기화 실행
initialize();


// 마우스 왔다갔다 2
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


// 배경 고정 sticky
const image = document.querySelector('.sticky-img');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const maxScroll = window.innerHeight; // 이미지가 다 나타날 위치

  let opacity = scrollY / maxScroll;
  if (opacity > 1) opacity = 1;

  image.style.opacity = opacity;
});
