import axios from '../utils/axiosCustomize';
//user
const postCreateNewUser = (Email, Password, Username, Group, Sex, Address, Phone, Image) => {
    const data = new FormData();
    data.append('email', Email);
    data.append('password', Password);
    data.append('username', Username);
    data.append('groupId', Group);
    data.append('sex', Sex);
    data.append('address', Address);
    data.append('phone', Phone);
    data.append('image', Image);
    return axios.post('/api/v1/users', data);
}
// const getAllUsers = () => {
//     return axios.get('/api/v1/participant/all');
// }
const getAllUsers = () => {
    return axios.get('/api/v1/users/all');
}
const putUpdateUser = (ID, Username, Group, Sex, Address, Image) => {
    const data = new FormData();
    data.append('id', ID);
    data.append('username', Username);
    data.append('groupId', Group);
    data.append('sex', Sex);
    data.append('address', Address);
    data.append('image', Image);
    return axios.put('/api/v1/users', data);
}
const deleteUser = (ID) => {

    return axios.delete('/api/v1/users', { data: { id: ID } });
}
const getUsersWithPaginate = (page, limit) => {

    return axios.get(`/api/v1/users?page=${page}&limit=${limit}`);
}
const postLoginUser = (EmailOrPhone, Password) => {
    return axios.post(`/api/v1/login`, { emailorphone: EmailOrPhone, password: Password, delay: 3000 });
}
const postRegisterUser = (Email, Phone, Username, Password) => {
    return axios.post(`/api/v1/register`, { email: Email, phone: Phone, username: Username, password: Password });
}
const postLogout = (refreshToken) => {
    return axios.post('/api/v1/logout', { refreshToken: refreshToken });
}
//Group
const getAllGroup = () => {
    return axios.get('/api/v1/group/all');
}

//Role
const getRoleWithPaginate = (page, limit) => {
    return axios.get(`/api/v1/role?page=${page}&limit=${limit}`);
}
const postCreateNewRole = (data) => {
    return axios.post(`/api/v1/role`, [...data]);
}
const putUpdateRole = (id, url, method, description) => {
    const data = new FormData();
    data.append('id', id);
    data.append('url', url);
    data.append('method', method);
    data.append('description', description);
    return axios.put('/api/v1/role', data);
}
const deleteRole = (id) => {
    return axios.delete('/api/v1/role', { data: { id: id } });
}
//Quiz user
const getQuizByUser = () => {
    return axios.get('/api/v1/quiz-by-user')
}
const getDataQuiz = (quizId) => {
    return axios.get(`/api/v1/questions-by-quiz?quizId=${quizId}`)
}
const postSubmitAnswer = (data) => {
    return axios.post(`/api/v1/quiz-submit`, { ...data })
}


//CRUD Quiz Management
const getQuizWithPaginate = (page, limit) => {
    return axios.get(`/api/v1/quiz?page=${page}&limit=${limit}`);
}

const postCreateNewQuiz = (description, name, difficulty, image) => {
    const data = new FormData();
    data.append('description', description);
    data.append('name', name);
    data.append('difficulty', difficulty);
    data.append('image', image);
    return axios.post('/api/v1/quiz', data);
}
const getAllQuizForAdmin = () => {
    return axios.get('/api/v1/quiz/all');
}
const putUpdateQuiz = (id, description, name, difficulty, image) => {
    const data = new FormData();
    data.append('id', id);
    data.append('description', description);
    data.append('name', name);
    data.append('difficulty', difficulty);
    data.append('image', image);
    return axios.put('/api/v1/quiz', data);
}
const deleteQuiz = (ID) => {
    return axios.delete(`/api/v1/quiz/${ID}`);
}

//Quiz Management : assign quiz to user, update QA 
const postAssignQuiz = (quizId, userId) => {
    return axios.post('/api/v1/quiz-assign-to-user', {
        quizId, userId
    });
}
const getQuizWithQA = (quizId) => {
    return axios.get(`api/v1/quiz-with-qa/${quizId}`)
}
const postUpsertQA = (data) => {
    return axios.post(`/api/v1/quiz-upsert-qa`, { ...data })
}
//Questions management
const postCreateNewQuestion = (quiz_id, description, questionImage) => {
    const data = new FormData();
    data.append('quiz_id', quiz_id);
    data.append('description', description);
    data.append('questionImage', questionImage);
    return axios.post('/api/v1/question', data);
}
const postCreateNewAnswer = (description, correct_answer, question_id) => {

    return axios.post('/api/v1/answer', {
        description, correct_answer, question_id
    });
}

//Dashboard
const getDashboard = () => {
    return axios.get(`/api/v1/overview`)
}

//refresh token
const postRefreshToken = (refreshToken) => {
    return axios.post(`/api/v1/refresh-token`, { refreshToken })
}

//update profile
const postUpdateProfile = (username, userImage) => {
    const data = new FormData();
    data.append('username', username);
    data.append('userImage', userImage);
    return axios.post('/api/v1/profile', data);
}
const postChangePassword = (current_password, new_password) => {
    return axios.post(`/api/v1/change-password`, { current_password, new_password });
}
const getHistory = () => {
    return axios.get(`/api/v1/history`)
}
export {
    postCreateNewUser, getAllUsers, putUpdateUser, deleteUser, postLogout,
    getUsersWithPaginate, postLoginUser, postRegisterUser,

    getAllGroup,

    getRoleWithPaginate, postCreateNewRole, putUpdateRole, deleteRole,

    getQuizByUser, getDataQuiz,

    postSubmitAnswer, postCreateNewQuiz, getAllQuizForAdmin, putUpdateQuiz, deleteQuiz, getQuizWithPaginate,

    postCreateNewQuestion, postCreateNewAnswer,

    postAssignQuiz, getQuizWithQA, postUpsertQA,

    getDashboard, postRefreshToken,

    postUpdateProfile, postChangePassword, getHistory
}