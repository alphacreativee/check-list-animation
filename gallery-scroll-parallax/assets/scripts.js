document.addEventListener("DOMContentLoaded", function () {
  gsap.registerPlugin(CustomEase, ScrollTrigger);

  CustomEase.create(
    "hop",
    "M0,0 C0.71,0.505 0.192,0.726 0.318,0.852 0.45,0.984 0.504,1 1,1"
  );

  const sliderImages = document.querySelector(".slider-images");
  const counter = document.querySelector(".counter");
  const title = document.querySelector(".slider-title-wrapper");
  const indicators = document.querySelectorAll(".slider-indicators p");
  const prevSlides = document.querySelectorAll(".slider-preview .preview");
  const sliderPreview = document.querySelector(".slider-preview");

  let currentImg = 1;
  const totalSlides = 5;
  let indicatorRotation = 0;

  const updateCounterAndTitlePosition = () => {
    const counterY = -20 * (currentImg - 1);
    const titleY = -60 * (currentImg - 1);

    gsap.to(counter, {
      y: counterY,
      duration: 1,
      ease: "hop"
    });

    gsap.to(title, {
      y: titleY,
      duration: 1,
      ease: "hop"
    });
  };

  const updateActiveSlidePreview = () => {
    prevSlides.forEach((prev) => prev.classList.remove("active"));
    prevSlides[currentImg - 1].classList.add("active");
  };

  const animateSlide = (direction) => {
    const currentSlide =
      document.querySelectorAll(".img")[
        document.querySelectorAll(".img").length - 1
      ];

    const slideImg = document.createElement("div");

    slideImg.classList.add("img");

    console.log(currentImg);

    const slideImgElement = document.createElement("img");
    console.log(slideImgElement);

    slideImgElement.src = `./assets/img/img${currentImg}.png`;

    gsap.set(slideImgElement, { x: direction === "left" ? -300 : 300 });

    slideImg.appendChild(slideImgElement);
    sliderImages.appendChild(slideImg);

    gsap.to(currentSlide.querySelector("img"), {
      x: direction === "left" ? 300 : -300,
      duration: 1.5,
      ease: "power4.out"
    });

    gsap.fromTo(
      slideImg,
      {
        clipPath:
          direction === "left"
            ? "polygon(0 0, 0 0, 0 100%, 0 100%)"
            : "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)"
      },
      { x: 0, duration: 1.5, ease: "power4.out" }
    );

    gsap.to(slideImgElement, {
      x: 0,
      duration: 1.5,
      ease: "power4.out"
    });

    cleanupSlides();
    indicatorRotation += direction === "left" ? -90 : 90;
    gsap.to(indicators, {
      rotation: indicatorRotation,
      duration: 1.5,
      ease: "power4.out"
    });
  };

  document.addEventListener("click", (event) => {
    const sliderWidth = document.querySelector(".slider").offsetWidth;
    const clickPosition = event.clientX;

    if (sliderPreview.contains(event.target)) {
      const clickPrev = event.target.closest(".preview");

      if (clickPrev) {
        const clickedIndex = Array.from(prevSlides).indexOf(clickPrev);

        if (clickedIndex !== currentImg) {
          if (clickedIndex < currentImg) {
            currentImg = clickedIndex;
            animateSlide("left");
          } else {
            currentImg = clickedIndex;
            animateSlide("right");
          }

          updateActiveSlidePreview();
          updateCounterAndTitlePosition();
        }
      }

      return;
    }

    if (clickPosition < sliderWidth / 2 && currentImg !== 1) {
      currentImg--;
      animateSlide("left");
    } else if (clickPosition > sliderWidth / 2 && currentImg !== totalSlides) {
      currentImg++;
      animateSlide("right");
    }

    updateActiveSlidePreview();
    updateCounterAndTitlePosition();
  });

  const cleanupSlides = () => {
    const slides = document.querySelectorAll(".slider-images .img");

    if (slides.length > totalSlides) {
      slides[0].remove();
    }
  };
});
