gsap.registerPlugin(ScrollTrigger);

const lenis = new Lenis({
  lerp: 0.07,
});

lenis.on("scroll", ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

// Images parallax
gsap.utils.toArray(".img-container").forEach((container) => {
  const img = container.querySelector("img");

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: container,
      scrub: true,
      pin: false,
    },
  });

  tl.fromTo(
    img,
    {
      yPercent: -20,
      ease: "none",
    },
    {
      yPercent: 20,
      ease: "none",
    }
  );
});
