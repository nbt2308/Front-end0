import 'react-pro-sidebar/dist/scss/styles.scss';
import { Link } from 'react-router-dom';
import './SideBar.scss';
import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from 'react-pro-sidebar';
import { FaReact } from 'react-icons/fa';
import { MdDashboardCustomize, MdOutlineManageSearch } from "react-icons/md";
const SideBar = (props) => {
    const { collapsed, rtl, toggled, handleToggleSidebar } = props;
    return (
        <>
            <ProSidebar
                
                rtl={rtl}
                collapsed={collapsed}
                toggled={toggled}
                breakPoint="md"
                onToggle={handleToggleSidebar}
            >
                <SidebarHeader>
                    <div
                        style={{
                            padding: '24px',
                            textTransform: 'uppercase',
                            fontWeight: 'bold',
                            fontSize: 14,
                            letterSpacing: '1px',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            textAlign: "center"
                        }}
                    >
                        <FaReact color={'#61DAFB'} />
                        <span >NBT</span>
                    </div>
                </SidebarHeader>

                <SidebarContent>
                    <Menu iconShape="circle">
                        <MenuItem
                            icon={<MdDashboardCustomize />}
                        // suffix={<span className="badge red">new</span>}
                        >

                            Dashboard
                            <Link to="/admin" />
                        </MenuItem>
                    </Menu>
                    <Menu iconShape="circle">
                        <SubMenu
                            icon={<MdOutlineManageSearch />}
                            title={"Features"}
                        >
                            <MenuItem>
                                Users management
                                <Link to="/admin/manage-users" />
                            </MenuItem>
                            <MenuItem>
                                Quizzes management
                                <Link to="/admin/manage-quizzes" />
                            </MenuItem>
                            <MenuItem>
                                Questions management
                                <Link to="/admin/manage-questions"></Link>
                            </MenuItem>
                        </SubMenu>

                    </Menu>
                </SidebarContent>

                <SidebarFooter style={{ textAlign: 'center' }}>
                    <div
                        className="sidebar-btn-wrapper"
                        style={{
                            padding: '20px 24px',
                        }}
                    >
                        <a
                            href="https://github.com/nbt2308"
                            target="_blank"
                            className="sidebar-btn"
                            rel="noopener noreferrer"
                        >

                            <span style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                                &copy;NBT
                            </span>
                        </a>
                    </div>
                </SidebarFooter>
            </ProSidebar>
            
        </>

    );
}
export default SideBar;