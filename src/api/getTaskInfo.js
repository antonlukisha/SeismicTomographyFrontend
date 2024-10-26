import makeRequest from "./makeRequest";

export const getTaskInfo = (id) => makeRequest(`/api/v1/geo/${id}/seisdata`, 'GET')