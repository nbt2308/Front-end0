import './Login.scss'
import { useNavigate } from "react-router-dom"
import { FaFacebookF, FaGithub } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import { useState } from 'react';
import { postLoginUser } from '../../services/apiService';
import { toast } from 'react-toastify';
import { validateEmail, validatePassword } from '../../utils/validators';
import { useDispatch } from 'react-redux';
import { doLogin } from '../../redux/actions/userAction';
import { ImSpinner6 } from "react-icons/im";
const Login = () => {
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [isLoadingLogin,setIsLoadingLogin]=useState(false);
    const Navigate = useNavigate();
    const dispatch = useDispatch();
    const handleLogin = async () => {
        //validate
        const isInvalidEmail = validateEmail(Email);
        const isInvalidPassword = validatePassword(Password);
        if (!isInvalidEmail) {
            toast.error("Invalid Email");
            return;
        }
        if (!isInvalidPassword) {
            toast.error("Password must be at least 5 characters long and include at least one uppercase letter,one lowercase letter, one number, and one special character.");
            return;
        }
        setIsLoadingLogin(true)
        let data = await postLoginUser(Email, Password);
        if (data && data.EC === 0) {
            dispatch(doLogin.loginSuccess(data.DT));
            toast.success(data.EM);
            setIsLoadingLogin(false)
            Navigate("/");

        }
        if (data && data.EC !== 0) {
            toast.error(data.EM);
            setIsLoadingLogin(false)
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
                        <span>Or use your account</span>
                    </div>
                    <div className="form-login mx-auto ">
                        <div className="form-group">
                            <label className='form-label'>Email</label>
                            <input
                                type="email"
                                className='form-control '
                                value={Email}
                                onChange={(event) => { setEmail(event.target.value) }}
                                placeholder='Email'
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
                                placeholder='Password'
                                required />
                        </div>

                        <span className="forgot-password-label  "><a href="/login">Forgot your password?</a></span>

                        <div className="btn-login ">
                            <button
                                type='button'
                                className='btn btn-primary '
                                onClick={() => { handleLogin() }}
                                disabled={isLoadingLogin}
                            >{isLoadingLogin===true&&<ImSpinner6 className='loading-icon'/>}<span>SIGN IN</span></button>
                        </div>
                        <div className="sign-up">
                            <span>Don't have an account? </span>
                            <span className="btn-signup" onClick={() => { Navigate("/register") }}>Create Account</span>
                        </div>
                        <div className="btn-goBack btn"><span onClick={() => { Navigate("/") }}>Go to Homepage</span></div>
                    </div>


                </div>

            </div>


        </>
    )
}
export default Login