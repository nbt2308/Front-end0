import { FaPen, FaTrashAlt } from "react-icons/fa";
import ReactPaginate from 'react-paginate';
import { useTranslation } from 'react-i18next';
import PerfectScrollbar from 'react-perfect-scrollbar'
const TableRolesWithPaginate = (props) => {
    const { listRole, handleBtnUpdateRole, handleBtnDeleteRole, fetchListRoleWithPagination
        , pageCount, currentPage, setCurrentPage, themeState } = props;

    const { t } = useTranslation();
    const handlePageClick = (event) => {
        fetchListRoleWithPagination(+event.selected + 1);
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
                                    <th scope="col" className={themeState ? "theme-th-light" : "theme-th-dark"}>{t('adminPage.rolesManagement.tableRoles.roleUrl')}</th>
                                    <th scope="col" className={themeState ? "theme-th-light" : "theme-th-dark"}>{t('adminPage.rolesManagement.tableRoles.roleMethod')}</th>
                                    <th scope="col" className={themeState ? "theme-th-light" : "theme-th-dark"}>{t('adminPage.rolesManagement.tableRoles.roleDescription')}</th>
                                    <th scope="col" colSpan="3" className={themeState ? "action-col theme-th-light" : "action-col theme-th-dark"}>{t('adminPage.usersManagement.tableUsers.actions')}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    listRole && listRole.length > 0 && listRole.map((item, index) => {
                                        return (
                                            <tr key={`table-role-${index}`}>
                                                <td className={themeState ? "light" : "theme-card-dark"}><span className="ms-4">{item.id}</span></td>
                                                <td className={themeState ? "light" : "theme-card-dark"}>{item.url}</td>
                                                <td className={themeState ? "light" : "theme-card-dark"}>{item.method}</td>
                                                <td className={themeState ? "light" : "theme-card-dark"}>{item.description}</td>
                                                <td className={themeState ? "light action-col" : "theme-card-dark action-col"}>
                                                    <button
                                                        className={themeState ? "btn btn-edit btn-light border-0" : "btn btn-edit btn-dark border-0"}
                                                        onClick={() => handleBtnUpdateRole(item)}
                                                        type="button"
                                                        data-bs-toggle="tooltip" data-bs-placement="top" title={t('adminPage.rolesManagement.tableRoles.tooltipEdit')}
                                                    ><FaPen />
                                                    </button>
                                                </td>
                                                <td className={themeState ? "light action-col" : "theme-card-dark action-col"}>
                                                    <button className={themeState ? "btn btn-delete btn-light border-0" : "btn btn-delete btn-dark border-0"}
                                                        onClick={() => handleBtnDeleteRole(item)}
                                                        type="button"
                                                        data-bs-toggle="tooltip" data-bs-placement="top" title={t('adminPage.rolesManagement.tableRoles.tooltipDelete')}
                                                    ><FaTrashAlt />
                                                    </button>
                                                </td>

                                            </tr>
                                        )
                                    })
                                }
                                {
                                    listRole && listRole.length === 0 &&
                                    <tr>
                                        <td colSpan={"6"} className={themeState ? "light" : "theme-card-dark"}>{t('adminPage.rolesManagement.tableRoles.error')}</td>
                                    </tr>
                                }


                            </tbody>
                        </table>
                    </div>
                </PerfectScrollbar >
            </div >
            <ReactPaginate
                nextLabel={t('adminPage.rolesManagement.tableRoles.next')}
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                marginPagesDisplayed={2}
                pageCount={pageCount}
                previousLabel={t('adminPage.rolesManagement.tableRoles.prev')}
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
export default TableRolesWithPaginate;