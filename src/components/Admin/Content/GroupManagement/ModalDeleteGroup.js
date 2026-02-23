import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { deleteGroup } from '../../../../services/apiService';
import { toast } from 'react-toastify';
import { IoIosWarning } from "react-icons/io";
import { useTranslation } from 'react-i18next';
const ModalDeleteGroup = (props) => {
    const { show, setShow, dataDelete, fetchListGroupsWithPagination, setCurrentPage,themeState } = props;
    const { t } = useTranslation();
    const handleClose = () => setShow(false);

    const handleConfirmDelete = async () => {
        let data = await deleteGroup(dataDelete.id);
        if (data && data.EC === 0) {
            toast.success(`${t('adminPage.groupsManagement.modalDeleteGroup.deleteSucceed')}`);
            handleClose();
            // await fetchListUsers();
            setCurrentPage(1);
            await fetchListGroupsWithPagination(1);
        }
        if (data && data.EC !== 0) {
            toast.error(data.EM);
        }
    }
    return (
        <>
            <Modal show={show} onHide={handleClose} backdrop="static" className='modal-delete-group'>
                <Modal.Header closeButton className={themeState ? "light" : "dark"} closeVariant={themeState ? "black" : "white"}>
                    <Modal.Title className=' d-flex align-items-center'><IoIosWarning className='icon text-danger' />{t('adminPage.groupsManagement.modalDeleteGroup.title')}</Modal.Title>
                </Modal.Header >
                <Modal.Body className={themeState ? "modal-body light" : "modal-body dark"}>
                    <b>{t('adminPage.groupsManagement.modalDeleteGroup.textConfirmDelete')}</b>
                    <br />
                    <input 
                    className={themeState ? "light" : "theme-card-dark"}
                    type="text" value={dataDelete && dataDelete.name ? dataDelete.name : ""} disabled />

                </Modal.Body>
                <Modal.Footer className={themeState ? "modal-footer light" : "modal-footer dark"}>
                    <Button variant="secondary" onClick={handleClose}>
                        {t('adminPage.groupsManagement.modalDeleteGroup.btnCancel')}
                    </Button>
                    <Button variant="danger" onClick={() => { handleConfirmDelete() }}>
                        {t('adminPage.groupsManagement.modalDeleteGroup.btnConfirm')}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalDeleteGroup;