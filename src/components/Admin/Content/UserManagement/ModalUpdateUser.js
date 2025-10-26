import { useEffect, useState } from 'react';
import './ManageUsers.scss';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Row from 'react-bootstrap/Row';
import { toast } from 'react-toastify';
import { getAllGroup, putUpdateUser } from '../../../../services/apiService';
import _ from 'lodash';
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
import { validateUsername } from '../../../../utils/validators';

// Đăng ký plugin
registerPlugin(
    FilePondPluginImageExifOrientation,
    FilePondPluginImagePreview,
    FilePondPluginImageEdit
);
const ModalUpdateUser = (props) => {
    const { show, setShow, dataUpdate, resetUpdateData, currentPage, fetchListUsersWithPaginate
        , darkMode
    } = props
    const { t } = useTranslation();
    const handleClose = () => {
        setShow(false);
        // setPreviewImage("");
        setShowErrors(prev => ({
            Username: false
        }))
        setFiles([]);
        resetUpdateData();
    };

    //define state
    const [files, setFiles] = useState([]);
    const [listGroup, setListGroup] = useState([]);
    const [form, setForm] = useState({
        Email: "",
        Password: "",
        Username: "",
        Sex: "Male",
        Group: "",
        Address: "",
        Phone: "",
        Image: ""
    });

    const [errors, setErrors] = useState({
        Username: "",
    });

    const [showErrors, setShowErrors] = useState({
        Username: false
    });
    // const [PreviewImage, setPreviewImage] = useState("");


    useEffect(() => {
        if (!_.isEmpty(dataUpdate)) {
            //update state
            fetchListGroup();
            setForm(prev => ({
                ...prev,
                Email: dataUpdate.email,
                Username: dataUpdate.username,
                Address: dataUpdate.address,
                Sex: dataUpdate.sex,
                Group: dataUpdate.Group ? dataUpdate.Group.id : "",
                Phone: dataUpdate.phone,
                Image: dataUpdate.image ? dataUpdate.image : ""
            }));
            if (dataUpdate.image) {
                setFiles([
                    {
                        source: `data:image/jpeg;base64,${dataUpdate.image}`,
                        options: {
                            type: "local",
                        },
                    },
                ]);
            }

        }
    }, [dataUpdate])



    const fetchListGroup = async () => {
        let res = await getAllGroup();
        if (res && res.EC === 0) {
            setListGroup(res.DT);
        }
        else {
            toast.error(res.EM);
        }
    }
    const handleValidate = () => {
        const newErrors = {
            Username: "",
        };
        if (!form.Username) {
            newErrors.Username = `${t('adminPage.usersManagement.modalAddUsers.invalidUsername1')}`;
        } else if (!validateUsername(form.Username)) {
            newErrors.Username = `${t('adminPage.usersManagement.modalAddUsers.invalidUsername')}`;
        }
        //validate phone,address
        setErrors(newErrors);
        setShowErrors({
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
                Image: file
            }));
        } else {
            setForm(prev => ({
                ...prev,
                Image: ""
            }));
        }
    }


    const handleSubmit = async () => {
        //validate
        if (!handleValidate()) return;
        if (!form.Image) {
            toast.error("No file uploaded");
            return;
        }
        let file;
        if (form.Image instanceof Blob) {
            file = new File([form.Image], "avatar.jpg", {
                type: form.Image.type || "image/jpeg",
            });
        }

        

        //call apis
        let data = await putUpdateUser(dataUpdate.id, form.Username, form.Group, form.Sex, form.Address, file);
        if (data && data.EC === 0) {
            toast.success(`${t('adminPage.usersManagement.modalUpdateUsers.updateSucceed')}`);
            handleClose();
            // await fetchListUsers();
            await fetchListUsersWithPaginate(currentPage);
        }
        if (data && data.EC !== 0) {
            toast.error(data.EM);
        }


    }
    



    return (
        <>
            <Modal show={show} onHide={handleClose} size="lg" backdrop="static" className='modal-add-user'>
                <Modal.Header closeButton className={darkMode ? "light" : "dark"} closeVariant={darkMode ? "black" : "white"}>
                    <Modal.Title>{t('adminPage.usersManagement.modalUpdateUsers.title')}</Modal.Title>
                </Modal.Header>
                <Modal.Body className={darkMode ? "modal-body light" : "modal-body dark"}>
                    <Form>
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridEmail">
                                <FloatingLabel
                                    label={t('adminPage.usersManagement.modalUpdateUsers.email')}
                                    className={darkMode ? "floating-light mb-3" : "floating-dark mb-3"}
                                >
                                    <Form.Control
                                        className={darkMode ? "form-control light" : "form-control dark-card"}
                                        type="email"
                                        placeholder="Enter email"
                                        value={form.Email}
                                        disabled
                                    />
                                </FloatingLabel>
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridPassword">
                                <FloatingLabel
                                    label={t('adminPage.usersManagement.modalUpdateUsers.password')}
                                    className={darkMode ? "floating-light mb-3" : "floating-dark mb-3"}
                                >
                                    <Form.Control
                                        className={darkMode ? "form-control light" : "form-control dark-card"}
                                        type="password"
                                        placeholder="Password"
                                        disabled

                                    />
                                </FloatingLabel>
                            </Form.Group>

                        </Row>


                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridUsername">

                                <FloatingLabel
                                    label={t('adminPage.usersManagement.modalAddUsers.username')}
                                    className={darkMode ? "floating-light mb-3" : "floating-dark mb-3"}
                                >
                                    <Form.Control
                                        className={darkMode ? "form-control light" : "form-control dark-card"}
                                        placeholder="Username"
                                        value={form.Username}
                                        onChange={e => handleChange("Username", e.target.value)}
                                        isInvalid={showErrors.Username}
                                        required />
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
                                    <Form.Select value={form.Group} onChange={e => handleChange("Group", e.target.value)}>
                                        {
                                            listGroup.length > 0 &&
                                            listGroup.map((item, index) => {
                                                return (
                                                    <option key={`group-${index}`} value={item.id}>{item.name}</option>
                                                )
                                            })

                                        }

                                    </Form.Select>
                                </FloatingLabel>
                            </Form.Group>
                        </Row>
                        <Row>
                            <Form.Group as={Col} className="mb-3" >
                                <FloatingLabel
                                    label="Address"
                                    className={darkMode ? "floating-light mb-3" : "floating-dark mb-3"}
                                >
                                    <Form.Control
                                        className={darkMode ? "form-control light" : "form-control dark-card"}
                                        type="text"
                                        placeholder="Address"
                                        value={form.Address}
                                        onChange={e => handleChange("Address", e.target.value)}
                                        isInvalid={showErrors.Address}
                                        required
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.Address}
                                    </Form.Control.Feedback>
                                </FloatingLabel>
                            </Form.Group>
                        </Row>
                        <Row>
                            <Form.Group as={Col} >
                                <FloatingLabel
                                    label="Gender"
                                    className={darkMode ? "floating-light mb-3" : "floating-dark mb-3"}
                                >
                                    <Form.Select value={form.Sex} onChange={e => handleChange("Sex", e.target.value)}>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Other">Other</option>
                                    </Form.Select>
                                </FloatingLabel>
                            </Form.Group>
                            <Form.Group as={Col} >
                                <FloatingLabel
                                    label={t('adminPage.usersManagement.modalUpdateUsers.phone')}
                                    className={darkMode ? "floating-light mb-3" : "floating-dark mb-3"}
                                >
                                    <Form.Control
                                        className={darkMode ? "form-control light" : "form-control dark-card"}
                                        type="tel"
                                        placeholder="Phone number"
                                        value={form.Phone}
                                        onChange={e => handleChange("Phone", e.target.value)}
                                        isInvalid={showErrors.Phone}
                                        required
                                        disabled
                                    />
                                    <Form.Control.Feedback type="invalid">{errors.Phone}</Form.Control.Feedback>
                                </FloatingLabel>
                            </Form.Group>
                        </Row>
                        <Row>
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
                                    name="image"
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
            </Modal >
        </>
    );
}

export default ModalUpdateUser;