import React, { Component, Fragment } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../components/hoc/withErrorHandler/withErrorHandler';

const INGREDIENTS_PRICES = {
    salad: 0.5,
    tomato: 0.6,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7,
}

class BurgerBuilder extends Component {

    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false

    }
    componentDidMount() {
        axios.get('https://react-burger-builder-7e9c0-default-rtdb.firebaseio.com/ingredients.json')
            .then(res => {
                this.setState({ ingredients: res.data })
            })
            .catch(err => {
                this.setState({ error: true })
            })
    }

    updatePurchaseState(ingredients) {
        const ingredientsCopy = {
            ...ingredients
        }
        const ingredientsTotal = Object.keys(ingredientsCopy).reduce((accum, item) => accum + ingredientsCopy[item], 0);
        this.setState({ purchasable: ingredientsTotal > 0 })
    }

    addIngredientHandler = type => {
        const updatedCount = this.state.ingredients[type] + 1;
        const updatedPrice = this.state.totalPrice + INGREDIENTS_PRICES[type];
        const updatedIngredients = {
            ...this.state.ingredients,
        }
        updatedIngredients[type] = updatedCount;
        this.setState({
            ingredients: updatedIngredients,
            totalPrice: updatedPrice
        })
        this.updatePurchaseState(updatedIngredients)
    }

    removeIngredientHandler = type => {
        const updatedCount = this.state.ingredients[type] - 1;
        if (updatedCount < 0) return
        const updatedPrice = this.state.totalPrice - INGREDIENTS_PRICES[type];
        const updatedIngredients = {
            ...this.state.ingredients,
        }
        updatedIngredients[type] = updatedCount;
        this.setState({
            ingredients: updatedIngredients,
            totalPrice: updatedPrice
        })
        this.updatePurchaseState(updatedIngredients)
    }

    purchaseHandler = () => {
        this.setState({ purchasing: true })
    }

    cancelPurchasing = () => {
        this.setState({ purchasing: false })
    }

    continuePurchasing = () => {
        //show spinner if order takes to much
        this.setState({ loading: true })

        const currentOrder = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice.toFixed(2),
            customer: {
                name: 'Dorio',
                address: {
                    street: 'Costello 312',
                    zipCode: '43051',
                    country: 'Italy'
                },
                email: 'myEmail@mail.com',
                payment: 'cash'
            },
            deliveryType: 'standart',
        }
        // we've got the base url set in our axios instance
        axios.post('/orders.json', currentOrder)
            .then(res => {
                this.setState({ loading: false, purchasing: false })
            })
            .catch(rej => {
                this.setState({ loading: false, purchasing: false })
            })
    }

    render() {

        const isItemPositive = {
            ...this.state.ingredients
        }
        for (let item in isItemPositive) {
            isItemPositive[item] = isItemPositive[item] <= 0;
        }

        let orderSummary = null;
        let burger = this.state.error ? <h2 style={{ textAlign: 'center', color: '#ca3737' }}>An error occurred</h2>
                                      : <Spinner />;
        if (this.state.ingredients) {
            burger = (<Fragment>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    addIngredient={this.addIngredientHandler}
                    removeIngredient={this.removeIngredientHandler}
                    disableRemoving={isItemPositive}
                    currentPrice={this.state.totalPrice}
                    isPurchasable={this.state.purchasable}
                    purchasing={this.purchaseHandler}
                />
            </Fragment>);
            orderSummary = (<OrderSummary
                ingredients={this.state.ingredients}
                cancelPurchasing={this.cancelPurchasing}
                continuePurchasing={this.continuePurchasing}
                totalPrice={this.state.totalPrice}
            />)
        }
        if (this.state.loading) {
            orderSummary = <Spinner />
        }

        return (
            <Fragment>
                <Modal showModal={this.state.purchasing} closeModal={this.cancelPurchasing}>
                    {orderSummary}
                </Modal>
                {burger}
            </Fragment>
        )
    }
}

export default withErrorHandler(BurgerBuilder, axios)