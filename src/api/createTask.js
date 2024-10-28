import makeRequest from "./makeRequest";

export const createTask = () => makeRequest('/api/v1/task', 'POST')