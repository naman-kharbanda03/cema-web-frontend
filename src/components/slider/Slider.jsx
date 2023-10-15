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
      method: 'GET',
    }).then(response => response.json())
      .then(data => {
        console.log(data);
        setSliderData(data.sliders);
      }).catch(error => console.error("Fetch Issue in Slider", error));
  }

  useEffect(() => {
    fetchSliders();
  }, []);
  return (
    <div className="block block-sliders layout-9 diff-col nav-left auto-height m-b-0">
      <Slider {...settings}>
        {sliderData.map(slider => (
          <div className="item slick-slide">
            <div className="item-content">
              <div className="item-info">
                <div className="content background-1">
                  <div className="content-wrap">
                    <h2 className="title-slider">
                      Easy <br />
                      Living
                    </h2>
                    <div className="description-slider">
                      Best collections for your home
                    </div>
                    <Link to={"/products"} className="button-slider button-black" href="#">
                      SHOP NOW
                    </Link>
                  </div>
                </div>
              </div>
              <div className="content-image">
                <img
                  width={959}
                  height={963}
                  // style={{ height: '450px', objectFit: 'contain' }}
                  src={slider.image}
                  alt="Image Slider"
                />
              </div>
            </div>
          </div>
        ))}

        {/* <div className="item slick-slide">
          <div className="item-content">
            <div className="item-info">
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
                src={banner_29}
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
