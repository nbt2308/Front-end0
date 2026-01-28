import {
    Sidebar,
    Menu,
    MenuItem,
    SubMenu,
    menuClasses

} from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import { FaReact, FaHome } from 'react-icons/fa';
import { FaRegCircleUser } from "react-icons/fa6";
import { MdOutlineManageSearch } from "react-icons/md";
import { useTranslation } from 'react-i18next';
import { useLocation } from "react-router-dom";
const SideBar1 = (props) => {
    const { collapsed, rtl, toggled, setToggled, theme, darkMode } = props;
    const { t } = useTranslation();
    const location = useLocation();
    const currentPath = location.pathname;
    const themes = {
        light: {
            sidebar: {
                backgroundColor: "#fff",
                color: '#1f2122ff',
            },
            menu: {
                menuContent: '#fbfcfd',
                icon: '#ffffffff',
                hover: {
                    backgroundColor: '#2fff001f',
                    color: '#2fff008b',
                },
                active: {
                    backgroundImage: 'linear-gradient( 75.1deg,  rgba(34,126,34,1) 6%, rgba(99,226,17,1) 84.3% )',
                    color: '#fff',
                },
                disabled: {
                    color: '#9fb6cf',
                },
            },
        },
        dark: {
            sidebar: {
                backgroundColor: "#071e34ff",
                color: '#8ba1b7',
            },
            menu: {
                menuContent: '#071e34ff',
                icon: "#fff",
                hover: {
                    backgroundColor: '#2fff001f',
                    color: '#2fff008b',
                },
                active: {
                    backgroundImage:
                        'linear-gradient( 75.1deg,  rgba(34,126,34,1) 6%, rgba(99,226,17,1) 84.3% )',
                    color: '#fff',
                },
                disabled: {
                    color: '#3e5e7e',
                },
            },
        },
    };

    const menuItemStyles = {
        root: {
            fontSize: '1.1rem',
            fontWeight: 600,

        },
        icon: ({ active }) => ({
            color: active
                ? darkMode.value // value là true nếu đang dark mode
                    ? themes.dark.menu.icon // màu icon khi active + dark mode
                    : themes.light.menu.icon // màu icon khi active + light mode
                : darkMode.value
        }),
        button: ({ active }) => ({
            margin: collapsed ? "0" : "0 10px",
            borderRadius: collapsed ? "0" : "10px",
            [`&.${menuClasses.disabled}`]: {
                color: themes[theme].menu.disabled.color,
            },
            '&:hover': {
                backgroundColor: darkMode ? themes.light.menu.hover.backgroundColor : themes.dark.menu.hover.backgroundColor,
                color: themes[theme].menu.hover.color,

            },
            '&.ps-active': {
                backgroundImage: themes[theme].menu.active.backgroundImage,
                color: themes[theme].menu.active.color,
            },

        }),
        subMenuContent: {
            backgroundColor: darkMode?themes.light.menu.menuContent:themes.dark.menu.menuContent,
        },
    };
    return (
        <>
            <Sidebar
                style={{ height: "100vh" }}
                rtl={rtl}
                onBackdropClick={() => setToggled(false)}
                collapsed={collapsed}
                toggled={toggled}
                breakPoint="md"
                width="270px"
                onToggle={() => setToggled(!toggled)}
                backgroundColor={darkMode ? themes.light.sidebar.backgroundColor : themes.dark.sidebar.backgroundColor}
                rootStyles={{
                    color: darkMode ? themes.light.sidebar.color : themes.dark.sidebar.color,

                }}

            >
                <Menu iconShape="circle" menuItemStyles={menuItemStyles}>
                    <MenuItem
                        icon={<FaHome />}
                        component={<Link to="/admin" />}
                        active={currentPath === "/admin"}
                        className='mt-2 mb-2'
                    >
                        {t('adminPage.sideBar.dashboard')}
                    </MenuItem>
                    <SubMenu
                        icon={<MdOutlineManageSearch />}
                        label={t('adminPage.breadcrumb.management')}
                        menuItemStyles={menuItemStyles}
                        className='mt-2 mb-2'
                        
                    >
                        <MenuItem component={<Link to="/admin/manage-users" />} active={currentPath === "/admin/manage-users"} className='mt-2 mb-2'>
                            {t('adminPage.sideBar.usersManagement')}
                        </MenuItem>
                        <MenuItem component={<Link to="/admin/manage-quizzes" />} active={currentPath === "/admin/manage-quizzes"} className='mt-2 mb-2'>
                            {t('adminPage.sideBar.quizzesManagement')}
                        </MenuItem>
                        <MenuItem component={<Link to="/admin/manage-questions" />} active={currentPath === "/admin/manage-questions"} className='mt-2 mb-2'>
                            {t('adminPage.sideBar.questionsManagement')}
                        </MenuItem>
                        <MenuItem component={<Link to="/admin/manage-roles" />} active={currentPath === "/admin/manage-roles"} className='mt-2 mb-2'>
                            {t('adminPage.sideBar.rolesManagement')}
                        </MenuItem>
                        <MenuItem component={<Link to="/admin/manage-groups" />} active={currentPath === "/admin/manage-groups"} className='mt-2 mb-2'>
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
        </>
    )
}

export default SideBar1