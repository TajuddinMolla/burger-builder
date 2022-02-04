import React, { Fragment } from 'react';
import Button from '../../../components/Ui/Button/Button';
import { useState, useEffect } from 'react';

import './ContactData.css'
import axios from '../../../axios-orders'
import { useNavigate } from 'react-router';
import Spiner from '../../../components/Ui/Spiner/Spiner';
import Input from '../../../components/Ui/Input/Input';
import { connect } from 'react-redux';


function ContactData(props) {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
   

    const [customerDetails, setCustomerDetails] = useState({
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                validation:{
                    required: true
                },
                valid: false,
                touched: false,
                value: ''
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                validation:{
                    required: true
                },
                valid: false,
                touched: false,
                value: ''
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Zip Code'
                },
                validation:{
                    required: true,
                    minlength: 5,
                    maxlength: 5
                },
                valid: false,
                touched: false,
                value: ''
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                validation:{
                    required: true
                },
                valid: false,
                touched: false,
                value: ''
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-Mail'
                },
                validation:{
                    required: true
                },
                valid: false,
                touched: false,
                value: ''
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'fastest', displayValue: 'Fastest' },
                        { value: 'cheapest', displayValue: 'Cheapest' },
                    ]
                },
                valid: true,
                validation:{},
                touched: false,
                value: 'fastest'
            },
            
        },
        disabledValue:false
    });
    const orderHandler = (event) => {
        event.preventDefault();
        let formValue = { };
        for (const key in customerDetails.orderForm) {
            formValue[key] = customerDetails.orderForm[key].value;
        }
        const burgerOrder = {
            ingredients: props.ingredient,
            price: props.price,
            orderData: formValue,
            userId: props.userId
        }
        axios.post('orders.json?auth='+props.token, burgerOrder)
            .then(response => {
                // setLoading(!loading);

                navigate('/');
            })
            .catch(error => {
                alert(error);
            })
    }
    let formElementsArray = [];
    for (const formKey in customerDetails.orderForm) {
        formElementsArray.push({
            id: formKey,
            config: customerDetails.orderForm[formKey]
        })
    }
    const checkValidity=(value, rules)=>{
        let isValid=true;
        if(rules.required && isValid){
            isValid= value.trim() !== '';
        }
        if(rules.minlength && isValid){
            isValid = value.length >= rules.minlength;
        }
        if(rules.maxlength && isValid){
            isValid = value.length <= rules.maxlength;
        }
        return isValid;
    }
    const inputChangedHandler=(event,inputHandlerType)=>{
        const orderFormHndlr = {
            ...customerDetails.orderForm
        }
        const newOrderForm = {
            ...orderFormHndlr[inputHandlerType]
        }
        newOrderForm.value = event.target.value;
        newOrderForm.valid = checkValidity(newOrderForm.value,newOrderForm.validation);
        newOrderForm.touched = true;
        let disabledControlerValue = true; 
        
       
        orderFormHndlr[inputHandlerType] = newOrderForm;
        for (const key in orderFormHndlr) {
            disabledControlerValue=orderFormHndlr[key].valid && disabledControlerValue;
        }
        
        setCustomerDetails({
            orderForm: orderFormHndlr,
            disabledValue: disabledControlerValue
        })
       
    }
    return (
        <Fragment>
            <div className='ContactData'>
                <h4>Enter your Contact Data</h4>
                <form>

                    {
                        formElementsArray.map(formElement => (
                            <Input 
                            key={formElement.id}
                            elementType={formElement.config.elementType} 
                            elementConfig={formElement.config.elementConfig} 
                            value={formElement.config.value} 
                            changedFunc={(event)=>inputChangedHandler(event,formElement.id)}
                            shouldValidation={formElement.config.validation}
                            inValid={!formElement.config.valid}
                            touched={formElement.config.touched}
                            />
                        ))
                    }
                    <Button buttonType="Success" disabled={!customerDetails.disabledValue} clicked={(event) => orderHandler(event)}>Order</Button>
                </form>

            </div>
        </Fragment>
    );
}
const mapStateToProps = (state) =>{
    return{
        ingredient: state.burger.ingredient,
        price: state.burger.totalPrice,
        token: state.auth.token,
        userId: state.auth.userId
    }
}


export default connect(mapStateToProps)(ContactData);