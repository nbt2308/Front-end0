import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState, useEffect } from 'react';
import { getAllQuizForAdmin, getAllUsers, postAssignQuiz } from '../../../../services/apiService';
import { toast } from 'react-toastify';
import Select from 'react-select';
import _ from 'lodash';
import { useTranslation } from 'react-i18next';
const ModalAssignQuiz = (props) => {
    const { show, setShow,darkMode } = props;
    const { t } = useTranslation();
    const handleClose = () => {
        setShow(false);
        setIsValidSelectedUser(true);
        setIsValidSelectedQuiz(true)
    }
    //select state
    const [selectedOptionQuiz, setSelectedOptionQuiz] = useState(null);
    const [selectedOptionUser, setSelectedOptionUser] = useState(null);
    const [isValidSelectedQuiz, setIsValidSelectedQuiz] = useState(true);
    const [isValidSelectedUser, setIsValidSelectedUser] = useState(true);


    const [listQuiz, setListQuiz] = useState("");
    const [listUsers, setListUsers] = useState("");
    useEffect(() => {
        fetchListQuiz();
        fetchListUser();
    }, [])
    const fetchListQuiz = async () => {
        let res = await getAllQuizForAdmin();
        if (res && res.EC === 0) {
            let newQuiz = res.DT.map(item => {
                return {
                    value: item.id,
                    label: `${item.id}-${item.name}`
                }
            })
            setListQuiz(newQuiz);
        }
    }
    const fetchListUser = async () => {
        let res = await getAllUsers();
        if (res && res.EC === 0) {
            let newListUsers = res.DT.map(item => {
                return {
                    value: item.id,
                    label: `${item.id}-${item.username}-${item.email}`
                }
            })
            setListUsers(newListUsers)
        }
    }
    const handleValidate = () => {
        let isValid = true;
        if (_.isEmpty(selectedOptionQuiz) || _.isEmpty(selectedOptionUser)) {
            if (_.isEmpty(selectedOptionQuiz)) {
                setIsValidSelectedQuiz(false)
                isValid = false;
            }
            if (_.isEmpty(selectedOptionUser)) {
                setIsValidSelectedUser(false)
                isValid = false;
            }


        }
        else {
            setIsValidSelectedQuiz(true)
            setIsValidSelectedUser(true)
            isValid = true;
        }
        return isValid
    }
    const handleAssign = async () => {
        //validate select quiz
        if (!handleValidate()) return;

        let res = await postAssignQuiz(selectedOptionQuiz.value, selectedOptionUser.value)
        if (res && res.EC === 0) {
            toast.success(`${t('adminPage.quizzesManagement.modalAssignQuiz.assignSucceed')}`);
            handleClose();
        }
        if (res && res.EC !== 0) {
            toast.error(`${t('adminPage.quizzesManagement.modalAssignQuiz.assignFail')}`);
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
            <Modal show={show} onHide={handleClose} size="lg" backdrop="static" className='modal-assign-quiz'>
                <Modal.Header closeButton className={darkMode ? "light" : "dark"} closeVariant={darkMode ? "black" : "white"}>
                    <Modal.Title>{t('adminPage.quizzesManagement.modalAssignQuiz.title')}</Modal.Title>
                </Modal.Header>
                <Modal.Body className={darkMode ? "modal-body light" : "modal-body dark"}>
                    <div className="quiz-select col-5 form-group" >
                        <label >{t('adminPage.quizzesManagement.modalUpsertQA.selectQuiz')}</label>
                        <Select
                            className={`${isValidSelectedQuiz ? "" : "is-invalid"}`}
                            classNamePrefix="react-select"
                            defaultValue={selectedOptionQuiz}
                            onChange={(option) => {
                                setSelectedOptionQuiz(option)
                                setIsValidSelectedQuiz(true)
                            }}
                            options={listQuiz}
                            menuPortalTarget={document.body}
                            required
                            styles={getCustomStyles(!darkMode)}
                        />
                        <div className="invalid-feedback">{t('adminPage.quizzesManagement.modalUpsertQA.invalidSelect')}</div>
                    </div>
                    <div className="user-select col-5 form-group">
                        <label >{t('adminPage.quizzesManagement.modalAssignQuiz.selectUser')}</label>
                        <Select
                            className={`${isValidSelectedUser ? "" : "is-invalid"}`}
                            classNamePrefix="react-select"
                            defaultValue={selectedOptionUser}
                            onChange={(option) => {
                                setSelectedOptionUser(option)
                                setIsValidSelectedUser(true)
                            }}
                            options={listUsers}
                            menuPortalTarget={document.body}
                            required
                            styles={getCustomStyles(!darkMode)}
                        />
                        <div className="invalid-feedback">{t('adminPage.quizzesManagement.modalAssignQuiz.invalidSelect')}</div>
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
            </Modal>
        </>
    );
}
export default ModalAssignQuiz