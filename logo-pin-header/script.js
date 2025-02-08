gsap.registerPlugin(ScrollTrigger);
console.log(innerHeight);

const animate = () => {
  gsap.from("#logo", {
    duration: 3,
    scale: 2,
    y: innerHeight * 0.5,
    transformOrigin: "left center",

    scrollTrigger: {
      trigger: ".hero-img",
      start: "top top",
      end: "bottom top",
      markers: true,
      pin: true,
      scrub: true,
    },
  });
};
animate();
