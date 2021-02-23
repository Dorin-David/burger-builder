import React from 'react';
import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl'

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' },
]

const buildControls = props => (
    <div className={classes.BuildControls}>
        <p>Current Prince: <strong>{props.currentPrice.toFixed(2)}</strong></p>
        {controls.map(control => (
            <BuildControl 
                key={control.label} 
                label={control.label}
                added={() => props.addIngredient(control.type)}
                removed={() => props.removeIngredient(control.type)}
                disableRemoving={props.disableRemoving[control.type]}
            />
        ))}
        <button className={classes.OrderButton}
            disabled={!props.isPurchasable}
            onClick={props.purchasing}>ORDER NOW</button>
    </div>
)

export default buildControls