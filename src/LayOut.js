import { Routes, Route } from "react-router";
import { ToastContainer } from 'react-toastify';    
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './views/App';
import User from './components/User/User';
import Admin from './components/Admin/Admin';
import HomePage from './components/Home/HomePage';
import DashBoard from './components/Admin/Content/DashBoard';
import ManageUsers from './components/Admin/Content/ManageUsers';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register'
const LayOut = (props) => {
    return (
        <>
            <Routes>
                <Route path="/" element={<App />} >
                    <Route index element={<HomePage />} />
                    <Route path="/users" element={<User />} />
                </Route>
                <Route path="/admin" element={<Admin />} >
                    <Route index element={<DashBoard />} />
                    <Route path="manage-users" element={<ManageUsers />} />
                </Route>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
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