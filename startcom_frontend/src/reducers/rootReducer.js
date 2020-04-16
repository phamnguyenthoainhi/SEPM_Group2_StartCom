import {combineReducers} from 'redux';
import BIReducer from './BIReducer';

export default combineReducers({
    businessIdeas: BIReducer,
    
});
