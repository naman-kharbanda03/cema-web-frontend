// Layout.js

import React, { useEffect, useLayoutEffect, useState } from 'react';
import SlidingDrawer from '../components/slidingDrawer/SlidingDrawer';
import PreLoader from '../components/pre-loader/PreLoader';
import useLocalStorage from '../hooks/useLocalStorage';

const Layout = ({ OpenDrawer, setOpenDrawer, children }) => {
    const [loading, setLoading] = useLocalStorage('loading', true);

    useLayoutEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 2300);
    }, []);

    return (
        <div>

            <>
                <SlidingDrawer OpenDrawer={OpenDrawer} setOpenDrawer={setOpenDrawer} />
                {children}
                {loading === true ? (
                    <PreLoader />
                ) : ''}
            </>
        </div>
    );
};

export default Layout;
