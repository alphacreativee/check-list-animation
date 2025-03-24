document.addEventListener("DOMContentLoaded", () => {
  const totalSlides = 7; // Đã sửa thành 7 để khớp với số lượng slide
  let currentSlide = 1;
  let isAnimating = false;
  let scrollAllowed = true;
  let lastScrollTime = 0;

  const slideTitles = [
    "Field Unit",
    "Astral Convergence",
    "Lumis",
    "Serenity",
    "Interstellar",
    "Elysium",
    "Inverted",
  ];

  const slideDescriptions = [
    "A rugged exploration unit for harsh terrains.",
    "A cosmic event aligning the stars.",
    "A beacon of light in the darkness.",
    "A peaceful retreat from chaos.",
    "A journey beyond the stars.",
    "A paradise among the cosmos.",
    "A world turned upside down.",
  ];

  function createSlide(slideNumber, direction) {
    const slide = document.createElement("div");
    slide.className = "slide";

    const slideBgImg = document.createElement("div");
    slideBgImg.className = "slide-bg-img";

    const img = document.createElement("img");
    img.src = `images/img${slideNumber}.webp`;
    img.alt = slideTitles[slideNumber - 1];

    slideBgImg.appendChild(img);
    slide.appendChild(slideBgImg);

    slideBgImg.style.clipPath =
      direction === "down"
        ? "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)"
        : "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)";

    return slide;
  }

  function createMainImageWrapper(slideNumber, direction) {
    const wrapper = document.createElement("div");
    wrapper.className = "slide-main-img-wrapper";

    const img = document.createElement("img");
    img.src = `images/img${slideNumber}.webp`;
    img.alt = slideTitles[slideNumber - 1];

    wrapper.appendChild(img);

    wrapper.style.clipPath =
      direction === "down"
        ? "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)"
        : "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)";

    return wrapper;
  }

  function createTextElement(slideNumber, direction) {
    const newTitle = document.createElement("h1");
    newTitle.textContent = slideTitles[slideNumber - 1];
    gsap.set(newTitle, { y: direction === "down" ? 80 : -80 });

    const newDescription = document.createElement("p");
    newDescription.textContent = slideDescriptions[slideNumber - 1];
    gsap.set(newDescription, { y: direction === "down" ? 40 : -40 });

    return { newTitle, newDescription };
  }

  function animateSlide(direction) {
    if (isAnimating || !scrollAllowed) return;

    isAnimating = true;
    scrollAllowed = false;

    const slider = document.querySelector(".slider");
    const currentSlideElement = slider.querySelector(".slide");
    const mainImageContainer = document.querySelector(".slide-main-img");
    const currentMainWrapper = mainImageContainer.querySelector(
      ".slide-main-img-wrapper"
    );
    const titleContainer = document.querySelector(".slide-title");
    const descriptionContainer = document.querySelector(".slide-description");
    const currentTitle = titleContainer.querySelector("h1");
    const currentDescription = descriptionContainer.querySelector("p");

    currentSlide =
      direction === "down"
        ? currentSlide === totalSlides
          ? 1
          : currentSlide + 1
        : currentSlide === 1
        ? totalSlides
        : currentSlide - 1;

    const newSlide = createSlide(currentSlide, direction);
    const newMainWrapper = createMainImageWrapper(currentSlide, direction);
    const { newTitle, newDescription } = createTextElement(
      currentSlide,
      direction
    );

    slider.appendChild(newSlide);
    mainImageContainer.appendChild(newMainWrapper);
    titleContainer.appendChild(newTitle);
    descriptionContainer.appendChild(newDescription);

    const tl = gsap.timeline({
      onComplete: () => {
        [
          currentSlideElement,
          currentMainWrapper,
          currentTitle,
          currentDescription,
        ].forEach((el) => el.remove());
        isAnimating = false;
        scrollAllowed = true;
        lastScrollTime = Date.now();
      },
    });

    tl.to(
      newSlide.querySelector(".slide-bg-img"),
      {
        clipPath:
          direction === "down"
            ? "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)"
            : "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        duration: 1.25,
        ease: CustomEase.create("custom", "0.87, 0, 0.13, 1"),
      },
      0
    );

    tl.to(
      newMainWrapper,
      {
        clipPath:
          direction === "down"
            ? "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)"
            : "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",
        duration: 1.25,
        ease: CustomEase.create("custom", "0.87, 0, 0.13, 1"),
      },
      0
    );

    tl.to(
      newMainWrapper.querySelector("img"),
      {
        y: "0%",
        duration: 1.25,
        ease: CustomEase.create("custom", "0.87, 0, 0.13, 1"),
      },
      0
    );

    tl.to(
      newTitle,
      {
        y: 0,
        duration: 1.25,
        ease: CustomEase.create("custom", "0.87, 0, 0.13, 1"),
      },
      0
    );

    tl.to(
      newDescription,
      {
        y: 0,
        duration: 1.25,
        ease: CustomEase.create("custom", "0.87, 0, 0.13, 1"),
      },
      0
    );

    tl.to(
      currentTitle,
      {
        y: direction === "down" ? -80 : 80,
        duration: 1.25,
        ease: CustomEase.create("custom", "0.87, 0, 0.13, 1"),
      },
      0
    );

    tl.to(
      currentDescription,
      {
        y: direction === "down" ? -40 : 40,
        duration: 1.25,
        ease: CustomEase.create("custom", "0.87, 0, 0.13, 1"),
      },
      0
    );
  }

  function handleScroll(direction) {
    const now = Date.now();
    if (isAnimating || !scrollAllowed || now - lastScrollTime < 1250) return; // Đồng bộ với duration 1.25s
    lastScrollTime = now;
    animateSlide(direction);
  }

  window.addEventListener(
    "wheel",
    (e) => {
      e.preventDefault();
      const direction = e.deltaY > 0 ? "down" : "up";
      handleScroll(direction);
    },
    { passive: false }
  );

  let touchStartY = 0;
  let isTouchActive = false;

  window.addEventListener(
    "touchstart",
    (e) => {
      touchStartY = e.touches[0].clientY;
      isTouchActive = true;
    },
    { passive: false }
  );

  window.addEventListener(
    "touchmove",
    (e) => {
      e.preventDefault();
      if (!isTouchActive || isAnimating || !scrollAllowed) return;
      const touchCurrentY = e.touches[0].clientY;
      const difference = touchStartY - touchCurrentY;

      if (Math.abs(difference) > 10) {
        isTouchActive = false;
        const direction = difference > 0 ? "down" : "up";
        handleScroll(direction);
      }
    },
    { passive: false }
  );

  window.addEventListener("touchend", () => {
    isTouchActive = false;
  });
});
