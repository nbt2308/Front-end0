import { FaPen, FaTrashAlt } from "react-icons/fa";
import { useTranslation } from 'react-i18next';
import PerfectScrollbar from 'react-perfect-scrollbar'
import ReactPaginate from 'react-paginate';
const TableQuizWithPaginate = (props) => {
    const { handleBtnUpdateQuiz, handleBtnDeleteQuiz, listQuiz, themeState, fetchListQuizWithPagination,
        setCurrentPage, pageCount, currentPage } = props
    const { t } = useTranslation();
    const handlePageClick = (event) => {
        fetchListQuizWithPagination(+event.selected + 1);
        setCurrentPage(+event.selected + 1);
    };
    return (
        <>
            <div className="scrollbar">
                <PerfectScrollbar >
                    <div class="table-responsive">
                        <table className="table table-hover table-bordered">
                            <thead>
                                <tr>
                                    <th scope="col" className={themeState ? "theme-th-light" : "theme-th-dark"}><span className="ms-4">ID</span></th>
                                    <th scope="col" className={themeState ? "theme-th-light" : "theme-th-dark"}>{t('adminPage.quizzesManagement.tableQuiz.nameQuiz')}</th>
                                    <th scope="col" className={themeState ? "theme-th-light" : "theme-th-dark"}>{t('adminPage.quizzesManagement.tableQuiz.descriptionQuiz')}</th>
                                    <th scope="col" className={themeState ? "theme-th-light" : "theme-th-dark"}>{t('adminPage.quizzesManagement.tableQuiz.difficultyQuiz')}</th>
                                    <th scope="col" colSpan="2 " className={themeState ? "action-col theme-th-light" : "action-col theme-th-dark"}>{t('adminPage.usersManagement.tableUsers.actions')}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    listQuiz && listQuiz.length > 0 && listQuiz.map((item, index) => {
                                        return (
                                            <tr key={`table-user-${index}`}>
                                                <td className={themeState ? "light" : "theme-card-dark"}><span className="ms-4">{item.id}</span></td>
                                                <td className={themeState ? "light" : "theme-card-dark"}>{item.name}</td>
                                                <td className={themeState ? "light" : "theme-card-dark"}>{item.description}</td>
                                                <td className={themeState ? "light" : "theme-card-dark"}>{item.difficulty}</td>
                                                <td className={themeState ? "action-col light" : "action-col theme-card-dark"}>
                                                    <button
                                                        className={themeState ? "btn btn-edit btn-light border-0" : "btn btn-edit btn-dark border-0"}
                                                        type="button"
                                                        data-bs-toggle="tooltip" data-bs-placement="top" title="Edit"
                                                        onClick={() => handleBtnUpdateQuiz(item)}

                                                    ><FaPen className="icon-edit" /></button>
                                                </td>
                                                <td className={themeState ? "action-col light" : "action-col theme-card-dark"}>
                                                    <button className={themeState ? "btn btn-delete btn-light border-0" : "btn btn-delete btn-dark border-0"}
                                                        type="button"
                                                        onClick={() => handleBtnDeleteQuiz(item)}
                                                        data-bs-toggle="tooltip" data-bs-placement="top" title="Delete"
                                                    ><FaTrashAlt className="icon-delete" /></button>
                                                </td>

                                            </tr>
                                        )
                                    })
                                }
                                {
                                    listQuiz && listQuiz.length === 0 &&
                                    <tr>
                                        <td colSpan={"6"} className={themeState ? "light" : "theme-card-dark"}>{t('adminPage.quizzesManagement.tableQuiz.notFound')}</td>
                                    </tr>
                                }


                            </tbody>
                        </table>
                    </div>
                </PerfectScrollbar>
            </div >
            <ReactPaginate
                nextLabel={t('adminPage.usersManagement.tableUsers.next')}
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                marginPagesDisplayed={2}
                pageCount={pageCount}
                previousLabel={t('adminPage.usersManagement.tableUsers.prev')}
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakLabel="..."
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName={`pagination ${themeState ? "pagination-light" : "pagination-dark"}`}
                activeClassName="active"
                renderOnZeroPageCount={null}
                forcePage={currentPage - 1}
            />
        </>
    )
}
export default TableQuizWithPaginate