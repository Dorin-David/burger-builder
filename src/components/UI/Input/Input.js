import React from 'react';
import classes from './Input.module.css';


const input = props => {
    let inputElement = null;
    const inputClasses = [classes.Input];
    if(props.invalid && props.shouldValidate && props.triggered){
      inputClasses.push(classes.InvalidInput)
    }
    switch (props.elementType) {
        case ('input'):
            inputElement = <input
                className={inputClasses.join(' ')}
                {...props.elementConfig} value={props.value} onChange={props.handleChange} />;
            break;
        case ('textarea'):
            inputElement = <textarea
                className={inputClasses.join(' ')}
                {...props.elementConfig} value={props.value} onChange={props.handleChange} />;
            break;
        case ('select'):
            inputElement = (<select
                className={inputClasses.join(' ')}
                value={props.value} 
                onChange={props.handleChange}
                >
                {props.elementConfig.options.map(option => (
                    <option
                        value={option.value}
                        key={option.value}
                    >
                        {option.displayValue}
                    </option>
                ))}
            </select>)
            break;
        default:
            inputElement = <input
                className={inputClasses.join(' ')}
                {...props.elementConfig} value={props.value} onChange={props.handleChange} />;
            break;
    }

    return (<div className={classes.Input}>
        <label className={classes.Label}>{props.label}</label>
        {inputElement}
    </div>)
}

export default input