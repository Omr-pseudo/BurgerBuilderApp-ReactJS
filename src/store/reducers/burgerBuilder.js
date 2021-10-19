import * as actionType from '../actions/actionsTypes';

import { updateObject } from '../utility';




const initialState = {
    Ingredients: null,
    Total_price : 4,
    error: false,
    building: false
}

const INGREDIENTS_PRICES = {

    salad: 0.5,
    cheese: 0.5,
    meat: 1.3,
    bacon: 0.7
    
};

const addIngredient = (state, action) => {
        const updatedIngredient = {[action.ingredientsName]: state.Ingredients[action.ingredientsName] +1};

        const updatedIngredients = updateObject(state.Ingredients, updatedIngredient);

        const updatedState = {
            Ingredients: updatedIngredients,
            Total_price: state.Total_price + INGREDIENTS_PRICES[action.ingredientsName],
            building: true
        }
        
        return updateObject(state, updatedState); 
}


const removeIngredient = (state, action ) => {
            const updatedIng = {[action.ingredientsName]: state.Ingredients[action.ingredientsName] - 1};

            const updatedIngs = updateObject(state.Ingredients, updatedIng);
    
            const updatedStat = {
                Ingredients: updatedIngs,
                Total_price: state.Total_price - INGREDIENTS_PRICES[action.ingredientsName],
                building: true
            }
            
            return updateObject(state, updatedStat);
}

const setIngredient = (state, action ) => {
    return updateObject(state, {
        
        Ingredients: {
        salad : action.ingredients.salad,
        bacon: action.ingredients.bacon,
        cheese: action.ingredients.cheese,
        meat: action.ingredients.meat
    },
    Total_price: 4,
    error: false,
    building: false
})

}

const fetchIngsFailed = (state, action ) => {
    return updateObject(state, {error: true})
}


const reducer = (state = initialState, action) => {

    switch(action.type){

        case actionType.ADD_INGREDIENT: return addIngredient(state, action);
        case actionType.REMOVE_INGREDIENT: return removeIngredient (state, action);
        case actionType.SET_INGREDIENTS: return setIngredient (state, action);
        case actionType.FETCH_INGREDIENTS_FAILED: return fetchIngsFailed(state, action);
        
        default: return state;            
    }

};

export default reducer;