import { useTranslation } from 'react-i18next';
import { Col, Form, Row } from 'react-bootstrap';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { useDispatch, useSelector } from 'react-redux';
import ModalEditorImage from '../PinturaEditor/ModalEditorImage';
import { postUpdateProfile } from '../../services/apiService';
import { validateUsername } from '../../utils/validators';
import { UPDATE_ACCOUNT } from '../../redux/reducer/userReducer';
import { useState, useEffect } from 'react';
// Filepond
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
import { toast } from 'react-toastify';
import { API_URL } from '../../views/App';




// Đăng ký plugin
registerPlugin(
    FilePondPluginImageExifOrientation,
    FilePondPluginImagePreview,
    FilePondPluginImageEdit
);
const PersonalDetails = (props) => {
    const { themeState } = props;
    const account = useSelector(state => state?.account);
    const dispatch = useDispatch();
    const { t } = useTranslation();
    //define state
    const [files, setFiles] = useState([]);
    const [isValidUsername, setIsValidUsername] = useState(true);
    const [visible, setVisible] = useState(false);
    const [originalData, setOriginalData] = useState({
        username: "",
        email: "",
        role: "",
        image: ""
    });

    const [formData, setFormData] = useState(originalData);

    //set state
    useEffect(() => {
        if (account.image) {
            // // Nếu account.image là Base64 string

            // if (typeof account.image === "string") {
            //     fileSource = account.image.startsWith("data:")
            //         ? account.image
            //         : `data:image/jpeg;base64,${account.image}`;
            // }
            // else if (account.image instanceof Blob) {
            //     // Nếu account.image là Blob -> convert thành File
            //     fileSource = new File([account.image], "avatar.jpg", { type: account.image.type || "image/jpeg" });
            // }
            // else {
            //     // Nếu account.image là File / Blob
            //     fileSource = account.image;
            // }

            setFiles([
                {
                    source: `${API_URL}${account.image}`,
                    options: { type: "remote" }
                }
            ]);
        }
        else {
            setFiles([]); // Không có ảnh
        }
        const initData = {
            username: account.username,
            email: account.email,
            role: account.groupWithRole.name,
            image: account.image,
        };
        setOriginalData(initData);
        setFormData(initData);

    }, [account]);

    const handleUploadFile = async (fileItem) => {
        setFiles(fileItem);
        if (fileItem.length > 0) {
            const file = fileItem[0].file;
            setFormData(prev => ({
                ...prev,
                image: file
            }))
        } else {
            setFormData(prev => ({
                ...prev,
                imageFile: ""
            }))
        }
    }

    // console.log('anh cu',formData.image);
    const handleEditImage = () => {
        setVisible(true);

    }
    const handleReset = () => {
        setFormData(originalData);
        if (originalData.image) {
            setFiles([{ source: `${API_URL}${originalData.image}`, options: { type: "local" } }]);
        } else {
            setFiles([]);
        }
    };
    const handleSave = async () => {
        //validate
        const isValidateUsername = validateUsername(formData.username);
        if (!isValidateUsername) {
            setIsValidUsername(false);
            return;
        }
        else {
            setIsValidUsername(true);
        }
        
        //call apis
        let res = await postUpdateProfile(formData.username, formData.image);

        if (res && res.EC === 0) {
            toast.success(`${t('adminPage.accountProfile.personalDetail.updateSucceed')}`)

            dispatch(UPDATE_ACCOUNT({
                username: res.DT.username,
                image: res.DT.image
            }))
            setOriginalData(formData);
        }
        else {
            toast.error(res.EM);
        }
    }


    return (
        <div className="personal-details-container mx-3">
            <div className={themeState ? "upload-file-container theme-card-light" : "upload-file-container theme-card-dark"}>
                <div className="upload-image-profile">
                    <FilePond
                        className='filepond'
                        files={files}
                        onupdatefiles={(fileItem) => { handleUploadFile(fileItem) }}
                        allowMultiple={false}
                        maxFiles={1}
                        name="image"
                        acceptedFileTypes={["image/*"]}
                        allowImageEditor={true}
                        // imagePreviewHeight={300}
                        // imageResizeTargetWidth={200}
                        // imageResizeTargetHeight={200}
                        stylePanelAspectRatio='0.75'
                        styleLoadIndicatorPosition='center top'
                        stylePanelLayout='compact circle'
                        styleButtonRemoveItemPosition='center bottom'
                        imageResizeMode="cover" // cover = luôn đúng 400x400
                        labelIdle={t('adminPage.usersManagement.modalAddUsers.upload1')}
                    />
                    {
                        files && files.length > 0 &&
                        <div className='btn-edit'>
                            <button
                                className='btn btn-primary'
                                onClick={() => handleEditImage()}>
                                {t('adminPage.accountProfile.personalDetail.btnEdit')}
                            </button>
                        </div>
                    }
                </div>
            </div>
            <div className={themeState ? "personal-details-content theme-card-light" : "personal-details-content theme-card-dark"}>
                <div className="title ms-2 mt-2">{t('adminPage.accountProfile.personalDetail.title')}</div>
                <div className='ms-2 me-2 mt-2 mb-2'>
                    <Form>
                        <Row className="mb-1">
                            <Form.Group as={Col} >
                                <Form.Label>{t('adminPage.accountProfile.personalDetail.email')}</Form.Label>
                                <FloatingLabel
                                    label={t('adminPage.usersManagement.modalUpdateUsers.email')}
                                    className="mb-3"
                                >
                                    <Form.Control
                                        className="form-control"
                                        type="email"
                                        placeholder="name@example.com"
                                        value={formData.email}
                                        disabled
                                    />
                                </FloatingLabel>
                            </Form.Group>
                        </Row>
                        <Row className="mb-1">
                            <Form.Group as={Col} >
                                <Form.Label>{t('adminPage.accountProfile.personalDetail.role')}</Form.Label>
                                <Form.Control
                                    className="form-control mb-3"
                                    type="text"
                                    placeholder="name@example.com"
                                    value={formData.role}

                                    disabled
                                />

                            </Form.Group>
                        </Row>
                        <Row className="mb-1">
                            <Form.Group as={Col} >
                                <Form.Label>{t('adminPage.accountProfile.personalDetail.name')}</Form.Label>
                                <FloatingLabel
                                    label={t('adminPage.usersManagement.modalAddUsers.username')}
                                    className="mb-3">
                                    <Form.Control
                                        className="form-control" type="text"
                                        placeholder="name@example.com"
                                        value={formData.username}
                                        onChange={(event) => {
                                            setFormData({ ...formData, username: event.target.value })
                                            setIsValidUsername(true)
                                        }}
                                        required
                                        isInvalid={isValidUsername ? false : true}
                                    />
                                    <Form.Control.Feedback type="invalid">{t('adminPage.usersManagement.modalAddUsers.invalidUsername')}</Form.Control.Feedback>
                                </FloatingLabel>
                            </Form.Group>
                        </Row>
                    </Form>
                </div>
                <div className="footer me-2 mb-2">

                    <button className='btn btn-secondary' onClick={() => handleReset()}>{t('adminPage.accountProfile.personalDetail.btnReset')}</button>
                    <button className='btn btn-primary' onClick={() => handleSave()}>{t('adminPage.accountProfile.personalDetail.btnUpdateProfile')}</button>
                </div>
            </div>
            <ModalEditorImage
                visible={visible}
                setVisible={setVisible}
                src={files?.[0]?.source}
                setFiles={setFiles}
            />
        </div>
    )
}
export default PersonalDetails