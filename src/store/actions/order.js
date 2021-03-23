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
