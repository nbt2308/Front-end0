import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { deleteUser } from '../../../../services/apiService';
import { toast } from 'react-toastify';
import { IoIosWarning } from "react-icons/io";
import { useTranslation } from 'react-i18next';
const ModalDeleteUser = (props) => {
    const { show, setShow, dataDelete, fetchListUsersWithPaginate, setCurrentPage,darkMode } = props;
    const { t } = useTranslation();
    const handleClose = () => setShow(false);

    const handleConfirmDelete = async () => {
        let data = await deleteUser(dataDelete.id);
        if (data && data.EC === 0) {
            toast.success(`${t('adminPage.usersManagement.modalDeleteUsers.deleteSucceed')}`);
            handleClose();
            // await fetchListUsers();
            setCurrentPage(1);
            await fetchListUsersWithPaginate(1);
        }
        if (data && data.EC !== 0) {
            toast.error(data.EM);
        }
    }
    return (
        <>
            <Modal show={show} onHide={handleClose} backdrop="static" className='modal-delete-user'>
                <Modal.Header closeButton className={darkMode ? "light" : "dark"} closeVariant={darkMode ? "black" : "white"}>
                    <Modal.Title><IoIosWarning className='icon' />{t('adminPage.usersManagement.modalDeleteUsers.title')}</Modal.Title>
                </Modal.Header >
                <Modal.Body className={darkMode ? "modal-body light" : "modal-body dark"}>
                    <b>{t('adminPage.usersManagement.modalDeleteUsers.text1')}</b>
                    <br />
                    <input 
                    className={darkMode ? "light" : "dark-card"}
                    type="email" value={dataDelete && dataDelete.email ? dataDelete.email : ""} disabled />

                </Modal.Body>
                <Modal.Footer className={darkMode ? "modal-footer light" : "modal-footer dark"}>
                    <Button variant="secondary" onClick={handleClose}>
                        {t('adminPage.usersManagement.modalDeleteUsers.buttonCancel')}
                    </Button>
                    <Button variant="danger" onClick={() => { handleConfirmDelete() }}>
                        {t('adminPage.usersManagement.modalDeleteUsers.buttonConfirm')}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalDeleteUser;