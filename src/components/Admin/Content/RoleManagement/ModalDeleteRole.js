import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { deleteRole } from '../../../../services/apiService';
import { toast } from 'react-toastify';
import { IoIosWarning } from "react-icons/io";
import { useTranslation } from 'react-i18next';
const ModalDeleteRole = (props) => {
    const { show, setShow, dataDelete, fetchListRoleWithPagination, setCurrentPage,darkMode } = props;
    const { t } = useTranslation();
    const handleClose = () => setShow(false);

    const handleConfirmDelete = async () => {
        let data = await deleteRole(dataDelete.id);
        if (data && data.EC === 0) {
            toast.success(`${t('adminPage.rolesManagement.modalDeleteRole.deleteSucceed')}`);
            handleClose();
            // await fetchListUsers();
            setCurrentPage(1);
            await fetchListRoleWithPagination(1);
        }
        if (data && data.EC !== 0) {
            toast.error(data.EM);
        }
    }
    return (
        <>
            <Modal show={show} onHide={handleClose} backdrop="static" className='modal-delete-role'>
                <Modal.Header closeButton className={darkMode ? "light" : "dark"} closeVariant={darkMode ? "black" : "white"}>
                    <Modal.Title className='d-flex align-items-center gap-1'><IoIosWarning className='icon text-danger' />{t('adminPage.usersManagement.modalDeleteUsers.title')}</Modal.Title>
                </Modal.Header >
                <Modal.Body className={darkMode ? "modal-body light" : "modal-body dark"}>
                    <b>{t('adminPage.rolesManagement.modalDeleteRole.text1')}</b>
                    <br />
                    <input 
                    className={darkMode ? "light w-25" : "dark-card w-25"}
                    type="text" value={dataDelete && dataDelete.url ? dataDelete.url : ""} disabled />
                    <b> With method </b>
                    <input 
                    className={darkMode ? "light w-25" : "dark-card w-25"}
                    type="text" value={dataDelete && dataDelete.method ? dataDelete.method : ""} disabled />

                </Modal.Body>
                <Modal.Footer className={darkMode ? "modal-footer light" : "modal-footer dark"}>
                    <Button variant="secondary" onClick={handleClose}>
                        {t('adminPage.rolesManagement.modalDeleteRole.buttonCancel')}
                    </Button>
                    <Button variant="danger" onClick={() => { handleConfirmDelete() }}>
                        {t('adminPage.rolesManagement.modalDeleteRole.buttonConfirm')}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalDeleteRole;