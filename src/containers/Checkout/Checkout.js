import { Component } from "react";
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from '../Checkout/ContactData/ContactData';

class Checkout extends Component {

    goToCheckout = () => {
        this.props.history.replace('/checkout/contact-data')
    }

    cancelPurchasing = () => {
        this.props.history.goBack()
    }

    render() {
        let summary = <Redirect to='/' />
        
        if (this.props.ingredients) {
            const purchaseRedirect = this.props.purchased ? <Redirect to='/'/> : null
            summary = (
                <div>
                    {purchaseRedirect}
                    <CheckoutSummary
                        ingredients={this.props.ingredients}
                        continueCheckout={this.goToCheckout}
                        cancelPurchasing={this.cancelPurchasing}
                    />
                    <Route path={this.props.match.url + "/contact-data"}
                        component={ContactData} />
                </div>
            )
        }
        return  summary
    }
}


const mapStateToProp = state => ({
    ingredients: state.burgerRdx.ingredients,
    totalPrice: state.burgerRdx.totalPrice,
    purchased: state.orderRdx.purchased
})


export default connect(mapStateToProp)(Checkout)