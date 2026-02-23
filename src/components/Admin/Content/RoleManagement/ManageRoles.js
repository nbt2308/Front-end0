import { useState, useEffect } from 'react';
import { FaPlus, FaUserShield, FaUserMinus } from 'react-icons/fa';
import "./ManageRoles.scss"
import { useTranslation } from 'react-i18next';
import { useOutletContext } from 'react-router-dom';
import Breadcrumb from '../../BreadCrump/Breadcrumb';
import ModalAddRole from './ModalAddRole';
import { getRoleWithPaginate } from '../../../../services/apiService';
import TableRolesWithPaginate from './TableRolesWithPaginate';
import ModalUpdateRole from './ModalUpdateRole';
import ModalDeleteRole from './ModalDeleteRole';
import ModalAssignRole from './ModalAssignRole';
import ModalUnassignRole from './ModalUnassignRole';
const ManageRoles = (props) => {
    const { themeState, breadCrumb, setBreadCrumb } = useOutletContext();
    const { t } = useTranslation();
    const [listRole, setListRole] = useState("");
    const [dataUpdate, setDataUpdate] = useState("")
    const [dataDelete, setDataDelete] = useState("")
    const [showModalAddRoles, setShowModalAddRoles] = useState(false);
    const [showModalUpdateRole, setShowModalUpdateRole] = useState(false);
    const [showModalDeleteRole, setShowModalDeleteRole] = useState(false);
    const [showModalAssignRole, setShowModalAssignRole] = useState(false);
    const [showModalUnassignRole, setShowModalUnassignRole] = useState(false);
    const LIMIT_ROLE_PER_PAGE = 8;
    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    useEffect(() => {
        fetchListRoleWithPagination(1);
        setBreadCrumb("rolesManagement");
    }, [])

    const fetchListRoleWithPagination = async (page) => {
        setDataUpdate({})
        setDataDelete({})
        let res = await getRoleWithPaginate(page, LIMIT_ROLE_PER_PAGE);
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
    const handleBtnAssignRole = () => {
        setShowModalAssignRole(true);
    }
    const handleBtnUnassignRole = () => {
        setShowModalUnassignRole(true);
    }
    const resetUpdateData = () => {
        setDataUpdate({});
    }
    const resetDeleteData = () => {
        setDataDelete({});
    }

    return (
        <div className={themeState ? "manageRoles-container light" : "manageRoles-container dark"}>

            {/* Breadcrumb */}
            <Breadcrumb
                breadCrumb={breadCrumb}
                themeState={themeState}
            />

            <div className={themeState ? "roles-content theme-card-light" : "roles-content theme-card-dark"}>
                <div className="d-flex flex-column flex-md-row gap-3 mb-3">
                    <button onClick={() => handleBtnAddRoles()} className='btn btn-primary mx-3 my-3 d-flex align-items-center justify-content-center gap-1'>
                        <FaPlus className='i-size' />
                        <span>{t('adminPage.rolesManagement.btnAddRole')} </span>
                    </button>

                    <button onClick={() => handleBtnAssignRole()} className='btn btn-info mx-3 my-md-3 my-0 d-flex align-items-center justify-content-center gap-1'>
                        <FaUserShield className='i-size' />
                        <span>{t('adminPage.rolesManagement.btnAssignRole')}</span>
                    </button>

                    <button onClick={() => handleBtnUnassignRole()} className='btn btn-warning mx-3 my-3 d-flex align-items-center justify-content-center gap-1'>
                        <FaUserMinus className='i-size' />
                        <span>{t('adminPage.rolesManagement.btnUnassignRole')}</span>
                    </button>
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
                        themeState={themeState} />
                </div>
            </div>

            <ModalAddRole
                show={showModalAddRoles}
                setShow={setShowModalAddRoles}
                themeState={themeState}
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
                themeState={themeState} />
            <ModalDeleteRole
                show={showModalDeleteRole}
                setShow={setShowModalDeleteRole}
                dataDelete={dataDelete}
                resetDeleteData={resetDeleteData}
                fetchListRoleWithPagination={fetchListRoleWithPagination}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                themeState={themeState} />
            <ModalAssignRole
                show={showModalAssignRole}
                setShow={setShowModalAssignRole}
                themeState={themeState}
            />
            <ModalUnassignRole
                show={showModalUnassignRole}
                setShow={setShowModalUnassignRole}
                themeState={themeState}
            />

        </div>


    )
}

export default ManageRoles;