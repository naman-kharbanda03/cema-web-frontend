// Layout.js

import React, { useState } from 'react';
import SlidingDrawer from '../components/slidingDrawer/SlidingDrawer';

const Layout = ({ OpenDrawer, setOpenDrawer, children }) => {
    return (
        <div>
            <SlidingDrawer OpenDrawer={OpenDrawer} setOpenDrawer={setOpenDrawer} />
            {children}
        </div>
    );
};

export default Layout;
