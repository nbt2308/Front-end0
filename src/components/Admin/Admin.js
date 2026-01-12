import SideBar1 from "./SideBar/SideBar1";
import './Admin.scss';
import { useState } from "react";
import { Outlet, useNavigate } from 'react-router-dom';
import Language from '../Header/Language';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { IoSettings, IoLogOutOutline } from "react-icons/io5";
import { AiFillSun } from "react-icons/ai";
import { FaRegUser, FaBars } from "react-icons/fa";
import { IoIosMoon } from "react-icons/io";
import { FiHome } from "react-icons/fi";
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { postLogout } from '../../services/apiService';
import { USER_LOGOUT_SUCCESS } from "../../redux/reducer/userReducer";
import { toast } from "react-toastify";

const Admin = (props) => {
    const [collapsed, setCollapsed] = useState(false);
    const [toggled, setToggled] = useState(false);
    const [theme, setTheme] = useState('light');
    const [breadCrumb, setBreadCrumb] = useState();
    const account = useSelector(state => state?.account);
    const dispatch = useDispatch();
    const Navigate = useNavigate();
    const { t } = useTranslation();
    const { darkMode } = props
    const handleLogout = async () => {
        let res = await postLogout(account.refreshToken)
        if (res && res.EC === 0) {
            //clear data redux
            dispatch(USER_LOGOUT_SUCCESS())
            Navigate("/login")
        } else {
            toast.error(res.EM)
        }

    }
    const handleChangeLight = () => {
        darkMode.enable();
    }
    const handleChangeDark = () => {
        darkMode.disable();
    }


    return (
        <div className="Admin-container " >
            <div className="Sidebar-container ">
                {/* <SideBar
                    collapsed={collapsed}
                    toggled={toggled}
                    setToggled={setToggled}
                >

                </SideBar> */}
                <SideBar1 collapsed={collapsed}
                    toggled={toggled}
                    setToggled={setToggled}
                    theme={theme}
                    darkMode={darkMode.value}
                />
            </div>
            <div className={darkMode.value? "Admin-content light" : "Admin-content dark"} >
                <div className={darkMode.value ? "Admin-header light" : "Admin-header dark"}>
                    <span><FaBars onClick={() => {
                        setCollapsed(!collapsed)
                    }}
                        className="btn-collapse" />
                    </span>
                    <div className="rightside">

                        <NavDropdown
                            title={darkMode.value ? <AiFillSun /> : <IoIosMoon />}
                            id="basic-nav-dropdown"
                            className={darkMode.value ? "changeTheme dropdown-light" : "changeTheme dropdown-dark"}>
                            <NavDropdown.Item className='d-flex align-items-center gap-2' onClick={() => handleChangeLight()}><AiFillSun />{t('homepage.header.light')}</NavDropdown.Item>
                            <NavDropdown.Item className='d-flex align-items-center gap-2' onClick={() => handleChangeDark()}><IoIosMoon /> {t('homepage.header.dark')}</NavDropdown.Item>

                        </NavDropdown>
                        <NavDropdown
                            title={<IoSettings />}
                            id="basic-nav-dropdown"
                            className={darkMode.value ? "settings dropdown-light" : "settings dropdown-dark"}>
                            <NavDropdown.Item className='d-flex align-items-center gap-2' href="/"><FiHome />{t('homepage.header.home')}</NavDropdown.Item>
                            <NavDropdown.Item className='d-flex align-items-center gap-2' href="/admin/account"><FaRegUser />{t('homepage.header.profile')}</NavDropdown.Item>
                            <NavDropdown.Item className='d-flex align-items-center gap-2'
                                onClick={() => { handleLogout() }} ><IoLogOutOutline />{t('homepage.header.logout')}</NavDropdown.Item>

                        </NavDropdown>

                        <Language
                            darkMode={darkMode.value}
                        />


                    </div>
                </div>
                <div className={darkMode.value ? "Admin-main light" : "Admin-main dark"}>

                    <Outlet
                        context={{ 
                            darkMode: darkMode.value,
                            breadCrumb: breadCrumb,
                            setBreadCrumb: setBreadCrumb
                         }}
                        
                    />

                </div>

            </div>

        </div>
    )
}
export default Admin;