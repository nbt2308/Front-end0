import { useNavigate } from "react-router-dom"
import { FaFacebookF, FaGithub } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import { useState } from 'react';
import { toast } from 'react-toastify';
import { postRegisterUser } from '../../services/apiService';
import { validateEmail, validatePassword, validateUsername } from '../../utils/validators';
import PerfectScrollbar from 'react-perfect-scrollbar'
import './Register.scss';
import Language from "../Header/Language";
import { useTranslation } from 'react-i18next';
import brandname from "../../assets/images/brandname.png"
const Register = () => {
    const { t } = useTranslation();
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [Username, setUsername] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isValidUsername, setIsValidUsername] = useState(true);
    const [isValidEmail, setIsValidEmail] = useState(true);
    const [isValidPassword, setIsValidPassword] = useState(true);
    const [isValidConfirmPassword, setIsValidConfirmPassword] = useState(true);

    const Navigate = useNavigate();

    const handleRegister = async () => {
        //validate
        const isInvalidEmail = validateEmail(Email);
        const isInvalidPassword = validatePassword(Password);
        const isInvalidUsername = validateUsername(Username);
        //validate username
        if (!isInvalidUsername) {
            
            setIsValidUsername(false)
            return;
        }
        else {
            setIsValidUsername(true);
        }
        //validate email
        if (!isInvalidEmail) {
            setIsValidEmail(false)
            return;
        }
        else {
            setIsValidEmail(true);
        }
        //validate password
        if (!isInvalidPassword) {
            setIsValidPassword(false)
            return;
        }
        else {
            setIsValidPassword(true);
        }
        //validate confirm password
        if (confirmPassword !== Password) {

            setIsValidConfirmPassword(false)
            return;
        }
        else {
            setIsValidConfirmPassword(true);
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

            <div className="register-main">
                <PerfectScrollbar>
                    <div className='languages-change-container'>
                        <Language />
                    </div>
                     <div className='brand-name'><img src={brandname} alt="NBT" /></div>
                    <div className="register-container ">

                        <div className="register-content">

                            <div className="register-title mt-3">
                                <span>{t('homepage.registerPage.registerTitle')}</span>
                            </div>
                            <div className="social-links">
                                <a href='/login'><FaFacebookF /></a>
                                <a href='/login' className='mx-3'><SiGmail /></a>
                                <a href='/login'><FaGithub /></a>

                            </div>
                            <div className="divider my-3">
                                <span>{t('homepage.registerPage.divider')}</span>
                            </div>
                            <div className="form-register mx-auto ">
                                <div className="form-group">
                                    <div class="form-floating ">
                                        <input
                                            type="text"
                                            className={isValidUsername?'form-control':'form-control is-invalid'}
                                            value={Username}
                                            onChange={(event) => { setUsername(event.target.value) }} required
                                            id="floatingInput"
                                            placeholder="name@example.com" />
                                        <label for="floatingInput">{t('homepage.registerPage.labelUsername')}</label>
                                        <div className="invalid-feedback">{t('homepage.registerPage.labelInvalidUsername')}</div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div class="form-floating ">
                                        <input type="email"
                                            className={isValidEmail?'form-control':'form-control is-invalid'}
                                            value={Email}
                                            onChange={(event) => { setEmail(event.target.value) }}
                                            required
                                            id="floatingInput"
                                            placeholder="name@example.com" />
                                        <label for="floatingInput">{t('homepage.loginPage.labelEmail')}</label>
                                        <div className="invalid-feedback">{t('homepage.loginPage.labelInValidEmail')}</div>
                                    </div>
                                </div>
                                <div className="form-group">

                                    <div class="form-floating ">
                                        <input type="password"
                                            className={isValidPassword?'form-control':'form-control is-invalid'}
                                            value={Password}
                                            onChange={(event) => { setPassword(event.target.value) }}
                                            required
                                            id="floatingInput"
                                            placeholder="name@example.com" />
                                        <label for="floatingInput">{t('homepage.loginPage.labelPassword')}</label>
                                        <div className="invalid-feedback">{t('homepage.registerPage.labelInValidPassword')}</div>
                                    </div>
                                </div>
                                <div className="form-group">

                                    <div class="form-floating ">
                                        <input type="password"
                                            className={isValidConfirmPassword?'form-control':'form-control is-invalid'}
                                            value={confirmPassword}
                                            onChange={(event) => { setConfirmPassword(event.target.value) }}
                                            required
                                            id="floatingInput"
                                            placeholder="name@example.com" />
                                        <label for="floatingInput">{t('homepage.registerPage.labelConfirmPassword')}</label>
                                        <div className="invalid-feedback">{t('homepage.registerPage.labelInvalidConfirmPassword')}</div>
                                    </div>
                                </div>
                                <div className="btn-register ">
                                    <button
                                        type='button'
                                        className='btn btn-primary '
                                        onClick={() => { handleRegister() }}
                                    >{t('homepage.registerPage.buttonSignup')}</button>
                                </div>
                                <div className="sign-in">
                                    <span>{t('homepage.registerPage.labelSignIn')} </span>
                                    <span className="btn-signin" onClick={() => { Navigate("/login") }}>{t('homepage.registerPage.buttonSignIn')}</span>
                                </div>
                                <div className="btn-goBack btn"><span onClick={() => { Navigate("/") }}>{t('homepage.loginPage.buttonGoToHomePage')}</span></div>
                            </div>


                        </div>

                    </div>
                </PerfectScrollbar>
            </div>
        </>
    )
}
export default Register