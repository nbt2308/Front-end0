import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { deleteQuiz } from '../../../../services/apiService';
import { toast } from 'react-toastify';
import { IoIosWarning } from "react-icons/io";
import { useTranslation } from 'react-i18next';
const ModalDeleteQuiz = (props) => {
    const { show, setShow, dataDelete, fetchListQuiz, darkMode } = props;
    const { t } = useTranslation();

    const handleClose = () => setShow(false);


    const handleConfirmDelete = async () => {
        let data = await deleteQuiz(dataDelete.id);
        if (data && data.EC === 0) {
            toast.success(`${t('adminPage.quizzesManagement.modalDeleteQuiz.deleteSucceed')}`);
            handleClose();
            await fetchListQuiz();
        }
        if (data && data.EC !== 0) {
            toast.error(data.EM);
        }
    }
    return (
        <>
            <Modal show={show} onHide={handleClose} backdrop="static" className='modal-delete-user'>
                <Modal.Header closeButton className={darkMode ? "light" : "dark"} closeVariant={darkMode ? "black" : "white"}>
                    <Modal.Title><IoIosWarning className='icon' />{t('adminPage.quizzesManagement.modalDeleteQuiz.title')}</Modal.Title>
                </Modal.Header>
                <Modal.Body className={darkMode ? "modal-body light" : "modal-body dark"}>
                    <b>{t('adminPage.quizzesManagement.modalDeleteQuiz.label1')}</b>
                    <br />
                    <input
                        className={darkMode ? "light" : "dark-card"}
                        type="text"
                        value={dataDelete && dataDelete.name ? dataDelete.name : ""}
                        disabled />

                </Modal.Body>
                <Modal.Footer className={darkMode ? "modal-footer light" : "modal-footer dark"}>
                    <Button variant="secondary" onClick={handleClose}>
                        {t('adminPage.usersManagement.modalAddUsers.buttonCancel')}
                    </Button>
                    <Button variant="danger" onClick={() => { handleConfirmDelete() }}>
                        {t('adminPage.usersManagement.modalDeleteUsers.buttonConfirm')}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalDeleteQuiz;