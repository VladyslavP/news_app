import * as actionType from '../actionTypes'


function dictionary( state = {}, action) {
    switch (action.type) {
        case actionType.SUCCESS_GET_PARTICULAR_NEWS:

            // const newState = [...action.articles].reduce((res, item) => {
            //     return res[item.source.id] = {
            //         latest: item
            //     };
            // }, {});
            console.log(action);
            const newState = {
                [action.id]: {
                    latest: action.articles
                }
            };
            return {...state, ...newState};

        case actionType.SUCCESS_GET_SORTED_ARTICLES: {
            const {[action.id]: elementToChange, ...rest} = state;
            elementToChange[action.sortBy] = action.articles;
            console.log(elementToChange, action);
            return {
                ...rest,
                ...{
                    [action.id]: elementToChange
                }
            };
        }

        default :
            return state;
    }
}

export default dictionary;