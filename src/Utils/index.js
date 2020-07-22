import { NotificationManager } from 'react-notifications'

const TOKEN_KEY = 'isLogin';

export const login = () => {
    sessionStorage.setItem(TOKEN_KEY, 'TestLogin');
}

export const logout = () => {
    sessionStorage.removeItem(TOKEN_KEY);
    window.location.href = '/';
    NotificationManager.success('Berhasil keluar sistem');
}

export const isLogin = () => {
    if (sessionStorage.getItem(TOKEN_KEY)) {
        return true;
    }

    return false;
}