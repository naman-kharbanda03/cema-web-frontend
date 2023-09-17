import React from "react";
import PageTitle from "../../components/page-tittle/PageTitle";

import P613 from "../../asset/images/product/6-13.png";
import P611 from "../../asset/images/product/6-11.png";
import P64 from "../../asset/images/product/6-4.png";
import P66 from "../../asset/images/product/6-6.png";
import P67 from "../../asset/images/product/6-7.png";
import P68 from "../../asset/images/product/6-8.png";
import P69 from "../../asset/images/product/6-9.png";
import P610 from "../../asset/images/product/6-10.png";
import P615 from "../../asset/images/product/6-15.png";




const Listing = () => {
  return (
        <>
            <div id="site-main" class="site-main">
				<div id="main-content" class="main-content">
					<div id="primary" class="content-area">

                        {/* Page Info */}
                        <PageTitle current={"Bed & Bath"} />
                        {/* Page Content  */}
						<div id="content" class="site-content" role="main">
							<div class="section-padding">
								<div class="section-container p-l-r">
									<div class="row">
										<div class="col-xl-3 col-lg-3 col-md-12 col-12 sidebar left-sidebar md-b-50">
											<div class="block block-product-cats">
												<div class="block-title"><h2>Categories</h2></div>
												<div class="block-content">
													<div class="product-cats-list">
														<ul>
															<li class="current">
																<a href="shop-grid-left.html">Bed &amp; Bath <span class="count">9</span></a>
															</li>
															<li>
																<a href="shop-grid-left.html">Furniture <span class="count">4</span></a>
															</li>
															<li>
																<a href="shop-grid-left.html">Home Décor <span class="count">3</span></a>
															</li>
															<li>
																<a href="shop-grid-left.html">Lighting <span class="count">6</span></a>
															</li>
															<li>
																<a href="shop-grid-left.html">Office <span class="count">2</span></a>
															</li>
															<li>
																<a href="shop-grid-left.html">Outdoor <span class="count">4</span></a>
															</li>
														</ul>
													</div>
												</div>
											</div>

											<div class="block block-product-filter">
												<div class="block-title"><h2>Price</h2></div>
												<div class="block-content">
													<div id="slider-range" class="price-filter-wrap">
														<div class="filter-item price-filter">
															<div class="layout-slider">
																<input id="price-filter" name="price" value="0;100" style={{display: 'none'}}/>
                                                                    <span class="jslider jslider_plastic">
                                                                        <table>
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td>
                                                                                        <div class="jslider-bg">
                                                                                            <i class="l"></i>
                                                                                            <i class="f"></i>
                                                                                            <i class="r"></i>
                                                                                            <i class="v" style={{left: '0%' , width: '100%' }}></i>
                                                                                        </div>
                                                                                        <div class="jslider-pointer" style={{left: '0%'}}>
                                                                                        </div>
                                                                                        <div class="jslider-pointer jslider-pointer-to" style={{left: '100%'}}>
                                                                                        </div>
                                                                                        <div class="jslider-label" style={{display: 'none'}}><span>0</span>
                                                                                        </div>
                                                                                        <div class="jslider-label jslider-label-to" style={{display: 'none'}}>
                                                                                            <span>100</span>&nbsp;KD
                                                                                        </div>
                                                                                        <div class="jslider-value" style={{left: '0%', marginLeft: '0px', right: 'auto', visibility: 'visible'}}>
                                                                                            <span>0</span>&nbsp;KD
                                                                                        </div>
                                                                                        <div class="jslider-value jslider-value-to" style={{visibility: 'visible', left: 'auto', marginLeft: '0px', right: '0px'}}>
                                                                                            <span>100</span>&nbsp;KD
                                                                                        </div>
                                                                                        <div class="jslider-scale">
                                                                                        </div>
                                                                                    </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </span>
															</div>
															<div class="layout-slider-settings"></div>
														</div>
													</div>
												</div>
											</div>

											<div class="block block-product-filter clearfix">
												<div class="block-title"><h2>Size</h2></div>
												<div class="block-content">
													<ul class="filter-items text">
														<li><span>L</span></li>
														<li><span>M</span></li>
														<li><span>S</span></li>
													</ul>
												</div>
											</div>

									

										</div>

										<div class="col-xl-9 col-lg-9 col-md-12 col-12">
											<div class="products-topbar clearfix">
												<div class="products-topbar-left">
													<div class="products-count">
														Showing all 21 results
													</div>
												</div>
												<div class="products-topbar-right">
													<div class="products-sort dropdown">
														<span class="sort-toggle dropdown-toggle" data-toggle="dropdown" aria-expanded="true">Default sorting</span>
														<ul class="sort-list dropdown-menu" x-placement="bottom-start">
															<li class="active"><a href="#">Default sorting</a></li>
															<li><a href="#">Sort by popularity</a></li>
															<li><a href="#">Sort by average rating</a></li>
															<li><a href="#">Sort by latest</a></li>
															<li><a href="#">Sort by price: low to high</a></li>
															<li><a href="#">Sort by price: high to low</a></li>
														</ul>
													</div>
												
												</div>
											</div>

											<div class="tab-content">
												<div class="tab-pane fade show active" id="layout-grid" role="tabpanel">
													<div class="products-list grid">
														<div class="row">
													

                              <div class="col-xl-4 col-lg-4 col-md-4 col-sm-6">
                                <div class="items">
                                  <div class="products-entry clearfix product-wapper">
                                    <div class="products-thumb">
                                      <div class="product-lable">
                                        <div class="hot">Hot</div>
                                      </div>
                                      <div class="product-thumb-hover">
                                        <a href="details.html">
                                          <img width="600" height="600" src={P613} class="hover-image back" alt="" />
                                        </a>
                                      </div>
                                      <div class="product-button">
                                        <div class="btn-add-to-cart" data-title="Add to cart">
                                          <a rel="nofollow" href="#" class="product-btn button">Add to cart</a>
                                        </div>
                                        <div class="btn-wishlist" data-title="Wishlist">
                                          <button class="product-btn">Add to wishlist</button>
                                        </div>
                                      </div>
                                    </div>
                                    <div class="products-content">
                                      <div class="contents text-center">
                                        <h3 class="product-title"><a href="details.html">Dining Table</a></h3>
                                        <span class="price">KD150.00</span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div class="col-xl-4 col-lg-4 col-md-4 col-sm-6">
                                <div class="items">
                                  <div class="products-entry clearfix product-wapper">
                                    <div class="products-thumb">
                                      <div class="product-lable">
                                        <div class="hot">Hot</div>
                                      </div>
                                      <div class="product-thumb-hover">
                                        <a href="details.html">
                                          <img width="600" height="600" src={P611} class="hover-image back" alt="" />
                                        </a>
                                      </div>
                                      <div class="product-button">
                                        <div class="btn-add-to-cart" data-title="Add to cart">
                                          <a rel="nofollow" href="#" class="product-btn button">Add to cart</a>
                                        </div>
                                        <div class="btn-wishlist" data-title="Wishlist">
                                          <button class="product-btn">Add to wishlist</button>
                                        </div>
                                      </div>
                                    </div>
                                    <div class="products-content">
                                      <div class="contents text-center">
                                        <h3 class="product-title"><a href="details.html">Dining Table</a></h3>
                                        <span class="price">KD150.00</span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div class="col-xl-4 col-lg-4 col-md-4 col-sm-6">
                                <div class="items">
                                  <div class="products-entry clearfix product-wapper">
                                    <div class="products-thumb">
                                      <div class="product-lable">
                                        <div class="onsale">-33%</div>
                                      </div>
                                      <div class="product-thumb-hover">
                                        <a href="details.html">
                                          <img width="600" height="600" src={P64} class="hover-image back" alt="" />
                                        </a>
                                      </div>
                                      <div class="product-button">
                                        <div class="btn-add-to-cart" data-title="Add to cart">
                                          <a rel="nofollow" href="#" class="product-btn button">Add to cart</a>
                                        </div>
                                        <div class="btn-wishlist" data-title="Wishlist">
                                          <button class="product-btn">Add to wishlist</button>
                                        </div>
                                      </div>
                                    </div>
                                    <div class="products-content">
                                      <div class="contents text-center">
                                        <h3 class="product-title"><a href="details.html">Dining Table</a></h3>
                                        <span class="price">KD150.00</span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div class="col-xl-4 col-lg-4 col-md-4 col-sm-6">
                                <div class="items">
                                  <div class="products-entry clearfix product-wapper">
                                    <div class="products-thumb">
                                      <div class="product-thumb-hover">
                                        <a href="details.html">
                                          <img width="600" height="600" src={P66} class="hover-image back" alt="" />
                                        </a>
                                      </div>
                                      <div class="product-button">
                                        <div class="btn-add-to-cart" data-title="Add to cart">
                                          <a rel="nofollow" href="#" class="product-btn button">Add to cart</a>
                                        </div>
                                        <div class="btn-wishlist" data-title="Wishlist">
                                          <button class="product-btn">Add to wishlist</button>
                                        </div>
                                      </div>
                                    </div>
                                    <div class="products-content">
                                      <div class="contents text-center">
                                        <h3 class="product-title"><a href="details.html">Dining Table</a></h3>
                                        <span class="price">KD150.00</span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div class="col-xl-4 col-lg-4 col-md-4 col-sm-6">
                                <div class="items">
                                  <div class="products-entry clearfix product-wapper">
                                    <div class="products-thumb">
                                      <div class="product-lable">
                                        <div class="onsale">-23%</div>
                                        <div class="hot">Hot</div>
                                      </div>
                                      <div class="product-thumb-hover">
                                        <a href="details.html">
                                          <img width="600" height="600" src={P67} class="hover-image back" alt="" />
                                        </a>
                                      </div>
                                      <div class="product-button">
                                        <div class="btn-add-to-cart" data-title="Add to cart">
                                          <a rel="nofollow" href="#" class="product-btn button">Add to cart</a>
                                        </div>
                                        <div class="btn-wishlist" data-title="Wishlist">
                                          <button class="product-btn">Add to wishlist</button>
                                        </div>
                                      </div>
                                    </div>
                                    <div class="products-content">
                                      <div class="contents text-center">
                                        <h3 class="product-title"><a href="details.html">Dining Table</a></h3>
                                        <span class="price">KD150.00</span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
  
                              <div class="col-xl-4 col-lg-4 col-md-4 col-sm-6">
                                <div class="items">
                                  <div class="products-entry clearfix product-wapper">
                                    <div class="products-thumb">
                                      <div class="product-lable">
                                        <div class="hot">Hot</div>
                                      </div>
                                      <div class="product-thumb-hover">
                                        <a href="details.html">
                                          <img width="600" height="600" src={P68} class="hover-image back" alt="" />
                                        </a>
                                      </div>
                                      <div class="product-button">
                                        <div class="btn-add-to-cart" data-title="Add to cart">
                                          <a rel="nofollow" href="#" class="product-btn button">Add to cart</a>
                                        </div>
                                        <div class="btn-wishlist" data-title="Wishlist">
                                          <button class="product-btn">Add to wishlist</button>
                                        </div>
                                      </div>
                                    </div>
                                    <div class="products-content">
                                      <div class="contents text-center">
                                        <h3 class="product-title"><a href="details.html">Dining Table</a></h3>
                                        <span class="price">KD150.00</span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div class="col-xl-4 col-lg-4 col-md-4 col-sm-6">
                                <div class="items">
                                  <div class="products-entry clearfix product-wapper">
                                    <div class="products-thumb">
                                      <div class="product-thumb-hover">
                                        <a href="details.html">
                                          <img width="600" height="600" src={P69} class="hover-image back" alt="" />
                                        </a>
                                      </div>
                                      <div class="product-button">
                                        <div class="btn-add-to-cart" data-title="Add to cart">
                                          <a rel="nofollow" href="#" class="product-btn button">Add to cart</a>
                                        </div>
                                        <div class="btn-wishlist" data-title="Wishlist">
                                          <button class="product-btn">Add to wishlist</button>
                                        </div>
                                      </div>
                                    </div>
                                    <div class="products-content">
                                      <div class="contents text-center">
                                        <h3 class="product-title"><a href="details.html">Dining Table</a></h3>
                                        <span class="price">KD150.00</span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div class="col-xl-4 col-lg-4 col-md-4 col-sm-6">
                                <div class="items">
                                  <div class="products-entry clearfix product-wapper">
                                    <div class="products-thumb">
                                      <div class="product-thumb-hover">
                                        <a href="details.html">
                                          <img width="600" height="600" src={P610} class="hover-image back" alt="" />
                                        </a>
                                      </div>
                                      <div class="product-button">
                                        <div class="btn-add-to-cart" data-title="Add to cart">
                                          <a rel="nofollow" href="#" class="product-btn button">Add to cart</a>
                                        </div>
                                        <div class="btn-wishlist" data-title="Wishlist">
                                          <button class="product-btn">Add to wishlist</button>
                                        </div>
                                      </div>
                                    </div>
                                    <div class="products-content">
                                      <div class="contents text-center">
                                        <h3 class="product-title"><a href="details.html">Dining Table</a></h3>
                                        <span class="price">KD150.00</span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div class="col-xl-4 col-lg-4 col-md-4 col-sm-6">
                                <div class="items">
                                  <div class="products-entry clearfix product-wapper">
                                    <div class="products-thumb">
                                      <div class="product-thumb-hover">
                                        <a href="details.html">
                                          <img width="600" height="600" src={P615} class="hover-image back" alt="" />
                                        </a>
                                      </div>
                                      <div class="product-button">
                                        <div class="btn-add-to-cart" data-title="Add to cart">
                                          <a rel="nofollow" href="#" class="product-btn button">Add to cart</a>
                                        </div>
                                        <div class="btn-wishlist" data-title="Wishlist">
                                          <button class="product-btn">Add to wishlist</button>
                                        </div>
                                      </div>
                                    </div>
                                    <div class="products-content">
                                      <div class="contents text-center">
                                        <h3 class="product-title"><a href="details.html">Dining Table</a></h3>
                                        <span class="price">KD150.00</span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
													
														</div>
													</div>
												</div>
											
											</div>

											<nav class="pagination">
												<ul class="page-numbers">
													<li><a class="prev page-numbers" href="#">Previous</a></li>
													<li><span aria-current="page" class="page-numbers current">1</span></li>
													<li><a class="page-numbers" href="#">2</a></li>
													<li><a class="page-numbers" href="#">3</a></li>
													<li><a class="next page-numbers" href="#">Next</a></li>
												</ul>
											</nav>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
            
        </>
  );
};

export default Listing;