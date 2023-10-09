import React, { createContext, useContext, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import apiConfig from "../config/apiConfig";
import useLocalStorage from "../hooks/useLocalStorage";

const ShoppingCartContext = createContext({});

export function useShoppingCart() {
    return useContext(ShoppingCartContext);
}

export const ShoppingCartProvider = ({ children }) => {
    const [cartItemsCount, setCartItemsCount] = useLocalStorage('cart', [{
        Uid: null,
        quantity: null
    }]);
    const [wishListCount, setWishListCount] = useState();
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

    useEffect(() => {
        const apiUrl = apiConfig.wishListAPI;
        const token = localStorage.getItem('accessToken');
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
    }, [wishListToggle]);

    useEffect(() => {
        const apiUrl = apiConfig.getCartDataAPI;
        const token = localStorage.getItem('accessToken');
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
            console.log("Cart Data", datar);
            setCartItemsCount(datar.data.reduce((accumalator, item) => {
                return accumalator + parseInt(item.qty);
            }, 0));
            // showInfoToastMessage();
            return datar;

        }).catch((error) => console.error("Problem with fetch", error));
    }, [cartToggle]);

    // useEffect(() => console.log("Count", cartItemsCount), [cartItemsCount]);

    const handleAddRemoveWishlist = (e, id) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('product_id', id);

        const apiURl = apiConfig.addRemoveWishlistAPI;
        const token = localStorage.getItem('accessToken');
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


        fetch("https://cema-backend.plasium.com/api/addToCart", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${bearerToken}`,
            },
            body: JSON.stringify(formData),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Response:", data);
                setCartToggle(prev => !prev); showSuccessToastMessage(data.message);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }


    return (
        <ShoppingCartContext.Provider value={{
            handleAddRemoveWishlist,
            wishListCount,
            cartItemsCount,
            setCartToggle,
            setWishListCount,
            AddToCart
        }}>
            {children}
            <ToastContainer />
        </ShoppingCartContext.Provider>
    );
}