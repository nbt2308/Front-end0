import NavDropdown from 'react-bootstrap/NavDropdown';
import { AiOutlineGlobal } from "react-icons/ai";
import { useTranslation } from 'react-i18next';
const Language = () => {
    const { t, i18n } = useTranslation();
    const handleChangeLanguage = (language) => {
        i18n.changeLanguage(language);
    }
    return (
        <NavDropdown title={<AiOutlineGlobal />} id="basic-nav-dropdown" className='me-3 languages'>
            <NavDropdown.Item onClick={() => { handleChangeLanguage("vi") }}>{t('homepage.header.vi')} (VI)</NavDropdown.Item>
            <NavDropdown.Item onClick={() => { handleChangeLanguage("en") }}>{t('homepage.header.en')} (UK)</NavDropdown.Item>
        </NavDropdown>
    )
}
export default Language