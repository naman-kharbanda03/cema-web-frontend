import React from "react";
import { Link } from "react-router-dom";

const Category = (props) => {
    const category = props.current;
    const clearFilter = props.clear;
    return (
        <>
            {/* <Link
            // to={
            //     {
            //         pathname: '/products',
            //         search: `?category=${category.title.en}&id=${category.id}`
            //     }
            // }
            > */}
            <li className="">
                <a href={`/products?category=${category.title.en}&id=${category.id}`}>
                    {category.title.en} <span className="count">{category.simpleproducts_count}</span>
                </a>
            </li>
            {/* </Link> */}

        </>
    );
}
export default Category;