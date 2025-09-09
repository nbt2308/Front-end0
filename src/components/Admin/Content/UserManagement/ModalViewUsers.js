import { useEffect, useState } from 'react';
import './ManageUsers.scss';
import Modal from 'react-bootstrap/Modal';
import { FiMail } from "react-icons/fi";
import { FaRegUser } from "react-icons/fa";
import _ from 'lodash';
import { useTranslation } from 'react-i18next';
const ModalViewUsers = (props) => {
    const {  show, setShow, dataView,resetViewData,darkMode } = props
    const { t } = useTranslation();
    const handleClose = () => {
        setShow(false);
        setEmail("");
        setUsername("");
        setRole("");
        setImage("");
        resetViewData();
    };

    //define state
    const [Email, setEmail] = useState("");
    const [Username, setUsername] = useState("");
    const [Role, setRole] = useState("USER");
    const [Image, setImage] = useState("");


    useEffect(() => {
        if (!_.isEmpty(dataView)) {
            //update state
            setEmail(dataView.email);
            setUsername(dataView.username);
            setRole(dataView.role);
            if (dataView.image) {
                setImage(`data:image/jpeg;base64,${dataView.image}`);
            }

        }
    }, [dataView])
    
    return (
        <>
            <Modal show={show} onHide={handleClose} dialogClassName="modal-10w" backdrop="static" className='modal-view-user'>
                <Modal.Header closeButton className={darkMode ? "light" : "dark"} closeVariant={darkMode ? "black" : "white"}>
                    <Modal.Title>{t('adminPage.usersManagement.modalViewUsers.title')}</Modal.Title>
                </Modal.Header>
                <Modal.Body className={darkMode ? "modal-body light" : "modal-body dark"}>
                    <div className="user-container">
                        <div className="user-image">
                            <img src={Image} alt="imageUser" />

                        </div>
                        <div className="user-infor-content">
                            <div className="user-name">
                                <span >{Username}</span>
                            </div>
                            <div className="user-infor">
                                <span><FiMail  className='icon'/> {Email}</span>
                                <span><FaRegUser  className='icon' /> {Role} </span>
                                
                            </div>

                        </div>
                    </div>

                </Modal.Body>

            </Modal>
        </>
    );
}

export default ModalViewUsers;