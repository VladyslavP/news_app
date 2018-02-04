import { actionCreator, getDataAction} from '../../Common/actions';
import * as actionType from '../actionTypes'

export function getNews() {
    return (dispatch) => {
        dispatch(actionCreator(actionType.REQUEST_BEGIN));

        return getDataAction()
            .then((data) => {

                dispatch(actionCreator(actionType.SUCCESS_GET_NEWS, {news: data.sources}));
                dispatch(actionCreator(actionType.REQUEST_END));

                return Promise.resolve(data.sources);
            })
            .catch((error) => {
                dispatch(actionCreator(actionType.REQUEST_END));

                return Promise.reject(error)
            });
    }
}

export function getParticularNews(data, id) {
    console.log(data);
    return (dispatch) => {
        dispatch(actionCreator(actionType.REQUEST_BEGIN));
        const url = `/everything?sources=${data.id}&`;

        return getDataAction(url)
            .then((data) => {

                dispatch(actionCreator(actionType.SUCCESS_GET_PARTICULAR_NEWS, {id: id, articles: data.articles}));
                dispatch(actionCreator(actionType.REQUEST_END));
                return Promise.resolve(data.articles);
            })
            .catch((error) => {
                dispatch(actionCreator(actionType.REQUEST_END));

                return Promise.reject(error)
            });
    }
}


export function getNewsFromLocalStorage(news) {
    return (dispatch) => {
        dispatch(actionCreator(actionType.SUCCESS_GET_NEWS, {news: news}));
        return Promise.resolve();
    }
}

export function getArticlesFromLocalStorage(articles,id) {
    return (dispatch) => {
        dispatch(actionCreator(actionType.SUCCESS_GET_PARTICULAR_NEWS, {articles, id}));
        return Promise.resolve();
    }
}

export function getSortedArticles(id, sortBy) {

    return (dispatch) => {
        dispatch(actionCreator(actionType.REQUEST_BEGIN));
        let url;
        if(sortBy === 'top'){
            url = `/top-headlines?sources=${id}&`;
        } else {
            url = `/everything?sources=${id}&sortBy=${sortBy}&`;
        }
        return getDataAction(url)
            .then((data) => {
                dispatch(actionCreator(actionType.REQUEST_BEGIN));
                dispatch(actionCreator(actionType.SUCCESS_GET_SORTED_ARTICLES, {articles: data.articles, id: id, sortBy: sortBy}));
                return Promise.resolve(data.articles);
            });
    }


}


