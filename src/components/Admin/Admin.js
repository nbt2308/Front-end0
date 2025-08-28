import SideBar from "./SideBar";
import './Admin.scss';
import { FaBars } from 'react-icons/fa';
import { useState } from "react";
import { Outlet } from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar'
import Language from '../Header/Language';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { IoSettings,IoLogOutOutline } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";
import { useTranslation } from 'react-i18next';
const Admin = (props) => {
    const [collapsed, setCollapsed] = useState(false);
    const { t } = useTranslation();
    return (
        <div className="Admin-container">
            <div className="Sidebar-container">
                <SideBar collapsed={collapsed}>

                </SideBar>
            </div>
            <div className="Admin-content">
                <div className="Admin-header">
                    <span><FaBars onClick={() => setCollapsed(!collapsed)} className="btn-collapse " /></span>
                    <div className="rightside">
                        <NavDropdown title={<IoSettings />} id="basic-nav-dropdown" className="settings">
                            <NavDropdown.Item className='d-flex align-items-center gap-2'><FaRegUser />{t('homepage.header.profile')}</NavDropdown.Item>
                            <NavDropdown.Item className='d-flex align-items-center gap-2' ><IoLogOutOutline />{t('homepage.header.logout')}</NavDropdown.Item>
                        </NavDropdown>

                        <Language />
                    </div>
                </div>
                <div className="Admin-main">
                    <PerfectScrollbar>
                        <Outlet />
                    </PerfectScrollbar>
                </div>

            </div>

        </div>
    )
}
export default Admin;