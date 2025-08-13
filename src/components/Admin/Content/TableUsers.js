
import { FaEye, FaPen, FaTrashAlt } from "react-icons/fa";

const TableUsers = (props) => {
    const { listUsers, handleBtnUpdateUser,handleBtnViewUser,handleBtnDeleteUser } = props;



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
                                        onClick={()=>handleBtnViewUser(item)}
                                        ><FaEye /></button>
                                        <button
                                            className="btn mx-3"
                                            onClick={() => handleBtnUpdateUser(item)}
                                        ><FaPen /></button>
                                        <button className="btn"
                                        onClick={()=>handleBtnDeleteUser(item)}
                                        ><FaTrashAlt /></button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                    {
                        listUsers && listUsers.length === 0 &&
                        <tr>
                            <td colSpan={"5"}>Not found</td>
                        </tr>
                    }


                </tbody>
            </table>
        </>
    )
}
export default TableUsers;