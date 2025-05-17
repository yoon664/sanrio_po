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

// 가로 스크롤
gsap.registerPlugin(ScrollTrigger);

const scrollWrapper = document.querySelector('.scroll-wrapper');

// 이미지 로딩이 끝난 후에 ScrollTrigger 적용
imagesLoaded(scrollWrapper, () => {
  ScrollTrigger.refresh(); // 레이아웃 다시 계산
  gsap.to(scrollWrapper, {
    x: () => -(scrollWrapper.scrollWidth - window.innerWidth) + "px",
    ease: "none",
    scrollTrigger: {
      trigger: ".characters-scroll",
      start: "top top",
      end: () => "+=" + scrollWrapper.scrollWidth,
      scrub: 1,
      pin: true,
      anticipatePin: 1,
      invalidateOnRefresh: true
    }
  });
});

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
    const ease = 0.15;
    
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

/*
// 마우스 왔다갔다
const containers = gsap.utils.toArray(".recruit-image-container");

containers.forEach(container => {
  const follower = container.querySelector(".mouse-follower");
  const hoverImage = container.querySelector(".image-hover");
  
  // 중심 맞춤 + 기본 설정
  gsap.set(follower, {
    xPercent: -50,
    yPercent: -50,
    scale: 0,
    opacity: 1
  });
  
  // 이미지 초기 설정
  gsap.set(hoverImage, {
    opacity: 0
  });

  // quickTo로 부드러운 움직임 구현
  const xTo = gsap.quickTo(follower, "x", { duration: 0.3, ease: "power2" });
  const yTo = gsap.quickTo(follower, "y", { duration: 0.3, ease: "power2" });
  
  // 크기 애니메이션 트윈 생성
  const scaleTween = gsap.to(follower, {
    scale: 1,
    ease: "power1.inOut",
    paused: true
  });
  
  // 이미지 페이드인 트윈 생성
  const imageTween = gsap.to(hoverImage, {
    opacity: 1,
    ease: "power1.inOut",
    paused: true
  });

  // 이벤트 리스너 연결
  container.addEventListener("mouseenter", () => {
    scaleTween.play();
    imageTween.play();
  });
  
  container.addEventListener("mouseleave", () => {
    scaleTween.reverse();
    imageTween.reverse();
  });
  
  container.addEventListener("mousemove", (e) => {
    xTo(e.offsetX);
    yTo(e.offsetY);
  });
});
*/