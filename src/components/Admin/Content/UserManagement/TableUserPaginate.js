import { FaEye, FaPen, FaTrashAlt } from "react-icons/fa";
import ReactPaginate from 'react-paginate';
import { useTranslation } from 'react-i18next';
import PerfectScrollbar from 'react-perfect-scrollbar'
const TableUserPaginate = (props) => {
    const { listUsers, handleBtnUpdateUser, handleBtnViewUser, handleBtnDeleteUser, fetchListUsersWithPaginate
        , pageCount, currentPage, setCurrentPage, darkMode } = props;

    const { t } = useTranslation();
    const handlePageClick = (event) => {
        fetchListUsersWithPaginate(+event.selected + 1);
        setCurrentPage(+event.selected + 1);
    };




    return (
        <>
            <div className="scrollbar">
                <PerfectScrollbar >
                    <div class="table-responsive">
                        <table className="table table-bordered table-hover text-center">
                            <thead >
                                <tr >
                                    <th scope="col" className={darkMode ? "th-light" : "th-dark"}>ID</th>
                                    <th scope="col" className={darkMode ? "th-light" : "th-dark"}>{t('adminPage.usersManagement.tableUsers.username')}</th>
                                    <th scope="col" className={darkMode ? "th-light" : "th-dark"}>{t('adminPage.usersManagement.tableUsers.email')}</th>
                                    <th scope="col" className={darkMode ? "th-light" : "th-dark"}>{t('adminPage.usersManagement.tableUsers.phone')}</th>
                                    <th scope="col" className={darkMode ? "th-light" : "th-dark"}>{t('adminPage.usersManagement.tableUsers.role')}</th>
                                    <th scope="col" colspan="3" className={darkMode ? "action-col th-light" : "action-col th-dark"}>{t('adminPage.usersManagement.tableUsers.actions')}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    listUsers && listUsers.length > 0 && listUsers.map((item, index) => {
                                        return (
                                            <tr key={`table-user-${index}`}>
                                                <td className={darkMode ? "light" : "dark-card"}>{item.id}</td>
                                                <td className={darkMode ? "light" : "dark-card"}>{item.username}</td>
                                                <td className={darkMode ? "light" : "dark-card"}>{item.email}</td>
                                                <td className={darkMode ? "light" : "dark-card"}>{item.phone}</td>
                                                <td className={darkMode ? "light" : "dark-card"}>{item.Group.name}</td>
                                                <td className={darkMode ? "light action-col" : "dark-card action-col"}>
                                                    <button
                                                        className={darkMode ? "btn btn-view btn-light border-0" : "btn btn-view btn-dark border-0"}
                                                        onClick={() => handleBtnViewUser(item)}
                                                        type="button"
                                                        data-bs-toggle="tooltip" data-bs-placement="top" title="View"
                                                    ><FaEye />
                                                    </button>
                                                </td>
                                                <td className={darkMode ? "light action-col" : "dark-card action-col"}>
                                                    <button
                                                        className={darkMode ? "btn btn-edit btn-light border-0" : "btn btn-edit btn-dark border-0"}
                                                        onClick={() => handleBtnUpdateUser(item)}
                                                        type="button"
                                                        data-bs-toggle="tooltip" data-bs-placement="top" title="Edit"
                                                    ><FaPen />
                                                    </button>
                                                </td>
                                                <td className={darkMode ? "light action-col" : "dark-card action-col"}>
                                                    <button className={darkMode ? "btn btn-delete btn-light border-0" : "btn btn-delete btn-dark border-0"}
                                                        onClick={() => handleBtnDeleteUser(item)}
                                                        type="button"
                                                        data-bs-toggle="tooltip" data-bs-placement="top" title="Delete"
                                                    ><FaTrashAlt />
                                                    </button>
                                                </td>

                                            </tr>
                                        )
                                    })
                                }
                                {
                                    listUsers && listUsers.length === 0 &&
                                    <tr>
                                        <td colSpan={"6"} className={darkMode ? "light" : "dark-card"}>{t('adminPage.usersManagement.tableUsers.error')}</td>
                                    </tr>
                                }


                            </tbody>
                        </table>
                    </div>
                </PerfectScrollbar >
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
                containerClassName={`pagination ${darkMode ? "pagination-light" : "pagination-dark"}`}
                activeClassName="active"
                renderOnZeroPageCount={null}
                forcePage={currentPage - 1}
            />
        </>
    )
}
export default TableUserPaginate;