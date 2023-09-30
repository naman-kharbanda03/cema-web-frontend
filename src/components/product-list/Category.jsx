import React from "react";
import { Link } from "react-router-dom";

const Category = (props) => {
    const category = props.current;
    return (
        <>
            <Link to={{
                pathname: '/products',
                search: `?category=${category.title.en}&id=${category.id}`
            }} >
                <li className="">
                    <a href="">
                        {category.title.en} <span className="count">{category.products_count}</span>
                    </a>
                </li>
            </Link>

        </>
    );
}
export default Category;