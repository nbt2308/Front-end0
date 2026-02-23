import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { validateName } from '../../../../utils/validators';
import { postCreateNewGroup } from '../../../../services/apiService';
const ModalAddGroup = (props) => {
    const { show, setShow, themeState, setCurrentPage, fetchListGroupsWithPagination } = props
    const { t } = useTranslation();
    const handleClose = () => {
        setShow(false);
        setForm(prev => ({
            ...prev,
            name: "",
            description: ""
        }));
        setShowErrors(prev => ({
            ...prev,
            name: false,
            description: false
        }))
    };


    //define state
    const [form, setForm] = useState({
        name: "",
        description: ""
    });
    const [errors, setErrors] = useState({
        name: "",
        description: "",
    });

    const [showErrors, setShowErrors] = useState({
        name: false,
        description: false
    });


    const handleValidate = () => {
        const newErrors = {
            name: "",
            description: ""
        };

        if (!form.name || form.name.trim()==="") {
            newErrors.name = `${t('adminPage.groupsManagement.modalAddGroup.labelInvalidGroupName')}`
        } else if (!validateName(form.name)) {
            newErrors.name = `${t('adminPage.groupsManagement.modalAddGroup.labelInvalidGroupName1')}`;
        }
        if (!form.description || form.description.trim()==="") {
            newErrors.description = `${t('adminPage.groupsManagement.modalAddGroup.labelInvalidGroupDescription')}`
        }
        setErrors(newErrors);
        setShowErrors({
            name: !!newErrors.name,
            description: !!newErrors.description,

        });

        return !Object.values(newErrors).some(Boolean); // hợp lệ nếu không có error nào
    };
    const handleChange = (field, value) => {
        setForm(prev => ({ ...prev, [field]: value }));

        if (showErrors[field]) {
            setShowErrors(prev => ({ ...prev, [field]: false }));
        }
    };
    const handleSubmit = async (event) => {
        //validate
        if (!handleValidate()) return;

        //call apis
        let data = await postCreateNewGroup(form.name, form.description);
        if (data && data.EC === 0) {
            toast.success(t('adminPage.groupsManagement.modalAddGroup.createGroupSucceed'));
            handleClose();
            setCurrentPage(1);
            await fetchListGroupsWithPagination(1);
        }
        if (data && data.EC !== 0) {
            toast.error(data.EM);
        }
    }


    return (
        <>

            <Modal show={show} onHide={handleClose} size="md" backdrop="static" className='modal-add-group'>
                <Modal.Header closeButton className={themeState ? "light" : "dark"} closeVariant={themeState ? "black" : "white"}>
                    <Modal.Title>{t('adminPage.groupsManagement.modalAddGroup.title')}</Modal.Title>
                </Modal.Header>
                <Modal.Body className={themeState ? "modal-body light" : "modal-body dark"}>
                    <Form  >
                        <Form.Group as={Col} >
                            <FloatingLabel
                                label={t('adminPage.groupsManagement.modalAddGroup.groupName')}
                                className={themeState ? "theme-floating-light mb-3" : "theme-floating-dark mb-3"}
                            >
                                <Form.Control
                                    className={themeState ? "form-control light" : "form-control theme-card-dark"}
                                    type="text"
                                    placeholder="Name"
                                    value={form.name}
                                    onChange={e => handleChange("name", e.target.value)}
                                    isInvalid={showErrors.name}
                                    required
                                />
                                <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                            </FloatingLabel>
                        </Form.Group>

                        <Form.Group as={Col} >
                            <FloatingLabel
                                label={t('adminPage.groupsManagement.modalAddGroup.groupDescription')}
                                className={themeState ? "theme-floating-light mb-3" : "theme-floating-dark mb-3"}
                            >
                                <Form.Control
                                    className={themeState ? "form-control light" : "form-control theme-card-dark"}
                                    type="text"
                                    placeholder="Description"
                                    value={form.description}
                                    onChange={e => handleChange("description", e.target.value)}
                                    isInvalid={showErrors.description}
                                    required
                                />
                                <Form.Control.Feedback type="invalid">{errors.description}</Form.Control.Feedback>
                            </FloatingLabel>
                        </Form.Group>
                    </Form>

                </Modal.Body>
                <Modal.Footer className={themeState ? "modal-footer light" : "modal-footer dark"}>
                    <Button variant="secondary" onClick={handleClose}>
                        {t('adminPage.groupsManagement.modalAddGroup.btnCancel')}
                    </Button>
                    <Button variant="primary" onClick={(event) => { handleSubmit(event) }}>
                        {t('adminPage.groupsManagement.modalAddGroup.btnSave')}
                    </Button>
                </Modal.Footer>
            </Modal >
        </>
    );
}
export default ModalAddGroup