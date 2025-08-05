import SideBar from "./SideBar";
import './Admin.scss';
import { FaBars } from 'react-icons/fa';
import { useState } from "react";
const Admin = (props) => {
    const [collapsed, setCollapsed] = useState(false);
    return (
        <div className="Admin-container">
            <div className="Sidebar-container">
                <SideBar collapsed={collapsed}>
                    
                </SideBar>
            </div>
            <div className="Admin-content">
                <FaBars onClick={() =>  setCollapsed(!collapsed) } />
                admin content
            </div>

        </div>
    )
}
export default Admin;