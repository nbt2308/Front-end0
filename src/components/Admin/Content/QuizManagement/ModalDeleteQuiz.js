import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { deleteQuiz } from '../../../../services/apiService';
import { toast } from 'react-toastify';
import { IoIosWarning } from "react-icons/io";
const ModalDeleteQuiz = (props) => {
    const { show, setShow, dataDelete, fetchListQuiz } = props;

    const handleClose = () => setShow(false);
    console.log('id',dataDelete.id);
    
    const handleConfirmDelete = async () => {
        let data = await deleteQuiz(dataDelete.id);
        if (data && data.EC === 0) {
            toast.success(data.EM);
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
                <Modal.Header closeButton>
                    <Modal.Title><IoIosWarning className='icon' />Delete confirmation</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <b>Are you sure to delete this quiz?</b>
                    <br />
                    <input type="text" value={dataDelete && dataDelete.name ? dataDelete.name : ""} disabled />

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={() => { handleConfirmDelete() }}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalDeleteQuiz;