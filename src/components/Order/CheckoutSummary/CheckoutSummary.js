import React, { Fragment } from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../Ui/Button/Button';
import './CheckoutSummary.css'
export default function CheckoutSummary(props) {
    
    return (
        <Fragment>
            <div style={{ width: "100%",  margin: 'auto', textAlign: 'center' }}>
                <h1>Hope you like it!!</h1>

                <Burger ingredients={props.ingredients} />

                <Button buttonType='Danger' clicked={props.cancelButtonHandler}>Cancel</Button>
                <Button buttonType='Success' clicked={props.continueButtonHandler}>Continue</Button>
            </div>

        </Fragment>
    );
}
