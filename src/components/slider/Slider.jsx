import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import $ from "jquery";
import apiConfig from "../../config/apiConfig";
import { Link } from "react-router-dom";

const Sliders = () => {
  const [sliderData, setSliderData] = useState([]);
  const settings = {
    pauseOnHover: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    focusOnSelect: true,
    dots: true,
    arrows: false,
    cssEase: "linear",
    autoplaySpeed: 5000,
  };

  const fetchSliders = () => {
    const apiUrl = apiConfig.slidersAPI;
    fetch(apiUrl, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setSliderData(data.sliders);
      })
      .catch((error) => console.error("Fetch Issue in Slider", error));
  };

  useEffect(() => {
    fetchSliders();
  }, []);
  return (
    <div className="block block-sliders layout-9 diff-col nav-left auto-height m-b-0">
      <Slider {...settings}>
        {sliderData.map((slider) => (
          <div className="item slick-slide" >
            <div className="item-content" style={{ position: 'relative', right: '20px' }}>
              <div className="item-info" >
                <div className="content background-1">
                  <div className="content-wrap">
                    <h2 className="title-slider">{slider?.topheading?.en}</h2>
                    <div className="description-slider">
                      {slider?.heading?.en}
                    </div>
                    <a
                      href={
                        slider.link_by === 'category' ?
                          `/products?id=${slider.linked_id}` :
                          slider.link_by === 'url' ? slider.linked_id :
                            slider.link_by === 'product' ? `/product-details?product_id=${slider.linked_id}` : '/products'
                      }
                      className="button-slider button-black"
                    >
                      {slider?.buttonname?.en ? slider.buttonname.en : 'SHOP NOW'}
                    </a>
                  </div>
                </div>
              </div>
              <div className="content-image">
                <img
                  // width={1000}
                  // height={963}
                  style={{ objectFit: 'contain', width: '' }}
                  src={slider.image}
                  alt="Image Slider"
                />
              </div>
            </div>
          </div>
        ))}

        {/* <div className="item slick-slide" >
          <div className="item-content" >
            <div className="item-info" style={{ position: 'relative', right: '15px' }}>
              <div className="content background-2">
                <div className="content-wrap">
                  <h2 className="title-slider">
                    Home
                    <br />
                    Best decor
                  </h2>
                  <div className="description-slider">
                    Make your home bright
                  </div>
                  <a className="button-slider button-black" href="#">
                    SHOP NOW
                  </a>
                </div>
              </div>
            </div>
            <div className="content-image">
              <img
                className="demo-img-1 img-fluid"
                src={''}
                alt="Image Slider"
              />
            </div>
          </div>
        </div> */}
      </Slider>
    </div>
  );
};

export default Sliders;
