import { FaPen, FaTrashAlt } from "react-icons/fa";
import ReactPaginate from 'react-paginate';
import { useTranslation } from 'react-i18next';
import PerfectScrollbar from 'react-perfect-scrollbar'
const TableGroupsWithPaginate = (props) => {
    const { listGroup, handleBtnUpdateGroup, handleBtnDeleteGroup, fetchListGroupsWithPagination
        , pageCount, currentPage, setCurrentPage, themeState } = props;

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
                                    <th scope="col" className={themeState ? "theme-th-light" : "theme-th-dark"}><span className="ms-4">ID</span></th>
                                    <th scope="col" className={themeState ? "theme-th-light" : "theme-th-dark"}>{t('adminPage.groupsManagement.tableGroups.groupName')}</th>
                                    <th scope="col" className={themeState ? "theme-th-light" : "theme-th-dark"}>{t('adminPage.groupsManagement.tableGroups.groupDescription')}</th>
                                    <th scope="col" colSpan="2" className={themeState ? "action-col theme-th-light" : "action-col theme-th-dark"}>{t('adminPage.groupsManagement.tableGroups.groupActions')}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    listGroup && listGroup.length > 0 && listGroup.map((item, index) => {
                                        return (
                                            <tr key={`table-role-${index}`}>
                                                <td className={themeState ? "light" : "theme-card-dark"}><span className="ms-4">{item.id}</span></td>
                                                <td className={themeState ? "light" : "theme-card-dark"}>{item.name}</td>
                                                <td className={themeState ? "light" : "theme-card-dark"}>{item.description}</td>
                                                <td className={themeState ? "light action-col" : "theme-card-dark action-col"}>
                                                    <button
                                                        className={themeState ? "btn btn-edit btn-light border-0" : "btn btn-edit btn-dark border-0"}
                                                        onClick={() => handleBtnUpdateGroup(item)}
                                                        type="button"
                                                        data-bs-toggle="tooltip" data-bs-placement="top" title={t('adminPage.groupsManagement.tableGroups.tooltipEdit')}
                                                    ><FaPen />
                                                    </button>
                                                </td>
                                                <td className={themeState ? "light action-col" : "theme-card-dark action-col"}>
                                                    <button className={themeState ? "btn btn-delete btn-light border-0" : "btn btn-delete btn-dark border-0"}
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
                                        <td colSpan={"5"} className={themeState ? "light" : "theme-card-dark"}>{t('adminPage.groupsManagement.tableGroups.error')}</td>
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
                containerClassName={`pagination ${themeState ? "pagination-light" : "pagination-dark"}`}
                activeClassName="active"
                renderOnZeroPageCount={null}
                forcePage={currentPage - 1}
            />
        </>
    )
}
export default TableGroupsWithPaginate;