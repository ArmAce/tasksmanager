const BASE_URL_DEV = `http://127.0.0.1:8000/api`

const BASE_URL = BASE_URL_DEV;

export const ENDPOINTS_AUTH = {
    LOGIN: `${BASE_URL}/users/login`,
    CREATE: `${BASE_URL}/users/create`,
    LOGOUT: `${BASE_URL}/users/logout`,
    CHECK: `${BASE_URL}/users/checkUser`,
}

export const ENDPOINTS_TASKS = {
    ALL: `${BASE_URL}/tasks`,
    ADD: `${BASE_URL}/tasks/create`,
}
