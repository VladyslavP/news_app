import * as actionType from '../actionTypes'


function dictionary( state = [], action) {
    switch (action.type) {
        case actionType.SUCCESS_GET_PARTICULAR_NEWS:
            const newState = [...action.articles].reduce((res, item) => {
                res[item.source.id] = item;
                return res;
            }, {});

            return [...state, ...action.articles];
        default :
            return state;
    }
}

export default dictionary;