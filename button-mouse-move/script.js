function parallaxIt(e, target, movement) {
  var $this = $(".button-container");

  // Tính toán vị trí chuột so với toàn bộ trang
  var relX = e.pageX;
  var relY = e.pageY;

  // Tính toán sự di chuyển dựa trên vị trí chuột và kích thước của container
  var parallaxX = ((relX - $this.offset().left) / $this.width()) * movement;
  var parallaxY = ((relY - $this.offset().top) / $this.height()) * movement;

  // Áp dụng hiệu ứng parallax cho target (button-circle)
  TweenMax.to(target, 0.3, {
    x: parallaxX - movement / 2, // Điều chỉnh để tạo hiệu ứng parallax
    y: parallaxY - movement / 2, // Điều chỉnh để tạo hiệu ứng parallax
    ease: Power2.easeOut,
  });
}

function callParallax(e) {
  parallaxIt(e, ".button-circle", 30); // Gọi hàm parallax với .button-circle và độ di chuyển 30px
}

// Sự kiện mousemove để gọi parallax
$(".button-container").mousemove(function (e) {
  callParallax(e);
});

$(".button-container").mouseleave(function (e) {
  TweenMax.to(this, 0.3, { height: 50, width: 50 });
  TweenMax.to(".button-circle", 0.3, { scale: 1, x: 0, y: 0 });
});

$(".button-container").mouseenter(function (e) {
  TweenMax.to(this, 0.3, { height: 50, width: 50 });
  TweenMax.to(".button-circle", 0.3, { scale: 1.4 });
});
