import { READ_INVESTOR } from '../actions/actionTypes';

const initialState = {
    investor: {},
    investors: [],
};

export default function (state = initialState, action) {
    switch (action.type) {
        case READ_INVESTOR:
            return {
                ...state,
                investors: action.payload
            };
        default:
            return state;
    }
}