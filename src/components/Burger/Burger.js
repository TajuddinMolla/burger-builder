import React from 'react';
import './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

export default function Burger(props) {
    //using map convert object to  array 
    // const transformIngredient= Object.keys(props.ingredients)
    // .map((igKey)=>
    // [...Array(props.ingredients[igKey])].map((_,i)=>
    // <BurgerIngredient key={igKey+i} type={igKey}/>
    // )   
    // );

    //using object 
    let transformIngredient = [];
    let j = 0;
    for (const [key, value] of Object.entries(props.ingredients)) {
        for (let i = 0; i < value; i++) {
            transformIngredient[j] = <BurgerIngredient key={key + i} type={key} />;
            j++;
        }
    }

    if (transformIngredient.length === 0) {
        transformIngredient = <p>Please start adding ingredients!</p>
    }
    return (
        <div className='Burger'>
            <BurgerIngredient type='bread-top' />

            {transformIngredient}
            <BurgerIngredient type='bread-bottom' />
        </div>
    )
}
