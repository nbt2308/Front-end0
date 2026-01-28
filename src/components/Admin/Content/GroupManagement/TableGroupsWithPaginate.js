import { FaPen, FaTrashAlt } from "react-icons/fa";
import ReactPaginate from 'react-paginate';
import { useTranslation } from 'react-i18next';
import PerfectScrollbar from 'react-perfect-scrollbar'
const TableGroupsWithPaginate = (props) => {
    const { listGroup, handleBtnUpdateGroup, handleBtnDeleteGroup, fetchListGroupsWithPagination
        , pageCount, currentPage, setCurrentPage, darkMode } = props;

    const { t } = useTranslation();
    const handlePageClick = (event) => {
        fetchListGroupsWithPagination(+event.selected + 1);
        setCurrentPage(+event.selected + 1);
    };




    return (
        <>
            <div className="scrollbar">
                <PerfectScrollbar >
                    <div className="table-responsive">
                        <table className="table table-bordered table-hover text-center">
                            <thead >
                                <tr >
                                    <th scope="col" className={darkMode ? "th-light" : "th-dark"}><span className="ms-4">ID</span></th>
                                    <th scope="col" className={darkMode ? "th-light" : "th-dark"}>{t('adminPage.groupsManagement.tableGroups.groupName')}</th>
                                    <th scope="col" className={darkMode ? "th-light" : "th-dark"}>{t('adminPage.groupsManagement.tableGroups.groupDescription')}</th>
                                    <th scope="col" colSpan="2" className={darkMode ? "action-col th-light" : "action-col th-dark"}>{t('adminPage.groupsManagement.tableGroups.groupActions')}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    listGroup && listGroup.length > 0 && listGroup.map((item, index) => {
                                        return (
                                            <tr key={`table-role-${index}`}>
                                                <td className={darkMode ? "light" : "dark-card"}><span className="ms-4">{item.id}</span></td>
                                                <td className={darkMode ? "light" : "dark-card"}>{item.name}</td>
                                                <td className={darkMode ? "light" : "dark-card"}>{item.description}</td>
                                                <td className={darkMode ? "light action-col" : "dark-card action-col"}>
                                                    <button
                                                        className={darkMode ? "btn btn-edit btn-light border-0" : "btn btn-edit btn-dark border-0"}
                                                        onClick={() => handleBtnUpdateGroup(item)}
                                                        type="button"
                                                        data-bs-toggle="tooltip" data-bs-placement="top" title={t('adminPage.groupsManagement.tableGroups.tooltipEdit')}
                                                    ><FaPen />
                                                    </button>
                                                </td>
                                                <td className={darkMode ? "light action-col" : "dark-card action-col"}>
                                                    <button className={darkMode ? "btn btn-delete btn-light border-0" : "btn btn-delete btn-dark border-0"}
                                                        onClick={() => handleBtnDeleteGroup(item)}
                                                        type="button"
                                                        data-bs-toggle="tooltip" data-bs-placement="top" title={t('adminPage.groupsManagement.tableGroups.tooltipDelete')}
                                                    ><FaTrashAlt />
                                                    </button>
                                                </td>

                                            </tr>
                                        )
                                    })
                                }
                                {
                                    listGroup && listGroup.length === 0 &&
                                    <tr>
                                        <td colSpan={"5"} className={darkMode ? "light" : "dark-card"}>{t('adminPage.groupsManagement.tableGroups.error')}</td>
                                    </tr>
                                }


                            </tbody>
                        </table>
                    </div>
                </PerfectScrollbar>
            </div >
            <ReactPaginate
                nextLabel={t('adminPage.groupsManagement.tableGroups.next')}
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                marginPagesDisplayed={2}
                pageCount={pageCount}
                previousLabel={t('adminPage.groupsManagement.tableGroups.prev')}
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
export default TableGroupsWithPaginate;