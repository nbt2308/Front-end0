import { useEffect, useState } from 'react';
import './ManageUsers.scss';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Row from 'react-bootstrap/Row';
import { toast } from 'react-toastify';
import { getAllGroups, putUpdateUser } from '../../../../services/apiService';
import _ from 'lodash';
import { useTranslation } from 'react-i18next';
import { API_URL } from '../../../../views/App';
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
        , themeState
    } = props
    const { t } = useTranslation();
    const handleClose = () => {
        setShow(false);
        // setPreviewImage("");
        setShowErrors(prev => ({
            Username: false,
            Address: false
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
        Address: ""
    });

    const [showErrors, setShowErrors] = useState({
        Username: false,
        Address: false
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
                        source: `${API_URL}${dataUpdate.image}`,
                        options: {
                            type: "remote",
                        },
                    },
                ]);
            }
                
        }
    }, [dataUpdate])


    

    const fetchListGroup = async () => {
        let res = await getAllGroups();
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
            Address: ""
        };
        if (!form.Username|| form.Username.trim() === "") {
            newErrors.Username = `${t('adminPage.usersManagement.modalAddUsers.invalidUsername1')}`;
        } else if (!validateUsername(form.Username)) {
            newErrors.Username = `${t('adminPage.usersManagement.modalAddUsers.invalidUsername')}`;
        }
        if (!form.Address || form.Address.trim() === "") {
            newErrors.Address = `${t('adminPage.usersManagement.modalAddUsers.invalidAddress')}`;
        }
        setErrors(newErrors);
        setShowErrors({
            Username: !!newErrors.Username,
            Address: !!newErrors.Address
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

    // console.log(dataUpdate.image);
    // const handleUploadFile = (fileItem) => {
    //     setFiles(fileItem);
    //     if (fileItem.length > 0) {
    //         const file = fileItem[0].file;
    //         setForm(prev => ({
    //             ...prev,
    //             Image: file
    //         }));
    //     } else {
    //         setForm(prev => ({
    //             ...prev,
    //             Image: ""
    //         }));
    //     }
    // }
    const handleUploadFile = (fileItems) => {
        setFiles(fileItems);

        if (fileItems.length > 0) {
            const file = fileItems[0].file;

            setForm(prev => ({
                ...prev,
                Image: file
            }));
        } else {
            setForm(prev => ({
                ...prev,
                Image: null
            }));
        }
    };

    const handleSubmit = async () => {
        //validate
        if (!handleValidate()) return;
        if (!form.Image) {
            toast.error("No file uploaded");
            return;
        }
        //call apis
        let data = await putUpdateUser(dataUpdate.id, form.Username, form.Group, form.Sex, form.Address, form.Image);
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
                <Modal.Header closeButton className={themeState ? "light" : "dark"} closeVariant={themeState ? "black" : "white"}>
                    <Modal.Title>{t('adminPage.usersManagement.modalUpdateUsers.title')}</Modal.Title>
                </Modal.Header>
                <Modal.Body className={themeState ? "modal-body light" : "modal-body dark"}>
                    <Form>
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridEmail" xs={12} md={6}>
                                <FloatingLabel
                                    label={t('adminPage.usersManagement.modalUpdateUsers.email')}
                                    className={themeState ? "theme-floating-light mb-3" : "theme-floating-dark mb-3"}
                                >
                                    <Form.Control
                                        className={themeState ? "form-control light" : "form-control theme-card-dark"}
                                        type="email"
                                        placeholder="Enter email"
                                        value={form.Email}
                                        disabled
                                    />
                                </FloatingLabel>
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridPassword" xs={12} md={6}>
                                <FloatingLabel
                                    label={t('adminPage.usersManagement.modalUpdateUsers.password')}
                                    className={themeState ? "theme-floating-light mb-3" : "theme-floating-dark mb-3"}
                                >
                                    <Form.Control
                                        className={themeState ? "form-control light" : "form-control theme-card-dark"}
                                        type="password"
                                        placeholder="Password"
                                        disabled

                                    />
                                </FloatingLabel>
                            </Form.Group>

                        </Row>


                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridUsername" xs={12} md={6}>

                                <FloatingLabel
                                    label={t('adminPage.usersManagement.modalAddUsers.username')}
                                    className={themeState ? "theme-floating-light mb-3" : "theme-floating-dark mb-3"}
                                >
                                    <Form.Control
                                        className={themeState ? "form-control light" : "form-control theme-card-dark"}
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
                            <Form.Group as={Col} xs={12} md={6}>
                                <FloatingLabel
                                    label={t('adminPage.usersManagement.modalAddUsers.role')}
                                    className={themeState ? "theme-floating-light mb-3" : "theme-floating-dark mb-3"}
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
                            <Form.Group as={Col} className="mb-3" xs={12}>
                                <FloatingLabel
                                    label="Address"
                                    className={themeState ? "theme-floating-light mb-3" : "theme-floating-dark mb-3"}
                                >
                                    <Form.Control
                                        className={themeState ? "form-control light" : "form-control theme-card-dark"}
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
                            <Form.Group as={Col} xs={12} md={6}>
                                <FloatingLabel
                                    label="Gender"
                                    className={themeState ? "theme-floating-light mb-3" : "theme-floating-dark mb-3"}
                                >
                                    <Form.Select value={form.Sex} onChange={e => handleChange("Sex", e.target.value)}>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Other">Other</option>
                                    </Form.Select>
                                </FloatingLabel>
                            </Form.Group>
                            <Form.Group as={Col} xs={12} md={6}>
                                <FloatingLabel
                                    label={t('adminPage.usersManagement.modalUpdateUsers.phone')}
                                    className={themeState ? "theme-floating-light mb-3" : "theme-floating-dark mb-3"}
                                >
                                    <Form.Control
                                        className={themeState ? "form-control light" : "form-control theme-card-dark"}
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
                            <Form.Group className="mb-3 col-12" >
                                <Form.Label
                                    className={themeState ? "label-uploadFile theme-floating-light mb-3" : "label-uploadFile theme-floating-dark mb-3"}
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
                                    className={themeState ? "theme-mode-light" : "theme-mode-dark"}
                                />
                            </Form.Group>
                        </Row>
                    </Form>

                </Modal.Body>
                <Modal.Footer className={themeState ? "modal-footer light" : "modal-footer dark"}>
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