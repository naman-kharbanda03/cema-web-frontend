import React from "react";

const Brands = (props) => {
    const name = props.brand.name;
    return (
        <>
            <li onClick={() => props.bf(name)}>
                <span>
                    <img src="images/brand/1.jpg" alt={name} />
                </span>
            </li>
        </>
    );
}
export default Brands;