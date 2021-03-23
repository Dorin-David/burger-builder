import React, { Component, Fragment } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../components/hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import {connect} from 'react-redux';



class BurgerBuilder extends Component {

    state = {
        purchasing: false,
    }
    componentDidMount() {
       this.props.initIngredients()
    }
    
    purchaseHandler = () => {
        this.setState({ purchasing: true })
    }

    cancelPurchasing = () => {
        this.setState({ purchasing: false })
    }

    continuePurchasing = () => { 
        this.props.initPurchase()
        this.props.history.push('/checkout')
    }

    render() {

        const isItemPositive = {
            ...this.props.ingredients
        }
        for (let item in isItemPositive) {
            isItemPositive[item] = isItemPositive[item] <= 0;
        }

        let orderSummary = null;
        let burger = this.props.error ? <h2 style={{ textAlign: 'center', color: '#ca3737' }}>An error occurred</h2>
                                      : <Spinner />;
        if (this.props.ingredients) {
            burger = (<Fragment>
                <Burger ingredients={this.props.ingredients} />
                <BuildControls
                    addIngredient={this.props.addIngredient}
                    removeIngredient={this.props.removeIngredient}
                    disableRemoving={isItemPositive}
                    currentPrice={this.props.totalPrice}
                    isPurchasable={this.props.purchasable}
                    purchasing={this.purchaseHandler}
                />
            </Fragment>);
            orderSummary = (<OrderSummary
                ingredients={this.props.ingredients}
                cancelPurchasing={this.cancelPurchasing}
                continuePurchasing={this.continuePurchasing}
                totalPrice={this.props.totalPrice}
            />)
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

const mapStateToProp = state => ({
    ingredients: state.burgerRdx.ingredients,
    totalPrice: state.burgerRdx.totalPrice,
    purchasable: state.burgerRdx.purchasable,
    error: state.burgerRdx.error
})

const mapDispatchToProps = dispatch => ({
    addIngredient: (ingredient) => dispatch(actions.addIngredient(ingredient)),
    removeIngredient: (ingredient) => dispatch(actions.removeIngredient(ingredient)),
    initIngredients: () => dispatch(actions.initIngredients()),
    initPurchase: () => dispatch(actions.initPurchase())
})


export default connect(mapStateToProp, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios))