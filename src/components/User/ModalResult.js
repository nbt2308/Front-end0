import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

// import { toast } from 'react-toastify';

const ModalResult = (props) => {
    const { show, setShow, dataModalResult } = props;

    const handleClose = () => setShow(false);

    return (
        <>
            <Modal show={show} onHide={handleClose} backdrop="static" className='modal-show-result'>
                <Modal.Header closeButton>
                    <Modal.Title>Your Result</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h1>CONGRATULATION</h1>
                    <div className="result">
                        <p>Your answered</p>

                        <div className='counter-result'><span>{dataModalResult.countCorrect}/{dataModalResult.countTotal}</span></div>

                        <p>questions correct</p>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Back to Home
                    </Button>
                    <Button variant="primary" >
                        Show answers
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalResult;