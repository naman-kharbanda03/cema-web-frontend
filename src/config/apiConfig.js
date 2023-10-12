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
  updateProfileAPI: `${BASE_URL}/api/update/profile`,
  getUserApi: `${BASE_URL}/api/myprofile`,
  secretKey: secretKey,
  orderDetailsAPI: `${BASE_URL}/api/orders/2`,
  applyCouponAPI: `${BASE_URL}/api/apply-coupan`,
  getCartDataAPI: `${BASE_URL}/api/getCartData`,
  addToCartAPI: `${BASE_URL}/api/addToCart`,
  addToCartArrayAPI: `${BASE_URL}/api/addToCartArray`,
  loginAPI: `${BASE_URL}/api/login`,
  removeFromCartAPI: `${BASE_URL}/api/removeFromCart`,
  updateCartAPI: `${BASE_URL}/api/updateCartQuantity`,
  addToWishlistArrayAPI: `${BASE_URL}/api/add_remove_wishlist_array`,
};

export default apiConfig;
