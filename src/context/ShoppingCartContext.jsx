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

    // const [loading, setLoading] = useState(true);


    const showInfoToastMessage = (msg) => {
        toast.info(<div >
            <span>{`${msg}`}</span>
        </div>, {
            position: toast.POSITION.BOTTOM_LEFT,
        });
    };

    const showSuccessToastMessage = (msg) => {
        toast.success(msg, {
            position: toast.POSITION.BOTTOM_LEFT,
        });
    };




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
                    // console.log(datar);
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


    const handleAddRemoveWishlist = async (e, product) => {
        e.preventDefault();
        const formData = new FormData();
        console.log(product);
        formData.append('product_id', product?.id);

        if (product?.type === 'simple_product') {
            formData.append('type', 'simple');
            formData.append('product_id', product?.id);
        }

        else {
            formData.append('type', 'variant');
            formData.append('product_id', product?.variant_id);
        }

        const apiURl = apiConfig.addRemoveWishlistAPI;
        const token = localStorage.getItem('accessToken');
        if (token) {
            return fetch(apiURl, {
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
                    // showSuccessToastMessage(data.msg);
                    return {
                        result: true,
                        message: data.msg
                    };
                })
                .catch((error) => {
                    console.error("Error:", error);
                    return {
                        result: true,
                        message: 'Operation failed'
                    };
                });
        } else {
            return increaseDecreaseItemInLocalWishlist(product);
        }

    }
    const increaseDecreaseItemInLocalWishlist = async (product) => {
        return new Promise((res, rej) => {
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
                    res({
                        result: true,
                        message: 'Item added in wishList'
                    });
                    // showSuccessToastMessage("Item Added in WishList");
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
                    // showSuccessToastMessage("Item Removed in WishList");
                    res({
                        result: true,
                        message: 'Item removed in wishList'
                    });
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
        })

    }
    useEffect(() => {
        setWishListCount(wishListItems.totalItems);
        setWishListToggle(prev => !prev);
    }, [wishListItems])

    const addToWishlist2 = (wishlist) => {
        const bearerToken = localStorage.getItem('accessToken');
        // const product_ids = [...wishlist.Items];
        // const wishListItems = wishlist.Items;
        const products = wishlist.Items.map(item => {
            if (item.type === 'simple_product')
                return {
                    type: 'simple',
                    product_id: `${item.product_id}`
                }
            else return {
                type: 'variant',
                product_id: `${item.variant_id}`,
            }
        });
        // const product_ids = wishlist.Items.map(item => item.simple_product.id);
        if (bearerToken && wishlist.totalItems > 0) {
            const apiUrl = apiConfig.addToWishlistArrayAPI;
            var raw = JSON.stringify({
                "products": products
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



    const AddToCart = async (product, amt) => {
        const formData = {
            quantity: amt,
            product_id: product?.id,
            type: product?.type,
            variant_id: product?.variant_id
        };
        const bearerToken = localStorage.getItem("accessToken");
        console.log(formData);
        if (bearerToken) {
            const apiUrl = apiConfig.addToCartAPI;
            return fetch(apiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${bearerToken}`,
                },
                body: JSON.stringify(formData),
            }).then((response) => { return response.json() })
                .then((data) => {
                    console.log("Response:", data);
                    if (data.success === true) {
                        setCartItemsCount(data.count_product);
                        // showSuccessToastMessage(data.message);
                        return {
                            result: true,
                            message: data.message
                        };
                    } else {
                        // showInfoToastMessage(data.message);
                        // return false;
                        return {
                            result: false,
                            message: data.message
                        };
                    }
                })
                .catch((error) => {
                    console.error("Error:", error);
                    return false
                });
        } else {
            return increaseItemInLocalCart(amt, product);
        }
    }

    const AddToCart2 = (cart) => {
        // const products = [...cart.Items];
        const bearerToken = localStorage.getItem('accessToken');

        const products = cart.Items.map(item => {
            if (item.type === 'simple_product')
                return {
                    quantity: `${item.qty}`,
                    type: 'simple_product',
                    product_id: `${item.product_id}`
                }
            else return {
                quantity: `${item.qty}`,
                type: 'variant',
                product_id: `${item.product_id}`,
                variant_id: `${item.variant_id}`
            }
        });
        console.log(products);
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
            // console.log(111111);
            setCartToggle(prev => !prev);
        }
    }

    const increaseItemInLocalCart = async (amt, product) => {
        return new Promise((res, rej) => {
            setCartItems(currCart => {
                const foundIndex = currCart.Items.findIndex(item => (item?.product_id === product.id && item?.variant_id === product.variant_id));
                if (foundIndex === -1) {
                    const newItem = {
                        qty: amt,
                        product_id: product.id,
                        variant_id: product?.variant_id,
                        price: product.price,
                        image_path: product.image_path,
                        product_name: { en: product.product_name.en },
                        product_image: product.product_image[0],
                        type: product?.type,
                        stock: product.stock,
                        max_order_limit: product?.max_order_limit,
                        link: product?.type === 'simple_product' ? `/product-details?product_id=${product.id}` : `/product-details?product_id=${product.id}&variant_id=${product?.variant_id}`
                    }
                    const updatedItems = [...currCart.Items, newItem];
                    const updatedCount = currCart.totalItems + 1;
                    // showSuccessToastMessage('Item Added In Cart');
                    res({
                        result: true,
                        message: 'Item added in cart'
                    });
                    return {
                        ...currCart,
                        Items: updatedItems,
                        totalItems: updatedCount,
                    }
                } else {
                    // If the item exists, update its quantity.

                    const updatingItems = [...currCart.Items];
                    if (updatingItems[foundIndex].qty + amt <= updatingItems[foundIndex].max_order_limit) {
                        updatingItems[foundIndex].qty += amt;
                        // const updatedCount = currCart.totalItems + amt;
                        // showSuccessToastMessage('Item Added In Cart');
                        res({
                            result: true,
                            message: 'Item added in cart'
                        });
                        return {
                            ...currCart,
                            Items: updatingItems,
                            // totalItems: updatedCount,
                        }
                    } else {
                        showInfoToastMessage(`Max qty reached `);
                        res({
                            result: false,
                            message: `Max qty reached `
                        });
                        return { ...currCart }
                    }

                }
            });
        })

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
                // console.log("Cart Data", datar);
                setCartData(datar);
                setCartItemsCount(datar.count_product)
                // setCartItemsCount(datar.data.reduce((accumalator, item) => {
                //     return accumalator + parseInt(item.qty);
                // }, 0));
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
        return new Promise((res, rej) => {
            setCartItems(currCart => {
                const foundIndex = currCart.Items.findIndex(item => (item.product_id === product.id && item.variant_id === product.variant_id));
                if (foundIndex !== -1) {
                    const updatingItems = [...currCart.Items];
                    const updatedItems = updatingItems.filter(item => !(item.product_id === product.id && item.variant_id === product.variant_id));
                    console.log(updatedItems)

                    const amt = updatingItems[foundIndex].qty;
                    const updatedCount = currCart.totalItems - 1;
                    showSuccessToastMessage("Item Removed in Local Cart");
                    res(true);
                    return {
                        ...currCart,
                        Items: updatedItems,
                        totalItems: updatedCount,
                    }
                }
            });
        })



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
            wishlistData,
            wishListItems,
            cartItems
        }}>
            {children}
            <ToastContainer />
        </ShoppingCartContext.Provider>
    );
}