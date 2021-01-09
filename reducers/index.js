const { RECEIVE_ENTRRIES, ADD_ENTRY } = require("../actions");


function entries(store = {}, action) {
    switch(action.type) {
        case RECEIVE_ENTRRIES:
            return {
                ...state,
                ...action.entries
            };
        case ADD_ENTRY: 
        return {
           ...state,
           ...action.entry
        };
        default:
            return state;
    }
}

export default entries