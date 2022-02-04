import React from 'react'
import Aux from '../../../hoc/AuxLayout'
import Button from '../../Ui/Button/Button';


export default function OrderSummary(props) {
    let IngSummary=[];
    let j=0;
   
    for (const [key, value] of Object.entries(props.ingredients)) {
        IngSummary [j]=  <li key={key+j}>{key} : {value}</li>
        j++;
      }
    return (
        <Aux>
            <h3>Your Orders</h3>
            <p>A delicious burger with the following ingredieants</p>
            <ul>
                {IngSummary}
            </ul>
            <p>Total Price : {props.totalPrice.toFixed(2)}</p>
            <p>Continue to Checkout?</p>
            <Button buttonType='Danger' clicked={props.cancelButton}>Cancel</Button>
            <Button buttonType='Success' clicked={props.continueButton}>Continue</Button>
        </Aux>
    )
}
