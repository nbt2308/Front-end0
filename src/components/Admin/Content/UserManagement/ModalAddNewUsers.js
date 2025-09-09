import { useState, useRef } from 'react';
import './ManageUsers.scss';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { FaPlus } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { postCreateNewUser } from '../../../../services/apiService';
import { validateEmail, validatePassword, validateUsername } from '../../../../utils/validators';
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

// Đăng ký plugin
registerPlugin(
    FilePondPluginImageExifOrientation,
    FilePondPluginImagePreview,
    FilePondPluginImageEdit
);


const AddUsers = (props) => {
    const [files, setFiles] = useState([]);
    const [show, setShow] = useState(false);
    const { setCurrentPage, fetchListUsersWithPaginate, darkMode } = props
    const { t } = useTranslation();
    const handleClose = () => {
        setShow(false);
        setForm(prev => ({
            ...prev,
            Email: "",
            Password: "",
            Username: "",
            Role: "USER",
            Image: ""
        }));
        setShowErrors(prev => ({
            ...prev,
            Email: false,
            Password: false,
            Username: false
        }))
        setFiles([]);

        // setPreviewImage("");
    };
    const handleShow = () => setShow(true);

    //define state
    const [form, setForm] = useState({
        Email: "",
        Password: "",
        Username: "",
        Role: "USER",
        Image: ""
    });

    const [errors, setErrors] = useState({
        Email: "",
        Password: "",
        Username: "",
    });

    const [showErrors, setShowErrors] = useState({
        Email: false,
        Password: false,
        Username: false
    });
    const handleValidate = () => {
        const newErrors = {
            Email: "",
            Password: "",
            Username: "",
        };

        if (!form.Email) {
            newErrors.Email = `${t('adminPage.usersManagement.modalAddUsers.invalidEmail1')}`;
        } else if (!validateEmail(form.Email)) {
            newErrors.Email = `${t('adminPage.usersManagement.modalAddUsers.invalidEmail')}`;
        }
        if (!form.Password) {
            newErrors.Password = `${t('adminPage.usersManagement.modalAddUsers.invalidPassword1')}`;
        } else if (!validatePassword(form.Password)) {
            newErrors.Password = `${t('adminPage.usersManagement.modalAddUsers.invalidPassword')}`;
        }
        if (!form.Username) {
            newErrors.Username = `${t('adminPage.usersManagement.modalAddUsers.invalidUsername1')}`;
        } else if (!validateUsername(form.Username)) {
            newErrors.Username = `${t('adminPage.usersManagement.modalAddUsers.invalidUsername')}`;
        }

        setErrors(newErrors);
        setShowErrors({
            Email: !!newErrors.Email,
            Password: !!newErrors.Password,
            Username: !!newErrors.Username
        });

        return !Object.values(newErrors).some(Boolean); // hợp lệ nếu không có error nào
    };
    const handleChange = (field, value) => {
        setForm(prev => ({ ...prev, [field]: value }));

        if (showErrors[field]) {
            setShowErrors(prev => ({ ...prev, [field]: false }));
        }
    };
    // const [PreviewImage, setPreviewImage] = useState("");

    // const handleChangeImage = (event) => {
    //     if (event.target && event.target.files && event.target.files[0]) {
    //         // setPreviewImage(URL.createObjectURL(event.target.files[0]));
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
                Image: file
            }));
        } else {
            setForm(prev => ({
                ...prev,
                Image: " "
            }));
        }
    }




    const handleSubmit = async (event) => {
        //validate
        if (!handleValidate()) return;
        //call apis
        let data = await postCreateNewUser(form.Email, form.Password, form.Username, form.Role, form.Image);


        if (data && data.EC === 0) {
            toast.success(`${t('adminPage.usersManagement.modalAddUsers.createUserSucceed')}`);
            handleClose();
            // await fetchListUsers()
            setCurrentPage(1);
            await fetchListUsersWithPaginate(1);
        }
        if (data && data.EC === 1) {
            toast.error(`${t('homepage.registerPage.registerFail')}`);
        }




    }



    return (
        <>
            <Button variant="primary" onClick={handleShow} className='btn-showModal'>
                <FaPlus />{t('adminPage.usersManagement.modalAddUsers.buttonAddUsers')}
            </Button>

            <Modal show={show} onHide={handleClose} size="lg" backdrop="static" className='modal-add-user'>
                <Modal.Header closeButton className={darkMode ? "light" : "dark"} closeVariant={darkMode ? "black" : "white"}>
                    <Modal.Title>{t('adminPage.usersManagement.modalAddUsers.title')}</Modal.Title>
                </Modal.Header>
                <Modal.Body className={darkMode ? "modal-body light" : "modal-body dark"}>
                    <Form  >
                        <Row className="mb-3">
                            <Form.Group as={Col} >
                                <FloatingLabel
                                    label={t('adminPage.usersManagement.modalAddUsers.email')}
                                    className={darkMode ? "floating-light mb-3" : "floating-dark mb-3"}
                                >
                                    <Form.Control
                                        className={darkMode ? "form-control light" : "form-control dark-card"}
                                        type="email"
                                        placeholder="name@example.com"
                                        value={form.Email}
                                        onChange={e => handleChange("Email", e.target.value)}
                                        isInvalid={showErrors.Email}
                                        required
                                    />
                                    <Form.Control.Feedback type="invalid">{errors.Email}</Form.Control.Feedback>
                                </FloatingLabel>
                            </Form.Group>

                            <Form.Group as={Col} >
                                <FloatingLabel
                                    label={t('adminPage.usersManagement.modalAddUsers.password')}
                                    className={darkMode ? "floating-light mb-3" : "floating-dark mb-3"}
                                >
                                    <Form.Control
                                        className={darkMode ? "form-control light" : "form-control dark-card"}
                                        type="password"
                                        placeholder="Password"
                                        value={form.Password}
                                        onChange={e => handleChange("Password", e.target.value)}
                                        isInvalid={showErrors.Password}
                                        required
                                    />
                                    <Form.Control.Feedback type="invalid">{errors.Password}</Form.Control.Feedback>
                                </FloatingLabel>
                            </Form.Group>
                        </Row>


                        <Row className="mb-3">
                            <Form.Group as={Col} className="mb-3" >
                                {/* <Form.Label>Username</Form.Label>
                                <Form.Control
                                    placeholder="Username"
                                    value={Username}
                                    onChange={(event) => { setUsername(event.target.value) }} /> */}
                                <FloatingLabel
                                    label={t('adminPage.usersManagement.modalAddUsers.username')}
                                    className={darkMode ? "floating-light mb-3" : "floating-dark mb-3"}
                                >
                                    <Form.Control
                                        className={darkMode ? "form-control light" : "form-control dark-card"}
                                        type="text"
                                        placeholder="Username"
                                        value={form.Username}
                                        onChange={e => handleChange("Username", e.target.value)}
                                        isInvalid={showErrors.Username}
                                        required
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.Username}
                                    </Form.Control.Feedback>
                                </FloatingLabel>
                            </Form.Group>
                            <Form.Group as={Col} >
                                <FloatingLabel
                                    label={t('adminPage.usersManagement.modalAddUsers.role')}
                                    className={darkMode ? "floating-light mb-3" : "floating-dark mb-3"}
                                >
                                    <Form.Select value={form.Role} onChange={e => handleChange("Role", e.target.value)}>
                                        <option value="USER">USER</option>
                                        <option value="ADMIN">ADMIN</option>
                                    </Form.Select>
                                </FloatingLabel>
                            </Form.Group>
                            <Form.Group className="md-12" >
                                <Form.Label
                                    className={darkMode ? "label-uploadFile floating-light mb-3" : "label-uploadFile floating-dark mb-3"}
                                    htmlFor="upload-image" >
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
                            {/* <Form.Group className="image-preview" controlId="formGridImagePreview" for="upload-image">
                                {PreviewImage ? <img src={PreviewImage} alt="Preview" /> : <span>Preview Image</span>}
                            </Form.Group> */}

                        </Row>
                    </Form>

                </Modal.Body>
                <Modal.Footer className={darkMode ? "modal-footer light" : "modal-footer dark"}>
                    <Button variant="secondary" onClick={handleClose}>
                        {t('adminPage.usersManagement.modalAddUsers.buttonCancel')}
                    </Button>
                    <Button variant="primary" onClick={(event) => { handleSubmit(event) }}>
                        {t('adminPage.usersManagement.modalAddUsers.buttonSave')}
                    </Button>
                </Modal.Footer>
            </Modal >
        </>
    );
}

export default AddUsers;