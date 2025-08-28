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
import { FaRegUser } from "react-icons/fa";
const Header = () => {
    const isAuthenticated = useSelector(state => state?.isAuthenticated);
    const account = useSelector(state => state?.account);
    const Navigate = useNavigate();
    const dispatch = useDispatch();
    const { t } = useTranslation();
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
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <NavLink to="/" className='navbar-brand '>NBT</NavLink >
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
                            <NavDropdown title={<IoSettings/>} id="basic-nav-dropdown" className='settings'>
                                <NavDropdown.Item className='d-flex align-items-center gap-2'><FaRegUser />{t('homepage.header.profile')}</NavDropdown.Item>
                                <NavDropdown.Item onClick={() => handleLogout()} className='d-flex align-items-center gap-2' ><IoLogOutOutline />{t('homepage.header.logout')}</NavDropdown.Item>
                            </NavDropdown>
                        }
                        {/* <div className='language-change-container'> */}
                        <Language />
                        {/* </div> */}

                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;