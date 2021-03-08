import React, { Fragment } from 'react';
import Button from '../../UI/Button/Button';

const orderSummary = props => {
  const ingredientsSummary = Object.keys(props.ingredients)
    .map(element => <li key={element}><span style={{ textTransform: 'capitalize' }}>{element}</span>: {props.ingredients[element]}</li>);
  return (
    <Fragment>
      <h3>Your Order</h3>
      <ul>
        {ingredientsSummary}
      </ul>
      <p><strong>Total:</strong> {props.totalPrice.toFixed(2)}</p>
      <p>Continue to Checkout?</p>
      <Button btnType='Danger' click={props.cancelPurchasing}>CANCEL</Button>
      <Button btnType='Success' click={props.continuePurchasing}>CONTINUE</Button>
    </Fragment>
  )
}



export default orderSummary