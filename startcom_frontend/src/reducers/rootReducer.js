import {combineReducers} from 'redux';
import BIReducer from './BIReducer';
import UsersReducer from './UsersReducer';
import UIReducer from "./UIReducer";

import AdminReducer from './AdminReducer';
export default combineReducers({

    businessIdeasData: BIReducer,
    registerMessage: UsersReducer,
    UI: UIReducer,

    loginMessage: UsersReducer,
    registerLoading: UsersReducer,
    loginLoading: UsersReducer,
    unverifiedEmails: AdminReducer,
    emailLoading: AdminReducer,
    verifySuccess: AdminReducer,
    loadingVerify: AdminReducer,
    deleteLoading: AdminReducer,
    deleteSuccess: AdminReducer,
    sendMessageLoading: UsersReducer,
    sendMessageSuccess: UsersReducer,
    profileLoading: UsersReducer,
    profileReceiver: UsersReducer,
    profileSender: UsersReducer,

    

});