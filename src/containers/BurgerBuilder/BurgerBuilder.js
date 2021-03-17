import React, { Component, Fragment } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../components/hoc/withErrorHandler/withErrorHandler';
import {ADD_INGREDIENT, REMOVE_INGREDIENT} from '../../store/actions';
import {connect} from 'react-redux';


class BurgerBuilder extends Component {

    state = {
        purchasing: false,
        loading: false,
        error: false
    }
    componentDidMount() {
        //postpone dynamic ingredients retrieving for async redux

        // axios.get('https://react-burger-builder-7e9c0-default-rtdb.firebaseio.com/ingredients.json')
        //     .then(res => {
        //         this.setState({ ingredients: res.data })
        //     })
        //     .catch(err => {
        //         this.setState({ error: true })
        //     })
    }
    purchaseHandler = () => {
        this.setState({ purchasing: true })
    }

    cancelPurchasing = () => {
        this.setState({ purchasing: false })
    }

    continuePurchasing = () => { 
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

const mapStateToProp = state => ({
    ingredients: state.ingredients,
    totalPrice: state.totalPrice,
    purchasable: state.purchasable
})

const dispatchToProps = dispatch => ({
    addIngredient: (ingredient) => dispatch({type: ADD_INGREDIENT, ingredient}),
    removeIngredient: (ingredient) => dispatch({type: REMOVE_INGREDIENT, ingredient})
})


export default connect(mapStateToProp, dispatchToProps)(withErrorHandler(BurgerBuilder, axios))