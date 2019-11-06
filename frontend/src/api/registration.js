import { toast } from 'react-toastify';
import { API } from './axiosConf';


async function registration(userdata) {
    let nameU = userdata.email.split('@', 1);
    let datasend = {
        "email": userdata.email,
        "username": nameU[0],
        "password": userdata.password
    }
    try {
        let response = await API.post('api/user/register', datasend)
        if(response.status === 208)
            toast.info(response.data);
        else
            toast.success('Registration successfull');
        return response.status;
    }
    catch (error) {
        throw TypeError('Error' + error.message);
    }
}

export { registration };

async function socialRegistration(userdata) {
    let nameU = userdata.email.split('@', 1);
    let datasend = {
        "username": nameU[0],
        "password": userdata.password,
        "email": userdata.email,
        "first_name": userdata.first_name,
        "last_name": userdata.last_name,
        "avatar_url": userdata.picture
    }
    try {
        await API.post('api/user/social/register', datasend)
        toast.success('Registration successfull');
    }
    catch (error) {
        throw TypeError('Error' + error.message);
    }
}

export { socialRegistration };
