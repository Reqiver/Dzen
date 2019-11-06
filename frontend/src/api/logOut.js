import { API } from './axiosConf';

async function logOut() {
    try {
        await API.get('api/user/logout')
            localStorage.removeItem('token');
            localStorage.removeItem('avatar_url')
    } catch (error) {
    	localStorage.removeItem('token');
        localStorage.removeItem('avatar_url')
        throw TypeError('Error: ' + error.message);
    }
}

export { logOut };
