import React from 'react'
import './Backdrop.css'
export default function Backdrop(props) {
    return (
        <div>
            {
                props.show ?
                    <div className='Backdrop' onClick={props.backdropHandler}></div> : null
            }
        </div>
    )
}
