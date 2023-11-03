import React from "react";


function CookieBanner() {

    return (
        <div>
            <p>
                We use tracking cookies to understand how you use the product
                and help us improve it.
                Please accept cookies to help us improve.
            </p>
            <button type="button">Accept cookies</button>
            <button type="button">Decline cookies</button>
        </div>
    );
}

export default CookieBanner;
