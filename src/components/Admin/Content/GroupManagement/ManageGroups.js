import { useState, useEffect } from 'react';
import { FaPlus } from 'react-icons/fa';
import "./ManageGroups.scss"
import { useTranslation } from 'react-i18next';
import { useOutletContext } from 'react-router-dom';
import Breadcrumb from '../../BreadCrump/Breadcrumb';
import { getGroupWithPaginate } from '../../../../services/apiService';
import TableGroupsWithPaginate from './TableGroupsWithPaginate';
import ModalAddGroup from './ModalAddGroup';
import ModalUpdateGroup from './ModalUpdateGroup';
import ModalDeleteGroup from './ModalDeleteGroup';
const ManageGroups = (props) => {
    const { darkMode, breadCrumb, setBreadCrumb } = useOutletContext();
    const { t } = useTranslation();
    const [listGroup, setListGroup] = useState("");
    const [dataUpdate, setDataUpdate] = useState("")
    const [dataDelete, setDataDelete] = useState("")
    const [showModalAddGroup, setShowModalAddGroup] = useState(false);
    const [showModalUpdateGroup, setShowModalUpdateGroup] = useState(false);
    const [showModalDeleteGroup, setShowModalDeleteGroup] = useState(false);
    const LIMIT_GROUP_PER_PAGE = 8;
    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    useEffect(() => {
        fetchListGroupsWithPagination(1);
        setBreadCrumb("groupsManagement");
    }, [])

    const fetchListGroupsWithPagination = async (page) => {
        setDataUpdate({})
        setDataDelete({})
        let res = await getGroupWithPaginate(page, LIMIT_GROUP_PER_PAGE);
        if (res.EC === 0) {
            setListGroup(res.DT.group);
            setPageCount(res.DT.totalPages);
        }
    }
    const handleBtnAddGroup = () => {
        setShowModalAddGroup(true);
    }
    const handleBtnUpdateGroup = (Group) => {
        setShowModalUpdateGroup(true);
        setDataUpdate(Group);
    }
    const handleBtnDeleteGroup = (Group) => {
        setShowModalDeleteGroup(true);
        setDataDelete(Group);
    }
    const resetUpdateData = () => {
        setDataUpdate({});
    }
    

    return (
        <div className={darkMode ? "manageGroups-container light" : "manageGroups-container dark"}>

            {/* Breadcrumb */}
            <Breadcrumb
                breadCrumb={breadCrumb}
                darkMode={darkMode}
            />

            <div className={darkMode ? "groups-content light-card" : "groups-content dark-card"}>
                <div className="d-flex">
                    <div className="btn-common">
                        <button onClick={() => { handleBtnAddGroup() }} className='btn btn-primary'><FaPlus className='i-size' /> {t('adminPage.groupsManagement.btnAddGroup')} </button>
                    </div>
                </div>
                <div className="table-group">
                    <TableGroupsWithPaginate
                        listGroup={listGroup}
                        handleBtnUpdateGroup={handleBtnUpdateGroup}
                        handleBtnDeleteGroup={handleBtnDeleteGroup}
                        fetchListGroupsWithPagination={fetchListGroupsWithPagination}
                        pageCount={pageCount}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        darkMode={darkMode} />
                </div>
            </div>

            <ModalAddGroup
                show={showModalAddGroup}
                setShow={setShowModalAddGroup}
                darkMode={darkMode}
                fetchListGroupsWithPagination={fetchListGroupsWithPagination}
                setCurrentPage={setCurrentPage}
            />
            <ModalUpdateGroup
                show={showModalUpdateGroup}
                setShow={setShowModalUpdateGroup}
                darkMode={darkMode}
                fetchListGroupsWithPagination={fetchListGroupsWithPagination}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
                dataUpdate={dataUpdate}
                resetUpdateData={resetUpdateData} />
            <ModalDeleteGroup
                show={showModalDeleteGroup}
                setShow={setShowModalDeleteGroup}
                darkMode={darkMode}
                fetchListGroupsWithPagination={fetchListGroupsWithPagination}
                setCurrentPage={setCurrentPage}
                dataDelete={dataDelete}
            />
        </div>


    )
}

export default ManageGroups;