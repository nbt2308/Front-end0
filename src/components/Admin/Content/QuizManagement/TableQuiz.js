import { FaPen, FaTrashAlt } from "react-icons/fa";

const TableQuiz = (props) => {
    const { handleBtnUpdateQuiz, handleBtnDeleteQuiz, listQuiz } = props
    return (
        <>
            <table className="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">NAME</th>
                        <th scope="col">DESCRIPTION</th>
                        <th scope="col">DIFFICULTY</th>
                        <th scope="col" className="action-col">ACTIONS</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        listQuiz && listQuiz.length > 0 && listQuiz.map((item, index) => {
                            return (
                                <tr key={`table-user-${index}`}>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.description}</td>
                                    <td>{item.difficulty}</td>
                                    <td className="action-col">
                                        <button
                                            className="btn btn-edit"
                                             type="button"
                                             data-bs-toggle="tooltip" data-bs-placement="top" title="Edit"
                                            onClick={() => handleBtnUpdateQuiz(item)}

                                        ><FaPen className="icon-edit"/></button>
                                        <button className="btn btn-delete"
                                            type="button"
                                            onClick={() => handleBtnDeleteQuiz(item)}
                                            data-bs-toggle="tooltip" data-bs-placement="top" title="Delete"
                                        ><FaTrashAlt className="icon-delete"/></button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                    {
                        listQuiz && listQuiz.length === 0 &&
                        <tr>
                            <td colSpan={"5"}>Not found</td>
                        </tr>
                    }


                </tbody>
            </table>
        </>
    )
}
export default TableQuiz