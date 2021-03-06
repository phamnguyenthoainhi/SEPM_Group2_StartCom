import {
    GET_ALL_BIS,
    GET_BI,
    GET_BI_BY_OWNER,
    IS_REGISTERED_SUCCESS,
    RESET_REGISTER,
    UPDATE_BI,
    DELETE_BI,
    LOADING_DATA,
    REGISTER_BI_LOADING, FILTER_BI, RESET_FILTER, CLEAR_FILTER, SEARCH_BI
} from '../actions/actionTypes';

const initialState = {
    loading: false,
    businessIdea: {},
    businessIdeas: [],
    isRegisteredSuccess: false,
    isRegisteredLoading: false,
    filteredIdeas: [],
    name: '',
    filtered: false,
};


export default function (state = initialState, action) {
    switch(action.type) {

        case LOADING_DATA:
            return {
                ...state,
                loading: true
            };

        case GET_ALL_BIS:
            return {
                ...state,
                businessIdeas: action.payload,
                loading: false
            };

        case GET_BI:
            return {
                ...state,
                businessIdea: action.payload,
                loading: false
            };

        case GET_BI_BY_OWNER:
            return {
                ...state,
                businessIdea: action.payload,
                loading: false
            };

        case IS_REGISTERED_SUCCESS:
            return {
                ...state,
                isRegisteredSuccess: action.payload,
                isRegisteredLoading: false
            };
        case RESET_REGISTER:
            return {
                ...state,
                isRegisteredSuccess: false,
                isRegisteredLoading: false
            };
        case REGISTER_BI_LOADING:
            
            return {
                ...state,
                isRegisteredLoading: true
            };
        case UPDATE_BI:
            return {
                ...state,
                businessIdea: action.payload,
                loading: false
            };
        case DELETE_BI:
            return {
                ...state,
                loading: false
            };
        case FILTER_BI:
            return {
                ...state,
                filteredIdeas: action.payload,
                filtered: true
            };
        case RESET_FILTER:
            return{
                ...state,
                filteredIdeas:[],
                filtered: false
            };
        case CLEAR_FILTER:
            return{
                ...state,
                filteredIdeas: []
            };
        case SEARCH_BI:
            return {
                ...state,
                businessIdea: action.payload,
                name: action.payload.name,
                loading: false
            };

        default:
            return state;                
    }
}
