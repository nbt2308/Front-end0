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
    const { themeState } = props
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
        themeState.enable();
    }
    const handleChangeDark = () => {
        themeState.disable();
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
                    themeState={themeState.value}
                />
            </div>
            <div className={themeState.value ? "Admin-content light" : "Admin-content dark"} >
                <div className={themeState.value ? "Admin-header light" : "Admin-header dark"}>
                    <span className="collapse-btn"><FaBars onClick={() => {
                        // Kiểm tra kích thước màn hình
                        if (window.innerWidth <= 768) {
                            // Nếu là điện thoại: bật/tắt hiển thị (overlay)
                            setToggled(!toggled);
                        } else {
                            // Nếu là máy tính: thu nhỏ/phóng to (collapse)
                            setCollapsed(!collapsed);
                        }
                    }}
                        className="btn-collapse" />
                    </span>
                    <div className="rightside">

                        <NavDropdown
                            title={themeState.value ? <AiFillSun /> : <IoIosMoon />}
                            id="basic-nav-dropdown"
                            className={themeState.value ? "changeTheme theme-dropdown-light" : "changeTheme theme-dropdown-dark"}>
                            <NavDropdown.Item className='d-flex align-items-center gap-2' onClick={() => handleChangeLight()}><AiFillSun />{t('homepage.header.light')}</NavDropdown.Item>
                            <NavDropdown.Item className='d-flex align-items-center gap-2' onClick={() => handleChangeDark()}><IoIosMoon /> {t('homepage.header.dark')}</NavDropdown.Item>

                        </NavDropdown>
                        <NavDropdown
                            title={<IoSettings />}
                            id="basic-nav-dropdown"
                            className={themeState.value ? "settings theme-dropdown-light" : "settings theme-dropdown-dark"}>
                            <NavDropdown.Item className='d-flex align-items-center gap-2' href="/"><FiHome />{t('homepage.header.home')}</NavDropdown.Item>
                            <NavDropdown.Item className='d-flex align-items-center gap-2' href="/admin/account"><FaRegUser />{t('homepage.header.profile')}</NavDropdown.Item>
                            <NavDropdown.Item className='d-flex align-items-center gap-2'
                                onClick={() => { handleLogout() }} ><IoLogOutOutline />{t('homepage.header.logout')}</NavDropdown.Item>

                        </NavDropdown>

                        <Language
                            themeState={themeState.value}
                        />


                    </div>
                </div>
                <div className={themeState.value ? "Admin-main light" : "Admin-main dark"}>

                    <Outlet
                        context={{
                            themeState: themeState.value,
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