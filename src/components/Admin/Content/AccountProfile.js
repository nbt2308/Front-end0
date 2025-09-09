import { Tab, Tabs } from 'react-bootstrap';
import PersonalDetails from '../../Header/PersonalDetails';
import ChangePassword from '../../Header/ChangePassword';
import History from '../../Header/History';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import "./AccountProfile.scss"
import { useOutletContext } from 'react-router-dom';
const AccountProfile = () => {
    const { darkMode } = useOutletContext();
    const [key, setKey] = useState('Personal Details');
    const { t } = useTranslation();
    return (
        <>
            <div className="accountprofile-container">
                <div className={darkMode ? "breadcrumb-container  light" : "breadcrumb-container  dark-card"}>
                    <div className="account-title">
                        {t('adminPage.accountProfile.title')}
                    </div>
                    <div className="nav-breadcrumb d-flex justify-content-center align-items-center">

                        <ol className="breadcrumb">
                            <li className={darkMode ? "breadcrumb-item basic-light" : "breadcrumb-item basic-dark"}><a href="/">{t('adminPage.breadcrumb.home')}</a></li>
                            <li className={darkMode ? "breadcrumb-item active-light" : "breadcrumb-item active-dark"} aria-current="page">{t('adminPage.breadcrumb.accountProfile')}</li>
                        </ol>

                    </div>
                </div>
                <Tabs
                    id="controlled-tab-example"
                    activeKey={key}
                    onSelect={(k) => setKey(k)}
                    className={darkMode ? "mt-3 mb-3 light-card" : "mt-3 mb-3 dark-card"}
                    justify
                >
                    <Tab eventKey="Personal Details" title={t('adminPage.accountProfile.personalDetail.title1')}>
                        <PersonalDetails darkMode={darkMode}/>
                    </Tab>
                    <Tab eventKey="Change Password" title={t('adminPage.accountProfile.changePassword.title')}>
                        <ChangePassword darkMode={darkMode}/>
                    </Tab>
                    <Tab eventKey="contact" title={t('adminPage.accountProfile.history.title1')} >
                        <History darkMode={darkMode}/>
                    </Tab>
                </Tabs>
            </div>
        </>
    )
}
export default AccountProfile