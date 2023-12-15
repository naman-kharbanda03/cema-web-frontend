import React, { useEffect, useState } from 'react';
import './SlidingDrawer.css'; // Import your CSS file

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

    return (
        <div className={`drawer-container ${OpenDrawer ? 'open' : ''}`} >
            <button className="menu-button"
                onClick={() => setOpenDrawer(false)}
            >
                <i class="fa-thin fa-xmark-large" />
                <i class="fa-solid fa-xmark" style={{ fontFamily: 'FontAwesome', background: 'white', fontSize: '20px' }} />
            </button>
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
                    {/* <li>
                        More
                    </li> */}
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
        </div>
    );
};

export default SlidingDrawer;
