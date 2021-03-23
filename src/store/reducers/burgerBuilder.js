import * as actionTypes from '../actions/actionTypes'

function updatePurchaseState(ingredients) {
    const ingredientsCopy = {
        ...ingredients
    }
    const ingredientsTotal = Object.keys(ingredientsCopy).reduce((accum, item) => accum + ingredientsCopy[item], 0);
    return ingredientsTotal > 0
}

//helper function thats uses destructuring for adjusting the order of the ingredients received from the database (originally sorted alphabetically)
function adjustIngredientsOrder({ salad, tomato, bacon, cheese, meat }) {
    return {
        salad,
        tomato,
        cheese,
        bacon,
        meat
    }
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

    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredient]: state.ingredients[action.ingredient] + 1
                },
                totalPrice: state.totalPrice + INGREDIENTS_PRICES[action.ingredient],
                purchasable: updatePurchaseState({...state.ingredients,  [action.ingredient]: state.ingredients[action.ingredient] + 1})
            }

        case actionTypes.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredient]: state.ingredients[action.ingredient] - 1
                },
                totalPrice: state.totalPrice - INGREDIENTS_PRICES[action.ingredient],
                purchasable: updatePurchaseState({...state.ingredients,  [action.ingredient]: state.ingredients[action.ingredient] - 1})
            }
        case actionTypes.SET_INGREDIENTS:
            return {
                ...state,
                ingredients: adjustIngredientsOrder(action.ingredients),
                error: false
            }

        case actionTypes.SET_FETCH_INGREDIENT_ERROR:
            return {
                ...state,
                error: true
            }

        default:
            return state
    }
}

export default ingredientsReducer




