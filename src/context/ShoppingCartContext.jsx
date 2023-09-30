import React, { createContext, useContext, useEffect, useState } from "react";
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
    useEffect(() => {
    }, [cartItems]);

    const getQuantity = (id) => {
        return cartItems.find(item => item.Uid === id)?.quantity || 0;
    }
    // const addToCart = (id) => {
    //     setCartItems(currItems => {
    //         if (currItems.find(item.Uid === id) === null) {
    //             return [...currItems, { Uid: id, quantity: 1 }];
    //         }
    //         else {
    //             currItems.map(item => {
    //                 if (item.Uid === id) {
    //                     return {...item, quantity : item.quantity + 1};
    //                 }else{
    //                     return item;
    //                 }
    //             })
    //         }
    //     });
    // }
    const increaseItem = (id, amt) => {
        setCartItems(currItems => {
            const foundItem = currItems.find(item => item.Uid === id);

            if (foundItem === undefined) {
                // If the item doesn't exist in the cart, add it.
                return [...currItems, { Uid: id, quantity: 1 }];
            } else {
                // If the item exists, update its quantity.
                return currItems.map(item => {
                    if (item.Uid === id) {
                        return { ...item, quantity: item.quantity + amt };
                    } else {
                        return item;
                    }
                });
            }
        });
    };
    const decreaseItem = (id) => {
        setCartItems(currItems => {
            const foundItem = currItems.find(item => item.Uid === id);
            if (foundItem === undefined) {
                return currItems;
            }
            else {
                if (foundItem.quantity === 1) {
                    return currItems.filter(item => item.Uid !== id);
                }
                else {
                    return currItems.map(item => {
                        if (item.Uid === id) {
                            return { ...item, quantity: item.quantity - 1 }
                        }
                        else return item;
                    })
                }
            }
        });

    }
    const removeItem = (id) => {
        setCartItems(currItems => {
            return currItems.filter(item => item.Uid !== id);
        })
    }

    return (
        <ShoppingCartContext.Provider value={{
            getQuantity,
            increaseItem,
            decreaseItem,
            removeItem,
            cartItems
        }}>
            {children}
        </ShoppingCartContext.Provider>
    );
}