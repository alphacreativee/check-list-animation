document.addEventListener("DOMContentLoaded", () => {
  const lenis = new Lenis();

  lenis.on("scroll", ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);

  const cards = gsap.utils.toArray(".card");
  //   const rotations = [-12, 10, -5, 5, -2, 5];

  const rotations = Array.from(
    { length: cards.length },
    () => gsap.utils.random(-12, 10, 1) // 1 để đảm bảo số nguyên
  );
  console.log(rotations);

  cards.forEach((card, idx) => {
    gsap.set(card, {
      y: window.innerHeight,
      rotate: rotations[idx],
    });
  });

  ScrollTrigger.create({
    trigger: ".sticky-cards",

    start: "top top",
    end: `+=${window.innerHeight * 8}px`,
    pin: true,
    pinSpacing: true,
    scrub: 1,
    markers: true,
    onUpdate: (self) => {
      const progress = self.progress;
      const totalCards = cards.length;
      const progressPerCard = 1 / totalCards;

      cards.forEach((card, idx) => {
        const cardStart = idx * progressPerCard;
        let cardProgress = (progress - cardStart) / progressPerCard;
        cardProgress = Math.min(Math.max(cardProgress, 0), 1);

        let yPos = window.innerHeight * (1 - cardProgress);
        let xPos = 0;

        if (cardProgress === 1 && idx < totalCards - 1) {
          const remainingProgress =
            (progress - (cardStart + progressPerCard)) /
            (1 - (cardStart + progressPerCard));
          //   const remainingProgress = 0;

          if (remainingProgress > 0) {
            const distanceMultiplier = 1 - idx * 0.15;
            xPos =
              -window.innerWidth * distanceMultiplier * remainingProgress * 0.3;
            yPos =
              -window.innerHeight *
              distanceMultiplier *
              remainingProgress *
              0.3;
          }
        }
        gsap.to(card, {
          x: xPos,
          y: yPos,
          duration: 0,
          ease: "none",
        });
      });
    },
  });
});
