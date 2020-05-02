import { READ_BI, IS_REGISTERED_SUCCESS, RESET_REGISTER, UPDATE_BI, DELETE_BI, FETCH_BI, SEARCH_BI, FILTER_BI_BY_CATEGORY, FILTER_BI_BY_INVESTOR, FILTER_BI_BY_CONSULTANT } from '../actions/actionTypes';

const initialState = {
    businessIdea: {},
    businessIdeas: [],
    isRegisteredSuccess: false,
    filteredIdeas: [],
    category: '',
    needInvestor: false,
    needConsultant: false,
    name: "",
};

export default function (state = initialState, action) {
    switch (action.type) {
        case READ_BI:
            return {
                ...state,
                businessIdeas: action.payload,
                filteredIdeas: action.payload
            };
        case IS_REGISTERED_SUCCESS:
            return {
                ...state,
                isRegisteredSuccess: action.payload
            };
        case RESET_REGISTER:
            return {
                ...state,
                isRegisteredSuccess: false
            };
        case UPDATE_BI:
            return {
                ...state,
                businessIdea: action.payload
            };
        case DELETE_BI:
            return {
                ...state,

            };
        case FETCH_BI:
            return {
                ...state,
                businessIdeas: action.payload,
                filteredIdeas: action.payload.items,
            };
        case SEARCH_BI:
            return {
                ...state,
                businessIdea: action.payload,
                name: action.payload.name,
                loading: false
            };
        case FILTER_BI_BY_CATEGORY:
            return {
                ...state,
                filteredIdeas: action.payload.items,
                category: action.payload.category,
                loading: false
            };
        case FILTER_BI_BY_CONSULTANT:
            return {
                ...state,
                filteredIdeas: action.payload.items,
                needConsultant: action.payload.needConsultant,
                loading: false
            };
        case FILTER_BI_BY_INVESTOR:
            return {
                ...state,
                filteredIdeas: action.payload.items,
                needInvestor: action.payload.needInvestor,
                loading: false
            };
        default:
            return state;
    }
}
