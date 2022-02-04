import React from 'react';
import "./Order.css"
export default function Order(props) {
    let ingredientVal = [];
    let i = 0;
    for (const [ingredientKey, ingredientValue] of Object.entries(props.ingredients)) {
        ingredientVal[i] = (
            <span key={i} style={
                {
                    textTransform: 'capitalize',
                    display: 'inline-block',
                    margin: '0 8px',
                    border: '1px solid #ccc',
                    padding: '5px'
                }
            }> {ingredientKey} ({ingredientValue})</span>);
        i++;
    }
    return (
        <div className='Order' onClick={()=>props.deleteOrder(props.id)}>
            <p >Ingredients : {ingredientVal}</p>
            <p>Price: <strong>USD {props.price}</strong></p>
        </div>
    );
}
