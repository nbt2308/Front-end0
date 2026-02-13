import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { useState } from 'react';
import { postCreateNewQuiz } from '../../../../services/apiService';
import { validateName } from '../../../../utils/validators';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
//Filepond
// React FilePond
import { FilePond, registerPlugin } from "react-filepond";

// FilePond styles
import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import "filepond-plugin-image-edit/dist/filepond-plugin-image-edit.css";

// FilePond plugins
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginImageEdit from "filepond-plugin-image-edit";
import _ from 'lodash';

// Đăng ký plugin
registerPlugin(
    FilePondPluginImageExifOrientation,
    FilePondPluginImagePreview,
    FilePondPluginImageEdit
);
const ModalAddQuiz = (props) => {
    const { show, setShow, darkMode, fetchListQuizWithPagination, setCurrentPage } = props;
    const { t } = useTranslation();
    const handleClose = () => {
        setShow(false);
        setForm(prev => ({
            ...prev,
            name: "",
            description: "",
            difficulty: "EASY",
            image: ""
        }));
        setShowErrors(prev => ({
            ...prev,
            name: false,
            description: false,
        }))
        setFiles([]);
    }

    const [files, setFiles] = useState([]);
    const [form, setForm] = useState({
        name: "",
        description: "",
        difficulty: "EASY",
        image: ""
    });

    const [errors, setErrors] = useState({
        name: "",
        description: "",
    });

    const [showErrors, setShowErrors] = useState({
        name: false,
        description: false,
    });
    const handleValidate = () => {
        const newErrors = {
            name: "",
            description: "",
        };
        if (!form.name || form.name.trim()==="") {
            newErrors.name = `${t('adminPage.quizzesManagement.modalAddQuiz.labelInvalidQuizName')}`
        } else if (!validateName(form.name)) {
            newErrors.name = `${t('adminPage.quizzesManagement.modalAddQuiz.labelInvalidQuizName1')}`;
        }
        if (!form.description || form.description.trim()==="") {
            newErrors.description = `${t('adminPage.quizzesManagement.modalAddQuiz.labelInvalidDescription')}`
        } else if (!validateName(form.description)) {
            newErrors.description = `${t('adminPage.quizzesManagement.modalAddQuiz.labelInvalidDescription1')}`
        }

        setErrors(newErrors);
        setShowErrors({
            name: !!newErrors.name,
            description: !!newErrors.description
        });

        return !Object.values(newErrors).some(Boolean); // hợp lệ nếu không có error nào
    };
    const handleChange = (field, value) => {
        setForm(prev => ({ ...prev, [field]: value }));

        if (showErrors[field]) {
            setShowErrors(prev => ({ ...prev, [field]: false }));
        }
    };
    // const [previewImage, setPreviewImage] = useState("");

    // const handleChangeImage = (event) => {
    //     if (event.target && event.target.files && event.target.files[0]) {
    //         setPreviewImage(URL.createObjectURL(event.target.files[0]));
    //         setImage(event.target.files[0]);
    //     } else {

    //     }
    // }
    const handleUploadFile = (fileItem) => {
        setFiles(fileItem);
        if (fileItem.length > 0) {
            const file = fileItem[0].file;
            setForm(prev => ({
                ...prev,
                image: file
            }));
        } else {
            setForm(prev => ({
                ...prev,
                image: " "
            }));
        }
    }

    const handleSubmit = async (event) => {
        //validate
        if (!handleValidate()) return;
        if (!form.image) {
            toast.error("No file uploaded");
            return;
        }
        //call apis
        let data = await postCreateNewQuiz(form.description, form.name, form.difficulty, form.image);
        if (data && data.EC === 0) {
            toast.success(`${t('adminPage.quizzesManagement.modalAddQuiz.addQuizSucceed')}`);
            // await fetchListQuiz();
            handleClose();
            setCurrentPage(1);
            await fetchListQuizWithPagination(1);
        }
        if (data && data.EC !== 0) {
            toast.error(`${t('adminPage.quizzesManagement.modalAddQuiz.addQuizFail')}`);
        }
    }
    return (
        <>

            <Modal show={show} onHide={handleClose} size="lg" backdrop="static" className='modal-add-quiz'>
                <Modal.Header closeButton className={darkMode ? "light" : "dark"} closeVariant={darkMode ? "black" : "white"}>
                    <Modal.Title>{t('adminPage.quizzesManagement.modalAddQuiz.title')}</Modal.Title>
                </Modal.Header>
                <Modal.Body className={darkMode ? "modal-body light" : "modal-body dark"}>
                    <Form>
                        <Row className="mb-3">
                            <Form.Group as={Col} >
                                <FloatingLabel
                                    label={t('adminPage.quizzesManagement.modalAddQuiz.quizName')}
                                    className={darkMode ? "floating-light mb-3" : "floating-dark mb-3"}
                                >
                                    <Form.Control
                                        className={darkMode ? "form-control light" : "form-control dark-card"}
                                        placeholder="Name"
                                        value={form.name}
                                        onChange={e => handleChange("name", e.target.value)}
                                        isInvalid={showErrors.name}
                                        required />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.name}
                                    </Form.Control.Feedback>
                                </FloatingLabel>
                            </Form.Group>
                        </Row>
                        <Row>
                            <Form.Group as={Col} className="mb-3" >
                                <FloatingLabel
                                    label={t('adminPage.quizzesManagement.modalAddQuiz.difficulty.title')}
                                    className={darkMode ? "floating-light mb-3" : "floating-dark mb-3"}
                                >
                                    <Form.Select value={form.difficulty} onChange={e => handleChange("difficulty", e.target.value)}>
                                        <option value="EASY">{t('adminPage.quizzesManagement.modalAddQuiz.difficulty.EASY')}</option>
                                        <option value="MEDIUM">{t('adminPage.quizzesManagement.modalAddQuiz.difficulty.MEDIUM')}</option>
                                        <option value="HARD">{t('adminPage.quizzesManagement.modalAddQuiz.difficulty.HARD')}</option>
                                    </Form.Select>
                                </FloatingLabel>
                            </Form.Group>
                        </Row>
                        <Row>
                            <Form.Group as={Col}  >
                                <FloatingLabel
                                    label={t('adminPage.quizzesManagement.modalAddQuiz.description')}
                                    className={darkMode ? "floating-light mb-3" : "floating-dark mb-3"}
                                >
                                    <Form.Control
                                        className={darkMode ? "form-control light" : "form-control dark-card"}
                                        placeholder="Description"
                                        value={form.description}
                                        onChange={e => handleChange("description", e.target.value)}
                                        isInvalid={showErrors.description}
                                        required />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.description}
                                    </Form.Control.Feedback>
                                </FloatingLabel>
                            </Form.Group>
                        </Row>
                        <Row>
                            <Form.Group  >
                                <Form.Label className={darkMode ? "label-uploadFile floating-light mb-3" : "label-uploadFile floating-dark mb-3"} >
                                    {t('adminPage.usersManagement.modalAddUsers.uploadImageFile')}
                                </Form.Label>
                                <FilePond
                                    files={files}
                                    onupdatefiles={(fileItem) => { handleUploadFile(fileItem) }}
                                    allowMultiple={false}
                                    maxFiles={1}
                                    name="upload-image"
                                    acceptedFileTypes={["image/*"]}
                                    imageResizeTargetWidth={400}
                                    imageResizeTargetHeight={400}
                                    imageResizeMode="cover" // cover = luôn đúng 400x400
                                    labelIdle={t('adminPage.usersManagement.modalAddUsers.upload1')}
                                    className={darkMode ? "light-theme" : "dark-theme"}
                                />
                            </Form.Group>
                        </Row>
                    </Form>

                </Modal.Body>
                <Modal.Footer className={darkMode ? "modal-footer light" : "modal-footer dark"}>
                    <Button variant="secondary" onClick={handleClose}>
                        {t('adminPage.usersManagement.modalAddUsers.buttonCancel')}
                    </Button>
                    <Button variant="primary" onClick={() => { handleSubmit() }}>
                        {t('adminPage.usersManagement.modalAddUsers.buttonSave')}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
export default ModalAddQuiz