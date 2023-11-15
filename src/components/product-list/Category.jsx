import React from "react";
import { Link } from "react-router-dom";

const Category = (props) => {
    const category = props.current;
    // console.log(category);
    const clearFilter = props.clear;
    return (
        <>

            <li className="">
                <a href={`/products?category=${category.title.en}&id=${category.id}`}>
                    {category.title.en} <span className="count">{category.product_count}</span>
                </a>
            </li>
            {/* </Link> */}

        </>
    );
}
export default Category;