import axios from 'axios';
import config from '../../Utils';


export function actionCreator(actionType, data = {}) {
    return {
        type: actionType,
        ...data
    };
}


function dataAction(method, url, params = null, headers = {}) {
    console.log(config);
    const conf = {
        url: url ? (config.webApi + url + 'apiKey=' + config.key) : (config.webApi + '/sources?apiKey=' + config.key),
        method: method,
        params: method === 'get' ? params : null,
        data: method === 'put' || method === 'post' || method === 'patch' || method === 'delete' ? params : null
    };

    return axios.request(conf)
        .then(response => {
            return Promise.resolve(response.data);
        })
        .catch((error) => {
            return Promise.reject(error);
        });
}

export function getDataAction(url, params = null, headers = {}) {
    return dataAction('get', url, params, headers);
}