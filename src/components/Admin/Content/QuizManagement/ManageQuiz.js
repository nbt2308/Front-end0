import { useState, useEffect } from 'react';
import { FaPlus } from 'react-icons/fa';
import { MdOutlineUpdate, MdAssignmentInd } from "react-icons/md";
import ModalAddQuiz from './ModalAddQuiz';
import ModalUpdateQuiz from './ModalUpdateQuiz';
import ModalDeleteQuiz from './ModalDeleteQuiz';
import ModalUpdateQA from './ModalUpdateQA';
import ModalAssignQuiz from './ModalAssignQuiz';
import Breadcrumb from '../../BreadCrump/Breadcrumb';
import { getAllQuizForAdmin, getQuizWithPaginate } from '../../../../services/apiService';
import { useTranslation } from 'react-i18next';
import './ManageQuiz.scss'
import TableQuiz from './TableQuiz';
import SearchBar from './SearchBar';
import { useOutletContext } from 'react-router-dom';
import TableQuizWithPaginate from './TableQuizWithPaginate';
const ManageQuiz = (props) => {

    const { themeState, breadCrumb, setBreadCrumb } = useOutletContext();
    const [showModalAddQuiz, setShowModalAddQuiz] = useState(false);
    const [showModalUpdateQuiz, setShowModalUpdateQuiz] = useState(false);
    const [showModalDeleteQuiz, setShowModalDeleteQuiz] = useState(false);
    const [showModalUpdateQA, setShowModalUpdateQA] = useState(false);
    const [showModalAssignQuiz, setShowModalAssignQuiz] = useState(false);

    const [listQuiz, setListQuiz] = useState("");

    const [dataUpdate, setDataUpdate] = useState("")
    const [dataDelete, setDataDelete] = useState("")

    const LIMIT_QUIZ_PER_PAGE = 8;
    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const { t } = useTranslation();
    //
    useEffect(() => {
        // fetchListQuiz();
        fetchListQuizWithPagination(1);
        setBreadCrumb("quizzesManagement");
    }, [])
    const fetchListQuiz = async () => {
        setDataUpdate({})
        setDataDelete({})
        let res = await getAllQuizForAdmin();
        if (res && res.EC === 0) {
            setListQuiz(res.DT);
        }
    }
    const fetchListQuizWithPagination = async (page) => {
        setDataUpdate({})
        setDataDelete({})
        let res = await getQuizWithPaginate(page, LIMIT_QUIZ_PER_PAGE);
        if (res.EC === 0) {
            setListQuiz(res.DT.quiz);
            setPageCount(res.DT.totalPages);
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
        <div className={themeState ? "manageQuizzes-container light" : "manageQuizzes-container dark"}>

            {/* Breadcrumb */}
            <Breadcrumb
                breadCrumb={breadCrumb}
                themeState={themeState}
            />

            <div className={themeState ? "quizzes-content theme-card-light" : "quizzes-content theme-card-dark"}>
                <div className='d-flex flex-column flex-md-row gap-3 mb-3'>
                    <button onClick={() => handleBtnAddQuiz()} className='btn btn-primary mx-3 my-3 d-flex align-items-center justify-content-center gap-1'>
                        <FaPlus className='i-size' />
                        <span>{t('adminPage.quizzesManagement.btnAddQuiz')}</span>
                    </button>

                    <button onClick={() => handleBtnUpdateQA()} className='btn btn-info mx-3 my-md-3 my-0 d-flex align-items-center justify-content-center gap-1'>
                        <MdOutlineUpdate className='i-size' />
                        <span>{t('adminPage.quizzesManagement.btnUpdateQA')}</span>
                    </button>

                    <button onClick={() => handleBtnAssignQuiz()} className='btn btn-warning mx-3 my-3 d-flex align-items-center justify-content-center gap-1'>
                        <MdAssignmentInd className='i-size' />
                        <span>{t('adminPage.quizzesManagement.btnAssignQuiz')}</span>
                    </button>
                </div>
                <div className="search-bar" >
                    <SearchBar />
                </div>
                <div className="table-quizzes">
                    {/* <TableQuiz
                        handleBtnUpdateQuiz={handleBtnUpdateQuiz}
                        handleBtnDeleteQuiz={handleBtnDeleteQuiz}
                        listQuiz={listQuiz}
                        themeState={themeState}
                    /> */}
                    <TableQuizWithPaginate
                        handleBtnUpdateQuiz={handleBtnUpdateQuiz}
                        handleBtnDeleteQuiz={handleBtnDeleteQuiz}
                        listQuiz={listQuiz}
                        themeState={themeState}
                        fetchListQuizWithPagination={fetchListQuizWithPagination}
                        pageCount={pageCount}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                    ></TableQuizWithPaginate>
                </div>
            </div>
            <ModalAddQuiz
                show={showModalAddQuiz}
                setShow={setShowModalAddQuiz}
                fetchListQuiz={fetchListQuiz}
                fetchListQuizWithPagination={fetchListQuizWithPagination}
                setCurrentPage={setCurrentPage}
                themeState={themeState}
            />
            <ModalUpdateQuiz
                show={showModalUpdateQuiz}
                setShow={setShowModalUpdateQuiz}
                dataUpdate={dataUpdate}
                fetchListQuiz={fetchListQuiz}
                fetchListQuizWithPagination={fetchListQuizWithPagination}
                currentPage={currentPage}
                resetUpdateQuiz={resetUpdateQuiz}
                themeState={themeState}
            />
            <ModalDeleteQuiz
                show={showModalDeleteQuiz}
                setShow={setShowModalDeleteQuiz}
                dataDelete={dataDelete}
                fetchListQuiz={fetchListQuiz}
                fetchListQuizWithPagination={fetchListQuizWithPagination}
                setCurrentPage={setCurrentPage}
                themeState={themeState}

            />
            <ModalUpdateQA
                show={showModalUpdateQA}
                setShow={setShowModalUpdateQA}
                themeState={themeState}
            />
            <ModalAssignQuiz
                show={showModalAssignQuiz}
                setShow={setShowModalAssignQuiz}
                themeState={themeState}
            />


        </div>
    )
}
export default ManageQuiz