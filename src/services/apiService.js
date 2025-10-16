import axios from '../utils/axiosCustomize';
//user
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
// const getAllUsers = () => {
//     return axios.get('/api/users');
// }
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
const postLoginUser = (EmailOrPhone, Password) => {
    return axios.post(`/api/v1/login`, { emailorphone: EmailOrPhone, password: Password, delay: 3000 });
}
const postRegisterUser = (Email, Username, Password) => {
    return axios.post(`/api/v1/register`, { email: Email, username: Username, password: Password });
}
const postLogout = (Email, refresh_token) => {
    return axios.post('/api/v1/logout', { email: Email, refresh_token: refresh_token });
}
//Quiz user
const getQuizByUser = () => {
    return axios.get('/api/v1/quiz-by-participant')
}
const getDataQuiz = (quizId) => {
    return axios.get(`/api/v1/questions-by-quiz?quizId=${quizId}`)
}
const postSubmitAnswer = (data) => {
    return axios.post(`/api/v1/quiz-submit`, { ...data })
}


//CRUD Quiz Management
const postCreateNewQuiz = (description, name, difficulty, image) => {
    const data = new FormData();
    data.append('description', description);
    data.append('name', name);
    data.append('difficulty', difficulty);
    data.append('quizImage', image);
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
    data.append('quizImage', image);
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
const postRefreshToken = (email, refresh_token) => {
    return axios.post(`/api/v1/refresh-token`, {
        email, refresh_token
    })
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
const getHistory=()=>{
    return axios.get(`/api/v1/history`)
}
export {
    postCreateNewUser, getAllUsers, putUpdateUser, deleteUser, postLogout,
    getUsersWithPaginate, postLoginUser, postRegisterUser,

    getQuizByUser, getDataQuiz,

    postSubmitAnswer, postCreateNewQuiz, getAllQuizForAdmin, putUpdateQuiz, deleteQuiz,

    postCreateNewQuestion, postCreateNewAnswer,

    postAssignQuiz, getQuizWithQA, postUpsertQA,

    getDashboard, postRefreshToken,
    
    postUpdateProfile,postChangePassword,getHistory


}