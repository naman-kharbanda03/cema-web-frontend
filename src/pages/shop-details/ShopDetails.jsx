import React, { useEffect, useRef, useState } from "react";
import greyImage from "../../asset/images/product/1-2.jpg";
import PageTitle from "../../components/page-tittle/PageTitle";
import { useShoppingCart } from "../../context/ShoppingCartContext";
import { act } from "react-dom/test-utils";
import StarRatings from "react-star-ratings";
import apiConfig from "../../config/apiConfig";
import { toast } from "react-toastify";

const ShopDetails = (product) => {
  const [data, setData] = useState();
  const [image, setImage] = useState("");
  const [activeTabId, setActiveTabId] = useState(1);
  const [review, setReview] = useState({})
  const [toggleForm, SetForm] = useState(false)
  const targetRef = useRef(null);

  const token = localStorage.getItem('accessToken');
  const url = new URL(window.location.href);
  const params = new URLSearchParams(url.search);
  const product_id = params.get("product_id");

  const { AddToCart, handleAddRemoveWishlist } = useShoppingCart();
  const [quant, setQuant] = useState(1);

  const fetchDetails = () => {
    const apiUrl = apiConfig.productDetailsAPI;
    fetch(
      `${apiUrl}/${product_id}/simple_product`,
      {
        method: "GET",
      }
    )
      .then((response) => {
        if (!response.ok) throw new Error("Network Issue");
        return response.json();
      })
      .then((data) => {
        console.log("cart -->", data?.data)
        setData(data.data);
        setReview(
          {
            quality: 0,
            Price: 0,
            Value: 0,
            product_id: data?.data?.product_id,
            review: "",
            name: "",
            email: ""
          }
        )
        console.log("testing", data.data);
        // console.log("testim", data.data.combinations);
        setImage(
          `${data.data.images_path}/${data.data.combinations[0].images[0].image}`
        );
      })
      .catch((error) => console.error("Problem with fetch operations", error));
  };
  const giveReview = (e) => {
    e.preventDefault();
    if (!review?.name || !review?.email || !review?.review) {
      toast.warning("Please fill all the fields", {
        position: toast.POSITION.BOTTOM_LEFT,
      });
      return
    }
    const formData = new FormData();
    Object.keys(review).map((key) => {
      formData.append(key, review[key])
    })
    fetch(apiConfig.addProductReview, {
      method: "POST",
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData
    })
      .then((response) => {
        if (!response.ok) throw new Error("Network Issue");
        return response.json();
      })
      .then((data) => {
        console.log(data)
        setReview(prevState => {
          return {
            ...prevState,
            quality: 0,
            review: "",
            name: "",
            email: ""
          }
        }
        )
        toast.success(data.message, {
          position: toast.POSITION.BOTTOM_LEFT,
        });
      })
      .catch((error) => {
        //console.error("Problem with fetch operations", error)
        toast.warning("Review Already Added!", {
          position: toast.POSITION.BOTTOM_LEFT,
        });
      });
  }
  const onChangeHandler = (e) => {
    setReview((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value
      }

    })
  }
  useEffect(() => {
    fetchDetails();
  }, []);


  return (
    <div id="site-main" className="site-main">
      <div id="main-content" className="main-content">
        <div id="primary" className="content-area">
          <PageTitle current={data?.product_name?.en} />

          <div id="content" className="site-content" role="main">
            <div
              className="shop-details zoom"
              data-product_layout_thumb="scroll"
              data-zoom_scroll="true"
              data-zoom_contain_lens="true"
              data-zoomtype="inner"
              data-lenssize="200"
              data-lensshape="square"
              data-lensborder=""
              data-bordersize="2"
              data-bordercolour="#f9b61e"
              data-popup="false"
            >
              <div className="product-top-info">
                <div className="section-padding">
                  <div className="section-container p-l-r">
                    <div className="row">
                      <div className="product-images col-lg-7 col-md-12 col-12">
                        <div className="row">
                          <div className="col-md-2">
                            <div className="content-thumbnail-scroll">
                              <div
                                className="image-thumbnail slick-carousel slick-vertical"
                                data-asnavfor=".image-additional"
                                data-centermode="true"
                                data-focusonselect="true"
                                data-columns4="5"
                                data-columns3="4"
                                data-columns2="4"
                                data-columns1="4"
                                data-columns="4"
                                data-nav="true"
                                data-vertical='"true"'
                                data-verticalswiping='"true"'
                              >
                                {data?.combinations[0].images.map((images) => (
                                  <div className="img-item slick-slide">
                                    <span className="img-thumbnail-scroll">
                                      <img
                                        width="600"
                                        height="500"
                                        src={`${data?.images_path}/${images.image}`}
                                        alt=""
                                        onClick={() =>
                                          setImage(
                                            `${data?.images_path}/${images.image}`
                                          )
                                        }
                                      />
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                          <div className="col-md-10">
                            <div className="scroll-image main-image">
                              <div
                                className="image-additional slick-carousel"
                                data-asnavfor=".image-thumbnail"
                                data-fade="true"
                                data-columns4="1"
                                data-columns3="1"
                                data-columns2="1"
                                data-columns1="1"
                                data-columns="1"
                                data-nav="true"
                              >
                                <div style={{ width: "90%" }}>
                                  <img
                                    width="900"
                                    height="900"
                                    src={image}
                                    alt=""
                                    title=""
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="product-info col-lg-5 col-md-12 col-12 ">
                        <h1 className="title">{data?.product_name?.en}</h1>
                        <span className="price">
                          <del aria-hidden="true">
                            <span>
                              {data?.combinations?.[0]?.symbol}
                              {data?.combinations?.[0]?.mainprice}
                            </span>
                          </del>
                          <ins>
                            <span>
                              {data?.combinations?.[0]?.symbol}
                              {data?.combinations?.[0]?.offerprice}
                            </span>
                          </ins>
                        </span>
                        <div className="rating">
                          <StarRatings
                            rating={2.5}
                            starRatedColor="gold"
                            starHoverColor="gold"
                            numberOfStars={5}
                            starDimension="24px"
                            starSpacing="2px"
                          />
                          <p>Rating: {2.5} out of 5</p>
                        </div>
                        <div className="description">
                          {data?.description.en.length > 100
                            ?
                            <>
                              <p>{`${data?.description.en.slice(0, 100)}...`}</p>
                              <span onClick={() => {
                                targetRef.current.scrollIntoView({ behavior: 'smooth' })
                              }}
                                style={{ cursor: 'pointer' }}
                              >Read more</span>
                            </> : data?.description.en}
                          {/* <p>{data?.description.en}</p> */}
                        </div>

                        <div className="variations">
                          <table cellspacing="0">
                            <tbody>
                              <tr>
                                <td className="label">Size</td>
                                <td className="attributes">
                                  <ul className="text">
                                    <li>
                                      <span>L</span>
                                    </li>
                                    <li>
                                      <span>M</span>
                                    </li>
                                    <li>
                                      <span>S</span>
                                    </li>
                                  </ul>
                                </td>
                              </tr>
                              <tr>
                                <td className="label">Color</td>
                                <td className="attributes">
                                  <ul className="colors">
                                    <li>
                                      <span className="color-1"></span>
                                    </li>
                                    <li>
                                      <span className="color-2"></span>
                                    </li>
                                    <li>
                                      <span className="color-3"></span>
                                    </li>
                                  </ul>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        <div className="buttons">
                          <div className="add-to-cart-wrap">
                            <div className="quantity">
                              <button
                                type="button"
                                className="plus"
                                onClick={() => {
                                  setQuant((count) => count + 1);
                                }}
                              >
                                +
                              </button>
                              <input
                                type="number"
                                className="qty"
                                step="1"
                                min="0"
                                max=""
                                name="quantity"
                                title="Qty"
                                value={quant}
                                size="4"
                                placeholder=""
                                inputmode="numeric"
                                autocomplete="off"
                              />
                              <button
                                type="button"
                                className="minus"
                                onClick={() => {
                                  setQuant((count) => count - 1);
                                }}
                              >
                                -
                              </button>
                            </div>
                            <div
                              className="btn-add-to-cart"
                              onClick={() => {
                                const prod = {
                                  id: data?.combinations[0].id,
                                  price: data?.combinations?.[0]?.mainprice,
                                  image_path: data?.images_path,
                                  product_image: [`${data?.combinations[0]?.images[0]?.image}`],
                                  product_name: { en: data?.product_name?.en },
                                  type: data?.type || "simple_product"

                                }
                                AddToCart(prod, quant);
                              }}
                            >
                              Add to cart
                            </div>
                          </div>
                          <div className="btn-quick-buy" data-title="Wishlist">
                            <button className="product-btn">Buy It Now</button>
                          </div>
                          <div className="btn-wishlist" data-title="Wishlist">
                            <button className="product-btn" onClick={(e) => {
                              const prod = {
                                id: data.product_id,
                                product_name: { en: data?.product_name?.en },
                                image_path: data?.images_path,
                                product_image: [`${data?.combinations[0].images[0].image}`],
                                stock: data.combinations[0].stock
                              }
                              handleAddRemoveWishlist(e, prod)
                            }}>
                              Add to wishlist
                            </button>
                          </div>
                          {/* <div className="btn-compare" data-title="Compare">
                            <button className="product-btn">Compare</button>
                          </div> */}
                        </div>
                        <div className="product-meta">
                          <span className="sku-wrapper">
                            SKU: <span className="sku">{data?.SKU}</span>
                          </span>
                          <span className="posted-in">
                            Category:{" "}
                            <a href="shop-grid-left.html" rel="tag">
                              {data?.category_id}
                            </a>
                          </span>
                          <span className="tagged-as">
                            Tags:{" "}
                            <a href="shop-grid-left.html" rel="tag">
                              {data?.tags}
                            </a>
                          </span>
                        </div>
                        <div className="social-share">
                          <a
                            href="#"
                            title="Facebook"
                            className="share-facebook"
                            target="_blank"
                          >
                            <i className="fa fa-facebook"></i>Facebook
                          </a>
                          <a href="#" title="Twitter" className="share-twitter">
                            <i className="fa fa-twitter"></i>Twitter
                          </a>
                          <a
                            href="#"
                            title="Pinterest"
                            className="share-pinterest"
                          >
                            <i className="fa fa-pinterest"></i>Pinterest
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="product-tabs">
                <div className="section-padding">
                  <div className="section-container p-l-r">
                    <div className="product-tabs-wrap">
                      <ul className="nav nav-tabs" role="tablist" >
                        <li className="nav-item" >
                          <a
                            className={`nav-link ${activeTabId === 1 ? "active" : ""
                              }`}
                            data-toggle="tab"
                            // href="#description"
                            role="tab"
                            onClick={() => setActiveTabId(1)}
                          >
                            Description
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            className={`nav-link ${activeTabId === 2 ? "active" : ""
                              }`}
                            data-toggle="tab"
                            // href="#additional-information"
                            role="tab"
                            onClick={() => setActiveTabId(2)}
                          >
                            Additional information
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            className={`nav-link ${activeTabId === 3 ? "active" : ""
                              }`}
                            data-toggle="tab"
                            // href="#reviews"
                            role="tab"
                            onClick={() => setActiveTabId(3)}
                          >
                            Reviews ({data?.reviews})
                          </a>
                        </li>
                      </ul>
                      <div className="tab-content">
                        <div
                          className={`tab-pane fade  ${activeTabId === 1 ? " show active" : ""
                            }`}
                          id="description"
                          role="tabpanel"
                          ref={targetRef}
                        >
                          <p>{data?.description?.en}</p>
                        </div>
                        <div
                          className={`tab-pane fade  ${activeTabId === 2 ? " show active" : ""
                            }`}
                          id="additional-information"
                          role="tabpanel"
                        >
                          <table className="product-attributes">
                            <tbody>
                              {data?.special_services.map((service) => (
                                <tr className="attribute-item">
                                  <th className="attribute-label">
                                    {service?.heading}
                                  </th>
                                  <td className="attribute-value">
                                    {service?.description}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                        <div
                          className={`tab-pane fade  ${activeTabId === 3 ? " show active" : ""
                            }`}
                          id="reviews"
                          role="tabpanel"
                        >
                          <div id="reviews" className="product-reviews">
                            <div id="comments">
                              <h2 className="reviews-title">
                                1 review for <span>{data?.product_name.en}</span>
                              </h2>
                              <ol className="comment-list">
                                <li className="review">
                                  <div className="content-comment-container">
                                    <div className="comment-container">
                                      <img
                                        src="media/user.jpg"
                                        className="avatar"
                                        height="60"
                                        width="60"
                                        alt=""
                                      />
                                      <div className="comment-text">
                                        <div className="rating small">
                                          <div className="rating">
                                            <StarRatings
                                              rating={2.5}
                                              starRatedColor="gold"
                                              starHoverColor="gold"
                                              numberOfStars={5}
                                              starDimension="24px"
                                              starSpacing="2px"
                                            />
                                            <p>Rating: {2.5} out of 5</p>
                                          </div>
                                        </div>
                                        <div className="review-author">
                                          Peter Capidal
                                        </div>
                                        <div className="review-time">
                                          January 12, 2022
                                        </div>
                                      </div>
                                    </div>
                                    <div className="description">
                                      <p>good</p>
                                    </div>
                                  </div>
                                </li>
                              </ol>
                            </div>
                            <div id="review-form">
                              <div id="respond" className="comment-respond">
                                <span
                                  id="reply-title"
                                  className="comment-reply-title"
                                  onClick={() => SetForm(!toggleForm)}
                                  style={{ cursor: 'pointer' }}
                                >
                                  Add a review
                                </span>
                                {toggleForm && <form
                                  action=""
                                  method="post"
                                  id="comment-form"
                                  className="comment-form"
                                  onSubmit={giveReview}
                                >
                                  <p className="comment-notes">
                                    <span id="email-notes">
                                      Your email address will not be published.
                                    </span>{" "}
                                    Required fields are marked{" "}
                                    <span className="required">*</span>
                                  </p>
                                  <div className="comment-form-rating d-flex">
                                    <label for="rating">Your rating</label>
                                    <StarRatings
                                      style={{ margin: "-3px 10px" }}
                                      rating={review?.quality}
                                      starRatedColor="gold"
                                      starHoverColor="gold"
                                      numberOfStars={5}
                                      starDimension="18px"
                                      starSpacing="2px"
                                      changeRating={(rate) => {
                                        setReview((prevState) => {
                                          return {
                                            ...prevState,
                                            quality: rate
                                          }

                                        })
                                      }}
                                    />
                                  </div>
                                  <p className="comment-form-comment">
                                    <textarea
                                      id="comment"
                                      name="review"
                                      placeholder="Your Reviews *"
                                      cols="45"
                                      rows="8"
                                      aria-required="true"
                                      required=""
                                      value={review?.review}
                                      onChange={onChangeHandler}
                                    ></textarea>
                                  </p>
                                  <div className="content-info-reviews">
                                    <p className="comment-form-author">
                                      <input
                                        id="author"
                                        name="name"
                                        placeholder="Name *"
                                        type="text"
                                        size="30"
                                        aria-required="true"
                                        required=""
                                        value={review?.name}
                                        onChange={onChangeHandler}
                                      />
                                    </p>
                                    <p className="comment-form-email">
                                      <input
                                        id="email"
                                        name="email"
                                        placeholder="Email *"
                                        type="email"
                                        size="30"
                                        aria-required="true"
                                        required=""
                                        value={review?.email}
                                        onChange={onChangeHandler}
                                      />
                                    </p>
                                    <p className="form-submit">
                                      <input
                                        name="submit"
                                        type="submit"
                                        id="submit"
                                        className="submit"
                                        value="Submit"
                                      />
                                    </p>
                                  </div>
                                </form>}
                              </div>
                            </div>
                            <div className="clear"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className="product-related">
                <div className="section-padding">
                  <div className="section-container p-l-r">
                    <div className="block block-products slider">
                      <div className="block-title">
                        <h2>Related Products</h2>
                      </div>
                      <div className="block-content">
                        <div className="content-product-list slick-wrap">
                          <div
                            className="slick-sliders products-list grid"
                            data-slidestoscroll="true"
                            data-dots="false"
                            data-nav="1"
                            data-columns4="1"
                            data-columns3="2"
                            data-columns2="3"
                            data-columns1="3"
                            data-columns1440="4"
                            data-columns="4"
                          >
                            <div className="item-product slick-slide">
                              <div className="items">
                                <div className="products-entry clearfix product-wapper">
                                  <div className="products-thumb">
                                    <div className="product-lable">
                                      <div className="hot">Hot</div>
                                    </div>
                                    <div className="product-thumb-hover">
                                      <a href="shop-details.html">
                                        <img
                                          width="600"
                                          height="600"
                                          src={greyImage}
                                          className="post-image"
                                          alt=""
                                        />
                                        <img
                                          width="600"
                                          height="600"
                                          src={greyImage}
                                          className="hover-image back"
                                          alt=""
                                        />
                                      </a>
                                    </div>
                                    <div className="product-button">
                                      <div
                                        className="btn-add-to-cart"
                                        data-title="Add to cart"
                                      >
                                        <a
                                          rel="nofollow"
                                          href="#"
                                          className="product-btn button"
                                        >
                                          Add to cart
                                        </a>
                                      </div>
                                      <div
                                        className="btn-wishlist"
                                        data-title="Wishlist"
                                      >
                                        <button className="product-btn">
                                          Add to wishlist
                                        </button>
                                      </div>
                                      <div
                                        className="btn-compare"
                                        data-title="Compare"
                                      >
                                        <button className="product-btn">
                                          Compare
                                        </button>
                                      </div>
                                      <span
                                        className="product-quickview"
                                        data-title="Quick View"
                                      >
                                        <a
                                          href="#"
                                          className="quickview quickview-button"
                                        >
                                          Quick View{" "}
                                          <i className="icon-search"></i>
                                        </a>
                                      </span>
                                    </div>
                                  </div>
                                  <div className="products-content">
                                    <div className="contents text-center">
                                      <h3 className="product-title">
                                        <a href="shop-details.html">
                                          Zunkel Schwarz
                                        </a>
                                      </h3>
                                      <div className="rating">
                                        <div className="star star-5"></div>
                                      </div>
                                      <span className="price">$100.00</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="item-product slick-slide">
                              <div className="items">
                                <div className="products-entry clearfix product-wapper">
                                  <div className="products-thumb">
                                    <div className="product-lable">
                                      <div className="hot">Hot</div>
                                    </div>
                                    <div className="product-thumb-hover">
                                      <a href="shop-details.html">
                                        <img
                                          width="600"
                                          height="600"
                                          src={greyImage}
                                          className="post-image"
                                          alt=""
                                        />
                                        <img
                                          width="600"
                                          height="600"
                                          src={greyImage}
                                          className="hover-image back"
                                          alt=""
                                        />
                                      </a>
                                    </div>
                                    <div className="product-button">
                                      <div
                                        className="btn-add-to-cart"
                                        data-title="Add to cart"
                                      >
                                        <a
                                          rel="nofollow"
                                          href="#"
                                          className="product-btn button"
                                        >
                                          Add to cart
                                        </a>
                                      </div>
                                      <div
                                        className="btn-wishlist"
                                        data-title="Wishlist"
                                      >
                                        <button className="product-btn">
                                          Add to wishlist
                                        </button>
                                      </div>
                                      <div
                                        className="btn-compare"
                                        data-title="Compare"
                                      >
                                        <button className="product-btn">
                                          Compare
                                        </button>
                                      </div>
                                      <span
                                        className="product-quickview"
                                        data-title="Quick View"
                                      >
                                        <a
                                          href="#"
                                          className="quickview quickview-button"
                                        >
                                          Quick View{" "}
                                          <i className="icon-search"></i>
                                        </a>
                                      </span>
                                    </div>
                                  </div>
                                  <div className="products-content">
                                    <div className="contents text-center">
                                      <h3 className="product-title">
                                        <a href="shop-details.html">
                                          Namaste Vase
                                        </a>
                                      </h3>
                                      <div className="rating">
                                        <div className="star star-4"></div>
                                      </div>
                                      <span className="price">$200.00</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="item-product slick-slide">
                              <div className="items">
                                <div className="products-entry clearfix product-wapper">
                                  <div className="products-thumb">
                                    <div className="product-lable">
                                      <div className="hot">Hot</div>
                                    </div>
                                    <div className="product-thumb-hover">
                                      <a href="shop-details.html">
                                        <img
                                          width="600"
                                          height="600"
                                          src={greyImage}
                                          className="post-image"
                                          alt=""
                                        />
                                        <img
                                          width="600"
                                          height="600"
                                          src={greyImage}
                                          className="hover-image back"
                                          alt=""
                                        />
                                      </a>
                                    </div>
                                    <div className="product-button">
                                      <div
                                        className="btn-add-to-cart"
                                        data-title="Add to cart"
                                      >
                                        <a
                                          rel="nofollow"
                                          href="#"
                                          className="product-btn button"
                                        >
                                          Add to cart
                                        </a>
                                      </div>
                                      <div
                                        className="btn-wishlist"
                                        data-title="Wishlist"
                                      >
                                        <button className="product-btn">
                                          Add to wishlist
                                        </button>
                                      </div>
                                      <div
                                        className="btn-compare"
                                        data-title="Compare"
                                      >
                                        <button className="product-btn">
                                          Compare
                                        </button>
                                      </div>
                                      <span
                                        className="product-quickview"
                                        data-title="Quick View"
                                      >
                                        <a
                                          href="#"
                                          className="quickview quickview-button"
                                        >
                                          Quick View{" "}
                                          <i className="icon-search"></i>
                                        </a>
                                      </span>
                                    </div>
                                  </div>
                                  <div className="products-content">
                                    <div className="contents text-center">
                                      <h3 className="product-title">
                                        <a href="shop-details.html">
                                          Chair Oak Matt Lacquered
                                        </a>
                                      </h3>
                                      <div className="rating">
                                        <div className="star star-0"></div>
                                      </div>
                                      <span className="price">$150.00</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="item-product slick-slide">
                              <div className="items">
                                <div className="products-entry clearfix product-wapper">
                                  <div className="products-thumb">
                                    <div className="product-lable">
                                      <div className="onsale">-33%</div>
                                    </div>
                                    <div className="product-thumb-hover">
                                      <a href="shop-details.html">
                                        <img
                                          width="600"
                                          height="600"
                                          src={greyImage}
                                          className="post-image"
                                          alt=""
                                        />
                                        <img
                                          width="600"
                                          height="600"
                                          src={greyImage}
                                          className="hover-image back"
                                          alt=""
                                        />
                                      </a>
                                    </div>
                                    <div className="product-button">
                                      <div
                                        className="btn-add-to-cart"
                                        data-title="Add to cart"
                                      >
                                        <a
                                          rel="nofollow"
                                          href="#"
                                          className="product-btn button"
                                        >
                                          Add to cart
                                        </a>
                                      </div>
                                      <div
                                        className="btn-wishlist"
                                        data-title="Wishlist"
                                      >
                                        <button className="product-btn">
                                          Add to wishlist
                                        </button>
                                      </div>
                                      <div
                                        className="btn-compare"
                                        data-title="Compare"
                                      >
                                        <button className="product-btn">
                                          Compare
                                        </button>
                                      </div>
                                      <span
                                        className="product-quickview"
                                        data-title="Quick View"
                                      >
                                        <a
                                          href="#"
                                          className="quickview quickview-button"
                                        >
                                          Quick View{" "}
                                          <i className="icon-search"></i>
                                        </a>
                                      </span>
                                    </div>
                                  </div>
                                  <div className="products-content">
                                    <div className="contents text-center">
                                      <h3 className="product-title">
                                        <a href="shop-details.html">
                                          Pillar Dining Table Round
                                        </a>
                                      </h3>
                                      <div className="rating">
                                        <div className="star star-5"></div>
                                      </div>
                                      <span className="price">
                                        <del aria-hidden="true">
                                          <span>$150.00</span>
                                        </del>
                                        <ins>
                                          <span>$100.00</span>
                                        </ins>
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="item-product slick-slide">
                              <div className="items">
                                <div className="products-entry clearfix product-wapper">
                                  <div className="products-thumb">
                                    <div className="product-lable">
                                      <div className="onsale">-7%</div>
                                    </div>
                                    <div className="product-thumb-hover">
                                      <a href="shop-details.html">
                                        <img
                                          width="600"
                                          height="600"
                                          src={greyImage}
                                          className="post-image"
                                          alt=""
                                        />
                                        <img
                                          width="600"
                                          height="600"
                                          src={greyImage}
                                          className="hover-image back"
                                          alt=""
                                        />
                                      </a>
                                    </div>
                                    <div className="product-button">
                                      <div
                                        className="btn-add-to-cart"
                                        data-title="Add to cart"
                                      >
                                        <a
                                          rel="nofollow"
                                          href="#"
                                          className="product-btn button"
                                        >
                                          Add to cart
                                        </a>
                                      </div>
                                      <div
                                        className="btn-wishlist"
                                        data-title="Wishlist"
                                      >
                                        <button className="product-btn">
                                          Add to wishlist
                                        </button>
                                      </div>
                                      <div
                                        className="btn-compare"
                                        data-title="Compare"
                                      >
                                        <button className="product-btn">
                                          Compare
                                        </button>
                                      </div>
                                      <span
                                        className="product-quickview"
                                        data-title="Quick View"
                                      >
                                        <a
                                          href="#"
                                          className="quickview quickview-button"
                                        >
                                          Quick View{" "}
                                          <i className="icon-search"></i>
                                        </a>
                                      </span>
                                    </div>
                                    <div className="product-stock">
                                      <span className="stock">
                                        Out Of Stock
                                      </span>
                                    </div>
                                  </div>
                                  <div className="products-content">
                                    <div className="contents text-center">
                                      <h3 className="product-title">
                                        <a href="shop-details.html">
                                          Amp Pendant Light Large
                                        </a>
                                      </h3>
                                      <div className="rating">
                                        <div className="star star-4"></div>
                                      </div>
                                      <span className="price">
                                        <del aria-hidden="true">
                                          <span>$150.00</span>
                                        </del>
                                        <ins>
                                          <span>$140.00</span>
                                        </ins>
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopDetails;
