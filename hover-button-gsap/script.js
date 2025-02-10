function setupButton(button) {
  const flair = button.querySelector(".button__flair");

  // Tạo quickSetter để cập nhật vị trí nhanh hơn
  const setX = gsap.quickSetter(flair, "xPercent");
  const setY = gsap.quickSetter(flair, "yPercent");

  function getCursorPosition(event) {
    const { left, top, width, height } = button.getBoundingClientRect();

    const convertX = gsap.utils.pipe(
      gsap.utils.mapRange(0, width, 0, 100),
      gsap.utils.clamp(0, 100)
    );

    const convertY = gsap.utils.pipe(
      gsap.utils.mapRange(0, height, 0, 100),
      gsap.utils.clamp(0, 100)
    );

    return {
      x: convertX(event.clientX - left),
      y: convertY(event.clientY - top),
    };
  }

  button.addEventListener("mouseenter", (event) => {
    const { x, y } = getCursorPosition(event);
    setX(x);
    setY(y);

    gsap.to(flair, {
      scale: 1,
      duration: 0.4,
      ease: "power2.out",
    });
  });

  button.addEventListener("mouseleave", (event) => {
    const { x, y } = getCursorPosition(event);
    gsap.killTweensOf(flair);

    gsap.to(flair, {
      xPercent: x > 90 ? x + 20 : x < 10 ? x - 20 : x,
      yPercent: y > 90 ? y + 20 : y < 10 ? y - 20 : y,
      scale: 0,
      duration: 0.3,
      ease: "power2.out",
    });
  });

  button.addEventListener("mousemove", (event) => {
    const { x, y } = getCursorPosition(event);

    gsap.to(flair, {
      xPercent: x,
      yPercent: y,
      duration: 0.4,
      ease: "power2",
    });
  });
}

// Lấy tất cả các nút có data-block="button" và kích hoạt hiệu ứng
document.querySelectorAll('[data-block="button"]').forEach(setupButton);
