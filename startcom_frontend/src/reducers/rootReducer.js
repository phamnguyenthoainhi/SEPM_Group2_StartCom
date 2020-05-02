import {combineReducers} from 'redux';
import BIReducer from './BIReducer';
import businessIdeas from './BIReducer';
import InvestorReducer from "./InvestorReducer"

export default combineReducers({
    businessIdeas: BIReducer,
    investors: InvestorReducer,
    
});
