import React, { Fragment, Component } from 'react';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
  
  componentDidUpdate(){
    console.log('updated')
  }

  render() {
    const ingredientsSummary = Object.keys(this.props.ingredients)
      .map(element => <li key={element}><span style={{ textTransform: 'capitalize' }}>{element}</span>: {this.props.ingredients[element]}</li>);
    return (
      <Fragment>
        <h3>Your Order</h3>
        <ul>
          {ingredientsSummary}
        </ul>
        <p><strong>Total:</strong> {this.props.totalPrice.toFixed(2)}</p>
        <p>Continue to Checkout?</p>
        <Button btnType='Danger' click={this.props.cancelPurchasing}>CANCEL</Button>
        <Button btnType='Success' click={this.props.continuePurchasing}>CONTINUE</Button>
      </Fragment>
    )
  }


}

export default OrderSummary