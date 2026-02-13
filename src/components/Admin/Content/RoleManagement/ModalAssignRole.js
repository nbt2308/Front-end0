import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState, useEffect } from 'react';
import { getAllGroups, getAllRoles, postAssignRoleToGroup } from '../../../../services/apiService';
import { toast } from 'react-toastify';
import Select from 'react-select';
import _ from 'lodash';
import { useTranslation } from 'react-i18next';
const ModalAssignRole = (props) => {
    const { show, setShow, darkMode } = props;
    const { t } = useTranslation();
    const handleClose = () => {
        setShow(false);
        setIsValidSelectedRole(true);
        setIsValidSelectedGroup(true);
        setSelectedOptionRole([]);
        setSelectedOptionGroup(null);
    }
    //select state
    const [selectedOptionRole, setSelectedOptionRole] = useState([]);
    const [selectedOptionGroup, setSelectedOptionGroup] = useState(null);
    const [isValidSelectedRole, setIsValidSelectedRole] = useState(true);
    const [isValidSelectedGroup, setIsValidSelectedGroup] = useState(true);


    const [listRoles, setListRoles] = useState("");
    const [listGroups, setListGroups] = useState("");
    useEffect(() => {
        fetchListRoles();
        fetchListGroups();
    }, [])
    const fetchListRoles = async () => {
        let res = await getAllRoles();
        if (res && res.EC === 0) {
            let newRoles = res.DT.map(item => {
                return {
                    value: item.id,
                    label: `${item.id} | ${item.url} | ${item.method}`
                }
            })
            const sortedRoles = _.orderBy(newRoles, ['value'], ['asc']);
            setListRoles(sortedRoles);
        }
    }
    const fetchListGroups = async () => {
        let res = await getAllGroups();
        if (res && res.EC === 0) {
            let newListGroups = res.DT.map(item => {
                return {
                    value: item.id,
                    label: `${item.id} | ${item.name}`
                }
            })
            const sortedGroups = _.orderBy(newListGroups, ['value'], ['asc']);
            setListGroups(sortedGroups)
        }
    }
    const handleValidate = () => {
        let isValid = true;
        if (_.isEmpty(selectedOptionRole) || _.isEmpty(selectedOptionGroup)) {
            if (_.isEmpty(selectedOptionRole)) {
                setIsValidSelectedRole(false)
                isValid = false;
            }
            if (_.isEmpty(selectedOptionGroup)) {
                setIsValidSelectedGroup(false)
                isValid = false;
            }


        }
        else {
            setIsValidSelectedRole(true)
            setIsValidSelectedGroup(true)
            isValid = true;
        }
        return isValid
    }

    const handleOnchangeSelectRole = (option) => {
        let selectedRole = option || [];
        setSelectedOptionRole(selectedRole)
        setIsValidSelectedRole(true);
    }

    const handleAssign = async () => {

        // validate select 
        if (!handleValidate()) return;
        //send only role id selected
        let selectedOptionRoleValue = selectedOptionRole.map(item => item.value);
        console.log(selectedOptionRoleValue);

        let data = {
            groupId: selectedOptionGroup.value,
            roleId: selectedOptionRoleValue
        };
        let res = await postAssignRoleToGroup(data);
        if (res && res.EC === 0) {
            toast.success(`${t('adminPage.rolesManagement.modalAssignRole.assignSucceed')}`);
            handleClose();
        }
        if (res && res.EC !== 0) {
            toast.error(res.EM);
        }


    }
    const getCustomStyles = (darkMode) => ({
        menuPortal: base => ({ ...base, zIndex: 9999 }),
        control: (base) => ({
            ...base,
            backgroundColor: darkMode ? "#0d305a" : "#fff",
            color: darkMode ? "#fff" : "#000",
            borderColor: darkMode ? "#ffffffff" : "#ccc",
            boxShadow: "none",
            ":hover": {
                borderColor: darkMode ? "#63a4ff" : "#888",
            },
        }),
        menu: (base) => ({
            ...base,
            backgroundColor: darkMode ? "#0d305a" : "#fff",
            color: darkMode ? "#fff" : "#000",
        }),
        option: (base, state) => ({
            ...base,
            backgroundColor: state.isSelected
                ? (darkMode ? "#104e8b" : "#e6f0ff")
                : state.isFocused
                    ? (darkMode ? "#1e90ff" : "#f0f8ff")
                    : (darkMode ? "#0d305a" : "#fff"),
            color: darkMode ? "#fff" : "#000",
            cursor: "pointer",
        }),
        singleValue: (base) => ({
            ...base,
            color: darkMode ? "#fff" : "#000",
        }),
        placeholder: (base) => ({
            ...base,
            color: darkMode ? "#bbb" : "#666",
        }),
    });


    return (
        <>
            <Modal show={show} onHide={handleClose} size="lg" backdrop="static" className='modal-assign-role'>
                <Modal.Header closeButton className={darkMode ? "light" : "dark"} closeVariant={darkMode ? "black" : "white"}>
                    <Modal.Title>{t('adminPage.rolesManagement.modalAssignRole.title')}</Modal.Title>
                </Modal.Header>
                <Modal.Body className={darkMode ? "modal-body light " : "modal-body dark "}>
                    <div className="d-flex flex-column flex-md-row gap-4 justify-content-center">
                        <div className="role-select col col-md-5 form-group" >
                            <label >{t('adminPage.rolesManagement.modalAssignRole.selectRole')}</label>
                            <Select
                                className={`${isValidSelectedRole ? "" : "is-invalid"}`}
                                classNamePrefix="react-select"
                                defaultValue={selectedOptionRole}
                                onChange={handleOnchangeSelectRole}
                                options={listRoles}
                                menuPortalTarget={document.body}
                                isMulti={true}
                                required
                                styles={getCustomStyles(!darkMode)}
                            />
                            <div className="invalid-feedback">{t('adminPage.rolesManagement.modalAssignRole.invalidSelectRole')}</div>
                        </div>
                    

                    <div className="group-select col-12 col-md-5 form-group">
                        <label >{t('adminPage.rolesManagement.modalAssignRole.selectGroup')}</label>
                        <Select
                            className={`${isValidSelectedGroup ? "" : "is-invalid"}`}
                            classNamePrefix="react-select"
                            defaultValue={selectedOptionGroup}
                            onChange={(option) => {
                                setSelectedOptionGroup(option)
                                setIsValidSelectedGroup(true)
                            }}
                            options={listGroups}
                            menuPortalTarget={document.body}
                            required
                            styles={getCustomStyles(!darkMode)}
                        />
                        <div className="invalid-feedback">{t('adminPage.rolesManagement.modalAssignRole.invalidSelectGroup')}</div>
                    </div>
                    </div>
                </Modal.Body>
                <Modal.Footer className={darkMode ? "modal-footer light" : "modal-footer dark"}>
                    <Button variant="secondary" onClick={handleClose}>
                        {t('adminPage.usersManagement.modalAddUsers.buttonCancel')}
                    </Button>
                    <Button variant="warning" onClick={() => { handleAssign() }}>
                        {t('adminPage.quizzesManagement.modalAssignQuiz.assign')}
                    </Button>
                </Modal.Footer>
            </Modal >
        </>
    );
}
export default ModalAssignRole