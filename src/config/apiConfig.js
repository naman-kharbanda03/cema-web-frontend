import BaseComponent from "bootstrap/js/dist/base-component";

// const BASE_URL = "https://cema-backend.plasium.com";
const BASE_URL = "https://www.demo609.amrithaa.com/backend-cema/public";
const secretKey = "1dc7843e-e42c-4154-a02d-d80ab6d81095";

const apiConfig = {
  categoryListAPI: `${BASE_URL}/api/categories?secret=${secretKey}`,
  categoryDetailsAPI: `${BASE_URL}/api/category`,
  productListAPI: `${BASE_URL}/api/products?per_page=10&page=1`,
  productDetailsAPI: `${BASE_URL}/api/products`,
  brandsAPI: `${BASE_URL}/api/brands`,
  wishListAPI: `${BASE_URL}/api/get_wishlist`,
  addRemoveWishlistAPI: `${BASE_URL}/api/add_remove_wishlist`,
  getOrderAPI: `${BASE_URL}/api/orders`,
  getAddressAPI: `${BASE_URL}/api/manageaddress`,
  getBillingAddressAPI: `${BASE_URL}/api/billing-address`,
  createUpdateShipAddress: `${BASE_URL}/api/create-address`,
  createUpdateBillAddress: `${BASE_URL}/api/create-billing-address`,
  updateProfileAPI: `${BASE_URL}/api/update/profile`,
  getUserApi: `${BASE_URL}/api/myprofile`,
  secretKey: secretKey,

  orderDetailsAPI: `${BASE_URL}/api/orders/2`,
  returnReasonsAPI: `${BASE_URL}/api/returnReason`,
  returnOrderAPI: `${BASE_URL}/api/returnOrders`,

  applyCouponAPI: `${BASE_URL}/api/apply-coupan`,
  getCartDataAPI: `${BASE_URL}/api/getCartData`,
  addToCartAPI: `${BASE_URL}/api/addToCart`,
  addToCartArrayAPI: `${BASE_URL}/api/addToCartArray`,
  loginAPI: `${BASE_URL}/api/login`,
  registerAPI: `${BASE_URL}/api/register`,
  removeFromCartAPI: `${BASE_URL}/api/removeFromCart`,
  removeCoupanAPI: `${BASE_URL}/api/remove-coupan`,
  updateCartAPI: `${BASE_URL}/api/updateCartQuantity`,
  addToWishlistArrayAPI: `${BASE_URL}/api/add_remove_wishlist_array`,

  listingAPI: `${BASE_URL}/api/products`,
  slidersAPI: `${BASE_URL}/api/getSlider`,
  changePassword: `${BASE_URL}/api/password/change`,

  // top-menu
  topMenu: `${BASE_URL}/api/topmenus`,
  homeSecondCategory: `${BASE_URL}/api/homeSecondcategories`,
  homeFirstCategory: `${BASE_URL}/api/homeFirstcategories`,

  //rating
  addProductReview: `${BASE_URL}/api/add_review`,

  navCategoriesAPI: `${BASE_URL}/api/navCategories`,
  createBillingAddress: `${BASE_URL}/api/create-billing-address`,
  getBillingAdddress: `${BASE_URL}/api/billing-address`,
  checkoutAPI: `${BASE_URL}/api/checkout`,
  createAddressAPI: `${BASE_URL}/api/create-address`,
  getAddressAPI: `${BASE_URL}/api/manageaddress`,
  getCountryStateAPI: `${BASE_URL}/api/states/101?secret=1dc7843e-e42c-4154-a02d-d80ab6d81095`,
  getCountriesAPI: `${BASE_URL}/api/countries?secret=1dc7843e-e42c-4154-a02d-d80ab6d81095`,
  getCitiesAPI: `${BASE_URL}/api/city`,
  getStatesAPI: `${BASE_URL}/api/states`,

  getSocialLinks: `${BASE_URL}/api/footerSocialLinks`,
  getFooterLinks: `${BASE_URL}/api/footerlinks`,

  createOTPAPI: `${BASE_URL}/api/password/create`,
  verifyOTP: `${BASE_URL}/api/password/verify_otp`,
  resetPassword: `${BASE_URL}/api/password/reset`,
};

export default apiConfig;
