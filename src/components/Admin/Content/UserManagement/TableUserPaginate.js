
import { FaEye, FaPen, FaTrashAlt } from "react-icons/fa";
import ReactPaginate from 'react-paginate';

const TableUserPaginate = (props) => {
    const { listUsers, handleBtnUpdateUser, handleBtnViewUser, handleBtnDeleteUser, fetchListUsersWithPaginate
        , pageCount, currentPage, setCurrentPage } = props;

    const handlePageClick = (event) => {
        fetchListUsersWithPaginate(+event.selected + 1);
        setCurrentPage(+event.selected + 1);
    };


    return (
        <>
            <table className="table table-hover ">
                <thead>
                    <tr>
                        <th scope="col"><span className="ms-4">ID</span></th>
                        <th scope="col">USERNAME</th>
                        <th scope="col">EMAIL</th>
                        <th scope="col">ROLE</th>
                        <th scope="col" className="action-col">ACTIONS</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        listUsers && listUsers.length > 0 && listUsers.map((item, index) => {
                            return (
                                <tr key={`table-user-${index}`}>
                                    <td ><span className="ms-4">{item.id}</span></td>
                                    <td>{item.username}</td>
                                    <td>{item.email}</td>
                                    <td>{item.role}</td>
                                    <td className="action-col">
                                        <button
                                            className="btn btn-view"
                                            onClick={() => handleBtnViewUser(item)}
                                            type="button"
                                             data-bs-toggle="tooltip" data-bs-placement="top" title="View"
                                        ><FaEye /></button>
                                        <button
                                            className="btn mx-3 btn-edit"
                                            onClick={() => handleBtnUpdateUser(item)}
                                            type="button"
                                             data-bs-toggle="tooltip" data-bs-placement="top" title="Edit"
                                        ><FaPen /></button>
                                        <button className="btn btn-delete"
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
                            <td colSpan={"4"}>Not found</td>
                        </tr>
                    }


                </tbody>
            </table>
            <ReactPaginate
                nextLabel="Next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                marginPagesDisplayed={2}
                pageCount={pageCount}
                previousLabel="< Prev"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakLabel="..."
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination"
                activeClassName="active"
                renderOnZeroPageCount={null}
                forcePage={currentPage - 1}
            />
        </>
    )
}
export default TableUserPaginate;