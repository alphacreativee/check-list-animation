"use strict";
$ = jQuery;

$(document).ready(function () {
  let selectedSlide = 0; // Initially active slide index
  const slides = $(".carousel-item");
  const totalSlides = slides.length;

  // Function to update CSS for all slides based on the active one
  function updateSlides() {
    slides.each(function (index, slide) {
      const isActive = $(slide).hasClass("active");
      // Apply styles based on whether the slide is active or not
      if (isActive) {
        let thisSlide = $(slide);
        
        $(".travel-container .timeline-item").removeClass("active");
        $(`.travel-container .timeline-item:nth-child(${index + 1})`).addClass("active");
        $(".travel-container .index").text(`${index + 1}/${totalSlides}`);
        
        if(thisSlide.data("background")){
            $(".travel-container").css("background-image", 'url("' + thisSlide.data("background") + '")');
        }

        $(slide).css({
          left: "0%",
          opacity: 1,
          "z-index": 3
        });
      } else if ($(slide).prev().hasClass("active")) {
        $(slide).css({
          left: "33.3333%",
          opacity: 1,
          "z-index": 2
        });
      } else {
        $(slide).css({
          left: "66.6667%",
          opacity: 0,
          "z-index": 1
        });
      }
    });
  }

  function nextSlide() {
    const currentSlide = $(".carousel-item.active");
    const nextSlide = currentSlide.next(".carousel-item").length
      ? currentSlide.next(".carousel-item")
      : $(".carousel-item").first();

    currentSlide.removeClass("active");
    nextSlide.addClass("active");
    updateSlides();
  }

  function prevSlide() {
    const currentSlide = $(".carousel-item.active");
    const prevSlide = currentSlide.prev(".carousel-item").length
      ? currentSlide.prev(".carousel-item")
      : $(".carousel-item").last();

    currentSlide.removeClass("active");
    prevSlide.addClass("active");
    updateSlides();
  }

  $(".next").click(nextSlide);
  $(".prev").click(prevSlide);

  updateSlides();

  setInterval(nextSlide, 5000);
});
