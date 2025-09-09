import { useState, useEffect } from 'react';
import { FaPlus } from 'react-icons/fa';
import { MdOutlineUpdate, MdAssignmentInd } from "react-icons/md";
import ModalAddQuiz from './ModalAddQuiz';
import ModalUpdateQuiz from './ModalUpdateQuiz';
import ModalDeleteQuiz from './ModalDeleteQuiz';
import ModalUpdateQA from './ModalUpdateQA';
import ModalAssignQuiz from './ModalAssignQuiz';
import { getAllQuizForAdmin } from '../../../../services/apiService';
import { useTranslation } from 'react-i18next';
import './ManageQuiz.scss'
import TableQuiz from './TableQuiz';
import SearchBar from './SearchBar';
import { useOutletContext } from 'react-router-dom';
const ManageQuiz = () => {
    const { darkMode } = useOutletContext();
    const [showModalAddQuiz, setShowModalAddQuiz] = useState(false);
    const [showModalUpdateQuiz, setShowModalUpdateQuiz] = useState(false);
    const [showModalDeleteQuiz, setShowModalDeleteQuiz] = useState(false);
    const [showModalUpdateQA, setShowModalUpdateQA] = useState(false);
    const [showModalAssignQuiz, setShowModalAssignQuiz] = useState(false);

    const [listQuiz, setListQuiz] = useState("");

    const [dataUpdate, setDataUpdate] = useState("")
    const [dataDelete, setDataDelete] = useState("")
    const { t } = useTranslation();
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
        <div className={darkMode ? "manageQuizzes-container light" : "manageQuizzes-container dark"}>
            <div className={darkMode ? "breadcrumb-container  light" : "breadcrumb-container  dark-card"}>
                <div className="manageQuizzes-title">
                    {t('adminPage.quizzesManagement.title')}
                </div>
                <div className="nav-breadcrumb d-flex justify-content-center align-items-center">

                    <ol className="breadcrumb">
                        <li className={darkMode ? "breadcrumb-item basic-light" : "breadcrumb-item basic-dark"}><a href="/">{t('adminPage.breadcrumb.home')}</a></li>
                        <li className={darkMode ? "breadcrumb-item basic-light" : "breadcrumb-item basic-dark"}><a href="/admin/manage-users">{t('adminPage.breadcrumb.management')}</a></li>
                        <li className={darkMode ? "breadcrumb-item active-light" : "breadcrumb-item active-dark"} aria-current="page">{t('adminPage.breadcrumb.quizzesManagement')}</li>
                    </ol>

                </div>
            </div>

            <div className={darkMode ? "quizzes-content light-card" : "quizzes-content dark-card"}>
                <div className='d-flex'>
                    <div className="btn-add-quiz btn-common">
                        <button onClick={() => { handleBtnAddQuiz() }} className='btn-showModal'><FaPlus className='i-size' /> {t('adminPage.quizzesManagement.btnAddQuiz')} </button>
                    </div>
                    <div className='btn-update-QA btn-common'>
                        <button onClick={() => { handleBtnUpdateQA() }} className='btn-showModal btn-update'><MdOutlineUpdate className='i-size' /> {t('adminPage.quizzesManagement.btnUpdateQA')} </button>
                    </div>
                    <div className='btn-assign-quiz btn-common'>
                        <button onClick={() => { handleBtnAssignQuiz() }} className='btn-showModal btn-assign'><MdAssignmentInd className='i-size' /> {t('adminPage.quizzesManagement.btnAssignQuiz')} </button>
                    </div>
                </div>
                <div className="search-bar" >
                    <SearchBar />
                </div>
                <div className="table-quizzes">
                    <TableQuiz
                        handleBtnUpdateQuiz={handleBtnUpdateQuiz}
                        handleBtnDeleteQuiz={handleBtnDeleteQuiz}
                        listQuiz={listQuiz}
                        darkMode={darkMode}
                    />
                </div>
            </div>
            <ModalAddQuiz
                show={showModalAddQuiz}
                setShow={setShowModalAddQuiz}
                fetchListQuiz={fetchListQuiz}
                darkMode={darkMode}
            />
            <ModalUpdateQuiz
                show={showModalUpdateQuiz}
                setShow={setShowModalUpdateQuiz}
                dataUpdate={dataUpdate}
                fetchListQuiz={fetchListQuiz}
                resetUpdateQuiz={resetUpdateQuiz}
                darkMode={darkMode}
            />
            <ModalDeleteQuiz
                show={showModalDeleteQuiz}
                setShow={setShowModalDeleteQuiz}
                dataDelete={dataDelete}
                fetchListQuiz={fetchListQuiz}
                darkMode={darkMode}

            />
            <ModalUpdateQA
                show={showModalUpdateQA}
                setShow={setShowModalUpdateQA}
                darkMode={darkMode}
            />
            <ModalAssignQuiz
                show={showModalAssignQuiz}
                setShow={setShowModalAssignQuiz}
                darkMode={darkMode}
            />


        </div>
    )
}
export default ManageQuiz