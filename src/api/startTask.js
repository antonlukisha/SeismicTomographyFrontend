import makeRequest from "./makeRequest";
export const startTask = (id, data) => makeRequest(`/api/v1/proc/data/${id}`, 'POST', data)