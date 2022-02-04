import React from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { useNavigate, useLocation } from 'react-router';
import { Navigate } from 'react-router';
import { Outlet } from 'react-router';

import { connect } from 'react-redux';


function Checkout(props) {
    let navigate = useNavigate();
    const cancelButtonHandler = () => {
        navigate('/');
    }
    const continueButtonHandler = () => {
        navigate('contact-data');
    }
    

    return (
        <div>
            {props.ingredient ? <>
                <CheckoutSummary
                    ingredients={props.ingredient}
                    cancelButtonHandler={cancelButtonHandler}
                    continueButtonHandler={continueButtonHandler}
                />
                <Outlet /></> :<Navigate to="/"/>
            }
        </div>
    );

}
const mapStateToProps = (state) => {
    return {
        ingredient: state.burger.ingredient,
        price: state.burger.totalPrice
    }
}


export default connect(mapStateToProps)(Checkout);