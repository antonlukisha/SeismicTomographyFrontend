import makeRequest from "./makeRequest";

export const getTasks = () => makeRequest(`/api/v1/task`, 'GET')