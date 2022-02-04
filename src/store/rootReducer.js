import { combineReducers } from "redux";
import burgerBuilderReducer from './reducers/burgerBuilder';
import authReducer from './reducers/auth';



const rootReducer= combineReducers({
    burger: burgerBuilderReducer,
    auth: authReducer
});
export default rootReducer;