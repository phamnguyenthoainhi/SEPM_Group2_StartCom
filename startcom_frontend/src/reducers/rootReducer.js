import {combineReducers} from 'redux';
import BIReducer from './BIReducer';
import businessIdeas from './BIReducer';

export default combineReducers({
    businessIdeas: BIReducer
    
});
