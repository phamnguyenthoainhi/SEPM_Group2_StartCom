import {combineReducers} from 'redux';
import BIReducer from './BIReducer';
import businessIdeas from './BIReducer';
import InvestorReducer from "./InvestorReducer";
import ConsultantReducer from "./ConsultantReducer"

export default combineReducers({
    businessIdeas: BIReducer,
    investors: InvestorReducer,
    consultants: ConsultantReducer,

});
