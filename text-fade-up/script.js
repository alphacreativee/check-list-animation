// Đăng ký plugin ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Chọn tất cả các phần tử .text-fade
const textFadeElements = document.querySelectorAll(".text-fade");

textFadeElements.forEach((element, elementIndex) => {
  // Chia text thành dòng và từ
  let myText = new SplitType(element, {
    types: "lines, words",
    lineClass: "split-line",
    wordClass: "split-word",
  });

  // Duyệt qua từng dòng trong phần tử
  myText.lines.forEach((line, index) => {
    gsap.from(line.querySelectorAll(".split-word"), {
      y: "100%",
      duration: 0.8,
      ease: "power2.out",
      delay: index * 0.3,
      scrollTrigger: {
        trigger: element,
        start: "top center",
        end: "top center",
        toggleActions: "play none none none",
        markers: true,
      },
    });
  });
});
