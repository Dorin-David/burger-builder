import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

//sets loading to true while the order is loading
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

export const purchaseBurger = (orderData) => {
    return dispatch => {
        dispatch(purchaseBurgerStart())
        axios.post('/orders.json', orderData)
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

export const fetchOrders = () => {
    return dispatch => {
        dispatch(fetchOrdersStart())
        axios.get('/orders.json')
        .then(res => {
            let fetchedOrders = [];
            for (let key in res.data) {
                fetchedOrders.push({
                    ...res.data[key],
                    id: key
                })
            }
            dispatch(fetchOrdersSuccess(fetchedOrders))
            // this.setState({ loading: false, orders: fetchedOrders })

        })
        .catch(rej => {
            dispatch(fetchOrdersFail(rej))
        })
    }

}

