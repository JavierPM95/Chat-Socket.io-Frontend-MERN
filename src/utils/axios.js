const axios = require('axios');
const { URL_API } = require('../config.js');
const urlBase = URL_API;
const httpRequest = {}

const readUrl = (url = '') =>
    url.startsWith('http://') || url.startsWith('https://') ? url : `${urlBase}${url}`

const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    // USUARIO Y CONTRASE;A
}

httpRequest.get = (url = '', options = {}) => axios.get(readUrl(url), {
    headers: {
        ...headers,
        ...options.headers
    },
    ...options
});

httpRequest.post = (url = '', body = {}, options = {}) => axios.post(readUrl(url), body, {
    headers: {
        ...headers,
        ...options.headers
    },
    ...options
})

httpRequest.put = (url = '', body = {}, options = {}) => axios.put(readUrl(url), body, {
    headers: {
        ...headers,
        ...options.headers
    },
    ...options
})

httpRequest.delete = (url = '', headers = {}) => axios.delete(readUrl(url), {
    headers: {
        ...headers,
    }
})

export default httpRequest;