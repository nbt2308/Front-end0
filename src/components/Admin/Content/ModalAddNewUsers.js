import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
const AddUsers=()=> {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Add new users
            </Button>

            <Modal show={show} onHide={handleClose} size="lg" backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>Add new users</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" />
                            </Form.Group>
                        </Row>


                        <Row className="mb-3">
                            <Form.Group as={Col} className="mb-3" controlId="formGridUsername">
                                <Form.Label>Username</Form.Label>
                                <Form.Control placeholder="Username" />
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridRole">
                                <Form.Label>Role</Form.Label>
                                <Form.Select defaultValue="USER">
                                    <option>USER</option>
                                    <option>ADMIN</option>
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-12" controlId="formGridImage">
                                <Form.Label>Image</Form.Label>
                                 <Form.Control type='file' />
                            </Form.Group>
                           
                        </Row>
                    </Form>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default AddUsers;