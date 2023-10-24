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
    const [cartData, setCartData] = useState();
    const [wishlistData, setWishlistData] = useState();
    const [cartItemsCount, setCartItemsCount] = useState(0);
    const [wishListCount, setWishListCount] = useState(0);
    const [wishListToggle, setWishListToggle] = useState(false);
    const [cartToggle, setCartToggle] = useState(false);


    const showInfoToastMessage = (msg) => {
        toast.info(msg, {
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
                    setWishlistData(datar);
                    // showInfoToastMessage();
                    return datar;
                } else {
                    alert("Fetch error");
                }

            }).catch((error) => console.error("Problem with fetch", error));
        }

    }, []);


    const handleAddRemoveWishlist = (e, product) => {
        e.preventDefault();
        const formData = new FormData();
        console.log(product);
        formData.append('product_id', product?.id);
        formData.append('type', product?.type);


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
                    setWishListCount(data.count);
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
            let foundIndex = null;
            console.log(product);
            foundIndex = currList.Items.findIndex(item => item?.product_id === product?.id && item?.type === product?.type);
            if (foundIndex === -1) {
                const newItem = {
                    product_id: product?.id,
                    product_name: {
                        en: product?.product_name.en
                    },
                    image_path: product?.image_path,
                    product_image: [`${product.product_image?.[0]}`],
                    variant_id: product?.variant_id,
                    stock: product?.stock,
                    price: product?.price,
                    type: product?.type || 'variant',
                    link: product?.type === 'simple_product' ? `/product-details?product_id=${product.id}` : `/product-details?product_id=${product.id}&variant_id=${product?.variant_id}`
                }
                const updatedItems = [...currList.Items, newItem];
                const updatedCount = currList.totalItems + 1;
                showSuccessToastMessage("Item Added in Local WishList");
                return {
                    ...currList,
                    Items: updatedItems,
                    totalItems: updatedCount,
                }
            }
            else {
                const updatingItems = [...currList.Items];
                const updatedItems = updatingItems.filter(item => !(item?.product_id === product?.id && item?.type === product?.type));
                const updatedCount = currList.totalItems - 1;
                showSuccessToastMessage("Item Removed in Local WishList");
                return {
                    ...currList,
                    Items: updatedItems,
                    totalItems: updatedCount,
                }
            }
            // if (product?.type === "simple_product") {
            //     foundIndex = currList.Items.findIndex(item => item?.simple_product?.id === product?.id);
            //     if (foundIndex === -1) {
            //         const newItem = {
            //             simple_product: {
            //                 id: product?.id,
            //                 variant_id: "NA",
            //                 product_name: {
            //                     en: product?.product_name.en
            //                 },
            //                 image_path: product?.image_path,
            //                 product_image: [`${product.product_image?.[0]}`],
            //                 stock: product?.stock,
            //                 price: product?.price,
            //                 type: product?.type
            //             }
            //         };
            //         const updatedItems = [...currList.Items, newItem];
            //         const updatedCount = currList.totalItems + 1;
            //         showSuccessToastMessage("Item Added in Local WishList");
            //         return {
            //             ...currList,
            //             Items: updatedItems,
            //             totalItems: updatedCount,
            //         }
            //     } else {
            //         const updatingItems = [...currList.Items];
            //         const updatedItems = updatingItems.filter(item => item?.simple_product?.id !== product?.id);
            //         const updatedCount = currList.totalItems - 1;
            //         showSuccessToastMessage("Item Removed in Local WishList");
            //         return {
            //             ...currList,
            //             Items: updatedItems,
            //             totalItems: updatedCount,
            //         }
            //     }
            // } else {
            //     foundIndex = currList.Items.findIndex(item => item?.variant?.id === product?.id);
            //     if (foundIndex === -1) {
            //         const newItem = {
            //             variant: {
            //                 id: product?.id,
            //                 variant_id: product?.variant_id,
            //                 product_name: {
            //                     en: product?.product_name?.en
            //                 },
            //                 image_path: product?.image_path,
            //                 product_image: [`${product.product_image?.[0]}`],
            //                 stock: product?.stock,
            //                 price: product?.price,
            //                 type: "variant_product"
            //             }
            //         };
            //         const updatedItems = [...currList.Items, newItem];
            //         const updatedCount = currList.totalItems + 1;
            //         showSuccessToastMessage("Item Added in Local WishList");
            //         return {
            //             ...currList,
            //             Items: updatedItems,
            //             totalItems: updatedCount,
            //         }
            //     } else {
            //         const updatingItems = [...currList.Items];
            //         const updatedItems = updatingItems.filter(item => item?.variant?.id !== product?.id);
            //         const updatedCount = currList.totalItems - 1;
            //         showSuccessToastMessage("Item Removed in Local WishList");
            //         return {
            //             ...currList,
            //             Items: updatedItems,
            //             totalItems: updatedCount,
            //         }
            //     }
            // }
        });
    }
    useEffect(() => {
        setWishListCount(wishListItems.totalItems);
        setWishListToggle(prev => !prev);
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



    const AddToCart = (product, amt) => {
        const formData = {
            quantity: amt,
            product_id: product?.id,
            type: product?.type,
            variant_id: product?.variant_id
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
                    setCartItemsCount(data.count);
                    // setCartToggle(prev => !prev); 
                    showSuccessToastMessage(data.message);
                })
                .catch((error) => {
                    console.error("Error:", error);
                });
        } else {
            increaseItemInLocalCart(amt, product);
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
            const foundIndex = currCart.Items.findIndex(item => item?.product_id === product.id && item?.type === product.type);
            if (foundIndex === -1) {
                // If the item doesn't exist in the cart, add it.
                // const newItem = { quantity: `${amt}`, product_id: `${id}`, type: type };
                // const newItem = {
                //     qty: amt,
                //     simple_product: {
                //         id: product?.id,
                //         price: product?.price,
                //         image_path: product?.image_path,
                //         product_image: [`${product?.product_image[0]}`],
                //         product_name: { en: product?.product_name?.en },
                //     }
                // };
                const newItem = {
                    qty: amt,
                    product_id: product.id,
                    variant_id: product?.variant_id,
                    price: product.price,
                    image_path: product.image_path,
                    product_name: { en: product.product_name.en },
                    product_image: product.product_image[0],
                    type: product?.type,
                    link: product?.type === 'simple_product' ? `/product-details?product_id=${product.id}` : `/product-details?product_id=${product.id}&variant_id=${product?.variant_id}`
                }
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
                setCartData(datar);
                setCartItemsCount(datar.data.reduce((accumalator, item) => {
                    return accumalator + parseInt(item.qty);
                }, 0));
                // showInfoToastMessage();
                return datar;

            }).catch((error) => console.error("Problem with fetch", error));
        }
    }, []);

    useEffect(() => {
        setCartItemsCount(cartItems?.totalItems);
    }, [cartItems])

    const removeFromLocalCart = (product) => {
        // If the item exists, update its quantity.
        setCartItems(currCart => {
            const foundIndex = currCart.Items.findIndex(item => item.product_id === product.id && item.type === product.type);
            if (foundIndex !== -1) {
                const updatingItems = [...currCart.Items];
                console.log(updatingItems)
                const updatedItems = updatingItems.filter(item => !(item.product_id === product.id && item.type === product.type));
                console.log(updatedItems)

                const amt = updatingItems[foundIndex].qty;
                const updatedCount = currCart.totalItems - amt;
                showSuccessToastMessage("Item Removed in Local Cart");
                console.log(updatedItems);
                return {
                    ...currCart,
                    Items: updatedItems,
                    totalItems: updatedCount,
                }
            }
        });


    }



    return (
        <ShoppingCartContext.Provider value={{
            handleAddRemoveWishlist,
            increaseDecreaseItemInLocalWishlist,
            increaseItemInLocalCart,
            wishListCount,
            cartItemsCount,
            setCartItemsCount,
            setWishListCount,
            setCartToggle,
            wishListToggle,
            setWishListCount,
            AddToCart,
            showSuccessToastMessage,
            showInfoToastMessage,
            AddToCart2,
            addToWishlist2,
            removeFromLocalCart,
            cartData,
            wishlistData
        }}>
            {children}
            <ToastContainer />
        </ShoppingCartContext.Provider>
    );
}