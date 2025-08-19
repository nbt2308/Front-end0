import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { deleteUser } from '../../../../services/apiService';
import { toast } from 'react-toastify';
import { IoIosWarning } from "react-icons/io";
const ModalDeleteUser = (props) => {
    const { show, setShow, dataDelete, fetchListUsersWithPaginate, setCurrentPage } = props;

    const handleClose = () => setShow(false);

    const handleConfirmDelete = async () => {
        let data = await deleteUser(dataDelete.id);
        if (data && data.EC === 0) {
            toast.success(data.EM);
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
                <Modal.Header closeButton>
                    <Modal.Title><IoIosWarning className='icon' />Delete confirmation</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <b>Are you sure to delete this account?</b>
                    <br />
                    <input type="email" value={dataDelete && dataDelete.email ? dataDelete.email : ""} disabled />

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

export default ModalDeleteUser;