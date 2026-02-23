import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash';
import { checkRoleUrlFormat, validateMethod } from '../../../../utils/validators';
import { putUpdateRole } from '../../../../services/apiService';

const ModalUpdateRoles = (props) => {
    const { show, setShow, themeState, dataUpdate, resetUpdateData, currentPage, fetchListRoleWithPagination } = props
    const { t } = useTranslation();
    const handleClose = () => {
        setRoles(initRoles);
        setShow(false);
        resetUpdateData();

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



    useEffect(() => {
        if (!_.isEmpty(dataUpdate)) {
            const newRoles = {
                id: uuidv4(),
                url: dataUpdate?.url || "",
                method: dataUpdate?.method || "",
                description: dataUpdate?.description || "",
                urlErrorMessage: '',
                methodErrorMessage: '',
                descriptionErrorMessage: '',
            }
            setRoles([newRoles]);
        }
        else {
            const newRolesIfNoData = {

                id: uuidv4(),
                url: '',
                method: '',
                description: '',
                urlErrorMessage: '',
                methodErrorMessage: '',
                descriptionErrorMessage: '',
            }
            setRoles([newRolesIfNoData]);
        }

    }, [dataUpdate])


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


    const handleSubmit = async () => {
        //---validate data---
        if (!handleValidate()) return;

        let res = await putUpdateRole(dataUpdate.id, roles[0].url, roles[0].method.toUpperCase(), roles[0].description);
        if (res && res.EC === 0) {
            toast.success(res.EM);
            await fetchListRoleWithPagination(currentPage);
            handleClose();
        }
        else {
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
                className='modal-update-role'
            >
                <Modal.Header closeButton className={themeState ? "light" : "dark"} closeVariant={themeState ? "black" : "white"}>
                    <Modal.Title>{t("adminPage.rolesManagement.modalUpdateRole.title")}</Modal.Title>
                </Modal.Header>

                <Modal.Body className={themeState ? "modal-body light" : "modal-body dark"}>
                    {roles && roles.length > 0 && roles.map((role, index_role) => {
                        return (
                            <div key={role.id} className={`role-group mb-4 p-3 rounded border ${themeState ? 'border-secondary' : 'border-light dark'}`}>
                                {/* Header nhỏ cho từng Role */}
                                <div className="d-flex justify-content-between align-items-center mb-2">
                                    <h6 className={`m-0 ${themeState ? 'text-dark' : 'text-light'}`}>
                                        {t("adminPage.rolesManagement.modalUpdateRole.header")} {index_role + 1}
                                    </h6>



                                </div>

                                <Row className="g-3"> {/* g-3 tạo khoảng cách đều giữa các ô */}
                                    {/* URL Input - Chiếm 6 phần trên PC, 12 phần trên Mobile */}
                                    <Col xs={12} md={4}>
                                        <FloatingLabel
                                            label={t("adminPage.rolesManagement.modalAddRole.roleUrl")}
                                            className={themeState ? "theme-floating-light" : "theme-floating-dark"}
                                        >
                                            <Form.Control
                                                className={themeState ? "form-control light" : "form-control theme-card-dark"}
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
                                            className={themeState ? "theme-floating-light" : "theme-floating-dark"}
                                        >
                                            <Form.Control
                                                className={themeState ? "form-control light" : "form-control theme-card-dark"}
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
                                            className={themeState ? "theme-floating-light" : "theme-floating-dark"}
                                        >
                                            <Form.Control
                                                className={themeState ? "form-control light" : "form-control theme-card-dark"}
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




                </Modal.Body>

                <Modal.Footer className={themeState ? "modal-footer light" : "modal-footer dark"}>
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
export default ModalUpdateRoles