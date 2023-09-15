import React from "react";
import payment_image from "../../asset/images/payments.png";
import logo from "../../asset/images/logo.png";

const Footer = () => {
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
                      <div className="col-lg-6 md-b-20">
                        <div className="block block-menu m-b-20">
                          <h2 className="block-title">About</h2>
                          <div className="block-content">
                            <ul>
                              <li>
                                <a href="javascript:;">About Us</a>
                              </li>
                              <li>
                                <a href="javascript:;">Locate a Store</a>
                              </li>
                              <li>
                                <a href="javascript:;">Write to us</a>
                              </li>
                              <li>
                                <a href="javascript:;">Careers</a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="block block-menu">
                          <h2 className="block-title">HELP</h2>
                          <div className="block-content">
                            <ul>
                              <li>
                                <a href="javascript:;">Contact Us</a>
                              </li>
                              <li>
                                <a href="javascript:;">Track Your Order</a>
                              </li>
                              <li>
                                <a href="javascript:;">Returns &amp; Refunds</a>
                              </li>
                              <li>
                                <a href="javascript:;">Privacy Policy</a>
                              </li>
                              <li>
                                <a href="javascript:;">FAQs</a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
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
                          <a href="#">
                            <i className="fa fa-twitter" />
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i className="fa fa-instagram" />
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i className="fa fa-facebook-f" />
                          </a>
                        </li>
                        <li>
                          <a href="#">
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
