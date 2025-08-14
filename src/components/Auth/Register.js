import { useNavigate } from "react-router-dom"
import { FaFacebookF, FaGithub } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import { useState } from 'react';
import { toast } from 'react-toastify';
import { postRegisterUser } from '../../services/apiService';
import { validateEmail, validatePassword, validateUsername } from '../../utils/validators';
import './Register.scss';
const Register = () => {
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [Username, setUsername] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const Navigate = useNavigate();

    const handleRegister = async () => {
        //validate
        const isInvalidEmail = validateEmail(Email);
        const isInvalidPassword = validatePassword(Password);
        const isInvalidUsername = validateUsername(Username);
        if (!isInvalidUsername) {
            toast.error("Username must be at least 5 characters long");
            return;
        }
        if (!isInvalidEmail) {
            toast.error("Invalid Email");
            return;
        }
        if (!isInvalidPassword) {
            toast.error("Password must be at least 5 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.");
            return;
        }
        if (confirmPassword !== Password) {
            toast.error("Passwords do not match!");
            return;
        }

        let data = await postRegisterUser(Email, Username, Password);
        if (data && data.EC === 0) {
            toast.success(data.EM);
            Navigate("/login");
        }
        if (data && data.EC !== 0) {
            toast.error(data.EM);
        }

    }
    return (
        <>
            <div className="register-container ">

                <div className="register-content">

                    <div className="register-title">
                        <span>Sign up</span>
                    </div>
                    <div className="social-links">
                        <a href='/login'><FaFacebookF /></a>
                        <a href='/login' className='mx-3'><SiGmail /></a>
                        <a href='/login'><FaGithub /></a>

                    </div>
                    <div className="divider my-3">
                        <span>Or use your email</span>
                    </div>
                    <div className="form-register mx-auto ">
                        <div className="form-group">
                            <label className='form-label'>Username</label>
                            <input
                                type="text"
                                className='form-control'
                                value={Username}
                                onChange={(event) => { setUsername(event.target.value) }} required />
                        </div>
                        <div className="form-group">
                            <label className='form-label'>Email</label>
                            <input
                                type="email"
                                className='form-control '
                                value={Email}
                                onChange={(event) => { setEmail(event.target.value) }}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label className='form-label'>Password</label>
                            <input
                                type="password"
                                className='form-control'
                                value={Password}
                                onChange={(event) => { setPassword(event.target.value) }}
                                required />
                        </div>
                        <div className="form-group">
                            <label className='form-label'>Confirm Password</label>
                            <input
                                type="password"
                                className='form-control'
                                value={confirmPassword}
                                onChange={(event) => { setConfirmPassword(event.target.value) }}
                                required />
                        </div>
                        <div className="btn-register ">
                            <button
                                type='button'
                                className='btn btn-primary '
                                onClick={() => { handleRegister() }}
                            >SIGN UP</button>
                        </div>
                        <div className="sign-in">
                            <span>Already have an Account? </span>
                            <span className="btn-signin" onClick={() => { Navigate("/login") }}>Login here</span>
                        </div>
                        <div className="btn-goBack btn"><span onClick={() => { Navigate("/") }}>Go to Homepage</span></div>
                    </div>


                </div>

            </div>
        </>
    )
}
export default Register