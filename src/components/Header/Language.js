import NavDropdown from 'react-bootstrap/NavDropdown';
import { AiOutlineGlobal } from "react-icons/ai";
import { useTranslation } from 'react-i18next';
import VN from "../../assets/images/vietnam-flag.svg";
import US from "../../assets/images/US.svg";
const Language = (props) => {
    const { darkMode } = props
    const { t, i18n } = useTranslation();
    const handleChangeLanguage = (language) => {
        i18n.changeLanguage(language);
    }


    return (
        <NavDropdown
            title={<AiOutlineGlobal />}
            id="basic-nav-dropdown"
            className={darkMode ? " languages language-admin dropdown-light" : " languages language-admin dropdown-dark"}>
            <NavDropdown.Item onClick={() => { handleChangeLanguage("vi") }}>
                <img src={VN} alt="icon" width={20} height={20} />
                {t('homepage.header.vi')} 
            </NavDropdown.Item>
            <NavDropdown.Item onClick={() => { handleChangeLanguage("en") }}>
                <img src={US} alt="icon" width={20} height={20} />
                {t('homepage.header.en')} 
            </NavDropdown.Item>
        </NavDropdown>
    )
}
export default Language