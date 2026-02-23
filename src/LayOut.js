import { Routes, Route } from "react-router";
import { ToastContainer } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './views/App';
// import User from './components/User/User';
import Admin from './components/Admin/Admin';
import HomePage from './components/Home/HomePage';
import DashBoard from "./components/Admin/Content/Dashboard/DashBoard";
import ManageUsers from './components/Admin/Content/UserManagement/ManageUsers';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register'
import ListQuiz from "./components/User/ListQuiz";
import DetailQuiz from "./components/User/DetailQuiz";
import NotFound from "./components/Error/404NotFound";
import ManageQuiz from "./components/Admin/Content/QuizManagement/ManageQuiz";
import ManageQuestions from "./components/Admin/Content/QuestionManagement/ManageQuestions";
import PrivateRoute from "./routes/PrivateRoute";
import { Suspense } from 'react';
import Test from "./components/Admin/Content/UserManagement/Test";
import AccountProfile from"./components/Admin/Content/AccountProfile/AccountProfile";
import LoadingSpinner from "./components/Loading/Loading"
import useTheme from "./hooks/useTheme";
import ManageRoles from "./components/Admin/Content/RoleManagement/ManageRoles";
import ManageGroups from "./components/Admin/Content/GroupManagement/ManageGroups";
const LayOut = (props) => {
    const themeState = useTheme();
    return (
        <Suspense fallback={<LoadingSpinner />}>
            <Routes>
                <Route path="/" element={<App themeState={themeState}/>} >
                    <Route index element={<HomePage />} />
                    <Route path="/users" element={
                        <PrivateRoute>
                            <ListQuiz />
                        </PrivateRoute>
                    } />
                    <Route path="/test" element={<Test />} />
                </Route>
                <Route path="/quiz/:id" element={<DetailQuiz />} />
                <Route path="/admin" element={
                    <PrivateRoute>
                        <Admin themeState={themeState}/>
                    </PrivateRoute>
                } >
                    <Route index element={<DashBoard />} />
                    <Route path="manage-users" element={<ManageUsers />} />
                    <Route path="manage-quizzes" element={<ManageQuiz />} />
                    <Route path="manage-questions" element={<ManageQuestions />} />
                    <Route path="manage-roles" element={<ManageRoles/>} />
                    <Route path="manage-groups" element={<ManageGroups/>} />
                    <Route path="account" element={<AccountProfile />} />
                </Route>
                <Route path="/login" element={<Login themeState={themeState}/>} />
                <Route path="/register" element={<Register themeState={themeState}/>} />
                <Route path="*" element={<NotFound />} />
            </Routes>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </Suspense>
    )
}
export default LayOut;