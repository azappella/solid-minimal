import { SERVER_URL } from '../constants';

export function getBaseUrl() {
    return `${SERVER_URL}`;
}

// Note that the promise won't be rejected in case of HTTP 4xx or 5xx server responses.
// The promise will be resolved just as it would be for HTTP 2xx.
// So we inspect the response.status (response.ok is true for HTTP 2xx) and throw otherwise.
export function checkStatus(response) {
    if (!response.ok) {
        const error = new Error(response.statusText);
        error.response = response;
        throw error;
    }
    return response;
}

export function toJson(response) {
    // yields the result of JSON.parse(response)
    return response.json();
}

export function toBlob(response) {
    return response.blob();
}

export const toQueryParams = (params) => {
    return Object.keys(params)
        .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`)
        .join('&');
};

export const appendUriToBaseUrl = (uri) => `${getBaseUrl()}${uri}`;

export const fetchAndCheck = (url, options) => fetch(url, options).then(checkStatus);

export const request = (method, url, data, options) => {
    const defaultOptions = {
        method: method.toUpperCase(),
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        credentials:  'same-origin',
    };

    const settings = { ...defaultOptions, ...options };

    if (data) {
        if (settings.method === 'GET') {
            const finalUrl = `${url}${url.includes('?') ? '&' : '?'}${toQueryParams(data)}`;
            return fetchAndCheck(appendUriToBaseUrl(finalUrl), settings);
        }

        if (settings['Content-Type'].includes('json')) {
            settings.body = JSON.stringify(data);
        } else {
            settings.body = data;
        }

    }

    return fetchAndCheck(appendUriToBaseUrl(url), settings);
};

export const hGet = (url, data, options = {}) =>
    request('GET', url, data, options);
export const hPost = (url, data, options = {}) =>
    request('POST', url, data, options);
export const hPut = (url, data, options = {}) =>
    request('PUT', url, data, options);
export const hPatch = (url, data, options = {}) =>
    request('PATCH', url, data, options);
export const hDelete = (url, data, options = {}) =>
    request('DELETE', url, data, options);

export const jsonRequest = (method, url, data, options) =>
    request(method, url, data, options).then(toJson);

export const jsonGet = (url, data, options = {}) =>
    jsonRequest('GET', url, data, options);
export const jsonPost = (url, data, options = {}) =>
    jsonRequest('POST', url, data, options);
export const jsonPut = (url, data, options = {}) =>
    jsonRequest('PUT', url, data, options);
export const jsonPatch = (url, data, options = {}) =>
    jsonRequest('PATCH', url, data, options);
export const jsonDelete = (url, data, options = {}) =>
    jsonRequest('DELETE', url, data, options);