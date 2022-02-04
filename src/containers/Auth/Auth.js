import React from 'react';
import { connect } from 'react-redux';
import * as action from '../../store/actions/index'
import Input from '../../components/Ui/Input/Input'
import Button from '../../components/Ui/Button/Button';
import { useState } from 'react';
import './Auth.css';
import Spiner from '../../components/Ui/Spiner/Spiner'
import { useNavigate } from 'react-router';


function Auth(props) {
    const navigate = useNavigate();
    const [userSignUp, setUserSihnUp] = useState({
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Mail Address'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        },
        disabledValue: false,
        
    });
    const [isSignUp, setIsSignUp] = useState(true);
    //User Sign Up validation func start
    const checkValidity = (value, rules) => {
        let isValid = true;
        if (!rules) {
            return true;
        }

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    }

    //User Sign Up validation func end

    //submit form start 

    const inputChangedHandler=(event,inputHandlerType)=>{
        const orderFormHndlr = {
            ...userSignUp.controls
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
        
        setUserSihnUp({
            controls: orderFormHndlr,
            disabledValue: disabledControlerValue
        })
       
    }

    //submit form end
    const submitHandler = (event) => {
        event.preventDefault();
        props.onAuth(userSignUp.controls.email.value, userSignUp.controls.password.value, isSignUp);
        if(props.buldingBurger){
            <Spiner/>
            navigate("/checkout");
        }else{
            navigate("/");
        }
        
    }

    let formElementsArray = [];
    for (const formKey in userSignUp.controls) {
        formElementsArray.push({
            id: formKey,
            config: userSignUp.controls[formKey]
        })
    }
    let form = formElementsArray.map(formElement => (
        <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            changedFunc={(event) => inputChangedHandler(event, formElement.id)}
            shouldValidation={formElement.config.validation}
            inValid={!formElement.config.valid}
            touched={formElement.config.touched}
        />

    ));
    if(props.loading){
        form = <Spiner/>
    }
    const changeSignUpSignInMethod = () => {
        setIsSignUp(!isSignUp)
    }
    return (
        <div className='Auth'>
            <form onSubmit={submitHandler}>
                {form}
                <Button
                    buttonType="Success"
                    disabled={!userSignUp.disabledValue}
                    >{isSignUp?'Sign Up':'Sign In'}</Button>
            </form>
            <Button buttonType="Danger" clicked={changeSignUpSignInMethod}>Change to {isSignUp?'Sign In':'Sign Up'} </Button>
        </div>
    );
}
const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        buldingBurger: state.burger.buildingBurger
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        onAuth: (email, pass, isSignUp) => dispatch(action.auth(email, pass, isSignUp))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Auth);