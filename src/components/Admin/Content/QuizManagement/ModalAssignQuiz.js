import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState, useEffect } from 'react';
import { getAllQuizForAdmin, getAllUsers, postAssignQuiz } from '../../../../services/apiService';
import { toast } from 'react-toastify';
import Select from 'react-select';
import _ from 'lodash';
const ModalAssignQuiz = (props) => {
    const { show, setShow } = props;
    const handleClose = () => {
        setShow(false);

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
                    label: `${item.id}-${item.username}`
                }
            })
            setListUsers(newListUsers)
        }
    }

    const handleAssign = async () => {
        //validate select quiz
        if (_.isEmpty(selectedOptionQuiz) || _.isEmpty(selectedOptionUser)) {
            if (_.isEmpty(selectedOptionQuiz)) {
                setIsValidSelectedQuiz(false)
            }
            if (_.isEmpty(selectedOptionUser)) {
                setIsValidSelectedUser(false)
            }
            return;

        }
        else {
            setIsValidSelectedQuiz(true)
            setIsValidSelectedUser(true)
        }

        let res = await postAssignQuiz(selectedOptionQuiz.value, selectedOptionUser.value)
        if (res && res.EC === 0) {
            toast.success(res.EM);
            handleClose();
        }
        if (res && res.EC !== 0) {
            toast.error(res.EM);
        }


    }



    return (
        <>
            <Modal show={show} onHide={handleClose} size="lg" backdrop="static" className='modal-assign-quiz'>
                <Modal.Header closeButton>
                    <Modal.Title>Assign quiz to users</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="quiz-select col-5 form-group" >
                        <label >Select quiz</label>
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
                            styles={{
                                menuPortal: base => ({ ...base, zIndex: 9999 })
                            }}
                        />
                        <div className="invalid-feedback">Please select a quiz</div>
                    </div>
                    <div className="user-select col-5 form-group">
                        <label >Select user</label>
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
                            styles={{
                                menuPortal: base => ({ ...base, zIndex: 9999 })
                            }}
                        />
                        <div className="invalid-feedback">Please select a user</div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="warning" onClick={() => { handleAssign() }}>
                        Assign
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
export default ModalAssignQuiz