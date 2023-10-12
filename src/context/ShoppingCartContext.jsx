import React, { createContext, useContext, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import apiConfig from "../config/apiConfig";
import useLocalStorage from "../hooks/useLocalStorage";

const ShoppingCartContext = createContext({});

export function useShoppingCart() {
    return useContext(ShoppingCartContext);
}

export const ShoppingCartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useLocalStorage('cart', {
        Items: [],
        totalItems: 0
    });
    const [wishListItems, setWishListItems] = useLocalStorage('wishlist', {
        Items: [],
        totalItems: 0
    });
    const [cartItemsCount, setCartItemsCount] = useState(0);
    const [wishListCount, setWishListCount] = useState(0);
    const [wishListToggle, setWishListToggle] = useState(false);
    const [cartToggle, setCartToggle] = useState(false);


    const showInfoToastMessage = () => {
        toast.info("Invalid Coupon code !", {
            position: toast.POSITION.BOTTOM_LEFT,
        });
    };

    const showSuccessToastMessage = (msg) => {
        toast.success(msg, {
            position: toast.POSITION.BOTTOM_LEFT,
        });
    };

    const getQuantity = (id) => {
        return cartItems.find(item => item.Uid === id)?.quantity || 0;
    }



    useEffect(() => {
        const apiUrl = apiConfig.wishListAPI;
        const token = localStorage.getItem('accessToken');
        if (token) {
            fetch(apiUrl, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    // Add other headers as needed
                },
            }).then((response) => {
                if (!response.ok) throw new Error("Network Issue");
                return response.json();
            }).then((datar) => {
                if (datar.success) {
                    console.log(datar);
                    setWishListCount(datar.count);
                    // showInfoToastMessage();
                    return datar;
                } else {
                    alert("Fetch error");
                }

            }).catch((error) => console.error("Problem with fetch", error));
        }

    }, [wishListToggle]);


    const handleAddRemoveWishlist = (e, product) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('product_id', product?.id);

        const apiURl = apiConfig.addRemoveWishlistAPI;
        const token = localStorage.getItem('accessToken');
        if (token) {
            fetch(apiURl, {
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${token}`,
                    // "Content-Type": "application/json",
                    // Add any other headers your API requires
                },
                body: formData,
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    setWishListToggle(prev => !prev);
                    showSuccessToastMessage(data.msg);
                    return data;
                })
                .catch((error) => {
                    console.error("Error:", error);
                });
        } else {
            increaseDecreaseItemInLocalWishlist(product);
        }

    }
    const increaseDecreaseItemInLocalWishlist = (product) => {
        setWishListItems(currList => {
            const foundIndex = currList.Items.findIndex(item => item?.simple_product?.id === product?.id);
            if (foundIndex === -1) {
                // If the item doesn't exist in the cart, add it.
                // const newItem = product;
                const newItem = {
                    simple_product: {
                        id: product?.id,
                        product_name: {
                            en: product?.product_name.en
                        },
                        image_path: product?.image_path,
                        product_image: [`${product.product_image[0]}`]
                    }
                };

                const updatedItems = [...currList.Items, newItem];
                const updatedCount = currList.totalItems + 1;
                showSuccessToastMessage("Item Added in Local WishList");
                return {
                    ...currList,
                    Items: updatedItems,
                    totalItems: updatedCount,
                }
            } else {
                // If the item exists, update its quantity.
                const updatingItems = [...currList.Items];
                const updatedItems = updatingItems.filter(item => item.simple_product.id !== product?.id);
                const updatedCount = currList.totalItems - 1;
                showSuccessToastMessage("Item Removed in Local WishList");
                return {
                    ...currList,
                    Items: updatedItems,
                    totalItems: updatedCount,
                }
            }
        });
    }
    useEffect(() => {
        setWishListCount(wishListItems.totalItems);
    }, [wishListItems])

    const addToWishlist2 = (wishlist) => {
        const bearerToken = localStorage.getItem('accessToken');
        // const product_ids = [...wishlist.Items];
        // const wishListItems = wishlist.Items;
        const product_ids = wishlist.Items.map(item => item.simple_product.id);
        if (bearerToken && wishlist.totalItems > 0) {
            const apiUrl = apiConfig.addToWishlistArrayAPI;
            var raw = JSON.stringify({
                "product_ids": product_ids
            });
            var request = {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${bearerToken}`
                },
                body: raw,
                redirect: 'follow'
            }
            fetch(apiUrl, request)
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    setWishListToggle(prev => !prev);
                });
        } else {
            setWishListToggle(prev => !prev);
        }
    }

    const AddToCart = (product) => {
        const formData = {
            quantity: 1,
            product_id: product?.id,
            type: product?.type,
            price: product?.actual_selling_price,
            offerprice: product?.actual_offer_price,
        };
        const bearerToken = localStorage.getItem("accessToken");

        if (bearerToken) {
            const apiUrl = apiConfig.addToCartAPI;
            fetch(apiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${bearerToken}`,
                },
                body: JSON.stringify(formData),
            }).then((response) => response.json())
                .then((data) => {
                    console.log("Response:", data);
                    setCartToggle(prev => !prev); showSuccessToastMessage(data.message);
                })
                .catch((error) => {
                    console.error("Error:", error);
                });
        } else {
            increaseItemInLocalCart(1, product);
        }
    }

    const AddToCart2 = (cart) => {
        // const products = [...cart.Items];
        const bearerToken = localStorage.getItem('accessToken');

        const products = cart.Items.map(item => ({
            quantity: `${item.qty}`,
            type: "simple_product",
            product_id: `${item.simple_product.id}`
        }));
        if (bearerToken && cart.totalItems > 0) {
            const apiUrl = apiConfig.addToCartArrayAPI;
            var raw = JSON.stringify({
                "carts": products
            });
            var request = {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${bearerToken}`
                },
                body: raw,
                redirect: 'follow'
            }
            fetch(apiUrl, request)
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    setCartToggle(prev => !prev);
                });
        } else {
            console.log(111111);
            setCartToggle(prev => !prev);
        }
    }

    const increaseItemInLocalCart = (amt, product) => {
        setCartItems(currCart => {
            const foundIndex = currCart.Items.findIndex(item => item?.simple_product?.id === product.id);
            if (foundIndex === -1) {
                // If the item doesn't exist in the cart, add it.
                // const newItem = { quantity: `${amt}`, product_id: `${id}`, type: type };
                const newItem = {
                    qty: 1,
                    simple_product: {
                        id: product?.id,
                        actual_selling_price: product?.price,
                        image_path: product?.image_path,
                        product_image: [`${product?.product_image[0]}`],
                        product_name: { en: product?.product_name?.en }
                    }
                };
                const updatedItems = [...currCart.Items, newItem];
                const updatedCount = currCart.totalItems + 1;
                return {
                    ...currCart,
                    Items: updatedItems,
                    totalItems: updatedCount,
                }
            } else {
                // If the item exists, update its quantity.

                const updatingItems = [...currCart.Items];
                // const previousQuantity = parseInt(updatingItems[foundIndex].quantity, 10);
                // updatingItems[foundIndex].quantity = `${previousQuantity + amt}`;
                updatingItems[foundIndex].qty += amt;
                const updatedCount = currCart.totalItems + amt;
                return {
                    ...currCart,
                    Items: updatingItems,
                    totalItems: updatedCount,
                }
            }
        });
        showSuccessToastMessage("Item Added in Local Cart");
    };

    useEffect(() => {
        const apiUrl = apiConfig.getCartDataAPI;
        const bearerToken = localStorage.getItem('accessToken');

        if (bearerToken) {
            fetch(apiUrl, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${bearerToken}`,
                    // Add other headers as needed
                },
            }).then((response) => {
                if (!response.ok) throw new Error("Network Issue");
                return response.json();
            }).then((datar) => {
                console.log("Cart Data", datar);
                setCartItemsCount(datar.data.reduce((accumalator, item) => {
                    return accumalator + parseInt(item.qty);
                }, 0));
                // showInfoToastMessage();
                return datar;

            }).catch((error) => console.error("Problem with fetch", error));
        }
    }, [cartToggle]);

    useEffect(() => {
        setCartItemsCount(cartItems.totalItems);
    }, [cartItems])



    return (
        <ShoppingCartContext.Provider value={{
            handleAddRemoveWishlist,
            wishListCount,
            cartItemsCount,
            setCartToggle,
            setWishListToggle,
            setWishListCount,
            AddToCart,
            showSuccessToastMessage,
            showInfoToastMessage,
            AddToCart2,
            addToWishlist2,
        }}>
            {children}
            <ToastContainer />
        </ShoppingCartContext.Provider>
    );
}