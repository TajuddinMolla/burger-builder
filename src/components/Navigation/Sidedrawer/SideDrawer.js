import React from 'react'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import './SideDrawer.css'
import Backdrop from '../../Ui/Backdrop/Backdrop'
import Aux from '../../../hoc/AuxLayout'


export default function SideDrawer(props) {
    let attachClasses = ['SideDrawer' , 'Close'];
    if(props.sideBackdrop){
        attachClasses = ['SideDrawer' , 'Open'];
    }
    return (
        <Aux>
            <Backdrop show={props.sideBackdrop} backdropHandler={props.closed} />
            <div className={attachClasses.join(' ')}>

                <Logo height='11%' />
                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </Aux>
    )
}
