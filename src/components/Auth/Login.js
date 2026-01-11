import './Login.scss'
import { useNavigate } from "react-router-dom"
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { postLoginUser } from '../../services/apiService';
import { toast } from 'react-toastify';
import { validateEmailOrPhone } from '../../utils/validators';
import { useDispatch } from 'react-redux';
import { doLogin } from '../../redux/actions/userAction';
import { ImSpinner6 } from "react-icons/im";
import Language from '../Header/Language';
import PerfectScrollbar from 'react-perfect-scrollbar'
import { useTranslation } from 'react-i18next';
import { IoIosMoon } from "react-icons/io";
import { AiFillSun } from "react-icons/ai";
import NavDropdown from 'react-bootstrap/NavDropdown';
import logo from "../../assets/images/NBT.svg"
import gg from "../../assets/images/2.svg"
import fb from "../../assets/images/3.svg"
import gh from "../../assets/images/gh.svg"

const Login = (props) => {
    const { darkMode } = props;
    const [isLoadingLogin, setIsLoadingLogin] = useState(false);
    const [form, setForm] = useState({
        EmailOrPhone: "",
        Password: ""
    });

    const [errors, setErrors] = useState({
        EmailOrPhone: "",
        Password: "",

    });

    const [showErrors, setShowErrors] = useState({
        EmailOrPhone: false,
        Password: false,

    });
    const Navigate = useNavigate();
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const handleValidate = () => {
        const newErrors = {
            EmailOrPhone: "",
            Password: "",

        };

        if (!form.EmailOrPhone) {
            newErrors.EmailOrPhone = `${t('adminPage.usersManagement.modalAddUsers.invalidEmail1')}`;
        } else if (!validateEmailOrPhone(form.EmailOrPhone)) {
            newErrors.EmailOrPhone = `${t('adminPage.usersManagement.modalAddUsers.invalidEmail')}`;
        }
        if (!form.Password) {
            newErrors.Password = `${t('adminPage.usersManagement.modalAddUsers.invalidPassword1')}`;
        }

        setErrors(newErrors);
        setShowErrors({
            EmailOrPhone: !!newErrors.EmailOrPhone,
            Password: !!newErrors.Password,

        });

        return !Object.values(newErrors).some(Boolean); // hợp lệ nếu không có error nào
    };
    const handleChange = (field, value) => {
        setForm(prev => ({ ...prev, [field]: value }));

        if (showErrors[field]) {
            setShowErrors(prev => ({ ...prev, [field]: false }));
        }
    };
    const handleLogin = async () => {
        //validate
        if (!handleValidate()) return;
        setIsLoadingLogin(true)
        let data = await postLoginUser(form.EmailOrPhone, form.Password);
        if (data && data.EC === 0) {
            dispatch(doLogin.loginSuccess(data.DT));
            toast.success(`${t('homepage.loginPage.loginSucceed')}`);
            setIsLoadingLogin(false)
            Navigate("/");
        }
        
        if (data && data.EC === -1) {
            toast.error(`${t('homepage.loginPage.loginFail1')}`);
            setIsLoadingLogin(false)
        }


    }
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleLogin();
        }
    }
    const handleChangeLight = () => {
        darkMode.enable();
    }
    const handleChangeDark = () => {
        darkMode.disable();
    }
    return (
        <>
            <div className={darkMode.value ? "login-main main-container-light " : "login-main main-container-dark"}>
                <PerfectScrollbar>
                    <div className='languages-change-container'>
                        <Language darkMode={darkMode.value} />
                        <NavDropdown
                            title={darkMode.value ? <AiFillSun /> : <IoIosMoon />}
                            id="basic-nav-dropdown"
                            className={darkMode.value ? "changeTheme dropdown-light" : "changeTheme dropdown-dark"}>
                            <NavDropdown.Item className='d-flex align-items-center gap-2' onClick={() => handleChangeLight()}><AiFillSun />{t('homepage.header.light')}</NavDropdown.Item>
                            <NavDropdown.Item className='d-flex align-items-center gap-2' onClick={() => handleChangeDark()}><IoIosMoon /> {t('homepage.header.dark')}</NavDropdown.Item>

                        </NavDropdown>

                    </div>
                    <div className='brand-name'><img src={logo} alt="NBT" /></div>


                    <div className="login-container ">
                        <div className={darkMode.value ? "login-content  light" : "login-content  dark-card"}>

                            <div className="login-title mt-3">
                                <span>{t('homepage.loginPage.loginTitle')}</span>
                            </div>
                            <div className={darkMode.value ? "social-links-light" : "social-links-dark"}>
                                <a href='/login'><img src={fb} alt="facebook" /></a>
                                <a href='/login' className='mx-3'><img src={gg} alt="google" /></a>
                                <a href='/login'><img src={gh} alt="github" /></a>
                            </div>
                            <div className={darkMode.value ? "divider-light my-3" : "divider-dark my-3"}>
                                <span>{t('homepage.loginPage.divider')}</span>
                            </div>
                            <div className="form-login">
                                <div className="form-group ">
                                    {/* <label className='form-label'>Email</label> */}
                                    <FloatingLabel
                                        label="Email or Phone number"
                                        className="mb-3 "
                                    >
                                        <Form.Control
                                            type="email"
                                            placeholder="name@example.com"
                                            value={form.Email}
                                            onChange={e => handleChange("EmailOrPhone", e.target.value)}
                                            isInvalid={showErrors.EmailOrPhone}
                                            required

                                        />
                                        <Form.Control.Feedback type="invalid">{errors.EmailOrPhone}</Form.Control.Feedback>
                                    </FloatingLabel>
                                </div>
                                <div className="form-group mt-2 ">
                                    {/* <label className='form-label'>Password</label> */}

                                    <FloatingLabel
                                        label={t('adminPage.usersManagement.modalAddUsers.password')}
                                        className="mb-3"
                                    >
                                        <Form.Control
                                            type="password"
                                            placeholder="Password"
                                            value={form.Password}
                                            onChange={e => handleChange("Password", e.target.value)}
                                            isInvalid={showErrors.Password}
                                            onKeyDown={(event) => handleKeyDown(event)}
                                            required
                                        />
                                        <Form.Control.Feedback type="invalid">{errors.Password}</Form.Control.Feedback>
                                    </FloatingLabel>
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
                                <div className="sign-up d-flex flex-column flex-sm-row mx-sm-3">
                                    <span>{t('homepage.loginPage.labelSignUp')} </span>
                                    <span className="btn-signup" onClick={() => { Navigate("/register") }}>{t('homepage.loginPage.buttonCreateAccount')}</span>
                                </div>
                                <div className="btn-goBack btn mt-4 mx-5 mx-sm-3 "><span onClick={() => { Navigate("/") }}>{t('homepage.loginPage.buttonGoToHomePage')}</span></div>
                            </div>


                        </div>


                    </div>


                </PerfectScrollbar>
            </div>

        </>
    )
}
export default Login