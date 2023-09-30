import React, { useEffect } from "react";

import Sliders from "../../components/slider/Slider";
import Banner from "../../components/banner/Banner";
import NewArrival from "../../components/block/NewArrival";
import ProductSlider from "../../components/slider/ProductSlider";
import Banner2 from "../../components/banner/Banner2";
import BestSellerSlider from "../../components/slider/BestSellerSlider";
import { Link } from "react-router-dom";
import apiConfig from "../../config/apiConfig";

const Home = () => {

  useEffect(() => {
    const categoryListAPI = apiConfig.categoryListAPI;
    fetch(categoryListAPI, {
      method: "GET"
    })
      .then((response) => {
        if (!response.ok) throw new Error("Network Issue");
        return response.json();
      })
      .then((data) => {
        console.log(data);
        return data;
      })
      .catch((error) => console.error("Problem with fetch operations", error));
  }, []);

  return (
    <>
      <div id="site-main" className="site-main">
        <div id="main-content" className="main-content">
          <div id="primary" className="content-area">
            <div id="content" className="site-content" role="main">
              <section class="section m-b-0">
                <Sliders />
              </section>

              <section className="section m-b-50">
                <Banner />
              </section>

              <section className="section section-padding m-b-50">
                <div className="section-container large">
                  {/* Block Products */}
                  <div className="block block-products loadmore">                   
                    <div className="block-widget-wrap">                   
                      <div className="block-title">
                        <h2>New Arrivals</h2>
                      </div>                  
                      <div className="block-content">
                        <NewArrival />
                        <div className="products-loadmore">
                          <div className="btn button-outline loadmore">
                            <div className="lds-ellipsis">
                              <div />
                              <div />
                              <div />
                              <div />
                            </div>
                            <span>Load more</span>
                            <i className="icon-arrow-down" aria-hidden="true" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <section className="section categorysec section-padding background-11 p-t-50 p-b-50 m-b-0">
                <div className="section-container">
                  {/* Block Product Categories */}
                  <div className="block block-product-cats slider">
                    <div className="block-widget-wrap">
                      <div className="block-title">
                        <h2>Shop by Category</h2>
                      </div>
                      <div className="block-content">
                        <div className="product-cats-list slick-wrap">
                          <ProductSlider />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <section className="section section-padding p-t-50 m-b-50">
                <div className="section-container">
                  <div className="block block-banners banners-effect">
                    <Banner2 />
                  </div>
                </div>
              </section>

              <section className="section beatsellersec section-padding p-t-0 p-b-50 m-b-0">
                <div className="section-container">
                  <div className="block block-products slider">
                    <div className="block-widget-wrap">
                      <div className="block-title">
                        <h2>Best Sellers</h2>
                      </div>
                      <div className="block-content">
                        <div className="content-product-list slick-wrap">
                          <BestSellerSlider />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>

      {/* <div class="page-preloader">
        <div class="loader">
          <div></div>
          <div></div>
        </div>
      </div> */}
    </>
  );
};

export default Home;
