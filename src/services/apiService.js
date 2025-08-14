import axios from '../utils/axiosCustomize';
const postCreateNewUser = (Email, Password, Username, Role, Image) => {
    const data = new FormData();
    data.append('email', Email);
    data.append('password', Password);
    data.append('username', Username);
    data.append('role', Role);
    data.append('userImage', Image);
    return axios.post('/api/v1/participant', data);
}
const getAllUsers = () => {
    return axios.get('/api/v1/participant/all');
}
const putUpdateUser = (ID, Username, Role, Image) => {
    const data = new FormData();
    data.append('id', ID);
    data.append('username', Username);
    data.append('role', Role);
    data.append('userImage', Image);
    return axios.put('/api/v1/participant', data);
}
const deleteUser = (ID) => {

    return axios.delete('/api/v1/participant', { data: { id: ID } });
}
const getUsersWithPaginate = (page, limit) => {

    return axios.get(`/api/v1/participant?page=${page}&limit=${limit}`);
}
const postLoginUser = (Email, Password) => {
    return axios.post(`/api/v1/login`, { email: Email, password: Password });
}
const postRegisterUser = (Email, Username, Password) => {
    return axios.post(`/api/v1/register`, { email: Email, username: Username, password: Password });
}
export {
    postCreateNewUser, getAllUsers, putUpdateUser, deleteUser,
    getUsersWithPaginate, postLoginUser, postRegisterUser
}