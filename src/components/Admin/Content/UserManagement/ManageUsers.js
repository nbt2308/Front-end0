import AddUsers from "./ModalAddNewUsers";
import SearchBar from "./SearchBar";
import './ManageUsers.scss';
import { useEffect, useState } from "react";
import { getAllUsers, getUsersWithPaginate } from "../../../../services/apiService";
import ModalUpdateUser from "./ModalUpdateUser"
import ModalViewUsers from "./ModalViewUsers"
import ModalDeleteUser from './ModalDeleteUser'
import Breadcrumb from "../../BreadCrump/Breadcrumb";
// import TableUsers from "./TableUsers";
import TableUserPaginate from './TableUserPaginate'
import { useTranslation } from 'react-i18next';
import { useOutletContext } from "react-router-dom";

const ManageUsers = (props) => {
    const { themeState, breadCrumb, setBreadCrumb } = useOutletContext();
    const { t } = useTranslation();
    const [showModalUpdateUser, setShowModalUpdateUser] = useState(false);
    const [showModalViewUser, setShowModalViewUser] = useState(false);
    const [showModalDeleteUser, setShowModalDeleteUser] = useState(false);
    const [dataUpdate, setDataUpdate] = useState({});
    const [dataView, setDataView] = useState({});
    const [dataDelete, setDataDelete] = useState({});

    const [listUsers, setListUsers] = useState([]);

    //table paginate
    const LIMIT_USERS_PER_PAGE = 8;
    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    useEffect(() => {
        // fetchListUsers();
        fetchListUsersWithPaginate(1);
        setBreadCrumb("usersManagement");
    }, []);

    const fetchListUsers = async () => {
        let res = await getAllUsers();
        if (res.EC === 0) {
            setListUsers(res.DT);
        }
    }
    const fetchListUsersWithPaginate = async (page) => {
        let res = await getUsersWithPaginate(page, LIMIT_USERS_PER_PAGE);
        if (res.EC === 0) {
            setListUsers(res.DT.users);
            setPageCount(res.DT.totalPages);
        }
    }


    const handleBtnUpdateUser = (user) => {
        setShowModalUpdateUser(true);
        setDataUpdate(user);
    }
    const handleBtnViewUser = (user) => {
        setShowModalViewUser(true);
        setDataView(user);
    }
    const handleBtnDeleteUser = (user) => {
        setShowModalDeleteUser(true);
        setDataDelete(user);
    }
    const resetUpdateData = () => {
        setDataUpdate({});
    }
    const resetViewData = () => {
        setDataView({});
    }
    
    return (
        <div className={themeState ? "manageUsers-container light" : "manageUsers-container dark"}>

            {/* Breadcrumb */}
            <Breadcrumb
                breadCrumb={breadCrumb}
                themeState={themeState}
            />



            <div
                className={themeState ? "Users-content theme-card-light" : "Users-content theme-card-dark"}
            // className="Users-content"
            >
                <div className="Add-users">
                    <AddUsers
                        fetchListUsers={fetchListUsers}
                        fetchListUsersWithPaginate={fetchListUsersWithPaginate}
                        setCurrentPage={setCurrentPage}
                        themeState={themeState}
                    />
                </div>
                <div className="search-bar"  >
                    <SearchBar />
                </div>
                <div className="table-users">
                    {/* <TableUsers
                        listUsers={listUsers}
                        handleBtnUpdateUser={handleBtnUpdateUser}
                        handleBtnViewUser={handleBtnViewUser}
                        handleBtnDeleteUser={handleBtnDeleteUser} /> */}
                    <TableUserPaginate
                        listUsers={listUsers}
                        handleBtnUpdateUser={handleBtnUpdateUser}
                        handleBtnViewUser={handleBtnViewUser}
                        handleBtnDeleteUser={handleBtnDeleteUser}
                        fetchListUsersWithPaginate={fetchListUsersWithPaginate}
                        pageCount={pageCount}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        themeState={themeState} />
                </div>
                <ModalUpdateUser
                    show={showModalUpdateUser}
                    setShow={setShowModalUpdateUser}
                    dataUpdate={dataUpdate}
                    fetchListUsers={fetchListUsers}
                    resetUpdateData={resetUpdateData}
                    fetchListUsersWithPaginate={fetchListUsersWithPaginate}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    themeState={themeState} />


                <ModalViewUsers
                    themeState={themeState}
                    show={showModalViewUser}
                    setShow={setShowModalViewUser}
                    dataView={dataView}
                    resetViewData={resetViewData}
                    fetchListUsersWithPaginate={fetchListUsersWithPaginate}
                />
                <ModalDeleteUser
                    themeState={themeState}
                    show={showModalDeleteUser}
                    setShow={setShowModalDeleteUser}
                    dataDelete={dataDelete}
                    fetchListUsers={fetchListUsers}
                    fetchListUsersWithPaginate={fetchListUsersWithPaginate}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />

            </div>
        </div>
    );
}
export default ManageUsers;