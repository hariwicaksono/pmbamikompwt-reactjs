const TOKEN_KEY = 'isLogin';

export const login = () => {
    sessionStorage.setItem(TOKEN_KEY, 'TestLogin');
}

export const logout = () => {
    sessionStorage.removeItem(TOKEN_KEY);
}

export const isLogin = () => {
    if (sessionStorage.getItem(TOKEN_KEY)) {
        return true;
    }

    return false;
}