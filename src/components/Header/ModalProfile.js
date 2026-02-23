import { useState } from 'react';
import './ModalProfile.scss'
import { useTranslation } from 'react-i18next';
import { Modal, Tab, Tabs } from 'react-bootstrap';
import PersonalDetails from './PersonalDetails';
import ChangePassword from './ChangePassword';
import History from './History';
const ModalProfile = (props) => {
    const { t } = useTranslation();
    const [key, setKey] = useState('Personal Details');
    const { show, setShow,themeState } = props
    const handleClose = () => {
        setShow(false)
    }
    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                size='xl'
            >
                <Modal.Header closeButton className={themeState ? "light" : "dark"} closeVariant={themeState ? "black" : "white"}>
                    <Modal.Title>{t('adminPage.accountProfile.title')}</Modal.Title>
                </Modal.Header>
                <Modal.Body className={themeState ? "modal-body light" : "modal-body dark"}>
                    <Tabs
                        id="controlled-tab-example"
                        activeKey={key}
                        onSelect={(k) => setKey(k)}
                        className="mb-3"
                        justify
                    >
                        <Tab eventKey="Personal Details" title={t('adminPage.accountProfile.personalDetail.title1')}>
                            <PersonalDetails themeState={themeState}/>
                        </Tab>
                        <Tab eventKey="Change Password" title={t('adminPage.accountProfile.changePassword.title')}>
                            <ChangePassword themeState={themeState}/>
                        </Tab>
                        <Tab eventKey="contact" title={t('adminPage.accountProfile.history.title1')} >
                            <History themeState={themeState}/>
                        </Tab>
                    </Tabs>
                </Modal.Body>

            </Modal>

        </>
    );
}

export default ModalProfile;