
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
            <table className="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Username</th>
                        <th scope="col">Email</th>
                        <th scope="col">Role</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        listUsers && listUsers.length > 0 && listUsers.map((item, index) => {
                            return (
                                <tr key={`table-user-${index}`}>
                                    <td>{item.id}</td>
                                    <td>{item.username}</td>
                                    <td>{item.email}</td>
                                    <td>{item.role}</td>
                                    <td>
                                        <button
                                            className="btn "
                                            onClick={() => handleBtnViewUser(item)}
                                        ><FaEye /></button>
                                        <button
                                            className="btn mx-3"
                                            onClick={() => handleBtnUpdateUser(item)}
                                        ><FaPen /></button>
                                        <button className="btn"
                                            onClick={() => handleBtnDeleteUser(item)}
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