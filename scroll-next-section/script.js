const lenis = new Lenis({
  smooth: true,
  easing: (t) => t,
  duration: 0,
});

lenis.on("scroll", ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

gsap.registerPlugin(ScrollTrigger);

function scrollToSection() {
  const sections = gsap.utils.toArray("section");
  //   ScrollTrigger.create({
  //     trigger: ".one",
  //     start: "top top",
  //     endTrigger: ".two",
  //     end: "bottom bottom",
  //     markers: true,
  //     snap: {
  //       snapTo: 1 / (sections.length - 1),
  //       duration: 0.5,
  //       delay: 0.125,
  //       ease: "none",
  //     },
  //   });

  sections.forEach((section, i) => {
    ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "bottom top",
      snap: {
        snapTo: 1, // Snap tới section tiếp theo
        duration: 0.3, // Thời gian snap
        ease: "none", // Hiệu ứng easing
      },
      scrub: 0, // Mượt mà khi cuộn
      markers: true, // Hiển thị markers để debug
    });
  });
}
scrollToSection();
