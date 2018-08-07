const API_URL = 'http://localhost:2403';

const defaultHeaders = () => {
    const headers = new Headers();
    headers.append('Accept', 'application/json, text/plain, */*');
    headers.append('Content-Type', 'application/json');
    return headers;
};

const getRequest = url => {
    return fetch(`${API_URL}${url}`, {
        method: 'GET',
        mode: 'cors',
        headers: defaultHeaders()
    }).then(response => response.json());
};

const postRequest = (url, data) => {
    return fetch(`${API_URL}${url}`, {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify(data),
        headers: defaultHeaders()
    }).then(response => response.json());
};

const putRequest = (url, data) => {
    return fetch(`${API_URL}${url}`, {
        method: 'PUT',
        mode: 'cors',
        body: JSON.stringify(data),
        headers: defaultHeaders()
    }).then(response => response.json());
};

const deleteRequest = url => {
    return fetch(`${API_URL}${url}`, {
        method: 'DELETE',
        mode: 'cors',
        headers: defaultHeaders()
    }).then(response => response.json());
};

export const getAllCategories = () => getRequest('/categories');
export const getAllProducts = () => getRequest('/products');
export const getAllOrders = () => getRequest('/orders');
