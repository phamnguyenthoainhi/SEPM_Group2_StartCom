import { READ_BI,FILTER_BI, CLEAR_FILTER, IS_REGISTERED_SUCCESS,RESET_FILTER, RESET_REGISTER, UPDATE_BI, DELETE_BI, FETCH_BI, SEARCH_BI} from '../actions/actionTypes';

const initialState = {
    businessIdea: {},
    businessIdeas: [],
    isRegisteredSuccess: false,
    filteredIdeas: [],
    category: '',
    needInvestor: false,
    needConsultant: false,
    name: "",
    filtered:false
};

export default function (state = initialState, action) {
    switch (action.type) {
        case READ_BI:
            return {
                ...state,
                businessIdeas: action.payload
            };
        case FILTER_BI:
            return {
                ...state,
                filteredIdeas:action.payload,
                filtered:true
            };
        case RESET_FILTER:
            return{
                ...state,
                filteredIdeas:[],
                filtered:false
            }
        case CLEAR_FILTER:
            return{
                ...state,
                filteredIdeas:[]
            }
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
                businessIdeas: action.payload
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
