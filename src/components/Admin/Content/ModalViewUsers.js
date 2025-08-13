import { useEffect, useState } from 'react';
import './ManageUsers.scss';
import Modal from 'react-bootstrap/Modal';
import { FiMail } from "react-icons/fi";
import { FaRegUser } from "react-icons/fa";
import _ from 'lodash';

const ModalViewUsers = (props) => {
    const {  show, setShow, dataView,resetViewData } = props
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
                <Modal.Header closeButton>
                    <Modal.Title>Personal Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
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