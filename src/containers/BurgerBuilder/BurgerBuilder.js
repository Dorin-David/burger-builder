import React, { Component, Fragment } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';


const INGREDIENTS_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

class BurgerBuilder extends Component {

    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        purchasable: false,
        purchasing: false

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
        alert('Eat it bro!')
    }

    render() {

        const isItemPositive = {
            ...this.state.ingredients
        }
        for (let item in isItemPositive) {
            isItemPositive[item] = isItemPositive[item] <= 0;
        }

        return (
            <Fragment>
                <Modal showModal={this.state.purchasing} closeModal={this.cancelPurchasing}>
                    <OrderSummary
                        ingredients={this.state.ingredients}
                        cancelPurchasing={this.cancelPurchasing}
                        continuePurchasing={this.continuePurchasing}
                        totalPrice={this.state.totalPrice}
                    /></Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    addIngredient={this.addIngredientHandler}
                    removeIngredient={this.removeIngredientHandler}
                    disableRemoving={isItemPositive}
                    currentPrice={this.state.totalPrice}
                    isPurchasable={this.state.purchasable}
                    purchasing={this.purchaseHandler}
                />
            </Fragment>
        )
    }
}

export default BurgerBuilder