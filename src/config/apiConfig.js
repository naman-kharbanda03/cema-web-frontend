const BASE_URL = "https://cema-backend.plasium.com";
const secretKey = "1dc7843e-e42c-4154-a02d-d80ab6d81095";

const apiConfig = {
  categoryListAPI: `${BASE_URL}/api/categories?secret=${secretKey}`,
  categoryDetailsAPI: `${BASE_URL}/api/category/1?secret=${secretKey}&currency=INR`,
  productListAPI: `${BASE_URL}/api/products?per_page=10&page=1`,
  brandsAPI: `${BASE_URL}/api/brands`,
  wishListAPI: `${BASE_URL}/api/get_wishlist`,
  addRemoveWishlistAPI: `${BASE_URL}/api/add_remove_wishlist`,
  getOrderAPI: `${BASE_URL}/api/orders`,
  getAddressAPI: `${BASE_URL}/api/manageaddress`,
  getBillingAddressAPI: `${BASE_URL}/api/billing-address`,
  updateProfileAPI: `${BASE_URL}/api/update/profile`,
  getUserApi: `${BASE_URL}/api/myprofile`,
  secretKey: secretKey,
};

export default apiConfig;
