import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

const purchaseBurgerStart = () => ({
    type: actionTypes.PURCHASE_BURGER_START,
})

const purchaseBurgerSuccess = (id, orderData) => ({
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    id,
    orderData

})

const purchaseBurgerFail = error => ({
    type: actionTypes.PURCHASE_BURGER_FAIL,
    error
})

export const initPurchase = () => ({
    type: actionTypes.PURCHASE_INIT
})

export const purchaseBurger = (orderData, token) => {
    return dispatch => {
        dispatch(purchaseBurgerStart())
        axios.post('/orders.json?auth=' + token, orderData)
            .then(res => {
                dispatch(purchaseBurgerSuccess(res.data.name, orderData))
            })
            .catch(rej => {
                dispatch(purchaseBurgerFail(rej))
            })

    }
}

export const fetchOrdersStart = () => ({
    type: actionTypes.FETCH_ORDERS_START
})


export const fetchOrdersSuccess = orders => ({
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders
})


export const fetchOrdersFail = error => ({
    type: actionTypes.FETCH_ORDERS_FAIL,
    error
})

export const fetchOrders = (token) => {
    return dispatch => {
        dispatch(fetchOrdersStart())
        axios.get('/orders.json?=auth=' + token)
        .then(res => {
            let fetchedOrders = [];
            for (let key in res.data) {
                fetchedOrders.push({
                    ...res.data[key],
                    id: key
                })
            }
            dispatch(fetchOrdersSuccess(fetchedOrders))

        })
        .catch(rej => {
            dispatch(fetchOrdersFail(rej))
        })
    }

}

