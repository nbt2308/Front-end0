import { Tab, Tabs } from 'react-bootstrap';
import PersonalDetails from '../../../Header/PersonalDetails';
import ChangePassword from '../../../Header/ChangePassword';
import History from '../../../Header/History';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import "./AccountProfile.scss"
import { useOutletContext } from 'react-router-dom';
import Breadcrumb from '../../BreadCrump/Breadcrumb';
const AccountProfile = () => {
    const { darkMode, breadCrumb, setBreadCrumb } = useOutletContext();
    const [key, setKey] = useState('Personal Details');
    const { t } = useTranslation();
    useEffect(() => {
        setBreadCrumb("accountProfile");
    }, [])
    return (
        <>
            <div className="accountprofile-container">
                {/* Breadcrumb */}
                <Breadcrumb
                    breadCrumb={breadCrumb}
                    darkMode={darkMode}
                />
                <Tabs
                    id="controlled-tab-example"
                    activeKey={key}
                    onSelect={(k) => setKey(k)}
                    className={darkMode ? "mt-3 mb-3 light-card" : "mt-3 mb-3 dark-card"}
                    justify
                >
                    <Tab eventKey="Personal Details" title={t('adminPage.accountProfile.personalDetail.title1')}>
                        <PersonalDetails darkMode={darkMode} />
                    </Tab>
                    <Tab eventKey="Change Password" title={t('adminPage.accountProfile.changePassword.title')}>
                        <ChangePassword darkMode={darkMode} />
                    </Tab>
                    <Tab eventKey="contact" title={t('adminPage.accountProfile.history.title1')} >
                        <History darkMode={darkMode} />
                    </Tab>
                </Tabs>
            </div>
        </>
    )
}
export default AccountProfile