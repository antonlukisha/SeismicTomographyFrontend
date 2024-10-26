export default async function makeRequest(
    service,
    method,
    { data = {} } = {},
) {
    const hasBody = !["GET", "HEAD"].includes(method);
    const body = hasBody ? JSON.stringify(data) : undefined;
    const headers = { "accept": "application/json" }
    const url = import.meta.env.VITE_API_BASE_URL + service;
    const response = await fetch(url, { method, headers, body });

    return await toApiResponse(response);
}

async function toApiResponse(data) {
    const response = await tryParse(data);
    if (!response) {
        return { succeed: data.ok };
    }
    if (response.error == null && response.content == null) {
        return { succeed: data.ok, content: response };
    }
    const succeed = response.error === null;
    const content = succeed ? response.content : errorToResult(response.error);
    return { succeed, content };
}

async function tryParse(response) {
    return await response.json();
}

function errorToResult(error) {
    if (error.type === 1) return error.content;
    if (error.type === 2) {
        const result = error.content.map(({ field, message }) => [field, message]);
        return Object.fromEntries(result);
    }
    throw new Error(`Unknown api error type ${error.type}.`);
}