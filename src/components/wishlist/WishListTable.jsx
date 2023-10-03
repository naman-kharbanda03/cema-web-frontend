import { UNSAFE_warning } from "@remix-run/router";
import React, { useEffect, useState } from "react";
import apiConfig from "../../config/apiConfig";



const WishListTable = () => {
    const [orderData, setOrderData] = useState([]);
    const [wishListCount, setWishListCount] = useState();
    const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIyIiwianRpIjoiMDg5ZTBiNWU4N2E0ZmUxMDhlNTIyMTZkMGQyZTQ3MmVhZWVmYWEzOWZiMDQ3NDlmNmFkYmM1YjViYjQ1YjUwMmIyODRlZTliOWRiYzM0NzIiLCJpYXQiOjE2OTYwOTMyNDUuODg0MzU2LCJuYmYiOjE2OTYwOTMyNDUuODg0MzU3LCJleHAiOjE3Mjc3MTU2NDUuODc0Nzc1LCJzdWIiOiIxMiIsInNjb3BlcyI6W119.m-wW2OK1tQc9Iobe6cFRogBjlpGhC5y7sGx0tDiYWNhXid-8rIwRfgnWccEMl5_gdJJbwJEtq1vYww2Fs3xA9Dgt343D4mI-ms32GQHnqvyySmWCHj5bOzh6kYOQo2qh0ADZuIZVT_OsZYmrPyzfk_k5epEHzc03OX_9iQoxKiWbODtNT_lEuTsYFV1iYf4bXhcRnFEICfIG_g7e2cOEnNlHb2rf2jrxN4RWnmvtsetBFj_JxpIc31yIpca8Enml1PvrxL101qzk4OmKFQJbEGVYf6cNxxf9IbVcYZLKumx-sbUiimfVLqLsvoTFogFPY0VI-T9Anvqscn5Mso44tpV3tc2iGNGF9SGFnP-g3KOfLWT_ztoLQ3rH0blm03omri32nQQP4CnZFic6zjN9HKknALQ1_P52VfU4CWFOHyqUrUcNLB98wBU-jHeyUUUdwcXyAF9F2io3xAyKqw2uRiiQ2p0t0A0WUU-_Xvc1xGdBEo5bIZUxc5qYm3u4Q8rbcg6wfmFPFLHVv0ZoYSUtnXngZQZ1xv5__GU8U94UgbWRNfIgTZuKOvLEj8hEa7fyGx_IVzLzh3gcHSGMA9ysZ8l_dDzgxs3cehOHIPhBqvvjitmSefBsYacx2NPN3MnCJAzXe6p1StTLRRNIchGDpduRDgxVAHYnCV76tv20__A";

    useEffect(() => {
        const apiUrl = apiConfig.wishListAPI;
        // const token = localStorage.getItem('accessToken');
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
                console.log(datar)
                setOrderData(datar.data);
                setWishListCount(datar.count);
                return datar;
            } else {
                alert("Fetch error");
            }

        }).catch((error) => console.error("Problem with fetch", error));
    }, []);

    useEffect(() => console.log(orderData), [orderData]);

    const handleAddRemove = (e, id) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('product_id', id);
        const apiURl = apiConfig.addRemoveWishlistAPI;



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
                if (data.status === "success") {
                    setOrderData(prevData => {
                        return prevData.filter(order => order.simple_product.id !== id);
                    });
                }
                return orderData;
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }

    return (
        <>
            <div className="shop-wishlist">
                <table className="wishlist-items">
                    <tbody>
                        {orderData.map(order => (
                            <tr className="wishlist-item">
                                <td className="wishlist-item-remove" onClick={(e) => handleAddRemove(e, order.simple_product.id)}>
                                    <span></span>
                                </td>
                                <td className="wishlist-item-image">
                                    <a href="shop-details.html">
                                        <img
                                            width="600"
                                            height="600"
                                            src={order.simple_product.image_path + '/' + order.simple_product.thumbnail}
                                            alt=""
                                        />
                                    </a>
                                </td>
                                <td className="wishlist-item-info">
                                    <div className="wishlist-item-name">
                                        <a href="shop-details.html">
                                            {order.simple_product.product_name.en}
                                        </a>
                                    </div>
                                    <div className="wishlist-item-price">
                                        {/* <span>{order.simple_product.price}</span> */}
                                    </div>
                                    <div className="wishlist-item-time">June 6, 2022</div>
                                </td>
                                <td className="wishlist-item-actions">
                                    <div className="wishlist-item-stock">In stock</div>
                                    <div className="wishlist-item-add">
                                        <div
                                            className="btn-add-to-cart"
                                            data-title="Add to cart"
                                        >
                                            <a
                                                rel="nofollow"
                                                href="#"
                                                className="product-btn button"
                                            >
                                                Add to cart
                                            </a>{" "}
                                            &nbsp;&nbsp;
                                            <a
                                                rel="nofollow"
                                                href="#"
                                                className="product-btn button"
                                                onClick={(e) => handleAddRemove(e, order.simple_product.id)}
                                            >
                                                Remove
                                            </a>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        ))}

                    </tbody>
                </table>
            </div>
        </>
    )
}
export default WishListTable;
