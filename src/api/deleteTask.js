import makeRequest from "./makeRequest";

export const deleteTask = (id) => makeRequest(`/api/v1/task/${id}`, 'DELETE')