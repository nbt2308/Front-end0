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
                    <table className="table table-hover" >
                        <thead >
                            <tr >
                                <th scope="col" className={darkMode ? "th-light" : "th-dark"}><span className="ms-4">ID</span></th>
                                <th scope="col" className={darkMode ? "th-light" : "th-dark"}>{t('adminPage.usersManagement.tableUsers.username')}</th>
                                <th scope="col" className={darkMode ? "th-light" : "th-dark"}>{t('adminPage.usersManagement.tableUsers.email')}</th>
                                <th scope="col" className={darkMode ? "th-light" : "th-dark"}>{t('adminPage.usersManagement.tableUsers.role')}</th>
                                <th scope="col" className={darkMode ? "action-col th-light" : "action-col th-dark"}>{t('adminPage.usersManagement.tableUsers.actions')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                listUsers && listUsers.length > 0 && listUsers.map((item, index) => {
                                    return (
                                        <tr key={`table-user-${index}`}>
                                            <td className={darkMode ? "light" : "dark-card"}><span className="ms-4">{item.id}</span></td>
                                            <td className={darkMode ? "light" : "dark-card"}>{item.username}</td>
                                            <td className={darkMode ? "light" : "dark-card"}>{item.email}</td>
                                            <td className={darkMode ? "light" : "dark-card"}>{item.role}</td>
                                            <td className={darkMode ? "action-col light" : "action-col dark-card"}>
                                                <button
                                                    className={darkMode ? "btn btn-view btn-light" : "btn btn-view btn-dark"}
                                                    onClick={() => handleBtnViewUser(item)}
                                                    type="button"
                                                    data-bs-toggle="tooltip" data-bs-placement="top" title="View"
                                                ><FaEye /></button>
                                                <button
                                                    className={darkMode ? "btn mx-3 btn-edit btn-light" : "btn mx-3 btn-edit btn-dark"}
                                                    onClick={() => handleBtnUpdateUser(item)}
                                                    type="button"
                                                    data-bs-toggle="tooltip" data-bs-placement="top" title="Edit"
                                                ><FaPen /></button>
                                                <button className={darkMode ? "btn btn-delete btn-light" : "btn btn-delete btn-dark"}
                                                    onClick={() => handleBtnDeleteUser(item)}
                                                    type="button"
                                                    data-bs-toggle="tooltip" data-bs-placement="top" title="Delete"
                                                ><FaTrashAlt /></button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                            {
                                listUsers && listUsers.length === 0 &&
                                <tr>
                                    <td colSpan={"4"} className={darkMode ? "light" : "dark-card"}>{t('adminPage.usersManagement.tableUsers.error')}</td>
                                </tr>
                            }


                        </tbody>
                    </table>
                </PerfectScrollbar>
            </div>
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