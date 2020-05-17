import {combineReducers} from 'redux';
import BIReducer from './BIReducer';
import UsersReducer from './UsersReducer';
import UIReducer from "./UIReducer";

import AdminReducer from './AdminReducer';
import ConsultantsReducer from "./ConsultantsReducer";
import InvestorsReducer from "./InvestorsReducer";
export default combineReducers({

    businessIdeasData: BIReducer,
    userData: UsersReducer,
    UI: UIReducer,

    consultantsReducer: ConsultantsReducer,
    investorsReducer: InvestorsReducer,

    adminReducer: AdminReducer,
    usersReducer: UsersReducer,
    BIReducer: BIReducer,

});
