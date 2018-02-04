import * as actionType from '../actionTypes'


function dictionary( state = [], action) {
    switch (action.type) {
        case actionType.SUCCESS_GET_NEWS:
            return [...action.news];
        default :
            return state;
    }
}

export default dictionary;