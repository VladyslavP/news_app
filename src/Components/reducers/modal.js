import * as actionType from '../actionTypes';

function dictionary(state, action) {
    switch (action.type) {
        case actionType.SUCCESS_MODAL_VISIBLE:
            return true;
        case actionType.SUCCESS_MODAL_HIDDEN:
            return false;
        default:
            return false;
    }
}

export default dictionary;
