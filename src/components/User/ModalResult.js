import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from "react-router";
// import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
const ModalResult = (props) => {
    const { show, setShow, dataModalResult,setCheck } = props;
    const { t } = useTranslation();
    const Navigate = useNavigate();
    const handleClose = () => {
        setShow(false);
        Navigate("/")
    }
    const handleShowAnswer=()=>{
        setCheck(prev=>({
            ...prev,
            isShowAnswer:true
        }))
        setShow(false);
    }
    
    return (
        <>
            <Modal show={show} onHide={handleClose} backdrop="static" className='modal-show-result'>
                <Modal.Header >
                    <Modal.Title>{t('usersPage.modalResult.resultTitle')}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h1>{t('usersPage.modalResult.congratulation')}</h1>
                    <div className="result">
                        <p>{t('usersPage.modalResult.yourResult')}</p>

                        <div className='counter-result'><span>{dataModalResult.countCorrect}/{dataModalResult.countTotal}</span></div>

                        <p>{t('usersPage.modalResult.questionsCorrect')}</p>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        {t('usersPage.modalResult.buttonBack')}
                    </Button>
                    <Button variant="primary" onClick={()=>{handleShowAnswer()}}>
                        {t('usersPage.modalResult.buttonShowAnswer')}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalResult;