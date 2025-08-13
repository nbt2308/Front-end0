import './Login.scss'
import { NavLink, useNavigate } from "react-router-dom"
import { FaFacebookF, FaGithub } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import { useState } from 'react';
import { postLoginUser } from '../../services/apiService';
import { toast } from 'react-toastify';
const Login = () => {
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const Navigate = useNavigate();

    const handleLogin = async () => {
        let data = await postLoginUser(Email, Password);
        if (data && data.EC === 0) {
            toast.success(data.EM);
        }
        if (data && data.EC !== 0) {
            toast.error(data.EM);
        }

    }
    return (
        <>
            <div className="login-container ">

                <div className="login-content">

                    <div className="login-title">
                        <span>Sign in</span>
                    </div>
                    <div className="social-links">
                        <a href='/login'><FaFacebookF /></a>
                        <a href='/login' className='mx-3'><SiGmail /></a>
                        <a href='/login'><FaGithub /></a>

                    </div>
                    <div className="divider my-3">
                        <span>or use your account</span>
                    </div>
                    <div className="form-login mx-auto ">
                        <div className="form-group">
                            <label className='form-label'>Email</label>
                            <input
                                type="email"
                                className='form-control '
                                value={Email}
                                onChange={(event) => { setEmail(event.target.value) }}
                            />
                        </div>
                        <div className="form-group">
                            <label className='form-label'>Password</label>
                            <input
                                type="password"
                                className='form-control'
                                value={Password}
                                onChange={(event) => { setPassword(event.target.value) }} />
                        </div>

                        <span className="forgot-password-label  "><a href="/login">Forgot your password?</a></span>

                        <div className="btn-login ">
                            <button
                                type='button'
                                className='btn btn-primary '
                                onClick={() => { handleLogin() }}
                            >SIGN IN</button>
                        </div>
                        <div className="sign-up">
                            <span>Don't have an account? </span>
                            <NavLink>Create Account</NavLink>
                        </div>
                        <div className="btn-goBack btn"><span onClick={() => { Navigate("/") }}>Go to Homepage</span></div>
                    </div>


                </div>

            </div>


        </>
    )
}
export default Login