import {combineReducers} from 'redux';
import BIReducer from './BIReducer';
import UsersReducer from './UsersReducer';
export default combineReducers({
    businessIdeas: BIReducer,
    registerMessage: UsersReducer
    
});
