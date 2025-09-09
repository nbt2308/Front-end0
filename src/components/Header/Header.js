import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useSelector } from 'react-redux';
import { NavLink, useNavigate } from "react-router-dom"
import { postLogout } from '../../services/apiService';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { doLogout } from '../../redux/actions/userAction';
import Language from './Language';
import { useTranslation } from 'react-i18next';
import { IoSettings, IoLogOutOutline } from "react-icons/io5";
import { AiFillSun } from "react-icons/ai";
import { IoIosMoon } from "react-icons/io";
import { FaRegUser } from "react-icons/fa";
import ModalProfile from './ModalProfile';
import { useState } from 'react';
import logo from "../../assets/images/NBT.svg"
const Header = (props) => {
    const { darkMode } = props;
    const isAuthenticated = useSelector(state => state?.isAuthenticated);
    const account = useSelector(state => state?.account);
    const Navigate = useNavigate();
    const dispatch = useDispatch();

    const { t } = useTranslation();

    const [showModalProfile, setShowModalProfile] = useState(false);
    const handleLogin = () => {
        Navigate("/login")
    }
    const handleRegister = () => {
        Navigate("/register")
    }

    const handleLogout = async () => {
        let res = await postLogout(account.email, account.refresh_token)
        if (res && res.EC === 0) {
            //clear data redux
            dispatch(doLogout.logoutSuccess())
            Navigate("/login")
        } else {
            toast.error(res.EM)
        }

    }

    const handleShowModalProfile = () => {
        setShowModalProfile(true);
    }


    const handleChangeLight = () => {
        darkMode.enable();
    }
    const handleChangeDark = () => {
        darkMode.disable();
    }
    return (
        <>
        
            <Navbar key="lg" expand="lg" className={darkMode.value?" navbar-light":" navbar-dark"} sticky='top' >
                <Container >
                    <NavLink to="/" className='navbar-brand '><img src={logo} alt="logo" className='logo'/></NavLink>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <NavLink to="/" className='nav-link '>{t('homepage.header.home')}</NavLink >
                            <NavLink to="/users" className='nav-link '>{t('homepage.header.users')}</NavLink >
                            <NavLink to="/admin" className='nav-link '>{t('homepage.header.admin')}</NavLink >
                        </Nav>
                        <Nav>

                            {isAuthenticated === false ?
                                <>
                                    <button className='btn-login' onClick={() => { handleLogin() }}>{t('homepage.header.login')}</button>
                                    <button className='btn-signup' onClick={() => { handleRegister() }}>{t('homepage.header.signup')}</button>
                                </> :

                                <>
                                    {/* <span><span className=' fs-5 fw-medium'>Welcome</span> {account.username}</span> */}
                                    <NavDropdown 
                                    title={<IoSettings />} 
                                    className={darkMode.value?"settings dropdown-light":"settings dropdown-dark"} >
                                        <NavDropdown.Item
                                            className='d-flex align-items-center gap-2'
                                            onClick={() => handleShowModalProfile()}

                                        >
                                            <FaRegUser />
                                            {t('homepage.header.profile')}
                                        </NavDropdown.Item>
                                        <NavDropdown.Item
                                            onClick={() => handleLogout()}
                                            className='d-flex align-items-center gap-2'
                                        >
                                            <IoLogOutOutline />{t('homepage.header.logout')}
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                </>
                            }
                            <NavDropdown 
                            title={darkMode.value ? <AiFillSun /> : <IoIosMoon />} 
                            id="basic-nav-dropdown" 
                            className={darkMode.value?"changeTheme dropdown-light":"changeTheme dropdown-dark"}>
                                <NavDropdown.Item className='d-flex align-items-center gap-2' onClick={() => handleChangeLight()}><AiFillSun />{t('homepage.header.light')}</NavDropdown.Item>
                                <NavDropdown.Item className='d-flex align-items-center gap-2' onClick={() => handleChangeDark()}><IoIosMoon /> {t('homepage.header.dark')}</NavDropdown.Item>

                            </NavDropdown>
                            {/* <div className='language-change-container'> */}
                            <Language darkMode={darkMode.value} />
                            {/* </div> */}

                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <ModalProfile
                show={showModalProfile}
                setShow={setShowModalProfile}
                darkMode={darkMode.value}
            />

        </>
    );
}

export default Header;