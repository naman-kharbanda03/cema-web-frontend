// import $ from "jquery";
import jQuery from "jquery";
var $ = jQuery;
(function (_0x4473x1) {
  "use strict";
  var _0x4473x2 = _0x4473x1("body");
  var _0x4473x3 = _0x4473x1(window);

  function _0x4473x4(_0x4473x5) {
    _0x4473x5["slick"]({
      arrows: _0x4473x5["data"]("nav") ? !0 : !1,
      dots: _0x4473x5["data"]("dots") ? !0 : !1,
      draggable: _0x4473x5["data"]("draggable") ? !1 : !0,
      infinite: _0x4473x5["data"]("infinite") ? !1 : !0,
      autoplay: _0x4473x5["data"]("autoplay") ? !0 : !1,
      prevArrow: '<i class="slick-arrow fa fa-angle-left"></i>',
      slidesToScroll: _0x4473x5["data"]("slidestoscroll")
        ? _0x4473x5["data"]("columns")
        : 1,
      nextArrow: '<i class="slick-arrow fa fa-angle-right"></i>',
      slidesToShow: _0x4473x5["data"]("columns"),
      asNavFor: _0x4473x5["data"]("asnavfor")
        ? _0x4473x5["data"]("asnavfor")
        : !1,
      vertical: _0x4473x5["data"]("vertical") ? !0 : !1,
      verticalSwiping: _0x4473x5["data"]("verticalswiping")
        ? _0x4473x5["data"]("verticalswiping")
        : !1,
      rtl:
        _0x4473x2["hasClass"]("rtl") && !_0x4473x5["data"]("vertical")
          ? !0
          : !1,
      centerMode: _0x4473x5["data"]("centermode")
        ? _0x4473x5["data"]("centermode")
        : !1,
      centerPadding: _0x4473x5["data"]("centerpadding")
        ? _0x4473x5["data"]("centerpadding")
        : !1,
      focusOnSelect: _0x4473x5["data"]("focusonselect")
        ? _0x4473x5["data"]("focusonselect")
        : !1,
      fade:
        _0x4473x5["data"]("fade") && !_0x4473x2["hasClass"]("rtl") ? !0 : !1,
      cssEase: "linear",
      autoplaySpeed: 5000,
      pauseOnHover: !1,
      pauseOnFocus: !1,
      responsive: [
        {
          breakpoint: 1441,
          settings: {
            slidesToShow: _0x4473x5["data"]("columns1440")
              ? _0x4473x5["data"]("columns1440")
              : _0x4473x5["data"]("columns"),
            slidesToScroll: _0x4473x5["data"]("columns1440")
              ? _0x4473x5["data"]("columns1440")
              : _0x4473x5["data"]("columns"),
          },
        },
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: _0x4473x5["data"]("columns1"),
            slidesToScroll: _0x4473x5["data"]("columns1"),
          },
        },
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: _0x4473x5["data"]("columns2"),
            slidesToScroll: _0x4473x5["data"]("columns2"),
          },
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: _0x4473x5["data"]("columns3"),
            slidesToScroll: _0x4473x5["data"]("columns3"),
            vertical: !1,
            verticalSwiping: !1,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: _0x4473x5["data"]("columns4"),
            slidesToScroll: _0x4473x5["data"]("columns4"),
            vertical: !1,
            verticalSwiping: !1,
          },
        },
      ],
    });
    _0x4473xd(_0x4473x5);
    var _0x4473x6 = _0x4473x1(".shop-details");
    if (_0x4473x6["length"] > 0 && _0x4473x6["hasClass"]("zoom")) {
      var _0x4473x7 = _0x4473x6["data"]();
      var _0x4473x8 = _0x4473x1(
        ".img-item.slick-current",
        ".shop-details .image-additional"
      );
      if (_0x4473x1(window)["width"]() >= 768) {
        _0x4473x25(_0x4473x1("img", _0x4473x8), _0x4473x7);
      }
    }
    _0x4473x5["on"](
      "afterChange",
      function (_0x4473x9, _0x4473xa, _0x4473xb, _0x4473xc) {
        if (_0x4473x6["length"] > 0 && _0x4473x6["hasClass"]("zoom")) {
          _0x4473x1(".zoomContainer")["remove"]();
          var _0x4473x7 = _0x4473x6["data"]();
          var _0x4473x8 = _0x4473x1(
            ".img-item.slick-current",
            ".shop-details .image-additional"
          );
          if (_0x4473x1(window)["width"]() >= 768) {
            _0x4473x25(_0x4473x1("img", _0x4473x8), _0x4473x7);
          }
        }
      }
    );
  }

  function _0x4473xd(_0x4473x5) {
    if (_0x4473x1(".slick-arrow", _0x4473x5)["length"] > 0) {
      if (_0x4473x1(".fa-angle-left", _0x4473x5)["length"] > 0) {
        var _0x4473xe = _0x4473x1(".fa-angle-left", _0x4473x5)["clone"]();
        _0x4473x1(".fa-angle-left", _0x4473x5)["remove"]();
        if (_0x4473x5["parent"]()["find"](".fa-angle-left")["length"] == 0) {
          _0x4473xe["prependTo"](_0x4473x5["parent"]());
        }
        _0x4473xe["click"](function () {
          _0x4473x5["slick"]("slickPrev");
        });
      }
      if (_0x4473x1(".fa-angle-right", _0x4473x5)["length"] > 0) {
        var _0x4473xf = _0x4473x1(".fa-angle-right", _0x4473x5)["clone"]();
        _0x4473x1(".fa-angle-right", _0x4473x5)["remove"]();
        if (_0x4473x5["parent"]()["find"](".fa-angle-right")["length"] == 0) {
          _0x4473xf["appendTo"](_0x4473x5["parent"]());
        }
        _0x4473xf["click"](function () {
          _0x4473x5["slick"]("slickNext");
        });
      }
    } else {
      _0x4473x1(".fa-angle-left", _0x4473x5["parent"]())["remove"]();
      _0x4473x1(".fa-angle-right", _0x4473x5["parent"]())["remove"]();
    }
  }

  function _0x4473x10() {
    _0x4473x1("#show-megamenu")["on"]("click", function () {
      if (_0x4473x1(".site-mobile-navigation")["hasClass"]("active")) {
        _0x4473x1(".site-mobile-navigation")["removeClass"]("active");
      } else {
        _0x4473x1(".site-mobile-navigation")["addClass"]("active");
      }
      return !1;
    });
    _0x4473x1("#show-verticalmenu")["on"]("click", function () {
      if (_0x4473x1(".site-mobile-vertical")["hasClass"]("active")) {
        _0x4473x1(".site-mobile-vertical")["removeClass"]("active");
      } else {
        _0x4473x1(".site-mobile-vertical")["addClass"]("active");
      }
      return !1;
    });
  }
  _0x4473x10();

  function _0x4473x11() {
    var _0x4473x12 = _0x4473x3["width"]();
    var _0x4473x13 = _0x4473x1(".menu", "#main-navigation");
    if (_0x4473x12 <= 991) {
      if (
        _0x4473x1("#mobile-main-menu")["length"] < 1 &&
        _0x4473x13["length"] > 0
      ) {
        var _0x4473x14 = _0x4473x13["parent"]()["clone"]();
        _0x4473x14["attr"]("id", "mobile-main-menu");
        _0x4473x1(_0x4473x14)["find"](".menu")["removeAttr"]("id");
        _0x4473x1("#page")["append"](
          '<div class="site-mobile-navigation"><span id="remove-megamenu" class="remove-megamenu icon-remove">Close</span></div>'
        );
        _0x4473x1(".site-mobile-navigation")["append"](_0x4473x14);
        _0x4473x14["mmenu"]({
          offCanvas: !1,
          "\x6E\x61\x76\x62\x61\x72": {
            "\x74\x69\x74\x6C\x65": !1,
          },
        });
        _0x4473x16();
      }
      if (_0x4473x1("#mobile-vertical-menu")["length"] < 1) {
        var _0x4473x15 = _0x4473x1(".bwp-vertical-navigation > div")["clone"]();
        _0x4473x15["attr"]("id", "mobile-vertical-menu");
        _0x4473x1(_0x4473x15)["find"](".menu")["removeAttr"]("id");
        _0x4473x1("#page")["append"](
          '<div  class="site-mobile-vertical"><span id="remove-verticalmenu" class="remove-verticalmenu icon-remove">' +
            _0x4473x1(".bwp-navigation")["data"]("text_close") +
            "</span></div>"
        );
        _0x4473x1(".site-mobile-vertical")["append"](_0x4473x15);
        _0x4473x15["mmenu"]({
          offCanvas: !1,
          "\x6E\x61\x76\x62\x61\x72": {
            "\x74\x69\x74\x6C\x65": !1,
          },
        });
        _0x4473x16();
      }
    } else {
      _0x4473x1(".site-mobile-navigation")["remove"]();
      _0x4473x1(".site-mobile-vertical")["remove"]();
    }
  }
  _0x4473x11();

  function _0x4473x16() {
    _0x4473x1("#remove-megamenu")["on"]("click", function () {
      _0x4473x1(".site-mobile-navigation")["removeClass"]("active");
      return !1;
    });
    _0x4473x1("#remove-verticalmenu")["on"]("click", function () {
      _0x4473x1(".site-mobile-vertical")["removeClass"]("active");
      return !1;
    });
  }

  //   function _0x4473x17() {
  //     _0x4473x1(".product-countdown")["each"](function (_0x4473x9) {
  //       var _0x4473x18 = _0x4473x1(this);
  //       var _0x4473x19 = _0x4473x1(this)["data"]("id");
  //       var _0x4473x1a = new Date()["getTime"]();
  //       var _0x4473x1b = _0x4473x1(this)["data"]("sttime");
  //       var _0x4473x1c = _0x4473x18["data"]("cdtime");
  //       var _0x4473x1d = _0x4473x18["data"]("day")
  //         ? _0x4473x18["data"]("day")
  //         : "D";
  //       var _0x4473x1e = _0x4473x18["data"]("hour")
  //         ? _0x4473x18["data"]("hour")
  //         : "H";
  //       var _0x4473x1f = _0x4473x18["data"]("min")
  //         ? _0x4473x18["data"]("min")
  //         : "M";
  //       var _0x4473x20 = _0x4473x18["data"]("sec")
  //         ? _0x4473x18["data"]("sec")
  //         : "S";
  //       var _0x4473x21 = new Date();
  //       _0x4473x21 = new Date(_0x4473x1c * 1000);
  //       if (_0x4473x1b > _0x4473x1a) {
  //         _0x4473x18["remove"]();
  //         return;
  //       }
  //       if (_0x4473x1c["length"] > 0 && _0x4473x1a > _0x4473x1c) {
  //         _0x4473x18["remove"]();
  //         return;
  //       }
  //       if (_0x4473x1c["length"] <= 0) {
  //         _0x4473x18["remove"]();
  //         return;
  //       }
  //       _0x4473x18["countdown"](_0x4473x21, function (_0x4473x9) {
  //         _0x4473x1(this)["html"](
  //           _0x4473x9["strftime"](
  //             '<span class="countdown-content"><span class="days"><span class="countdown-amount">%D</span><span class="countdown-text">' +
  //               _0x4473x1d +
  //               '</span></span><span class="countdown-section hours"><span class="countdown-amount">%H</span><span class="countdown-text">' +
  //               _0x4473x1e +
  //               '</span></span><span class="countdown-section mins"><span class="countdown-amount">%M</span><span class="countdown-text">' +
  //               _0x4473x1f +
  //               '</span></span><span class="countdown-section secs"><span class="countdown-amount">%S</span><span class="countdown-text">' +
  //               _0x4473x20 +
  //               "</span></span></span>"
  //           )
  //         );
  //       })["on"]("finish.countdown", function (_0x4473x9) {
  //         _0x4473x18["remove"]();
  //         _0x4473x19 = _0x4473x18["data"]("id");
  //         $target = this;
  //         _0x4473x18["hide"]("slow", function () {
  //           _0x4473x1(this)["remove"]();
  //         });
  //         $price = _0x4473x18["data"]("price");
  //         _0x4473x1("#" + _0x4473x19 + " .item-price > span")["hide"](
  //           "slow",
  //           function () {
  //             _0x4473x1("#" + _0x4473x19 + " .item-price > span")["remove"]();
  //           }
  //         );
  //         _0x4473x1("#" + _0x4473x19 + " .item-price")["append"](
  //           '<span><span class="amount">' + $price + "</span></span>"
  //         );
  //       });
  //     });
  //   }

  function _0x4473x22() {
    if (_0x4473x1(".shop-details")["length"]) {
      var _0x4473x5 = _0x4473x1(".shop-details");
      var _0x4473x7 = _0x4473x5["data"]();
      if (_0x4473x5["hasClass"]("zoom")) {
        if (
          _0x4473x7["product_layout_thumb"] == "one_column" ||
          _0x4473x7["product_layout_thumb"] == "grid"
        ) {
          _0x4473x23(_0x4473x7);
        }
      }
    }
  }

  function _0x4473x23(_0x4473x7) {
    var _0x4473x5 = _0x4473x1(".image-additional");
    if (_0x4473x1(window)["width"]() >= 768) {
      _0x4473x1(".img-item", _0x4473x5)["each"](function () {
        var _0x4473x24 = _0x4473x1("a", _0x4473x1(this));
        _0x4473x25(_0x4473x1("img", _0x4473x24), _0x4473x7);
      });
    }
  }

  function _0x4473x25(_0x4473x5, _0x4473x7) {
    if (_0x4473x1(".image-thumbnail")["length"] > 0) {
      var _0x4473x26 = "image-thumbnail";
    } else {
      var _0x4473x26 = !1;
    }
    _0x4473x5["elevateZoom"]({
      zoomType: _0x4473x7["zoomtype"],
      scrollZoom: _0x4473x7["zoom_scroll"],
      lensSize: _0x4473x7["lenssize"],
      lensShape: _0x4473x7["lensshape"],
      containLensZoom: _0x4473x7["zoom_contain_lens"],
      gallery: _0x4473x26,
      cursor: "crosshair",
      galleryActiveClass: "active",
      lensBorder: _0x4473x7["lensborder"],
      borderSize: _0x4473x7["bordersize"],
      borderColour: _0x4473x7["bordercolour"],
    });
  }
  _0x4473x1(document)["ready"](function () {
    setTimeout(function () {
      _0x4473x1(".page-preloader")["fadeOut"]();
    }, 1500);
    _0x4473x1(".slick-sliders")["each"](function () {
      _0x4473x4(_0x4473x1(this));
    });
    _0x4473x1('a[data-toggle="tab"]')["on"](
      "shown.bs.tab",
      function (_0x4473x27) {
        _0x4473x1(this)
          ["closest"](".block")
          ["find"](".slick-sliders")
          ["slick"]("refresh");
      }
    );
    _0x4473x1(".shop-details .slick-carousel")["each"](function () {
      _0x4473x4(_0x4473x1(this));
    });
    _0x4473x22();
    // _0x4473x17();
    _0x4473x3["scroll"](function () {
      if (_0x4473x1(this)["scrollTop"]() > 100) {
        _0x4473x1(".back-top")["addClass"]("button-show");
      } else {
        _0x4473x1(".back-top")["removeClass"]("button-show");
      }
    });
    _0x4473x1(".back-top")["on"]("click", function () {
      _0x4473x1("html, body")["animate"](
        {
          scrollTop: 0,
        },
        800
      );
      return !1;
    });
    _0x4473x1(".active-login")["on"]("click", function (_0x4473x27) {
      _0x4473x27["preventDefault"]();
      if (_0x4473x1(".form-login-register")["hasClass"]("active")) {
        _0x4473x1(".form-login-register")["removeClass"]("active");
      } else {
        _0x4473x1(".form-login-register")["addClass"]("active");
      }
    });
    _0x4473x1(".remove-form-login-register")["on"]("click", function () {
      if (_0x4473x1(".form-login-register")["hasClass"]("active")) {
        _0x4473x1(".form-login-register")["removeClass"]("active");
      }
    });
    _0x4473x1(".button-next-reregister")["on"]("click", function () {
      if (_0x4473x1(".form-login")["hasClass"]("active")) {
        _0x4473x1(".form-login")["removeClass"]("active");
        _0x4473x1(".form-register")["addClass"]("active");
      }
    });
    _0x4473x1(".button-next-login")["on"]("click", function () {
      if (_0x4473x1(".form-register")["hasClass"]("active")) {
        _0x4473x1(".form-register")["removeClass"]("active");
        _0x4473x1(".form-login")["addClass"]("active");
      }
    });
    _0x4473x1(".search-toggle")["on"]("click.break", function (_0x4473x9) {
      _0x4473x1(".page-wrapper")["toggleClass"]("opacity-style");
      var _0x4473x28 = _0x4473x1(".search-overlay");
      _0x4473x28["toggleClass"]("search-visible");
    });
    _0x4473x1(".close-search", ".search-overlay")["on"](
      "click.break",
      function (_0x4473x9) {
        _0x4473x1(".page-wrapper")["toggleClass"]("opacity-style");
        var _0x4473x28 = _0x4473x1(".search-overlay");
        _0x4473x28["toggleClass"]("search-visible");
      }
    );
    _0x4473x1(".ajax-search .input-search")["on"]("keydown", function () {
      setTimeout(
        function (_0x4473x29) {
          var _0x4473x2a = _0x4473x29["val"]();
          if (_0x4473x2a["length"] >= 2) {
            _0x4473x1(".ajax-search .result-search-products-content")["show"]();
            _0x4473x1(".ajax-search .result-search-products .items-search")[
              "hide"
            ]();
            _0x4473x1(".ajax-search .result-search-products")["addClass"](
              "loading"
            );
            _0x4473x1(".ajax-search .result-search-products")["show"]();
            setTimeout(function () {
              _0x4473x1(".ajax-search .result-search-products")["removeClass"](
                "loading"
              );
              _0x4473x1(".ajax-search .result-search-products .items-search")[
                "show"
              ]();
            }, 1000);
          } else {
            _0x4473x1(".ajax-search .result-search-products-content")["hide"]();
          }
        },
        200,
        _0x4473x1(this)
      );
    });
    _0x4473x1(".cart-empty-wrap")["hide"]();
    _0x4473x1(".cart-list-wrap")["show"]();
    _0x4473x1(".cart-remove")["on"]("click", function () {
      if (_0x4473x1(".ruper-topcart.popup")["hasClass"]("active")) {
        _0x4473x1(".ruper-topcart.popup")["removeClass"]("active");
      }
      if (_0x4473x2["hasClass"]("not-scroll")) {
        _0x4473x2["removeClass"]("not-scroll");
      }
    });
    _0x4473x1(".cart-icon")["on"]("click", function () {
      if (
        !_0x4473x2["hasClass"]("not-scroll") &&
        _0x4473x1(".ruper-topcart")["hasClass"]("popup")
      ) {
        _0x4473x2["addClass"]("not-scroll");
      }
    });
    _0x4473x1(".remove-cart-shadow")["on"]("click", function () {
      if (_0x4473x1(".ruper-topcart.popup")["hasClass"]("active")) {
        _0x4473x1(".ruper-topcart.popup")["removeClass"]("active");
      }
      if (_0x4473x2["hasClass"]("not-scroll")) {
        _0x4473x2["removeClass"]("not-scroll");
      }
    });
    _0x4473x1(".mini-cart-item a.remove")["on"]("click", function (_0x4473x27) {
      _0x4473x27["preventDefault"]();
      var _0x4473x2b = _0x4473x1(this)["closest"](".mini-cart");
      _0x4473x1(this)["closest"]("li")["remove"]();
      _0x4473x2b["find"](".cart-count")["text"](
        _0x4473x2b["find"](".cart-list-wrap .cart-list li")["length"]
      );
      if (!_0x4473x2b["find"](".cart-list-wrap .cart-list li")["length"]) {
        _0x4473x2b["find"](".cart-empty-wrap")["show"]();
        _0x4473x2b["find"](".cart-list-wrap")["hide"]();
      }
    });
    _0x4473x1(".dropdown-menu.cart-popup")["on"](
      "click.bs.dropdown",
      function (_0x4473x27) {
        _0x4473x27["stopPropagation"]();
      }
    );
    _0x4473x1(".btn-add-to-cart .button")["on"]("click", function (_0x4473x27) {
      _0x4473x27["preventDefault"]();
      var _0x4473x2c = _0x4473x1(this);
      _0x4473x2c["addClass"]("loading");
      setTimeout(function () {
        _0x4473x2c["removeClass"]("loading");
        _0x4473x2c["addClass"]("added");
        _0x4473x2c["closest"]("div")["append"](
          '<a href="shop-cart.html" class="added-to-cart product-btn" title="View cart" tabindex="0">View cart</a>'
        );
        _0x4473x1("body")["append"](
          '<div class="cart-product-added"><div class="added-message">Product was added to cart successfully!</div>'
        );
        setTimeout(function () {
          _0x4473x1(".cart-product-added")["remove"]();
        }, 2000);
      }, 1000);
    });
    _0x4473x1(".btn-wishlist .product-btn")["on"](
      "click",
      function (_0x4473x27) {
        _0x4473x27["preventDefault"]();
        var _0x4473x2d = _0x4473x1(this);
        if (_0x4473x2d["hasClass"]("added")) {
          _0x4473x1(".wishlist-popup")["addClass"]("show");
        } else {
          _0x4473x2d["addClass"]("adding");
          _0x4473x2d["html"]("Add to wishlist...");
          setTimeout(function () {
            _0x4473x2d["removeClass"]("adding");
            _0x4473x2d["addClass"]("added");
            _0x4473x2d["html"]("Browse wishlist");
            _0x4473x1(".wishlist-popup")["addClass"]("show");
            setTimeout(function () {
              _0x4473x1(".wishlist-notice")["removeClass"](
                "wishlist-notice-show"
              );
            }, 1000);
          }, 1000);
        }
      }
    );
    _0x4473x1(".wishlist-popup .wishlist-popup-close")["on"](
      "click",
      function (_0x4473x27) {
        _0x4473x27["preventDefault"]();
        _0x4473x1(".wishlist-popup")["removeClass"]("show");
      }
    );
    _0x4473x1(document)["on"](
      "click touch",
      ".wishlist-popup",
      function (_0x4473x27) {
        var _0x4473x2e = _0x4473x1(".wishlist-popup-content");
        if (
          _0x4473x1(_0x4473x27["target"])["closest"](_0x4473x2e)["length"] == 0
        ) {
          _0x4473x1(".wishlist-popup")["removeClass"]("show");
        }
      }
    );
    _0x4473x1(".wishlist-popup .wishlist-continue")["on"](
      "click",
      function (_0x4473x27) {
        _0x4473x1(".wishlist-popup")["removeClass"]("show");
      }
    );
    _0x4473x1(".wishlist-item-remove span")["on"](
      "click",
      function (_0x4473x27) {
        _0x4473x1(this)["addClass"]("removing");
        _0x4473x1(".wishlist-notice")["text"]("Removed from wishlist!");
        _0x4473x1(".wishlist-notice")["addClass"]("wishlist-notice-show");
        var _0x4473x2f = _0x4473x1(this)["closest"](".wishlist-items");
        var _0x4473x30 = _0x4473x1(this)["closest"](".wishlist-item");
        setTimeout(function () {
          _0x4473x1(".wishlist-notice")["removeClass"]("wishlist-notice-show");
          _0x4473x30["remove"]();
          _0x4473x1(".wishlist-count")["text"](
            _0x4473x2f["find"]("tbody tr")["length"]
          );
          if (!_0x4473x2f["find"]("tbody tr")["length"]) {
            _0x4473x2f["before"](
              '<div class="wishlist-empty">There are no products on the wishlist!</div>'
            );
          }
        }, 1000);
      }
    );
    _0x4473x1(".btn-compare .product-btn")["on"](
      "click",
      function (_0x4473x27) {
        var _0x4473x31 = _0x4473x1(this);
        _0x4473x31["addClass"]("adding");
        setTimeout(function () {
          _0x4473x31["removeClass"]("adding");
          _0x4473x1(".compare-popup")["addClass"]("active");
        }, 1000);
      }
    );
    _0x4473x1(".compare-popup .compare-table-close")["on"](
      "click",
      function (_0x4473x27) {
        _0x4473x27["preventDefault"]();
        _0x4473x1(".compare-popup")["removeClass"]("active");
      }
    );
    _0x4473x1(".product-quickview .quickview-button")["on"](
      "click",
      function (_0x4473x27) {
        _0x4473x27["preventDefault"]();
        var _0x4473x32 = _0x4473x1(this);
        _0x4473x32["addClass"]("loading");
        setTimeout(function () {
          _0x4473x32["removeClass"]("loading");
          _0x4473x1(".quickview-popup")["addClass"]("active");
        }, 1000);
      }
    );
    _0x4473x1(".quickview-popup .quickview-close")["on"](
      "click",
      function (_0x4473x27) {
        _0x4473x27["preventDefault"]();
        _0x4473x1(".quickview-popup")["removeClass"]("active");
      }
    );
    _0x4473x1(document)["on"](
      "click touch",
      ".quickview-popup",
      function (_0x4473x27) {
        var _0x4473x33 = _0x4473x1(".quickview-container");
        if (
          _0x4473x1(_0x4473x27["target"])["closest"](_0x4473x33)["length"] == 0
        ) {
          _0x4473x1(".quickview-popup")["removeClass"]("active");
        }
      }
    );
    _0x4473x1(".quantity .plus")["on"]("click", function (_0x4473x27) {
      var _0x4473x34 = parseInt(
        _0x4473x1(this)["closest"](".quantity")["find"](".qty")["val"]()
      );
      _0x4473x1(this)
        ["closest"](".quantity")
        ["find"](".qty")
        ["val"](_0x4473x34 + 1);
    });
    _0x4473x1(".quantity .minus")["on"]("click", function (_0x4473x27) {
      var _0x4473x34 = parseInt(
        _0x4473x1(this)["closest"](".quantity")["find"](".qty")["val"]()
      );
      if (_0x4473x34 > 1) {
        _0x4473x1(this)
          ["closest"](".quantity")
          ["find"](".qty")
          ["val"](_0x4473x34 - 1);
      }
    });
    var _0x4473x35;
    _0x4473x1(".video-wrap .video")["click"](function () {
      _0x4473x35 = _0x4473x1(this)["data"]("src");
    });
    _0x4473x1("#video-popup")["on"]("shown.bs.modal", function (_0x4473x27) {
      _0x4473x1("#video")["attr"]("src", _0x4473x35);
    });
    _0x4473x1("#video-popup")["on"]("hide.bs.modal", function (_0x4473x27) {
      _0x4473x1("#video")["attr"]("src", _0x4473x35);
    });
    _0x4473x1(".btn.loadmore")["on"]("click", function (_0x4473x27) {
      _0x4473x27["preventDefault"]();
      var _0x4473x36 = _0x4473x1(this);
      _0x4473x36["addClass"]("loading");
      setTimeout(function () {
        _0x4473x36["closest"](".block-products")
          ["find"](".products-list .row > div.hide")
          ["show"]();
        _0x4473x36["remove"]();
      }, 1000);
    });
    // if (screen["width"] <= 480) {
    //   _0x4473x1(".item-lookbook")["each"](function () {
    //     var _0x4473x37 = _0x4473x1(this)["offset"]();
    //     var _0x4473x38 = parseInt(_0x4473x37["left"]);
    //     _0x4473x1(this)
    //       ["find"](".content-lookbook")
    //       ["css"]("left", "-" + (_0x4473x38 - 14) + "px");
    //     _0x4473x1(this)["find"](".content-lookbook")["css"]("top", "auto");
    //     _0x4473x1(this)["find"](".content-lookbook")["css"]("bottom", "36px");
    //     _0x4473x1(this)
    //       ["find"](".content-lookbook")
    //       ["css"]("width", parseInt(screen["width"]) - 30 + "px");
    //   });
    // }
    _0x4473x1(".menu-full .menu-toggle")["on"]("click", function (_0x4473x27) {
      _0x4473x1(this)
        ["closest"](".menu-full")
        ["find"](".site-navigation")
        ["addClass"]("active");
    });
    _0x4473x1(".menu-full .close-menu-full")["on"](
      "click",
      function (_0x4473x27) {
        _0x4473x1(this)
          ["closest"](".menu-full")
          ["find"](".site-navigation")
          ["removeClass"]("active");
      }
    );
    if (_0x4473x1("#price-filter")["length"]) {
      _0x4473x1("#price-filter")["slider"]({
        from: 0,
        to: 100,
        step: 1,
        smooth: true,
        round: 0,
        dimension: "&nbsp;",
        skin: "plastic ",
      });
    }

    _0x4473x1(".shop - cart - empty ")["hide "]();
    _0x4473x1(".shop - cart.product - remove a ")["on "](
      "click ",
      function (_0x4473x27) {
        _0x4473x27["preventDefault "]();
        _0x4473x1(this)["closest "]("tr ")["remove "]();
        _0x4473x1(".shop - cart.cart - subtotal.price ")["text "](
          _0x4473x1(".shop - cart.product - subtotal.price ")["text "]()
        );
        _0x4473x1(".shop - cart.order - total.price ")["text "](
          _0x4473x1(".shop - cart.product - subtotal.price ")["text "]()
        );
        if (_0x4473x1(".shop - cart.cart - items tr ")["length "] == 2) {
          _0x4473x1(".shop - cart ")[" hide "]();
          _0x4473x1(".shop - cart - empty ")["show "]();
        }
      }
    );
    _0x4473x1(".custom - radio li.payment - box ")["hide "]();
    _0x4473x1(".custom - radio li.input - radio: checked ")
      ["closest "]("li ")
      ["find "](".payment - box ")
      ["show "]();
    _0x4473x1(".custom - radio li ")["on "]("click ", function (_0x4473x27) {
      _0x4473x1(this)
        ["closest "](".custom - radio ")
        ["find "]("li input ")
        ["prop "]("checked ", false);
      _0x4473x1(this)["find "]("input ")["prop "]("checked ", true);
      _0x4473x1(this)
        ["closest "](".custom - radio ")
        ["find "]("li.payment - box ")
        ["hide "]();
      _0x4473x1(this)["find "](".payment - box ")["show "]();
    });
    if (_0x4473x1(".custom - select ")["length "]) {
      _0x4473x1(".custom - select ")["select2 "]();
    }
    _0x4473x1(".shop - checkout.create - account ")["hide "]();
    _0x4473x1(".shop - checkout.account - fields.input - checkbox ")["change "](
      function () {
        _0x4473x1(".shop - checkout.create - account ")["toggle "]();
      }
    );
    _0x4473x1(".shop - checkout.shipping - address ")["hide "]();
    _0x4473x1(".shop - checkout.shipping - fields.input - checkbox ")[
      "change "
    ](function () {
      _0x4473x1(".shop - checkout.shipping - address ")["toggle "]();
    });
  });
})(jQuery);
// skin:'plastic '})};
// _0x4473x1('.shop - cart - empty ')['hide ']();
// _0x4473x1('.shop - cart.product - remove a ')[' on '](' click ',function(_0x4473x27){_0x4473x27[' preventDefault ']();
// _0x4473x1(this)[' closest '](' tr ')[' remove ']();_0x4473x1('.shop - cart.cart - subtotal.price ')[' text '](_0x4473x1('.shop - cart.product - subtotal.price ')[' text ']());_0x4473x1('.shop - cart.order - total.price ')[' text '](_0x4473x1('.shop - cart.product - subtotal.price ')[' text ']());if(_0x4473x1('.shop - cart.cart - items tr ')[' length ']== 2){_0x4473x1('.shop - cart ')[' hide ']();_0x4473x1('.shop - cart - empty ')[' show ']()}});_0x4473x1('.custom - radio li.payment - box ')[' hide ']();_0x4473x1('.custom - radio li.input - radio: checked ')[' closest '](' li ')[' find ']('.payment - box ')[' show ']();_0x4473x1('.custom - radio li ')[' on '](' click ',function(_0x4473x27){_0x4473x1(this)[' closest ']('.custom - radio ')[' find '](' li input ')[' prop '](' checked ',false);_0x4473x1(this)[' find '](' input ')[' prop '](' checked ',true);_0x4473x1(this)[' closest ']('.custom - radio ')[' find '](' li.payment - box ')[' hide ']();_0x4473x1(this)[' find ']('.payment - box ')[' show ']()});if(_0x4473x1('.custom - select ')[' length ']){_0x4473x1('.custom - select ')[' select2 ']()};_0x4473x1('.shop - checkout.create - account ')[' hide ']();_0x4473x1('.shop - checkout.account - fields.input - checkbox ')[' change '](function(){_0x4473x1('.shop - checkout.create - account ')[' toggle ']()});_0x4473x1('.shop - checkout.shipping - address ')[' hide ']();_0x4473x1('.shop - checkout.shipping - fields.input - checkbox ')[' change '](function(){_0x4473x1('.shop - checkout.shipping - address ')[' toggle ']()})})})(jQuery)
