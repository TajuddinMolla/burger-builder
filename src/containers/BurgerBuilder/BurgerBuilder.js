import React from 'react'
import { connect } from 'react-redux'
import * as actionTypes from '../../store/actions/index'
import Aux from '../../hoc/AuxLayout'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/Ui/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Backdrop from '../../components/Ui/Backdrop/Backdrop'
import Spiner from '../../components/Ui/Spiner/Spiner'
import axios from '../../axios-orders'
import { useEffect, useState } from 'react'
import { useNavigate, Navigate } from "react-router-dom";

function BurgerBuilder(props) {
    let navigate = useNavigate();
    
    const [modalVal, setModalVal] = useState(false);
    
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        props.onGettIngredient();
    }, []);
    const parchaseHandler = (ing) => {
        let parchaseValue = Object.values(ing).reduce((a, b) => a + b);
        return (parchaseValue <= 0);
    }
    const modalController = () => {
        setModalVal(!modalVal);
    }

    const continueButtonForOrder = () => {
        navigate("/checkout");
    }
    const signUpforOrder = () =>{
        navigate("/auth");
    }


    let disabledInfo = {
        ...props.ings
    };
    for (let key in disabledInfo) {
        disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let orderSummary = <OrderSummary
        ingredients={props.ings}
        totalPrice={props.price}
        cancelButton={modalController}
        continueButton={continueButtonForOrder}
    />;
    if (loading) {
        orderSummary = <Spiner />;
    }
    let burger = <Spiner />;
    if (props.ings) {
        burger =
            <Aux>
                <Burger ingredients={props.ings} />
                <BuildControls
                    addIngredients={props.onAddIngredient}
                    removeIngredient={props.onRemoveIngredient}
                    disabledData={disabledInfo}
                    price={props.price}
                    parchase={parchaseHandler(props.ings)}
                    modalController={modalController}
                    isAuthenticated={props.isAuthenticated}
                    signUpforOrder={signUpforOrder}
                />
            </Aux>
    }

    return (

        <Aux>
            <Backdrop show={modalVal} backdropHandler={modalController} />
            {
                modalVal
                    ?
                    <Modal >
                        {orderSummary}
                    </Modal>
                    : null
            }
            {burger}
        </Aux>
    );
}
const mapStateToProps = (state)=>{
    return{
        ings: state.burger.ingredient,
        price: state.burger.totalPrice,
        isAuthenticated: state.auth.token !== null
    }
}
const mapDispatchToProps = (dispatch)=>{
    return{
        onAddIngredient: (ingName)=> dispatch(actionTypes.addIngredient(ingName)),
        onRemoveIngredient: (ingName)=> dispatch(actionTypes.removeIngredient(ingName)),
        onGettIngredient: ()=> dispatch(actionTypes.getIngredient())
    }
    
}

export default connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder);