import axios from 'axios';
import config from '../../Utils';

export function actionCreator(actionType, data = {}) {
    return {
        type: actionType,
        ...data
    };
}

function dataAction(method, url, params = null) {
    const conf = {
        url: url ? (config.webApi + url + 'apiKey=' + config.key) : (config.webApi + '/sources?apiKey=' + config.key),
        params: method === 'get' ? params : null,
        data: method === 'put' || method === 'post' || method === 'patch' || method === 'delete' ? params : null,
        method
    };

    return axios.request(conf)
        .then(response => Promise.resolve(response.data))
        .catch(error => Promise.reject(error));
}

export function getDataAction(url, params = null, headers = {}) {
    return dataAction('get', url, params, headers);
}
