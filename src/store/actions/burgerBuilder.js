import * as actionType from './actionTypes'
import axios from '../../axios-orders'
export const addIngredient = (ingredientName) => {
    return {
        type: actionType.ADD_INGREDIENT,
        ingredientName: ingredientName
    }
}

export const removeIngredient = (ingredientName) => {
    return {
        type: actionType.REMOVE_INGREDIENT,
        ingredientName: ingredientName
    }
}

export const setIngredient = (ingredient) => {
    return {
        type: actionType.SET_INGREDIENT,
        ingredient: ingredient
    }
}

export const getIngredient = ()=>{
    return dispatch => {
        axios.get('ingredients.json')
            .then(response => {
                dispatch(setIngredient(response.data))
            })
            .catch(error => {
                console.log(error)
            })
    }
}