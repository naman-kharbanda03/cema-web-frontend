import React, { createContext, useContext, useEffect, useState } from "react";
import apiConfig from "../config/apiConfig";
import useLocalStorage from "../hooks/useLocalStorage";

const ShoppingCartContext = createContext({});

export function useShoppingCart() {
    return useContext(ShoppingCartContext);
}

export const ShoppingCartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useLocalStorage('cart', [{
        Uid: null,
        quantity: null
    }]);
    const [wishListCount, setWishListCount] = useState();
    const [wishListToggle, setWishListToggle] = useState(false);

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
                return datar;
            } else {
                alert("Fetch error");
            }

        }).catch((error) => console.error("Problem with fetch", error));
    }, [wishListToggle]);

    // const fetchWishlistCount=()=>{
    //     const apiUrl = apiConfig.wishListAPI;
    //     const token = localStorage.getItem('accessToken');
    //     fetch(apiUrl, {
    //         method: 'GET',
    //         headers: {
    //             'Authorization': `Bearer ${token}`,
    //             // Add other headers as needed
    //         },
    //     }).then((response) => {
    //         if (!response.ok) throw new Error("Network Issue");
    //         return response.json();
    //     }).then((datar) => {
    //         if (datar.success) {
    //             console.log(datar);
    //             setWishListCount(datar.count);
    //             return datar;
    //         } else {
    //             alert("Fetch error");
    //         }

    //     }).catch((error) => console.error("Problem with fetch", error));
    // }

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
                return data;
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }


    return (
        <ShoppingCartContext.Provider value={{
            handleAddRemoveWishlist,
            wishListCount,
            setWishListCount,
        }}>
            {children}
        </ShoppingCartContext.Provider>
    );
}