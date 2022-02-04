import React from 'react';
import Aux from '../../hoc/AuxLayout';
import './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/Sidedrawer/SideDrawer';
import { useState } from 'react'

export default function Layouts(props) {
    const [sideBackdrop, setstate] = useState(false)
    
    const SideBackdropController = () => {
        setstate(!sideBackdrop)
    }
    return (
        <Aux>
            <Toolbar SideDrawerController={SideBackdropController}/>
            <SideDrawer sideBackdrop={sideBackdrop} closed={SideBackdropController}/>
            <main className='Content'>
                {props.children}
            </main>
        </Aux>
    )
}
