import { useState, useEffect } from 'react';
import { FaPlus } from 'react-icons/fa';
import { MdOutlineUpdate,MdAssignmentInd} from "react-icons/md";
import ModalAddQuiz from './ModalAddQuiz';
import ModalUpdateQuiz from './ModalUpdateQuiz';
import ModalDeleteQuiz from './ModalDeleteQuiz';
import ModalUpdateQA from './ModalUpdateQA';
import ModalAssignQuiz from './ModalAssignQuiz';
import { getAllQuizForAdmin } from '../../../../services/apiService';
import './ManageQuiz.scss'
import TableQuiz from './TableQuiz';
const ManageQuiz = () => {
    const [showModalAddQuiz, setShowModalAddQuiz] = useState(false);
    const [showModalUpdateQuiz, setShowModalUpdateQuiz] = useState(false);
    const [showModalDeleteQuiz, setShowModalDeleteQuiz] = useState(false);
    const [showModalUpdateQA, setShowModalUpdateQA] = useState(false);
    const [showModalAssignQuiz, setShowModalAssignQuiz] = useState(false);

    const [listQuiz, setListQuiz] = useState("");

    const [dataUpdate, setDataUpdate] = useState("")
    const [dataDelete, setDataDelete] = useState("")
    //
    useEffect(() => {
        fetchListQuiz();
    }, [])
    const fetchListQuiz = async () => {
        setDataUpdate({})
        setDataDelete({})
        let res = await getAllQuizForAdmin();
        if (res && res.EC === 0) {
            setListQuiz(res.DT);
        }
    }
    //add quiz
    const handleBtnAddQuiz = () => {
        setShowModalAddQuiz(true);
    }
    //update quiz
    const handleBtnUpdateQuiz = (quiz) => {
        setShowModalUpdateQuiz(true);
        setDataUpdate(quiz);
    }
    const resetUpdateQuiz = () => {
        setDataUpdate({});
    }
    //delete quiz
    const handleBtnDeleteQuiz = (quiz) => {
        setShowModalDeleteQuiz(true);
        setDataDelete(quiz);
    }

    //update QA
    const handleBtnUpdateQA = () => {
        setShowModalUpdateQA(true)
    }

    //assign quizzes for users
    const handleBtnAssignQuiz = () => {
        setShowModalAssignQuiz(true);
    }
    return (
        <div className="manageQuizzes-container">
            <div className="manageQuizzes-title">
                Quizzes Management
            </div>
            <div className="quizzes-content">
                <div className='d-flex'>
                    <div className="btn-add-quiz btn-common">
                        <button onClick={() => { handleBtnAddQuiz() }} className='btn-showModal'><FaPlus className='i-size'/> Add new Quiz </button>
                    </div>
                    <div className='btn-update-QA btn-common'>
                        <button onClick={() => { handleBtnUpdateQA() }} className='btn-showModal btn-update'><MdOutlineUpdate className='i-size'/> Update Q/A </button>
                    </div>
                    <div className='btn-assign-quiz btn-common'>
                        <button onClick={() => { handleBtnAssignQuiz() }} className='btn-showModal btn-assign'><MdAssignmentInd className='i-size'/> Assign quiz </button>
                    </div>
                </div>
                <div className="table-quizzes">
                    <TableQuiz
                        handleBtnUpdateQuiz={handleBtnUpdateQuiz}
                        handleBtnDeleteQuiz={handleBtnDeleteQuiz}
                        listQuiz={listQuiz}
                    />
                </div>
            </div>
            <ModalAddQuiz
                show={showModalAddQuiz}
                setShow={setShowModalAddQuiz}
                fetchListQuiz={fetchListQuiz}
            />
            <ModalUpdateQuiz
                show={showModalUpdateQuiz}
                setShow={setShowModalUpdateQuiz}
                dataUpdate={dataUpdate}
                fetchListQuiz={fetchListQuiz}
                resetUpdateQuiz={resetUpdateQuiz}
            />
            <ModalDeleteQuiz
                show={showModalDeleteQuiz}
                setShow={setShowModalDeleteQuiz}
                dataDelete={dataDelete}
                fetchListQuiz={fetchListQuiz}

            />
            <ModalUpdateQA
            show={showModalUpdateQA}
            setShow={setShowModalUpdateQA}
            />
            <ModalAssignQuiz
                show={showModalAssignQuiz}
                setShow={setShowModalAssignQuiz}
            />


        </div>
    )
}
export default ManageQuiz