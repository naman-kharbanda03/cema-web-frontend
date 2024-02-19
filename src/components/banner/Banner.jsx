import React, { useEffect, useState } from "react";
import banner_11 from "../../asset/images/banner/banner-11.jpg";
import banner_12 from "../../asset/images/banner/banner-12.jpg";
import banner_13 from "../../asset/images/banner/banner-13.jpg";
import banner_14 from "../../asset/images/banner/banner-14.jpg";
import apiConfig from "../../config/apiConfig";

const Banner = () => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    // categories data
    (() => {
      fetch(apiConfig.homeFirstCategory)
        .then((res) => {
          if (!res.ok) throw new Error("Network Issue");
          return res.json();
        })
        .then((data) => {
          const { categories } = data;
          setCategories(categories);
          console.log(categories);
        })
        .catch((e) => {
          console.error("Problem with fetch operations", e);
        });
    })();
  }, []);
  return (
    <div className="block block-banners layout-6 banners-effect no-space">
      <div className="row" >
        <div className="col-md-6 left"  >
          <div className="block-widget-banner layout-8">
            <div className="bg-banner" >
              <div className="" >
                <div className=""  >
                  <a href={`/products?id=${categories[0]?.category_id}`}>
                    <img
                      // width={959}
                      // height :100%
                      // src={banner_11}
                      src={`https://www.demo609.amrithaa.com/backend-cema/public/images/category/${categories[0]?.image}`}
                      style={{ maxHeight: '100%', maxWidth: '100%', width: '100%', objectFit: 'contain' }}
                      alt="Banner Image"
                    />
                  </a>
                </div>
                <div className="banner-wrapper-infor">
                  <div className="info">
                    <div className="content">
                      <div className="banner-image-subtitle">
                        {categories[0]?.description}
                      </div>
                      <a className="link-title" href={`/products?id=${categories[0]?.category_id}`}>
                        <h3 className="title-banner">{categories[0]?.title}</h3>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6 right">
          <div className="row">
            <div className="col-md-12">
              <div className="block-widget-banner layout-8">
                <div className="bg-banner">
                  <div className="banner-wrapper banners">
                    <div className="banner-image">
                      <a href={`/products?id=${categories[1]?.category_id}`}>
                        <img
                          width={961}
                          height={419}
                          src={`https://www.demo609.amrithaa.com/backend-cema/public/images/category/${categories[1]?.image}`}
                          alt="Banner Image"
                        />
                      </a>
                    </div>
                    <div className="banner-wrapper-infor">
                      <div className="info">
                        <div className="content">
                          <div className="banner-image-subtitle">
                            {categories[1]?.description}
                          </div>
                          <a className="link-title" href={`/products?id=${categories[1]?.category_id}`}>
                            <h3 className="title-banner">
                              {categories[1]?.title}
                            </h3>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="block-widget-banner layout-8">
                <div className="bg-banner">
                  <div className="banner-wrapper banners">
                    <div className="banner-image">
                      <a href={`/products?id=${categories[2]?.category_id}`}>
                        <img
                          width={481}
                          height={419}
                          src={`https://www.demo609.amrithaa.com/backend-cema/public/images/category/${categories[2]?.image}`}
                          alt="Banner Image"
                        />
                      </a>
                    </div>
                    <div className="banner-wrapper-infor">
                      <div className="info">
                        <div className="content">
                          <div className="banner-image-subtitle">
                            {categories[2]?.description}
                          </div>
                          <a className="link-title" href={`/products?id=${categories[2]?.category_id}`}>
                            <h3 className="title-banner">{categories[2]?.title}</h3>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="block-widget-banner layout-8">
                <div className="bg-banner">
                  <div className="banner-wrapper banners">
                    <div className="banner-image">
                      <a href={`/products?id=${categories[3]?.category_id}`}>
                        <img
                          width={481}
                          height={419}
                          src={`https://www.demo609.amrithaa.com/backend-cema/public/images/category/${categories[3]?.image}`}
                          alt="Banner Image"
                        />
                      </a>
                    </div>
                    <div className="banner-wrapper-infor">
                      <div className="info">
                        <div className="content">
                          <div className="banner-image-subtitle">
                            {categories[3]?.description}
                          </div>
                          <a className="link-title" href={`/products?id=${categories[3]?.category_id}`}>
                            <h3 className="title-banner">
                              {categories[3]?.title}
                            </h3>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div >
    </div >
  );
};

export default Banner;
