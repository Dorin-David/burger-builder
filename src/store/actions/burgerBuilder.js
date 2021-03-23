import * as actionTypes from './actionTypes';
import axios from '../../axios-orders'

const addIngredient = name => ({
    type: actionTypes.ADD_INGREDIENT,
    ingredient: name
})

const removeIngredient = name => ({
    type: actionTypes.REMOVE_INGREDIENT,
    ingredient: name
})

const setIngredients = ingredients => ({
      type: actionTypes.SET_INGREDIENTS,
      ingredients
})

const setFetchIngredientsError = () => ({
    type: actionTypes.SET_FETCH_INGREDIENT_ERROR,
})

const initIngredients = () => {
    return dispatch => {
        axios.get('https://react-burger-builder-7e9c0-default-rtdb.firebaseio.com/ingredients.json')
            .then(res => {
                dispatch(setIngredients(res.data))
            })
            .catch(err => {
               dispatch(setFetchIngredientsError())
            })
    }
}


export {addIngredient, removeIngredient, setIngredients, initIngredients, setFetchIngredientsError}