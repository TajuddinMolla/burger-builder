import React from 'react'
import './BuildControls.css'

import BuildControl from './BuildControl/BuildControl'

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Meat', type: 'meat' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Bacon', type: 'bacon' }
]
export default function BuildControls(props) {

    return (
        <div className='BuildControls'>
            <p>
                <strong>
                    Current Price: {props.price.toFixed(2)} $
                </strong>
            </p>
            {
                controls.
                    map((ctrl, indx) => (
                        <BuildControl
                            key={ctrl.label + indx}
                            label={ctrl.label}
                            addIngredients={() => props.addIngredients(ctrl.type)}
                            removeIngredient={() => props.removeIngredient(ctrl.type)}
                            disabledData={props.disabledData[ctrl.type]}

                        />
                    )
                    )

            }
            {
                props.isAuthenticated
                    ? <button
                        className='OrderButton'
                        disabled={props.parchase}
                        onClick={props.modalController}>Order Now</button>
                    : <button
                        className='OrderButton'
                        disabled={props.parchase}
                        onClick={props.signUpforOrder}>SignUp for Order Now</button>
            }

        </div>
    )
}
