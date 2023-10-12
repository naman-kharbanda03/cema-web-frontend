import React from "react";

const Brands = (props) => {
    const name = props.brand.name;
    return (
        <>
            <li name="brand" onClick={() => props.bf(prev => ({
                ...prev,
                ["brand"]: props.brand.id
            }))}>
                <span>
                    <img src="images/brand/1.jpg" alt={name} />
                </span>
            </li>
        </>
    );
}
export default Brands;