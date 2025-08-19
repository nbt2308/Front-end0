import { useState, useEffect } from 'react';
import { FaPlus } from 'react-icons/fa';
import ModalAddQuiz from './ModalAddQuiz';
import ModalUpdateQuiz from './ModalUpdateQuiz';
import ModalDeleteQuiz from './ModalDeleteQuiz';
import { getAllQuizForAdmin } from '../../../../services/apiService';
import './ManageQuiz.scss'
import TableQuiz from './TableQuiz';
const ManageQuiz = () => {
    const [showModalAddQuiz, setShowModalAddQuiz] = useState(false);
    const [showModalUpdateQuiz, setShowModalUpdateQuiz] = useState(false);
    const [showModalDeleteQuiz, setShowModalDeleteQuiz] = useState(false);

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
    
    //delete quiz
    const handleBtnDeleteQuiz = (quiz) => {
        setShowModalDeleteQuiz(true);
        setDataDelete(quiz);
    }
    
    return (
        <div className="manageQuizzes-container">
            <div className="manageQuizzes-title">
                Quizzes Management
            </div>
            <div className="quizzes-content">
                <div className="btn-add-quiz">
                    <button onClick={() => { handleBtnAddQuiz() }} className='btn-showModal'><FaPlus /> Add new Quiz </button>
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

            />
            <ModalUpdateQuiz
                show={showModalUpdateQuiz}
                setShow={setShowModalUpdateQuiz}
                dataUpdate={dataUpdate}
                fetchListQuiz={fetchListQuiz}
            />
            <ModalDeleteQuiz
                show={showModalDeleteQuiz}
                setShow={setShowModalDeleteQuiz}
                dataDelete={dataDelete}
                fetchListQuiz={fetchListQuiz}
                
            />


        </div>
    )
}
export default ManageQuiz