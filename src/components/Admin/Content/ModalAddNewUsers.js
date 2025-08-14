import { useState } from 'react';
import './ManageUsers.scss';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { FaPlusCircle, FaPlus } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { postCreateNewUser } from '../../../services/apiService';
import { validateEmail, validatePassword, validateUsername } from '../../../utils/validators';
const AddUsers = (props) => {
    const [show, setShow] = useState(false);
    const { setCurrentPage, fetchListUsersWithPaginate } = props
    const handleClose = () => {
        setShow(false);
        setEmail("");
        setPassword("");
        setUsername("");
        setRole("");
        setImage("");
        setPreviewImage("");
    };
    const handleShow = () => setShow(true);

    //define state
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [Username, setUsername] = useState("");
    const [Role, setRole] = useState("USER");
    const [Image, setImage] = useState("");
    const [PreviewImage, setPreviewImage] = useState("");
    
    const handleChangeImage = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            setPreviewImage(URL.createObjectURL(event.target.files[0]));
            setImage(event.target.files[0]);
        } else {

        }
    }
    const handleSubmit = async (event) => {
        //validate
        const isInvalidEmail = validateEmail(Email);
        const isInvalidPassword = validatePassword(Password);
        const isInvalidUsername = validateUsername(Username);
        if (!isInvalidEmail) {
            toast.error("Invalid Email");
            return;
        }
        if (!isInvalidPassword) {
            toast.error("Password must be at least 5 characters long and include at least one uppercase letter,one lowercase letter, one number, and one special character.");
            return;
        }
        if (!isInvalidUsername) {
            toast.error("Username must be at least 5 characters long");
            return;
        }
        
        //call apis
        let data = await postCreateNewUser(Email, Password, Username, Role, Image);

        if (data && data.EC === 0) {
            toast.success(data.EM);
            handleClose();
            // await fetchListUsers()
            setCurrentPage(1);
            await fetchListUsersWithPaginate(1);
        }
        if (data && data.EC !== 0) {
            toast.error(data.EM);
        }


    }

    return (
        <>
            <Button variant="primary" onClick={handleShow} className='btn-showModal'>
                <FaPlus />Add new users
            </Button>

            <Modal show={show} onHide={handleClose} size="lg" backdrop="static" className='modal-add-user'>
                <Modal.Header closeButton>
                    <Modal.Title>Add new users</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter email"
                                    value={Email}
                                    onChange={(event) => { setEmail(event.target.value) }} />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Password"
                                    value={Password}
                                    onChange={(event) => { setPassword(event.target.value) }}
                                />
                            </Form.Group>
                        </Row>


                        <Row className="mb-3">
                            <Form.Group as={Col} className="mb-3" controlId="formGridUsername">
                                <Form.Label>Username</Form.Label>
                                <Form.Control
                                    placeholder="Username"
                                    value={Username}
                                    onChange={(event) => { setUsername(event.target.value) }} />
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridRole">
                                <Form.Label>Role</Form.Label>
                                <Form.Select value={Role} onChange={(event) => { setRole(event.target.value) }}>
                                    <option value="USER">USER</option>
                                    <option value="ADMIN">ADMIN</option>
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="md-12" controlId="formGridImage">
                                <Form.Label className='label-uploadFile'><FaPlusCircle className='icon-plus' />Upload Image File</Form.Label>
                                <Form.Control
                                    type='file'
                                    hidden

                                    onChange={(event) => handleChangeImage(event)}
                                />
                            </Form.Group>
                            <Form.Group className="image-preview" controlId="formGridImagePreview">
                                {PreviewImage ? <img src={PreviewImage} alt="Preview" /> : <span>Preview Image</span>}
                            </Form.Group>

                        </Row>
                    </Form>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={(event) => { handleSubmit(event) }}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default AddUsers;