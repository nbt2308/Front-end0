import AddUsers from "./ModalAddNewUsers";
const ManageUsers=(props)=>{
    return(
        <div className="manageUsers-container">
            <div className="manageUsers-title">
                Users management
            </div>
            <div className="Users-content">
                <div className="Add-users">
                    
                    <AddUsers/>
                </div>
                <div className="table-users">

                </div>
            </div>
        </div>
    );
}
export default ManageUsers;