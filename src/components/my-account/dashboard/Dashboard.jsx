import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
    return (
        <>
            <div className="my-account-dashboard">
                <p>
                    Hello <strong>Rosie</strong> (not{" "}
                    <strong>Rosie</strong>?{" "}
                    <Link to="/login">Log out</Link>
                </p>
                <p>
                    From your account dashboard you can view your{" "}
                    <a href="#">recent orders</a>, manage your{" "}
                    <a href="#">shipping and billing addresses</a>,
                    and{" "}
                    <a href="#">
                        edit your password and account details
                    </a>
                    .
                </p>
            </div>
        </>
    );
}
export default Dashboard;