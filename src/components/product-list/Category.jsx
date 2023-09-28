import React from "react";

const Category = (props) => {
    const category = props.current;
    return (
        <>
            <li className="">
                <a href="shop-grid-left.html">
                    {category.title.en} <span className="count">9</span>
                </a>
            </li>
        </>
    );
}
export default Category;