import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { postUnassignRole } from '../../../../services/apiService';
import { toast } from 'react-toastify';
import { IoIosWarning } from "react-icons/io";
import { useTranslation } from 'react-i18next';
const ModalConfirmUnassignRole = (props) => {
    const { show, setShow, dataUnassign, fetchListRoles, setCurrentPage, themeState } = props;
    const { t } = useTranslation();
    const handleClose = () => setShow(false);

    const handleConfirmUnassign = async () => {
        let data = await postUnassignRole(dataUnassign);
        if (data && data.EC === 0) {
            toast.success(`${t('adminPage.rolesManagement.modalDeleteRole.deleteSucceed')}`);
            handleClose();
            setCurrentPage(1);
            await fetchListRoles(dataUnassign.groupId,1);
        }
        if (data && data.EC !== 0) {
            toast.error(data.EM);
        }
    }
    return (
        <>
            <Modal show={show} onHide={handleClose} backdrop="static" className='modal-delete-role ' size='md' centered>
                <Modal.Header closeButton className={themeState ? "light border border-danger" : "dark border border-danger"} closeVariant={themeState ? "black" : "white"}>
                    <Modal.Title className='d-flex align-items-center gap-1'><IoIosWarning className='icon text-danger' />{t('adminPage.rolesManagement.modalUnassignRole.unassignConfirm')}</Modal.Title>
                </Modal.Header >
                <Modal.Body className={themeState ? "modal-body light border border-danger" : "modal-body dark border border-danger"}>
                    <h3>{t('adminPage.rolesManagement.modalUnassignRole.messageConfirm')}</h3>

                </Modal.Body>
                <Modal.Footer className={themeState ? "modal-footer light border border-danger" : "modal-footer dark border border-danger"}>
                    <Button variant="secondary" onClick={handleClose}>
                        {t('adminPage.rolesManagement.modalDeleteRole.buttonCancel')}
                    </Button>
                    <Button variant="danger" onClick={() => { handleConfirmUnassign() }}>
                        {t('adminPage.rolesManagement.modalDeleteRole.buttonConfirm')}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalConfirmUnassignRole;