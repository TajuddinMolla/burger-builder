import React from 'react'
import './NavigationItems.css'
import NavigationItem from './NavigationItem/NavigationItem'
import { connect } from 'react-redux'
function NavigationItems(props) {
    
    return (
        <ul className='NavigationItems'>
            <NavigationItem link='/'>Burger Builder</NavigationItem>

            {
                props.isAuthenticated
                    ? <>
                        <NavigationItem link='/orders'>Orders</NavigationItem>
                        <NavigationItem link='/logout'>LogOut</NavigationItem>
                    </>
                    : <NavigationItem link='/auth'>LogIn</NavigationItem>
            }

        </ul>
    )
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}

export default connect(mapStateToProps)(NavigationItems);