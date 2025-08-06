import SideBar from "./SideBar";
import './Admin.scss';
import { FaBars } from 'react-icons/fa';
import { useState } from "react";
import { Outlet } from 'react-router-dom';
const Admin = (props) => {
    const [collapsed, setCollapsed] = useState(false);
    return (
        <div className="Admin-container">
            <div className="Sidebar-container">
                <SideBar collapsed={collapsed}>

                </SideBar>
            </div>
            <div className="Admin-content">
                <div className="Admin-header">
                    <FaBars onClick={() => setCollapsed(!collapsed)} />
                    
                </div>
                <div className="Admin-main">
                    <Outlet/>
                </div>

            </div>

        </div>
    )
}
export default Admin;