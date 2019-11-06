import { API } from './axiosConf';


async function userLogin(props) {
    const { email, password } = props;
    try {
        const response = await API.post('api/user/login', { email, password })
            let auth_token = response.data.token;
            localStorage.setItem('token', auth_token)
            localStorage.setItem('avatar_url', response.data.avatar_url)
    } catch(error) {
        throw TypeError('Error: ' + error.message);
    };
}

async function userSocialLogin(props) {
    const { email, access_token, network_name } = props;
    try {
        const response = await API.post('api/user/social/login', { email, access_token, network_name })
            let auth_token = response.data.token;
            localStorage.setItem('token', auth_token)
            localStorage.setItem('avatar_url', response.data.avatar_url)
    } catch (error) {
        throw TypeError('Error: ' + error.message);
    }
}

export { userLogin, userSocialLogin };
