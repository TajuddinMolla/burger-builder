import * as actionType from '../actions/actionTypes'


const initialState = {
    ingredient: null,
    totalPrice: 4,
    buildingBurger: false
}
const price = {
    cheese: 0.4,
    salad: 0.6,
    meat: 1,
    bacon: 0.5,
};
const burgerBuilder = (state = initialState, action) =>{
    switch(action.type){
        case actionType.ADD_INGREDIENT:
            return{
                ...state,
                ingredient:{
                    ...state.ingredient,
                    [action.ingredientName]: state.ingredient[action.ingredientName] + 1
                },
                totalPrice: state.totalPrice + price[action.ingredientName],
                buildingBurger: true
                
            };
        case actionType.REMOVE_INGREDIENT:
            return{
                ...state,
                ingredient:{
                    ...state.ingredient,
                    [action.ingredientName]: state.ingredient[action.ingredientName] - 1
                },
                totalPrice: state.totalPrice - price[action.ingredientName],
                buildingBurger: true
            };
            case actionType.SET_INGREDIENT:
                return{
                    ...state,
                    ingredient: action.ingredient,
                    totalPrice: 4,
                    buildingBurger: false
                };
        default:
            return state;
    }
    return state;
}


export default burgerBuilder;