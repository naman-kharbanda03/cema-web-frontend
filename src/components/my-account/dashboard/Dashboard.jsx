import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import apiConfig from "../../../config/apiConfig";

const Dashboard = (props) => {
    const [user, setUser] = useState({});

    useEffect(() => {
        const apiUrl = apiConfig.getUserApi;
        const token = localStorage.getItem('accessToken');
        fetch(apiUrl, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => response.json())
            .then(data => {
                console.log(data);
                setUser(data);
            })
    }, [])
    return (
        <>
            <div className="my-account-dashboard">
                <p>
                    Hello <strong>{user?.name}</strong>
                </p>
                <p>
                    From your account dashboard you can view your{" "}
                    recent orders, manage your{" "}
                    shipping and billing addresses,
                    and{" "}
                    edit your password and account details.
                </p>
            </div>

        </>
    );
}
export default Dashboard;