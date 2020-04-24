import {combineReducers} from 'redux';
import BIReducer from './BIReducer';
import UsersReducer from './UsersReducer';
import UIReducer from "./UIReducer";
export default combineReducers({
    businessIdeas: BIReducer,
    registerMessage: UsersReducer,
    UI: UIReducer
});
