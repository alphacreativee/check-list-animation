document.addEventListener("DOMContentLoaded", () => {
  console.log(window.innerHeight);

  gsap.registerPlugin(ScrollTrigger);
  const stickySection = document.querySelector(".sticky-sec");
  const totalStickyHeight = window.innerHeight * 6;
  function throttle(callback, limit) {
    let lastCall = 0;
    return function (...args) {
      const now = Date.now();
      if (now - lastCall >= limit) {
        lastCall = now;
        callback(...args);
      }
    };
  }
  // lenis
  const lenis = new Lenis();
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);
  ScrollTrigger.create({
    trigger: stickySection,
    start: "top top",
    end: () => `+=${totalStickyHeight}`,
    pin: true,
    pinSpacing: true,
    markers: true,
  });

  gsap.to(".img-1 img", {
    scale: 1.125,
    ease: "none",
    scrollTrigger: {
      trigger: stickySection,
      start: "top top",
      end: () => `+=${window.innerHeight}`,
      scrub: true,
    },
  });

  gsap.to(".img-2", {
    clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
    ease: "none",
    scrollTrigger: {
      trigger: stickySection,
      start: "top top",
      end: () => `+=${window.innerHeight}`,
      scrub: true,
      onUpdate: throttle((self) => {
        const progress = self.progress;

        // Tính toán trước các giá trị
        const left = gsap.utils.interpolate(40, 0, progress);
        const top = gsap.utils.interpolate(25, 0, progress);
        const right = gsap.utils.interpolate(60, 100, progress);
        const bottom = gsap.utils.interpolate(75, 100, progress);

        // Cập nhật clipPath
        gsap.set(".img-2", {
          clipPath: `polygon(
            ${left}% ${top}%,
            ${right}% ${top}%,
            ${right}% ${bottom}%,
            ${left}% ${bottom}%
          )`,
        });
      }, 16),
    },
  });

  gsap.to(".img-2 img", {
    scale: 1.125,
    ease: "none",
    scrollTrigger: {
      trigger: stickySection,
      start: "top top",
      end: () => `+=${window.innerHeight}`,
      scrub: true,
    },
  });

  gsap.to(".img-3", {
    clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
    ease: "none",
    scrollTrigger: {
      trigger: stickySection,
      start: () =>
        document.querySelector(".img-2").offsetTop +
        document.querySelector(".img-2").offsetHeight * 2,
      end: () => `+=${window.innerHeight * 3}`,
      scrub: true,
      markers: true, // Kiểm tra vị trí trigger

      onUpdate: throttle((self) => {
        const progress = self.progress;

        // Tính toán clipPath
        const left = gsap.utils.interpolate(50, 0, progress);
        const top = gsap.utils.interpolate(50, 0, progress);
        const right = gsap.utils.interpolate(50, 100, progress);
        const bottom = gsap.utils.interpolate(50, 100, progress);

        // Đảm bảo các giá trị không bị lỗi
        if (left >= 0 && right <= 100 && top >= 0 && bottom <= 100) {
          gsap.set(".img-3", {
            clipPath: `polygon(
        ${left}% ${top}%,
        ${right}% ${top}%,
        ${right}% ${bottom}%,
        ${left}% ${bottom}%
      )`,
          });
        }
      }, 16),
    },
  });

  gsap.fromTo(
    ".img-2 img",
    {
      scale: 1.125,
    },
    {
      scale: 1.125,
      ease: "none",

      scrollTrigger: {
        trigger: stickySection,
        start: () => `+=${window.innerHeight * 2}`,
        end: () => `+=${window.innerHeight * 3}`,
        scrub: true,
      },
    }
  );

  gsap.to(".img-3 img", {
    scale: 2.9,
    ease: "none",
    scrollTrigger: {
      trigger: stickySection,
      start: "bottom bottom",
      end: () => `+=${window.innerHeight * 2}`,
      scrub: true,
    },
  });

  gsap.fromTo(
    ".img-3 img",
    {
      scale: 2.9,
    },
    {
      scale: 1,
      ease: "none",

      scrollTrigger: {
        trigger: stickySection,
        start: () =>
          document.querySelector(".img-2").offsetTop +
          document.querySelector(".img-2").offsetHeight * 2.5,
        end: () => `+=${window.innerHeight * 4}`,
        scrub: true,
      },
    }
  );
});
