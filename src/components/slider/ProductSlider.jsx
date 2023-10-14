import React, { useEffect, useState } from "react";
import product_h3 from "../../asset/images/product/h3.jpg";
import product_d5 from "../../asset/images/product/d5.jpg";
import product_be2 from "../../asset/images/product/be2.jpg";
import product_l3 from "../../asset/images/product/l3.jpg";
import product_of3 from "../../asset/images/product/of3.jpg";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import apiConfig from "../../config/apiConfig";
const ProductSlider = () => {
  const [categories, setCategories] = useState([{}]);
  const [path, setPath] = useState();

  const fetchDetails = () => {
    const apiUrl = apiConfig.categoryListAPI;
    fetch(`${apiUrl}?per_page=10&page=1`, {
      method: "GET",
    })
      .then((response) => {
        if (!response.ok) throw new Error("Network Issue");
        return response.json();
      })
      .then((data) => {
        console.log("testingslide");
        console.log("slider", data.categories.path);
        setCategories(data.categories.data);
        setPath(data.categories.path);
      })
      .catch((error) => console.error("Problem with fetch operations", error));
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  const settings = {
    pauseOnHover: false,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: false,
    focusOnSelect: true,
    dots: false,
    arrows: true,
    cssEase: "linear",
    autoplaySpeed: 5000,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 400,
        settings: {
          arrows: false,
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className="slick-sliders content-category">
      <Slider {...settings}>
        {categories?.map((cat) => (
          <>
            <div className="item item-product-cat slick-slide">
              <div className="item-product-cat-content">
                <Link
                  to={{
                    pathname: "/products",
                    search: `?category=${cat.title?.en}&id=${cat.id}`,
                  }}
                >
                  <div
                    className="item-image"
                  >
                    <img
                      width={258}
                      height={258}
                      style={{ height: "330px", objectFit: 'contain' }}
                      src={
                        cat?.image
                          ? `https://www.demo609.amrithaa.com/backend-cema/public/media/category/${cat?.image}`
                          : product_l3
                      }
                      alt={cat.title?.en}
                    />
                    {console.log(cat?.image)}
                  </div>
                </Link>
                <div className="product-cat-content-info">
                  <h2 className="item-title">
                    <Link
                      to={{
                        pathname: "/products",
                        search: `?category=${cat.title?.en}&id=${cat.id}`,
                      }}
                    >
                      {cat?.title?.en}
                    </Link>
                  </h2>
                </div>
              </div>
            </div>
          </>
        ))}
      </Slider>
    </div>
  );
};

export default ProductSlider;
