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
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { useTranslation } from 'react-i18next';
import brandname from "../../assets/images/brandname.png"
import useDarkMode from "use-dark-mode";
import { IoIosMoon } from "react-icons/io";
import { AiFillSun } from "react-icons/ai";
import NavDropdown from 'react-bootstrap/NavDropdown';
import logo from "../../assets/images/NBT.svg"
import gg from "../../assets/images/2.svg"
import fb from "../../assets/images/3.svg"
import gh from "../../assets/images/gh.svg"
const Register = (props) => {
    const { t } = useTranslation();
    const { darkMode } = props;

    const Navigate = useNavigate();

    //define state
    const [form, setForm] = useState({
        Email: "",
        Password: "",
        ConfirmPassword: "",
        Username: "",
    });

    const [errors, setErrors] = useState({
        Email: "",
        Password: "",
        ConfirmPassword: "",
        Username: "",
    });

    const [showErrors, setShowErrors] = useState({
        Email: false,
        Password: false,
        Username: false,
        ConfirmPassword: false,
    });
    const handleValidate = () => {
        const newErrors = {
            Email: "",
            Password: "",
            Username: "",
            ConfirmPassword: "",
        };

        if (!form.Email) {
            newErrors.Email = `${t('adminPage.usersManagement.modalAddUsers.invalidEmail1')}`;
        } else if (!validateEmail(form.Email)) {
            newErrors.Email = `${t('adminPage.usersManagement.modalAddUsers.invalidEmail')}`;
        }
        if (!form.Password) {
            newErrors.Password = `${t('adminPage.usersManagement.modalAddUsers.invalidPassword1')}`;
        } else if (!validatePassword(form.Password)) {
            newErrors.Password = `${t('adminPage.usersManagement.modalAddUsers.invalidPassword')}`;
        }
        if (!form.Username) {
            newErrors.Username = `${t('adminPage.usersManagement.modalAddUsers.invalidUsername1')}`;
        } else if (!validateUsername(form.Username)) {
            newErrors.Username = `${t('adminPage.usersManagement.modalAddUsers.invalidUsername')}`;
        }
        if (form.ConfirmPassword !== form.Password) {
            newErrors.ConfirmPassword = `${t('homepage.registerPage.labelInvalidConfirmPassword')}`;
        }

        setErrors(newErrors);
        setShowErrors({
            Email: !!newErrors.Email,
            Password: !!newErrors.Password,
            Username: !!newErrors.Username,
            ConfirmPassword: !!newErrors.ConfirmPassword
        });

        return !Object.values(newErrors).some(Boolean); // hợp lệ nếu không có error nào
    };
    const handleChange = (field, value) => {
        setForm(prev => ({ ...prev, [field]: value }));

        if (showErrors[field]) {
            setShowErrors(prev => ({ ...prev, [field]: false }));
        }
    };
    const handleRegister = async () => {
        //validate
        if (!handleValidate()) return;
        let data = await postRegisterUser(form.Email, form.Username, form.Password);
        if (data && data.EC === 0) {
            toast.success(`${t('homepage.registerPage.registerSucceed')}`);
            Navigate("/login");
        }
        if (data && data.EC !== 0) {
            toast.error(`${t('homepage.registerPage.registerFail')}`);
        }

    }
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleRegister();
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

            <div className={darkMode.value ? "register-main main-container-light" : "register-main main-container-dark"}>
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
                    <div className="register-container ">

                        <div className={darkMode.value ? "register-content light" : "register-content dark-card"}>

                            <div className="register-title mt-3">
                                <span>{t('homepage.registerPage.registerTitle')}</span>
                            </div>
                            <div className={darkMode.value ? "social-links-light" : "social-links-dark"}>
                                <a href='/login'><img src={fb} alt="facebook" /></a>
                                <a href='/login' className='mx-3'><img src={gg} alt="google" /></a>
                                <a href='/login'><img src={gh} alt="github" /></a>

                            </div>
                            <div className={darkMode.value ? "divider-light my-3" : "divider-dark my-3"}>
                                <span>{t('homepage.registerPage.divider')}</span>
                            </div>
                            <div className="form-register mx-auto ">
                                <div className="form-group">
                                    <FloatingLabel
                                        label={t('homepage.registerPage.labelUsername')}
                                        className="mb-3"
                                    >
                                        <Form.Control
                                            type="text"
                                            placeholder="name@example.com"
                                            value={form.Username}
                                            onChange={e => handleChange("Username", e.target.value)}
                                            isInvalid={showErrors.Username}
                                            required
                                        />
                                        <Form.Control.Feedback type="invalid">{errors.Username}</Form.Control.Feedback>
                                    </FloatingLabel>
                                </div>
                                <div className="form-group">
                                    <FloatingLabel
                                        label={t('adminPage.usersManagement.modalAddUsers.email')}
                                        className="mb-3"
                                    >
                                        <Form.Control
                                            type="email"
                                            placeholder="name@example.com"
                                            value={form.Email}
                                            onChange={e => handleChange("Email", e.target.value)}
                                            isInvalid={showErrors.Email}
                                            required
                                        />
                                        <Form.Control.Feedback type="invalid">{errors.Email}</Form.Control.Feedback>
                                    </FloatingLabel>
                                </div>
                                <div className="form-group">

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

                                            required
                                        />
                                        <Form.Control.Feedback type="invalid">{errors.Password}</Form.Control.Feedback>
                                    </FloatingLabel>
                                </div>
                                <div className="form-group">

                                    <FloatingLabel
                                        label={t('homepage.registerPage.labelConfirmPassword')}
                                        className="mb-3"
                                    >
                                        <Form.Control
                                            type="password"
                                            placeholder="ConfirmPassword"
                                            value={form.ConfirmPassword}
                                            onChange={e => handleChange("ConfirmPassword", e.target.value)}
                                            isInvalid={showErrors.ConfirmPassword}
                                            onKeyDown={(event) => handleKeyDown(event)}
                                            required
                                        />
                                        <Form.Control.Feedback type="invalid">{errors.ConfirmPassword}</Form.Control.Feedback>
                                    </FloatingLabel>
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
                                <div className="btn-goBack btn"><span onClick={() => { Navigate("/") }}>{t('homepage.registerPage.buttonGoToHomePage')}</span></div>
                            </div>


                        </div>

                    </div>
                </PerfectScrollbar>
            </div>
        </>
    )
}
export default Register