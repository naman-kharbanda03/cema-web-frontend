import React from "react";

const Brands = (props) => {
    const name = props.brand.name;
    return (
        <>
            <li name="brand" onClick={() => {
                if (props.f?.brand !== props.brand.id) {
                    props.bf(prev => ({
                        ...prev,
                        ["brand"]: props.brand.id
                    }))
                    props.ft(prev => !prev);
                }
                else {
                    props.bf(prev => ({
                        ...prev,
                        ["brand"]: ''
                    }))
                    props.ft(prev => !prev);
                }
            }}>
                <span>
                    <img src={`https://www.demo609.amrithaa.com/backend-cema/public/images/brands/${props.brand?.image}`} alt={name} />
                </span>
            </li>
        </>
    );
}
export default Brands;