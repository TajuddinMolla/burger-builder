import React from 'react'
import './NavigationItem.css'
import { NavLink } from 'react-router-dom'
export default function NavigationItem(props) {
    return (
        <li className='NavigationItem'>
            {/* <a href={props.link} className={props.active?`active`:null}>{props.children}</a> */}
            <NavLink to={props.link} className={props.active?`active`:null}>{props.children}</NavLink>
        </li>
    )
}
