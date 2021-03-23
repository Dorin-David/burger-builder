import { Component } from "react";
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route, Redirect } from 'react-router-dom';
import ContactData from '../Checkout/ContactData/ContactData';
import { connect } from 'react-redux'

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
            summary = (
                <div>
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
})


export default connect(mapStateToProp)(Checkout)