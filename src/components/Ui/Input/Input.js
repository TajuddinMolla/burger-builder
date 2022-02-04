import React from 'react';
import './Input.css'


export default function Input(props) {
    let inputElement = null;
    const inputClasses = [
        'InputElement'
    ];
    if(props.inValid && props.shouldValidation && props.touched){
        inputClasses.push('InValid');
    }
    switch (props.elementType) {
        case ('input'):
            inputElement = <input
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value} 
                onChange={props.changedFunc}
                />;
            break;
        case ('textarea'):
            inputElement = <textarea
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value} 
                onChange={props.changedFunc}
                />;
            break;
        case ('select'):
            inputElement = <select 
            className={inputClasses.join(' ')}
            onChange={props.changedFunc}
            value={props.value}
            >
                {
                    props.elementConfig.options.map(option => (
                        <option key={option.value} value={option.value}>{option.displayValue}</option>
                    ))
                }

            </select>;
            break;
        default:
            inputElement = <input
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value} 
                onChange={props.changedFunc}
                />;

    }
    return (
        <div className='Input'>
            <label className='Label'>{props.label}</label>
            {inputElement}
        </div>
    );
}
