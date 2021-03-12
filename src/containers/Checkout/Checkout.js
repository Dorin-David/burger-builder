import { Component } from "react";
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
// import axios from '../../axios-orders';

class Checkout extends Component {
    state = {
        ingredients: null
    }

    componentDidMount(){
        let ingredientsFromParams = new URLSearchParams(this.props.location.search);
        let parsedIngredients = {}
        for(let [key, qty] of ingredientsFromParams.entries()){
           parsedIngredients[key] = qty
        }
        this.setState({ingredients: parsedIngredients})
    }

    componentWillUnmount(){
        //find a way to cache ingredients so user gets back to already built
        //burger when canceling instead  of starting all over again

        //The below worked but it created a sub-object inside the ingredients JSON branch

        // axios.post('/ingredients.json', this.state.ingredients)
        //     .then(res => {
        //         // this.setState({ loading: false, purchasing: false })
        //         console.log(res)
        //     })
        //     .catch(rej => {
        //         // this.setState({ loading: false, purchasing: false })
        //     })
    }

    goToCheckout = () => {
       this.props.history.replace('/checkout/contact-data')

    }

    cancelPurchasing = () => {
    //    this.props.history.replace("/")
        this.props.history.goBack()
    }
  
    render(){
        return (
            <div>
                <CheckoutSummary 
                ingredients={this.state.ingredients}
                continueCheckout={this.goToCheckout}
                cancelPurchasing={this.cancelPurchasing}
                />
            </div>
        )
    }
}

export default Checkout