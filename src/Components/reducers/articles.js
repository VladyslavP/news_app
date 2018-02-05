import * as actionType from '../actionTypes';

function dictionary(state = {}, action) {
    switch (action.type) {
        case actionType.SUCCESS_GET_PARTICULAR_NEWS:
            const newState = {
                [action.id]: {
                    latest: action.articles
                }
            };
            return {...state, ...newState};

        case actionType.SUCCESS_GET_SORTED_ARTICLES: {
            const {[action.id]: elementToChange, ...rest} = state;
            elementToChange[action.sortBy] = action.articles;
            return {
                ...rest,
                ...{
                    [action.id]: elementToChange
                }
            };
        }
        default:
            return state;
    }
}

export default dictionary;
