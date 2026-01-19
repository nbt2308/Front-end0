import { useState, useEffect } from 'react';
import { FaPlus } from 'react-icons/fa';
import "./ManageRoles.scss"
import { useTranslation } from 'react-i18next';
import { useOutletContext } from 'react-router-dom';
import Breadcrumb from '../../BreadCrump/Breadcrumb';
import ModalAddRole from './ModalAddRole';
import { getRoleWithPaginate } from '../../../../services/apiService';
import TableRolesWithPaginate from './TableRolesWithPaginate';
import ModalUpdateRole from './ModalUpdateRole';
import ModalDeleteRole from './ModalDeleteRole';
const ManageRoles = (props) => {
    const { darkMode, breadCrumb, setBreadCrumb } = useOutletContext();
    const { t } = useTranslation();
    const [listRole, setListRole] = useState("");
    const [dataUpdate, setDataUpdate] = useState("")
    const [dataDelete, setDataDelete] = useState("")
    const [showModalAddRoles, setShowModalAddRoles] = useState(false);
    const [showModalUpdateRole, setShowModalUpdateRole] = useState(false);
    const [showModalDeleteRole, setShowModalDeleteRole] = useState(false);
    const LIMIT_QUIZ_PER_PAGE = 8;
    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    useEffect(() => {
        fetchListRoleWithPagination(1);
        setBreadCrumb("manageRole");
    }, [])

    const fetchListRoleWithPagination = async (page) => {
        setDataUpdate({})
        setDataDelete({})
        let res = await getRoleWithPaginate(page, LIMIT_QUIZ_PER_PAGE);
        if (res.EC === 0) {
            setListRole(res.DT.role);
            setPageCount(res.DT.totalPages);
        }
    }
    const handleBtnAddRoles = () => {
        setShowModalAddRoles(true);
    }
    const handleBtnUpdateRole = (role) => {
        setShowModalUpdateRole(true);
        setDataUpdate(role);
    }
    const handleBtnDeleteRole = (role) => {
        setShowModalDeleteRole(true);
        setDataDelete(role);
    }
    const resetUpdateData = () => {
        setDataUpdate({});
    }
    const resetDeleteData = () => {
        setDataDelete({});
    }

    return (
        <div className={darkMode ? "manageRoles-container light" : "manageRoles-container dark"}>

            {/* Breadcrumb */}
            <Breadcrumb
                breadCrumb={breadCrumb}
                darkMode={darkMode}
            />

            <div className={darkMode ? "roles-content light-card" : "roles-content dark-card"}>
                <div className="btn-add-role btn-common">
                    <button onClick={() => { handleBtnAddRoles() }} className='btn-showModal'><FaPlus className='i-size' /> {t('adminPage.rolesManagement.btnAddRole')} </button>
                </div>
                <div className="table-role">
                    <TableRolesWithPaginate
                        listRole={listRole}
                        handleBtnUpdateRole={handleBtnUpdateRole}
                        handleBtnDeleteRole={handleBtnDeleteRole}
                        fetchListRoleWithPagination={fetchListRoleWithPagination}
                        pageCount={pageCount}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        darkMode={darkMode} />
                </div>
            </div>

            <ModalAddRole
                show={showModalAddRoles}
                setShow={setShowModalAddRoles}
                darkMode={darkMode}
                fetchListRoleWithPagination={fetchListRoleWithPagination}
                setCurrentPage={setCurrentPage}
            />
            <ModalUpdateRole
                show={showModalUpdateRole}
                setShow={setShowModalUpdateRole}
                dataUpdate={dataUpdate}
                resetUpdateData={resetUpdateData}
                fetchListRoleWithPagination={fetchListRoleWithPagination}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                darkMode={darkMode} />
            <ModalDeleteRole
                show={showModalDeleteRole}
                setShow={setShowModalDeleteRole}
                dataDelete={dataDelete}
                resetDeleteData={resetDeleteData}
                fetchListRoleWithPagination={fetchListRoleWithPagination}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                darkMode={darkMode} />
        </div>


    )
}

export default ManageRoles;