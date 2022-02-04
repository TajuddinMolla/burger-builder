import React from 'react'
import './DrawerToggle.css'

export default function DrawerToggle(props) {
    return (
        <div onClick={props.sideDrawerController} className='DrawerToggle'>
            <div></div>
            <div></div>
            <div></div>
        </div>
    )
}
