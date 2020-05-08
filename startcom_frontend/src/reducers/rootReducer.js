import {combineReducers} from 'redux';
import BIReducer from './BIReducer';
import UsersReducer from './UsersReducer';
import UIReducer from "./UIReducer";

import AdminReducer from './AdminReducer';
export default combineReducers({

    businessIdeasData: BIReducer,
    userData: UsersReducer,
    UI: UIReducer,

    adminReducer: AdminReducer,
    usersReducer: UsersReducer,
    BIReducer: BIReducer,

});
