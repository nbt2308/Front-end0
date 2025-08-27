import { Routes, Route } from "react-router";
import { ToastContainer } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './views/App';
// import User from './components/User/User';
import Admin from './components/Admin/Admin';
import HomePage from './components/Home/HomePage';
import DashBoard from './components/Admin/Content/DashBoard';
import ManageUsers from './components/Admin/Content/UserManagement/ManageUsers';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register'
import ListQuiz from "./components/User/ListQuiz";
import DetailQuiz from "./components/User/DetailQuiz";
import NotFound from "./components/Error/404NotFound";
import ManageQuiz from "./components/Admin/Content/QuizManagement/ManageQuiz";
import ManageQuestions from "./components/Admin/Content/QuestionManagement/ManageQuestions";
import PrivateRoute from "./routes/PrivateRoute";
const LayOut = (props) => {
    return (
        <>
            <Routes>
                <Route path="/" element={<App />} >
                    <Route index element={<HomePage />} />
                    <Route path="/users" element={
                        <PrivateRoute>
                            <ListQuiz />
                        </PrivateRoute>
                    } />
                </Route>
                <Route path="/quiz/:id" element={<DetailQuiz />} />
                <Route path="/admin" element={
                    <PrivateRoute>
                        <Admin />
                    </PrivateRoute>
                } >
                    <Route index element={<DashBoard />} />
                    <Route path="manage-users" element={<ManageUsers />} />
                    <Route path="manage-quizzes" element={<ManageQuiz />} />
                    <Route path="manage-questions" element={<ManageQuestions />} />
                </Route>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </>
    )
}
export default LayOut;