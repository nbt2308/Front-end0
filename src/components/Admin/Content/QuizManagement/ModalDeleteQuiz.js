import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { deleteQuiz } from '../../../../services/apiService';
import { toast } from 'react-toastify';
import { IoIosWarning } from "react-icons/io";
import { useTranslation } from 'react-i18next';
const ModalDeleteQuiz = (props) => {
    const { show, setShow, dataDelete, fetchListQuiz, themeState, fetchListQuizWithPagination, setCurrentPage } = props;
    const { t } = useTranslation();

    const handleClose = () => setShow(false);


    const handleConfirmDelete = async () => {
        let data = await deleteQuiz(dataDelete.id);
        if (data && data.EC === 0) {
            toast.success(`${t('adminPage.quizzesManagement.modalDeleteQuiz.deleteSucceed')}`);
            handleClose();
            // await fetchListQuiz();
            setCurrentPage(1);
            await fetchListQuizWithPagination(1);

        }
        if (data && data.EC !== 0) {
            toast.error(data.EM);
        }
    }
    return (
        <>
            <Modal show={show} onHide={handleClose} backdrop="static" className='modal-delete-user'>
                <Modal.Header closeButton className={themeState ? "light" : "dark"} closeVariant={themeState ? "black" : "white"}>
                    <Modal.Title><IoIosWarning className='icon' />{t('adminPage.quizzesManagement.modalDeleteQuiz.title')}</Modal.Title>
                </Modal.Header>
                <Modal.Body className={themeState ? "modal-body light" : "modal-body dark"}>
                    <b>{t('adminPage.quizzesManagement.modalDeleteQuiz.label1')}</b>
                    <br />
                    <input
                        className={themeState ? "light" : "theme-card-dark"}
                        type="text"
                        value={dataDelete && dataDelete.name ? dataDelete.name : ""}
                        disabled />

                </Modal.Body>
                <Modal.Footer className={themeState ? "modal-footer light" : "modal-footer dark"}>
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