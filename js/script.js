const scrollWrapper = document.querySelector('.scroll-wrapper');
      
scrollWrapper.addEventListener('wheel', function (e) {
  // 가로 스크롤을 처리
  if (e.deltaY === 0) return;
  e.preventDefault();
  // 가로 스크롤 끝인지 확인
  if (e.deltaY > 0 && scrollWrapper.scrollLeft + scrollWrapper.offsetWidth >= scrollWrapper.scrollWidth) {
    // 세로로 이동
    window.scrollBy(0, window.innerHeight);
  } else {
    // 가로 스크롤
    scrollWrapper.scrollLeft += e.deltaY;
  }
}, { passive: false });