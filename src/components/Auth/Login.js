import './Login.scss'
import { useNavigate } from "react-router-dom"
import { FaFacebookF, FaGithub } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import { useState } from 'react';
import { postLoginUser } from '../../services/apiService';
import { toast } from 'react-toastify';
import { validateEmail} from '../../utils/validators';
import { useDispatch } from 'react-redux';
import { doLogin } from '../../redux/actions/userAction';
import { ImSpinner6 } from "react-icons/im";
import Language from '../Header/Language';
import PerfectScrollbar from 'react-perfect-scrollbar'
import brandname from "../../assets/images/brandname.png"
import { useTranslation } from 'react-i18next';
const Login = () => {
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [isLoadingLogin, setIsLoadingLogin] = useState(false);
    const [isValidEmail,setIsValidEmail]=useState(true)
    const [isValidPassword,setIsValidPassword]=useState(true)
    const Navigate = useNavigate();
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const handleLogin = async () => {
        //validate
        const isEmptyEmail = validateEmail(Email);
        if (!isEmptyEmail){
            setIsValidEmail(false);
            return;
        }
        else{
            setIsValidEmail(true);
        }
        if (!Password) {
            setIsValidPassword(false);
            return;
        }else{
            setIsValidPassword(true);
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
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleLogin();
        }
    }
    return (
        <>
            <div className='login-main'>
                <PerfectScrollbar>
                    <div className='languages-change-container'>
                        <Language />
                    </div>
                    <div className='brand-name'><img src={brandname} alt="NBT" /></div>
                    <div className="login-container ">
                        <div className="login-content">

                            <div className="login-title mt-3">
                                <span>{t('homepage.loginPage.loginTitle')}</span>
                            </div>
                            <div className="social-links">
                                <a href='/login'><FaFacebookF /></a>
                                <a href='/login' className='mx-3'><SiGmail /></a>
                                <a href='/login'><FaGithub /></a>
                            </div>
                            <div className="divider my-3">
                                <span>{t('homepage.loginPage.divider')}</span>
                            </div>
                            <div className="form-login mx-auto ">
                                <div className="form-group">
                                    {/* <label className='form-label'>Email</label> */}
                                    <div className="form-floating ">
                                        <input type="email"
                                            className={isValidEmail?"form-control": 'form-control is-invalid'}
                                            value={Email}
                                            onChange={(event) => { setEmail(event.target.value) }}
                                            required
                                            id="floatingInput"
                                            placeholder="name@example.com" />
                                        <label htmlFor="floatingInput">{t('homepage.loginPage.labelEmail')}</label>
                                        <div className="invalid-feedback">{t('homepage.loginPage.labelInValidEmail')}</div>
                                    </div>
                                </div>
                                <div className="form-group mt-2">
                                    {/* <label className='form-label'>Password</label> */}
                                    
                                    <div className="form-floating">
                                        <input
                                            type="password"
                                            className={isValidPassword?"form-control":"form-control is-invalid"}
                                            value={Password}
                                            onChange={(event) => { setPassword(event.target.value) }}
                                            placeholder='Password'
                                            required
                                            onKeyDown={(event) => handleKeyDown(event)}
                                        />
                                        <label htmlFor="floatingPassword">{t('homepage.loginPage.labelPassword')}</label>
                                        <div className="invalid-feedback">{t('homepage.loginPage.labelInValidPassword')} </div>
                                    </div>
                                </div>

                                <span className="forgot-password-label  "><a href="/login">{t('homepage.loginPage.labelForgotPassword')}</a></span>

                                <div className="btn-login ">
                                    <button
                                        type='button'
                                        className='btn btn-primary '
                                        onClick={() => { handleLogin() }}
                                        disabled={isLoadingLogin}
                                    >{isLoadingLogin === true && <ImSpinner6 className='loading-icon' />}<span>{t('homepage.loginPage.buttonSignIn')}</span></button>
                                </div>
                                <div className="sign-up">
                                    <span>{t('homepage.loginPage.labelSignUp')} </span>
                                    <span className="btn-signup" onClick={() => { Navigate("/register") }}>{t('homepage.loginPage.buttonCreateAccount')}</span>
                                </div>
                                <div className="btn-goBack btn mt-4"><span onClick={() => { Navigate("/") }}>{t('homepage.loginPage.buttonGoToHomePage')}</span></div>
                            </div>


                        </div>

                    </div>
                </PerfectScrollbar>
            </div>

        </>
    )
}
export default Login