import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from "react-router";
// import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
const ModalConfirmSelect = (props) => {
    const { show, setShow, check, handleFinishResult, setCheck } = props;


    const Navigate = useNavigate();
    const { t } = useTranslation();
    const handleClose = () => {
        setShow(false);
    }
    const handleFinish = () => {
        setCheck(prev => {
            const newState = { 
                ...prev, 
                isFinish: true,
                onTimeUp:true};
            Finish(newState); 
            return newState;
        })
        
    }
    const Finish = (state) => {
        if (state.isFinish) {
            handleFinishResult();
            setShow(false);
        }
        
    }
    return (
        <>
            <Modal show={show} onHide={handleClose} backdrop="static" className='modal-confirm' >
                {/* <Modal.Header closeButton>
                </Modal.Header> */}
                <Modal.Body>
                    <span>{t('usersPage.modalConfirmSelect.titleConfirm')}</span>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        {t('usersPage.modalConfirmSelect.buttonNo')}
                    </Button>
                    <Button variant="success" onClick={() => handleFinish()} >
                        {t('usersPage.modalConfirmSelect.buttonYes')}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalConfirmSelect;