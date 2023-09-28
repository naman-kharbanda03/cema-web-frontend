const BASE_URL = "https://cema-backend.plasium.com";
const secretKey = "1dc7843e-e42c-4154-a02d-d80ab6d81095";

const apiConfig = {
  categoryListAPI: `${BASE_URL}/api/categories?secret=${secretKey}`,
  productsListAPI: `${BASE_URL}/api/category/1?secret=${secretKey}&currency=INR`,
};

export default apiConfig;
