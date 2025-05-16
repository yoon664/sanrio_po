// 햄버거 메뉴
$(document).ready(function(){
	$('#nav-icon1,#nav-icon2,#nav-icon3,#nav-icon4').click(function(){
		$(this).toggleClass('open');
	});
});


// 가로 스크롤
gsap.registerPlugin(ScrollTrigger);

window.addEventListener("load", () => {
  const scrollWrapper = document.querySelector(".scroll-wrapper");

  // 실제 이미지 로딩이 끝나야 정확한 scrollWidth 확보 가능
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