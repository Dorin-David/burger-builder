import { ADD_INGREDIENT, REMOVE_INGREDIENT } from './actions';


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
    ingredients: {
        salad: 0,
        tomato: 0,
        cheese: 0,
        meat: 0,
        bacon: 0,
    },
    totalPrice: 4,
    purchasable: false
}


const ingredientsReducer = (state = initialState, action) => {
    const { type, ingredient } = action;

    switch (type) {
        case ADD_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [ingredient]: state.ingredients[ingredient] + 1
                },
               totalPrice: state.totalPrice + INGREDIENTS_PRICES[ingredient],
               purchasable: updatePurchaseState(state.ingredients)
            }

        case REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [ingredient]: state.ingredients[ingredient] - 1
                },
                totalPrice: state.totalPrice - INGREDIENTS_PRICES[ingredient],
                purchasable: updatePurchaseState(state.ingredients)
            }

        default:
            return state
    }
}

export default ingredientsReducer




