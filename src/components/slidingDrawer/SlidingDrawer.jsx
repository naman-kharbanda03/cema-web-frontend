import React, { useEffect, useState } from 'react';
import './SlidingDrawer.css'; // Import your CSS file
import { Accordion, Offcanvas } from 'react-bootstrap';
import apiConfig from '../../config/apiConfig';
import { Link } from 'react-router-dom';

const SlidingDrawer = ({ OpenDrawer, setOpenDrawer }) => {
    // const [drawerOpen, setDrawerOpen] = useState(false);

    // const toggleDrawer = () => {
    //     setDrawerOpen(!drawerOpen);
    // };
    // console.log(OpenDrawer)
    const handleOutsideClick = (event) => {
        const drawer = document.querySelector('.drawer-container');
        console.log(drawer);

        if (drawer && !drawer.contains(event.target)) {
            // Click is outside of the drawer, close it
            console.log(OpenDrawer)
            setOpenDrawer(false);

        }
    };

    const [menuItems, setMenuItems] = useState([]);

    // useEffect(() => {
    //     console.log(OpenDrawer)


    //     if (OpenDrawer) {
    //         document.addEventListener('click', handleOutsideClick);

    //     }
    //     // Add event listener when the component mounts

    //     // Remove event listener when the component unmounts
    //     return () => {
    //         document.removeEventListener('click', handleOutsideClick);
    //     };

    // }, [OpenDrawer]);

    useEffect(() => {
        (
            function () {
                fetch(apiConfig.topMenu)
                    .then((res) => res.json())
                    .then((data) => {
                        // console.log(data);
                        setMenuItems(data);
                    })
                    .catch((e) => {
                        console.log(e);
                    });
            }
        )();

    }, []);

    return (
        <>
            <Offcanvas show={OpenDrawer} onHide={() => setOpenDrawer(false)}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title style={{ position: 'relative', left: '45%', fontSize: "1.5rem" }}>CEMA</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <div className="main-contentd">
                        <ul >
                            <li>
                                <a href={'/listings?products=best_sellers'}>
                                    BestSeller
                                </a>
                            </li>
                            <li>
                                <a href={'/listings?products=new_arrival'}>
                                    New Arrival
                                </a>
                            </li>
                            <li>
                                <Accordion ActiveKey="0"  >
                                    <Accordion.Header style={{ position: 'relative', left: '-18px' }} >
                                        More
                                    </Accordion.Header>
                                    <Accordion.Body style={{ padding: '0px' }}>
                                        {menuItems?.map((items, key) => {
                                            if (items.link_by === 'url')
                                                return (
                                                    <Link
                                                        to={items.url}
                                                    >
                                                        {items?.title?.en}
                                                        <br />
                                                    </Link>

                                                );
                                            return (
                                                <>

                                                    {items?.title?.en} <br />
                                                    {items?.linked_parent?.map(
                                                        (cat, index) => (
                                                            <a
                                                                href={`/products?id=${cat}`}
                                                            >
                                                                {/* <br /> */}
                                                                {/* <span className=""> */}
                                                                {/* {fetchCategoryById(parseInt(cat))} */}
                                                                {/* </span> */}
                                                            </a>
                                                        )
                                                    )}
                                                </>

                                            );
                                        })}
                                    </Accordion.Body>
                                </Accordion>
                            </li>
                            <li>
                                <a href={'/products'}>
                                    Products
                                </a>
                            </li>
                            <li>
                                <a href={'/contact'}>
                                    Contact
                                </a>
                            </li>
                        </ul>
                        {/* Add more content as needed */}
                    </div>
                </Offcanvas.Body>
            </Offcanvas >


        </>
    );
};

export default SlidingDrawer;
