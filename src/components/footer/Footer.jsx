import React, { useEffect, useState } from "react";
import payment_image from "../../asset/images/payments.png";
import logo from "../../asset/images/logo.png";
import apiConfig from "../../config/apiConfig";

const Footer = () => {
  const [links, setLinks] = useState([]);
  const [data, setData] = useState({});

  useEffect(() => {
    fetch(apiConfig.getSocialLinks, {
      method: 'GET'
    }).then(response => response.json())
      .then(data => {
        setLinks(data);
      })

    fetch(apiConfig.getFooterLinks, {
      method: 'GET'
    }).then(response => response.json())
      .then(data => {
        const dataObj = data.data.reduce((acc, obj) => {
          const type = obj.type;
          acc[type] = acc[type] || [];
          acc[type] = [...acc[type], obj];
          return acc;
        }, {});
        // console.log(dataObj);
        setData(dataObj);
        return true;
      })
  }, []);
  useEffect(() => console.log(links), [links])
  return (
    <footer
      id="site-footer"
      className="mt-auto site-footer background three-columns"
    >
      <div className="footer">
        <div className="section-padding">
          <div className="section-container">
            <div className="block-widget-wrap">
              <div className="row">
                <div className="col-lg-4 column-left">
                  <div className="column-wrap">
                    <div className="row">
                      {Object.keys(data)?.map(key => (
                        <div className="col-lg-6 ">
                          <div className="block block-menu m-b-20">
                            <h2 className="block-title">{key}</h2>
                            <div className="block-content">
                              <ul>
                                {data[key]?.map(obj => (
                                  <li>
                                    <a href={obj?.url}>{obj?.title}</a>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      ))}

                    </div>
                  </div>
                </div>
                <div className="col-lg-4 column-center">
                  <div className="column-wrap">
                    <div className="block block-image m-b-20">
                      <img width={100} src={logo} alt />
                    </div>
                    <div className="block block-social">
                      <ul className="social-link">
                        <li>
                          <a href={links?.data?.[1]?.url}>
                            <i className="fa fa-twitter" />
                          </a>
                        </li>
                        <li>
                          <a href={'https://instagram.com'}>
                            <i className="fa fa-instagram" />
                          </a>
                        </li>
                        <li>
                          <a href={links?.data?.[0]?.url}>
                            <i className="fa fa-facebook-f" />
                          </a>
                        </li>
                        <li>
                          <a href={links?.data?.[2].url}>
                            <i className="fa fa-youtube-play" />
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>


                <div className="col-lg-4 column-right">
                  <div className="column-wrap">
                    <div className="block block-newsletter">
                      <h2 className="block-title">Newsletter</h2>
                      <div className="block-content">
                        <div className="newsletter-text">
                          Enter your email below to be the first to know about
                          new collections and product launches.
                        </div>
                        <form action method="post" className="newsletter-form">
                          <input
                            type="email"
                            name="your-email"
                            size={40}
                            placeholder="Email address"
                          />
                          <span className="btn-submit">
                            <input type="submit" defaultValue="Subscribe" />
                          </span>
                        </form>
                      </div>
                    </div>
                    <div className="block block-image">
                      <img width={309} height={32} src={payment_image} alt />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


      <div className="footer-bottom">
        <div className="section-padding">
          <div className="section-container">
            <div className="block-widget-wrap">
              <p className="copyright text-center">
                Copyright © 2023. All Right Reserved
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
