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

export const createCategory = (data) => postRequest('/categories', data);
export const getAllCategories = () => getRequest('/categories');
export const deleteCategory = (id) => deleteRequest(`/categories/${id}`);
export const updateCategory = (id, data) => putRequest(`/categories/${id}`, data);
export const createProduct = data => postRequest('/products', data);
export const getAllProducts = () => getRequest('/products');
export const getAllCustomers = () => getRequest('/customers');
export const deleteProduct = id => deleteRequest(`/products/${id}`);
export const updatedProduct = (id, data) => putRequest(`/products/${id}`, data);
export const getAllOrders = () => getRequest('/orders');
export const updateOrder = (id, data) => putRequest(`/orders/${id}`, data);
export const getOrdersBetweenDateRange = (startDate, endDate) => getRequest(`/orders?{"createdDate":{"$gte":${startDate},"$lte":${endDate}}}`);
export const createMessage = data => postRequest('/messages', data);
export const getAllMessages = () => getRequest('/messages');
export const updateMessages = (id, data) => putRequest(`/messages/${id}`, data);
export const deleteMessages = id => deleteRequest(`/messages/${id}`);