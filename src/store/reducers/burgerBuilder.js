import * as actionTypes from '../actions/actionTypes'
// import { ADD_INGREDIENT, REMOVE_INGREDIENT } from '../actions/actionTypes';


function updatePurchaseState(ingredients) {
    const ingredientsCopy = {
        ...ingredients
    }
    const ingredientsTotal = Object.keys(ingredientsCopy).reduce((accum, item) => accum + ingredientsCopy[item], 0);
    return  ingredientsTotal > 0
}


const INGREDIENTS_PRICES = {
    salad: 0.5,
    tomato: 0.6,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7,
}

const initialState = {
    ingredients: null,
    totalPrice: 4,
    purchasable: false,
    error: false
}


const ingredientsReducer = (state = initialState, action) => {
    // const { type, ingredient } = action;

    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredient]: state.ingredients[action.ingredient] + 1
                },
               totalPrice: state.totalPrice + INGREDIENTS_PRICES[action.ingredient],
               purchasable: updatePurchaseState(state.ingredients)
            }

        case actionTypes.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredient]: state.ingredients[action.ingredient] - 1
                },
                totalPrice: state.totalPrice - INGREDIENTS_PRICES[action.ingredient],
                purchasable: updatePurchaseState(state.ingredients)
            }
        case actionTypes.SET_INGREDIENTS:
            return {
                ...state,
                ingredients: action.ingredients,
                error: false
            }

        case actionTypes.SET_FETCH_ERROR: 
          return {
              ...state,
              error: true
          }

        default:
            return state
    }
}

export default ingredientsReducer




