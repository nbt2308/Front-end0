import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useEffect, useState } from 'react';
import _ from 'lodash';
import { FaPlusCircle } from 'react-icons/fa';
import { putUpdateQuiz } from '../../../../services/apiService';
import { toast } from 'react-toastify';
const ModalUpdateQuiz=(props)=>{
    const { show, setShow,dataUpdate,fetchListQuiz } = props;

    const handleClose = () => {
        setShow(false);
        setName("")
        setDescription("")
        setImage("")
        setPreviewImage("")
       
    }
    
    //define state
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [difficulty, setDifficulty] = useState("EASY");
    const [image, setImage] = useState("");
    const [previewImage, setPreviewImage] = useState("");

    //useEffect
    useEffect(()=>{
        if (!_.isEmpty(dataUpdate)){
            setName(dataUpdate.name)
            setDescription(dataUpdate.description)
            setDifficulty(dataUpdate.difficulty)
            setImage("");
            if(dataUpdate.image){
                setPreviewImage(`data:image/jpeg;base64,${dataUpdate.image}`)
            }
        }
    },[dataUpdate])

    const handleChangeImage = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            setPreviewImage(URL.createObjectURL(event.target.files[0]));
            setImage(event.target.files[0]);
        } else {

        }
    }

    const handleSubmit=async()=>{
        let res=await putUpdateQuiz(dataUpdate.id,description,name,difficulty,image)
        if(res&& res.EC===0){
            toast.success(res.EM);
            handleClose();
            await fetchListQuiz();
        }
         if (res && res.EC !== 0) {
            toast.error(res.EM);
        }
    }
    return(
         <Modal show={show} onHide={handleClose} size="lg" backdrop="static" className='modal-add-quiz'>
                <Modal.Header closeButton>
                    <Modal.Title>Update a Quiz</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Row className="mb-3">
                            <Form.Group as={Col} >
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter Quiz's name"
                                    value={name}
                                    onChange={(event) => { setName(event.target.value) }} />
                            </Form.Group>
                        </Row>
                        <Row>
                            <Form.Group as={Col} className="mb-3" >
                                <Form.Label>Difficulty</Form.Label>
                                <Form.Select value={difficulty} onChange={(event) => { setDifficulty(event.target.value) }}>
                                    <option value="EASY">EASY</option>
                                    <option value="MEDIUM">MEDIUM</option>
                                    <option value="HARD">HARD</option>
                                </Form.Select>
                            </Form.Group>
                        </Row>
                        <Row>
                            <Form.Group as={Col}  >
                                <Form.Label>Description</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Describe the quiz purpose or content"
                                    as="textarea"
                                    value={description}
                                    onChange={(event) => { setDescription(event.target.value) }}
                                />
                            </Form.Group>
                        </Row>
                        <Row>
                            <Form.Group className="mt-3" >
                                <Form.Label className='label-uploadFile' htmlFor="upload-image"><FaPlusCircle className='icon-plus' />Upload Image File</Form.Label>
                                <Form.Control
                                    type='file'
                                    hidden
                                    id="upload-image"
                                    onChange={(event) => handleChangeImage(event)}
                                />
                            </Form.Group>
                        </Row>
                        <Row>
                            <Form.Group className="image-preview">
                                {previewImage ? <img src={previewImage} alt="Preview" /> : <span>Preview Image</span>}
                            </Form.Group>
                        </Row>
                    </Form>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={() => { handleSubmit() }}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
    )
}
export default ModalUpdateQuiz