import React from 'react';
import classes from './Order.module.css'

const order = props => {
    const ingredients = [];
    for(let item in props.ingredients){
        ingredients.push({name: item, amount: props.ingredients[item]})
    }

    let mappedIngredients = ingredients.map(item => {
        return <span className={classes.OrderSummary }
        key={item.name}>{item.name} ({item.amount})</span>
    })
    return (<div className={classes.Order}>
        <p>Ingredients: {mappedIngredients}</p>
        <p>Price: <strong>{props.price}$</strong></p>
    </div>)
}

export default order