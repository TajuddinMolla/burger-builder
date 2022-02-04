import React from 'react'
import './Toolbar.css'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import DrawerToggle from '../Sidedrawer/DrawerToggle/DrawerToggle'

export default function Toolbar(props) {

    
    return (
        <header className='Toolbar'>
            <DrawerToggle sideDrawerController={props.SideDrawerController}/>
            
                <Logo height='80%'/>
           
            <nav className='DesktopOnly'>
                <NavigationItems />
            </nav>
        </header>
    )
}
