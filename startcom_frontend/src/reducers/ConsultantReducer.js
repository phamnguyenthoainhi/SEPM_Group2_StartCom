import { READ_CONSULTANT } from '../actions/actionTypes';

const initialState = {
    consultant: {},
    consultants: [],
};

export default function (state = initialState, action) {
    switch (action.type) {
        case READ_CONSULTANT:
            return {
                ...state,
                consultants: action.payload
            };
        default:
            return state;
    }
}