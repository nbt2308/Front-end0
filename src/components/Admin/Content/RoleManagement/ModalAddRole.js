import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash';
import { FaPlusCircle, FaMinusCircle } from "react-icons/fa";
import { checkRoleUrlFormat, validateMethod } from '../../../../utils/validators';
import { postCreateNewRole } from '../../../../services/apiService';
const ModalAddRoles = (props) => {
    const { show, setShow, darkMode,setCurrentPage,fetchListRoleWithPagination } = props
    const { t } = useTranslation();
    const handleClose = () => {
        setRoles(initRoles);
        setShow(false);

    };
    const [initRoles, setInitRoles] = useState([
        {
            id: uuidv4(),
            url: '',
            method: '',
            description: '',
            urlErrorMessage: '',
            methodErrorMessage: '',
            descriptionErrorMessage: '',
        }
    ])
    const [roles, setRoles] = useState(initRoles)

    const handleAddnRemoveRoles = (type, id) => {
        if (type === 'ADD') {
            const newRoles = {
                id: uuidv4(),
                url: '',
                method: '',
                description: '',
                urlErrorMessage: '',
                methodErrorMessage: '',
                descriptionErrorMessage: '',
            }
            setRoles([...roles, newRoles]);
        }

        if (type === 'REMOVE') {
            let roleClone = _.cloneDeep(roles);
            roleClone = roleClone.filter(item => item.id !== id);
            setRoles(roleClone)
        }
    }
    const handleOnChangeRoleValue = (type, roleId, value) => {
        if (type === 'URL') {
            let roleClone = _.cloneDeep(roles);
            let index = roleClone.findIndex(item => item.id === roleId);
            if (index > -1) {
                roleClone[index].url = value;
                roleClone[index].urlErrorMessage = "";
                setRoles(roleClone);
            }
        }
        else if (type === 'METHOD') {
            let roleClone = _.cloneDeep(roles);
            let index = roleClone.findIndex(item => item.id === roleId);
            if (index > -1) {
                roleClone[index].method = value;
                roleClone[index].methodErrorMessage = "";
                setRoles(roleClone);
            }
        }
        else if (type === 'DESCRIPTION') {
            let roleClone = _.cloneDeep(roles);
            let index = roleClone.findIndex(item => item.id === roleId);
            if (index > -1) {
                roleClone[index].description = value;
                roleClone[index].descriptionErrorMessage = "";
                setRoles(roleClone);
            }
        }
    }
    const handleValidate = () => {
        // if (_.isEmpty(roles)) {
        //     toast.error(`${t('adminPage.quizzesManagement.modalUpsertQA.emptyQA')}`);
        //     return;
        // }
        // validate roles
        let updatedRoles = _.cloneDeep(roles);
        let isValid = true;
        for (let i = 0; i < updatedRoles.length; i++) {
            const normalizedURL = checkRoleUrlFormat(updatedRoles[i].url);
            //url
            //--required
            if (!updatedRoles[i].url || updatedRoles[i].url.trim() === "") {
                updatedRoles[i].urlErrorMessage = `${t("adminPage.rolesManagement.modalAddRole.labelInvalidRoleUrl")}`;
                isValid = false;
            }
            //--invalid format
            else if (!normalizedURL) {
                updatedRoles[i].urlErrorMessage = `${t("adminPage.rolesManagement.modalAddRole.labelInvalidRoleUrl1")}`;
                isValid = false;
            }
            else {
                updatedRoles[i].url = normalizedURL;
                updatedRoles[i].urlErrorMessage = "";
            }
            //method
            //--required
            if (!updatedRoles[i].method || updatedRoles[i].method.trim() === "") {
                updatedRoles[i].methodErrorMessage = `${t("adminPage.rolesManagement.modalAddRole.labelInvalidRoleMethod")}`;
                isValid = false;
            }
            //--invalid method
            else if (validateMethod(updatedRoles[i].method) === false) {
                updatedRoles[i].methodErrorMessage = `${t("adminPage.rolesManagement.modalAddRole.labelInvalidRoleMethod1")}`;
                isValid = false;
            }
            else {
                updatedRoles[i].methodErrorMessage = "";
            }
            //description
            if (!updatedRoles[i].description || updatedRoles[i].description.trim() === "") {
                updatedRoles[i].descriptionErrorMessage = `${t("adminPage.rolesManagement.modalAddRole.labelInvalidRoleDescription")}`;
                isValid = false;
            } else {
                updatedRoles[i].descriptionErrorMessage = "";
            }

        }
        setRoles(updatedRoles)
        return isValid;
    };

    //build data before send to server
    const buildDataPersists = () => {
        let _roles = _.cloneDeep(roles);

        let dataAfterHandle = [];
        _roles.map((role, index) => {
            dataAfterHandle.push({
                url: role.url,
                method: role.method.toUpperCase(),
                description: role.description
            })
        })
        return dataAfterHandle;
    }
    const handleSubmit = async () => {
        //---validate data---
        if (!handleValidate()) return;

        let data = buildDataPersists();
        let res = await postCreateNewRole(data);
        if(res && res.EC===0){
            toast.success(res.EM);
            setCurrentPage(1);
            await fetchListRoleWithPagination(1);
            handleClose();
        }
        else{
            toast.error(res.EM);
        }
    }

    
    return (
        <>

            <Modal
                show={show}
                onHide={handleClose}
                size="xl"
                backdrop="static"
                className='modal-add-role'
            >
                <Modal.Header closeButton className={darkMode ? "light" : "dark"} closeVariant={darkMode ? "black" : "white"}>
                    <Modal.Title>{t("adminPage.rolesManagement.modalAddRole.title")}</Modal.Title>
                </Modal.Header>

                <Modal.Body className={darkMode ? "modal-body light" : "modal-body dark"}>
                    {roles && roles.length > 0 && roles.map((role, index_role) => {
                        return (
                            <div key={role.id} className={`role-group mb-4 p-3 rounded border ${darkMode ? 'border-secondary' : 'border-light dark'}`}>
                                {/* Header nhỏ cho từng Role */}
                                <div className="d-flex justify-content-between align-items-center mb-2">
                                    <h6 className={`m-0 ${darkMode ? 'text-dark' : 'text-light'}`}>
                                        {t("adminPage.rolesManagement.modalAddRole.header")} {index_role + 1}
                                    </h6>

                                    {/* Nút xóa nằm ngay góc phải của từng item */}
                                    {roles.length > 1 && (
                                        <Button
                                            variant="link"
                                            className="text-danger p-0"
                                            onClick={() => handleAddnRemoveRoles("REMOVE", role.id)}
                                        >
                                            <FaMinusCircle size={20} />
                                        </Button>
                                    )}
                                </div>

                                <Row className="g-3"> {/* g-3 tạo khoảng cách đều giữa các ô */}
                                    {/* URL Input - Chiếm 6 phần trên PC, 12 phần trên Mobile */}
                                    <Col xs={12} md={4}>
                                        <FloatingLabel
                                            label={t("adminPage.rolesManagement.modalAddRole.roleUrl")}
                                            className={darkMode ? "floating-light" : "floating-dark"}
                                        >
                                            <Form.Control
                                                className={darkMode ? "form-control light" : "form-control dark-card"}
                                                placeholder={t("adminPage.rolesManagement.modalAddRole.roleUrl")}
                                                value={role.url}
                                                onChange={(event) => handleOnChangeRoleValue('URL', role.id, event.target.value)}
                                                isInvalid={!!role.urlErrorMessage}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {role.urlErrorMessage}
                                            </Form.Control.Feedback>
                                        </FloatingLabel>
                                    </Col>

                                    {/* Method Input - Chiếm 3 phần trên PC */}
                                    <Col xs={12} md={3}>
                                        <FloatingLabel
                                            label={t("adminPage.rolesManagement.modalAddRole.roleMethod")}
                                            className={darkMode ? "floating-light" : "floating-dark"}
                                        >
                                            <Form.Control
                                                className={darkMode ? "form-control light" : "form-control dark-card"}
                                                placeholder={t("adminPage.rolesManagement.modalAddRole.roleMethod")}
                                                value={role.method}
                                                onChange={(event) => handleOnChangeRoleValue('METHOD', role.id, event.target.value)}
                                                isInvalid={!!role.methodErrorMessage}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {role.methodErrorMessage}
                                            </Form.Control.Feedback>
                                        </FloatingLabel>
                                    </Col>

                                    {/* Description Input - Chiếm 5 phần trên PC */}
                                    <Col xs={12} md={5}>
                                        <FloatingLabel
                                            label={t("adminPage.rolesManagement.modalAddRole.roleDescription")}
                                            className={darkMode ? "floating-light" : "floating-dark"}
                                        >
                                            <Form.Control
                                                className={darkMode ? "form-control light" : "form-control dark-card"}
                                                placeholder={t("adminPage.rolesManagement.modalAddRole.roleDescription")}
                                                value={role.description}
                                                onChange={(event) => handleOnChangeRoleValue('DESCRIPTION', role.id, event.target.value)}
                                                isInvalid={!!role.descriptionErrorMessage}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {role.descriptionErrorMessage}
                                            </Form.Control.Feedback>
                                        </FloatingLabel>
                                    </Col>
                                </Row>
                            </div>
                        )
                    })}

                    {/* Nút Add New Role tách riêng ra ở dưới cùng, to và rõ ràng */}
                    <div className="d-flex justify-content-center mt-3">
                        <Button
                            variant={"outline-primary"}
                            className="d-flex align-items-center gap-2 px-4"
                            onClick={() => handleAddnRemoveRoles("ADD", '')}
                        >
                            <FaPlusCircle />
                            <span>{t("adminPage.rolesManagement.modalAddRole.btnAddMoreRole")}</span>
                        </Button>
                    </div>

                </Modal.Body>

                <Modal.Footer className={darkMode ? "modal-footer light" : "modal-footer dark"}>
                    <Button variant="secondary" onClick={handleClose}>
                        {t('adminPage.rolesManagement.modalAddRole.btnCancel')}
                    </Button>
                    <Button variant="primary" onClick={() => handleSubmit()}>
                        {t('adminPage.rolesManagement.modalAddRole.btnSave')}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
export default ModalAddRoles