import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { validateName } from '../../../../utils/validators';
import { putUpdateGroup } from '../../../../services/apiService';
import _ from 'lodash';
const ModalUpdateGroup = (props) => {
    const { show, setShow, darkMode, currentPage, setCurrentPage, fetchListGroupsWithPagination, dataUpdate, resetUpdateData } = props
    const { t } = useTranslation();
    const handleClose = () => {
        setShow(false);
        setShowErrors(prev => ({
            ...prev,
            name: false,
            description: false
        }));
        resetUpdateData();
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

    useEffect(() => {
        if (!_.isEmpty(dataUpdate)) {
            setForm(prev => ({
                ...prev,
                name: dataUpdate.name ? dataUpdate.name : "",
                description: dataUpdate.description ? dataUpdate.description : ""
            }));
        }
    }, [dataUpdate])
    const handleValidate = () => {
        const newErrors = {
            name: "",
            description: ""
        };

        if (!form.name|| form.name.trim()==="") {
            newErrors.name = `${t('adminPage.groupsManagement.modalAddGroup.labelInvalidGroupName')}`
        } else if (!validateName(form.name)) {
            newErrors.name = `${t('adminPage.groupsManagement.modalAddGroup.labelInvalidGroupName1')}`;
        }
        if (!form.description|| form.description.trim()==="") {
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
        let data = await putUpdateGroup(dataUpdate.id, form.name, form.description);
        if (data && data.EC === 0) {
            toast.success(t('adminPage.groupsManagement.modalUpdateGroup.updateGroupSucceed'));
            handleClose();
            setCurrentPage(1);
            await fetchListGroupsWithPagination(currentPage);
        }
        if (data && data.EC !== 0) {
            toast.error(data.EM);
        }
    }


    return (
        <>

            <Modal show={show} onHide={handleClose} size="md" backdrop="static" className='modal-add-group'>
                <Modal.Header closeButton className={darkMode ? "light" : "dark"} closeVariant={darkMode ? "black" : "white"}>
                    <Modal.Title>{t('adminPage.groupsManagement.modalUpdateGroup.title')}</Modal.Title>
                </Modal.Header>
                <Modal.Body className={darkMode ? "modal-body light" : "modal-body dark"}>
                    <Form  >
                        <Form.Group as={Col} >
                            <FloatingLabel
                                label={t('adminPage.groupsManagement.modalUpdateGroup.groupName')}
                                className={darkMode ? "floating-light mb-3" : "floating-dark mb-3"}
                            >
                                <Form.Control
                                    className={darkMode ? "form-control light" : "form-control dark-card"}
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
                                label={t('adminPage.groupsManagement.modalUpdateGroup.groupDescription')}
                                className={darkMode ? "floating-light mb-3" : "floating-dark mb-3"}
                            >
                                <Form.Control
                                    className={darkMode ? "form-control light" : "form-control dark-card"}
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
                <Modal.Footer className={darkMode ? "modal-footer light" : "modal-footer dark"}>
                    <Button variant="secondary" onClick={handleClose}>
                        {t('adminPage.groupsManagement.modalUpdateGroup.btnCancel')}
                    </Button>
                    <Button variant="primary" onClick={(event) => { handleSubmit(event) }}>
                        {t('adminPage.groupsManagement.modalUpdateGroup.btnSave')}
                    </Button>
                </Modal.Footer>
            </Modal >
        </>
    );
}
export default ModalUpdateGroup