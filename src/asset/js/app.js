import jQuery from "jquery";
var $ = jQuery;

// import "./jquery.min.js";
// import "./tmpl";
// import "./slick.min.js";
// import "./select2.min.js";
// import "./popper.min.js";
// import "./jquery.slider.js";
// import "./jquery.mmenu.all.min.js";
// import "./jquery.dependClass-0.1";
// import "./jquery.countdown.min.js";
// import "./draggable-0.1";
// import "./jquery.min.js";

// ______________ Page Loader
$(window).on("load", function () {
  $(".page-preloader").delay(200).fadeOut(500);
});

$(window).on("scroll", function () {
  if ($(this).scrollTop() > 200) {
    $(".header-desktop").addClass("is-sticky");
  } else {
    $(".header-desktop").removeClass("is-sticky");
  }
});
$(window).on("scroll", function () {
  if ($(this).scrollTop() > 200) {
    $(".header-mobile").addClass("is-sticky");
  } else {
    $(".header-mobile").removeClass("is-sticky");
  }
});

// // ______________ Home Page Banner Slider
// $(".block-sliders").slick({
//   pauseOnHover: false,
//   slidesToShow: 1,
//   slidesToScroll: 1,
//   autoplay: true,
//   focusOnSelect: true,
//   dots: true,
//   arrows: false,
//   cssEase: "linear",
//   autoplaySpeed: 5000,
// });
// // ______________ New Arrivals Slider
// $(".content-category").slick({
//   pauseOnHover: false,
//   slidesToShow: 4,
//   slidesToScroll: 1,
//   autoplay: false,
//   focusOnSelect: true,
//   dots: false,
//   arrows: true,
//   cssEase: "linear",
//   autoplaySpeed: 5000,
//   responsive: [
//     {
//       breakpoint: 600,
//       settings: {
//         slidesToShow: 2,
//         slidesToScroll: 1,
//       },
//     },
//     {
//       breakpoint: 400,
//       settings: {
//         arrows: false,
//         slidesToShow: 1,
//         slidesToScroll: 1,
//       },
//     },
//   ],
// });
// // ______________ Best Sellers Slider
// $(".sestsellers").slick({
//   pauseOnHover: false,
//   slidesToShow: 5,
//   slidesToScroll: 1,
//   autoplay: false,
//   focusOnSelect: true,
//   dots: false,
//   arrows: true,
//   cssEase: "linear",
//   autoplaySpeed: 5000,
//   responsive: [
//     {
//       breakpoint: 600,
//       settings: {
//         slidesToShow: 2,
//         slidesToScroll: 1,
//       },
//     },
//     {
//       breakpoint: 400,
//       settings: {
//         arrows: false,
//         slidesToShow: 1,
//         slidesToScroll: 1,
//       },
//     },
//   ],
// });
// // ______________ Back to Top

$(window).on("scroll", function (e) {
  if ($(this)["scrollTop"]() > 100) {
    $(".back-top")["addClass"]("button-show");
  } else {
    $(".back-top")["removeClass"]("button-show");
  }
  if ($(this).scrollTop() > 0) {
    $("#back-to-top").fadeIn("slow");
  } else {
    $("#back-to-top").fadeOut("slow");
  }
});
$("#back-to-top").on("click", function (e) {
  $("html, body").animate(
    {
      scrollTop: 0,
    },
    600
  );
  return false;
});
