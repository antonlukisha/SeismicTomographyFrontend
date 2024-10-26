import makeRequest from "./makeRequest";
export const getTasksCount = () => makeRequest(`/api/v1/task/count`, 'GET')