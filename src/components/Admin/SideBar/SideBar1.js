import {
    Sidebar,
    Menu,
    MenuItem,
    SubMenu,
    menuClasses
} from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import { FaReact, FaHome } from 'react-icons/fa';
import { FaRegCircleUser, FaShieldHeart } from "react-icons/fa6"; // Thêm icon cho Logo
import { MdOutlineManageSearch } from "react-icons/md";
import { useTranslation } from 'react-i18next';
import { useLocation } from "react-router-dom";

const SideBar1 = (props) => {
    const { collapsed, rtl, toggled, setToggled, theme, themeState } = props;
    const { t } = useTranslation();
    const location = useLocation();
    const currentPath = location.pathname;

    // Logic xác định theme hiện tại để dùng trong rootStyles
    const activeTheme = themeState ? 'light' : 'dark'; 

    const themes = {
        light: {
            sidebar: { backgroundColor: "#fff", color: '#1f2122ff' },
            menu: {
                menuContent: '#fbfcfd',
                icon: '#ffffffff',
                hover: { backgroundColor: '#2fff001f', color: '#2fff008b' },
                active: {
                    backgroundImage: 'linear-gradient( 75.1deg, rgba(34,126,34,1) 6%, rgba(99,226,17,1) 84.3% )',
                    color: '#fff',
                },
                disabled: { color: '#9fb6cf' },
            },
        },
        dark: {
            sidebar: { backgroundColor: "#071e34ff", color: '#8ba1b7' },
            menu: {
                menuContent: '#071e34ff',
                icon: "#fff",
                hover: { backgroundColor: '#2fff001f', color: '#2fff008b' },
                active: {
                    backgroundImage: 'linear-gradient( 75.1deg, rgba(34,126,34,1) 6%, rgba(99,226,17,1) 84.3% )',
                    color: '#fff',
                },
                disabled: { color: '#3e5e7e' },
            },
        },
    };

    const menuItemStyles = {
        root: { fontSize: '1.1rem', fontWeight: 600 },
        icon: ({ active }) => ({
            color: active 
                ? themes[activeTheme].menu.icon 
                : (themeState ? "#444" : "#8ba1b7")
        }),
        button: ({ active }) => ({
            margin: collapsed ? "0" : "0 10px",
            borderRadius: collapsed ? "0" : "10px",
            [`&.${menuClasses.disabled}`]: { color: themes[activeTheme].menu.disabled.color },
            '&:hover': {
                backgroundColor: themes[activeTheme].menu.hover.backgroundColor,
                color: themes[activeTheme].menu.hover.color,
            },
            '&.ps-active': {
                backgroundImage: themes[activeTheme].menu.active.backgroundImage,
                color: themes[activeTheme].menu.active.color,
            },
        }),
        subMenuContent: {
            backgroundColor: themes[activeTheme].menu.menuContent,
        },
    };

    return (
        <Sidebar
            style={{ height: "100vh" }}
            rtl={rtl}
            onBackdropClick={() => setToggled(false)}
            collapsed={collapsed}
            toggled={toggled}
            breakPoint="md"
            width="270px"
            onToggle={() => setToggled(!toggled)}
            
            backgroundColor={themes[activeTheme].sidebar.backgroundColor}
            rootStyles={{ color: themes[activeTheme].sidebar.color }}
        >
            {/* --- PHẦN HEADER CỦA SIDEBAR --- */}
            <div style={{ 
                padding: '24px', 
                marginBottom: '8px', 
                display: 'flex', 
                alignItems: 'center',
                gap: '12px',
                overflow: 'hidden' 
            }}>
                <div style={{
                    fontSize: '30px',
                    color: '#02c4ff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <FaReact /> {/* Bạn có thể thay bằng Logo ảnh của bạn */}
                </div>
                
                {!collapsed && (
                    <span style={{ 
                        fontWeight: 'bold', 
                        fontSize: '1.5rem', 
                        whiteSpace: 'nowrap',
                        textTransform: 'uppercase',
                        letterSpacing: '1px',
                        color: themes[activeTheme].sidebar.color 
                    }}>
                        <a href="/" className={themeState ?"text-decoration-none text-dark":"text-decoration-none text-light"}>Quiz website</a>
                    </span>
                )}
            </div>
            {/* ------------------------------ */}

            <Menu iconShape="circle" menuItemStyles={menuItemStyles}>
                <MenuItem
                    icon={<FaHome />}
                    component={<Link to="/admin" />}
                    active={currentPath === "/admin"}
                    className='mt-2 mb-2'
                    onClick={() => { if (toggled) setToggled(false) }}
                >
                    {t('adminPage.sideBar.dashboard')}
                </MenuItem>
                
                <SubMenu
                    icon={<MdOutlineManageSearch />}
                    label={t('adminPage.breadcrumb.management')}
                    className='mt-2 mb-2'
                >
                    <MenuItem component={<Link to="/admin/manage-users" />} active={currentPath === "/admin/manage-users"} className='mt-1 mb-1'>
                        {t('adminPage.sideBar.usersManagement')}
                    </MenuItem>
                    <MenuItem component={<Link to="/admin/manage-quizzes" />} active={currentPath === "/admin/manage-quizzes"} className='mt-1 mb-1'>
                        {t('adminPage.sideBar.quizzesManagement')}
                    </MenuItem>
                    <MenuItem component={<Link to="/admin/manage-questions" />} active={currentPath === "/admin/manage-questions"} className='mt-1 mb-1'>
                        {t('adminPage.sideBar.questionsManagement')}
                    </MenuItem>
                    <MenuItem component={<Link to="/admin/manage-roles" />} active={currentPath === "/admin/manage-roles"} className='mt-1 mb-1'>
                        {t('adminPage.sideBar.rolesManagement')}
                    </MenuItem>
                    <MenuItem component={<Link to="/admin/manage-groups" />} active={currentPath === "/admin/manage-groups"} className='mt-1 mb-1'>
                        {t('adminPage.sideBar.groupsManagement')}
                    </MenuItem>
                </SubMenu>

                <MenuItem
                    icon={<FaRegCircleUser />}
                    component={<Link to="/admin/account" />}
                    active={currentPath === "/admin/account"}
                >
                    {t('adminPage.sideBar.accountProfile')}
                </MenuItem>
            </Menu>
        </Sidebar>
    );
}

export default SideBar1;