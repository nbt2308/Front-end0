// import 'react-pro-sidebar/dist/scss/styles.scss';
import { Link } from 'react-router-dom';
import './SideBar.scss';
import {
    // ProSidebar,
    Sidebar,
    Menu,
    MenuItem,
    SubMenu,
    // SidebarHeader,
    // SidebarFooter,
    // SidebarContent,
} from 'react-pro-sidebar';
import { FaReact, FaHome } from 'react-icons/fa';
import { FaRegCircleUser } from "react-icons/fa6";
import { MdOutlineManageSearch } from "react-icons/md";
import { useTranslation } from 'react-i18next';
const SideBar = (props) => {
    const { collapsed, rtl, toggled, setToggled } = props;
    const { t } = useTranslation();
    return (
        <>
            {/* <ProSidebar */}
            <SideBar>
                rtl={rtl}
                collapsed={collapsed}
                toggled={toggled}
                breakPoint="md"
                onToggle={() => setToggled(!toggled)}
                {/* > */}
                {/* <SidebarHeader> */}
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
                {/* </SidebarHeader> */}

                {/* <SidebarContent> */}
                <Menu iconShape="circle">
                    <MenuItem
                        icon={<FaHome />}
                    // suffix={<span className="badge red">new</span>}
                    >

                        {t('adminPage.sideBar.dashboard')}
                        <Link to="/admin" />
                    </MenuItem>
                </Menu>
                <Menu iconShape="circle">
                    <SubMenu
                        icon={<MdOutlineManageSearch />}
                        title={t('adminPage.breadcrumb.management')}
                    >
                        <MenuItem>
                            {t('adminPage.sideBar.usersManagement')}
                            <Link to="/admin/manage-users" />
                        </MenuItem>
                        <MenuItem>
                            {t('adminPage.sideBar.quizzesManagement')}
                            <Link to="/admin/manage-quizzes" />
                        </MenuItem>
                        <MenuItem>
                            {t('adminPage.sideBar.questionsManagement')}
                            <Link to="/admin/manage-questions"></Link>
                        </MenuItem>
                    </SubMenu>

                </Menu>
                <Menu iconShape="circle">
                    <MenuItem
                        icon={<FaRegCircleUser />}
                    // suffix={<span className="badge red">new</span>}
                    >

                        {t('adminPage.sideBar.accountProfile')}
                        <Link to="/admin/account" />
                    </MenuItem>
                </Menu>
                {/* </SidebarContent> */}

                {/* <SidebarFooter style={{ textAlign: 'center' }}> */}
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
                {/* </SidebarFooter> */}
                {/* </ProSidebar> */}
            </SideBar>
        </>

    );
}
export default SideBar;