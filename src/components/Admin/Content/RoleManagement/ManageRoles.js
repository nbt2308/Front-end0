import Select from 'react-select';
import { FaPlusCircle, FaFolderPlus, FaMinusCircle } from "react-icons/fa";
import { useState, useEffect } from 'react';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { FaPlus } from 'react-icons/fa';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import "./ManageRoles.scss"
import _ from 'lodash';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { useOutletContext } from 'react-router-dom';
import Breadcrumb from '../../BreadCrump/Breadcrumb';
import ModalAddRoles from './ModalAddRole';
import { getRoleWithPaginate } from '../../../../services/apiService';
import TableRolesWithPaginate from './TableRolesWithPaginate';
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
                        handleBtnUpdateUser={handleBtnUpdateRole}
                        handleBtnDeleteUser={handleBtnDeleteRole}
                        fetchListRoleWithPagination={fetchListRoleWithPagination}
                        pageCount={pageCount}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        darkMode={darkMode} />
                </div>
            </div>

            <ModalAddRoles
                show={showModalAddRoles}
                setShow={setShowModalAddRoles}
                darkMode={darkMode}
                fetchListRoleWithPagination={fetchListRoleWithPagination}
                setCurrentPage={setCurrentPage}
            />
        </div>


    )
}

export default ManageRoles;