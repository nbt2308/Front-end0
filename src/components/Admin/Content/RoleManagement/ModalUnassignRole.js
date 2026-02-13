import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState, useEffect } from 'react';
import { getAllGroups, getAllRolesWithGroup } from '../../../../services/apiService';
import Select from 'react-select';
import _ from 'lodash';
import { useTranslation } from 'react-i18next';
import { FaUserMinus } from "react-icons/fa";
import ReactPaginate from 'react-paginate';
import ModalConfirmUnassignRole from './ModalConfirmUnassign';
const ModalUnassignRole = (props) => {
    const { show, setShow, darkMode } = props;
    const { t } = useTranslation();
    const handleClose = () => {
        setShow(false);
        setIsValidSelectedGroup(true);
        setSelectedOptionGroup(null);
        setListRoles([]);
        setPageCount(0);
    }
    //select state
    const [selectedOptionGroup, setSelectedOptionGroup] = useState(null);
    const [isValidSelectedGroup, setIsValidSelectedGroup] = useState(true);

    //show modal confirm state
    const [showModalConfirmUnassignRole, setShowModalConfirmUnassignRole] = useState(false);

    //list state
    const [listRoles, setListRoles] = useState([]);
    const [listGroups, setListGroups] = useState("");
    const [dataUnassign, setDataUnassign] = useState("");

    //pagination
    const LIMIT_ROLE_PER_PAGE = 5;
    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        fetchListGroups();

    }, [])
    const fetchListRoles = async (groupId, page) => {
        let res = await getAllRolesWithGroup(groupId, page, LIMIT_ROLE_PER_PAGE);
        if (res && res.EC === 0) {
            setListRoles(res.DT.role);
            setPageCount(res.DT.totalPages);
        }
    }
    const fetchListGroups = async () => {
        let res = await getAllGroups();
        if (res && res.EC === 0) {
            let newListGroups = res.DT.map(item => {
                return {
                    value: item.id,
                    label: `${item.id} | ${item.name}`
                }
            })
            const sortedGroups = _.orderBy(newListGroups, ['value'], ['asc']);
            setListGroups(sortedGroups)
        }
    }
    // const handleValidate = () => {
    //     let isValid = true;
    //     if (_.isEmpty(selectedOptionGroup)) {

    //         if (_.isEmpty(selectedOptionGroup)) {
    //             setIsValidSelectedGroup(false)
    //             isValid = false;
    //         }
    //     }
    //     else {

    //         setIsValidSelectedGroup(true)
    //         isValid = true;
    //     }
    //     return isValid
    // }

    const handleOnchangeSelectGroup = (option) => {
        setSelectedOptionGroup(option)
        setIsValidSelectedGroup(true);

        fetchListRoles(option.value, currentPage);
    }

    const handleShowModalConfirmUnassignRole = (item) => {
        setShowModalConfirmUnassignRole(true);

        let data = {
            groupId: selectedOptionGroup.value,
            roleId: item.id
        };
        setDataUnassign(data);
    }
    const getCustomStyles = (darkMode) => ({
        menuPortal: base => ({ ...base, zIndex: 9999 }),
        control: (base) => ({
            ...base,
            backgroundColor: darkMode ? "#0d305a" : "#fff",
            color: darkMode ? "#fff" : "#000",
            borderColor: darkMode ? "#ffffffff" : "#ccc",
            boxShadow: "none",
            ":hover": {
                borderColor: darkMode ? "#63a4ff" : "#888",
            },
        }),
        menu: (base) => ({
            ...base,
            backgroundColor: darkMode ? "#0d305a" : "#fff",
            color: darkMode ? "#fff" : "#000",
        }),
        option: (base, state) => ({
            ...base,
            backgroundColor: state.isSelected
                ? (darkMode ? "#104e8b" : "#e6f0ff")
                : state.isFocused
                    ? (darkMode ? "#1e90ff" : "#f0f8ff")
                    : (darkMode ? "#0d305a" : "#fff"),
            color: darkMode ? "#fff" : "#000",
            cursor: "pointer",
        }),
        singleValue: (base) => ({
            ...base,
            color: darkMode ? "#fff" : "#000",
        }),
        placeholder: (base) => ({
            ...base,
            color: darkMode ? "#bbb" : "#666",
        }),
    });

    const handlePageClick = (event) => {
        fetchListRoles(selectedOptionGroup.value, +event.selected + 1);
        setCurrentPage(+event.selected + 1);
    };
    return (
        <>
            <Modal show={show} onHide={handleClose} size="lg" backdrop="static" className='modal-unassign-role'>
                <Modal.Header closeButton className={darkMode ? "light" : "dark"} closeVariant={darkMode ? "black" : "white"}>
                    <Modal.Title>{t('adminPage.rolesManagement.modalUnassignRole.title')}</Modal.Title>
                </Modal.Header>
                <Modal.Body className={darkMode ? "modal-body light d-flex flex-column gap-3" : "modal-body dark d-flex flex-column"}>
                    <div className="group-select col-md-6 col-12 form-group">
                        <label className='mb-1 fw-bold'>{t('adminPage.rolesManagement.modalAssignRole.selectGroup')}</label>
                        <Select
                            className={`${isValidSelectedGroup ? "" : "is-invalid"}`}
                            classNamePrefix="react-select"
                            defaultValue={selectedOptionGroup}
                            onChange={handleOnchangeSelectGroup}
                            options={listGroups}
                            menuPortalTarget={document.body}
                            required
                            styles={getCustomStyles(!darkMode)}
                        />
                        <div className="invalid-feedback">{t('adminPage.rolesManagement.modalAssignRole.invalidSelectGroup')}</div>
                    </div>
                    <div className="table-responsive">
                        <div className="text-wrapper">
                            <table className="table table-bordered table-hover text-center">
                                <thead >
                                    <tr >
                                        <th scope="col" className={darkMode ? "th-light" : "th-dark"}><span className="ms-4">ID</span></th>
                                        <th scope="col" className={darkMode ? "th-light" : "th-dark"}>{t('adminPage.rolesManagement.tableRoles.roleUrl')}</th>
                                        <th scope="col" className={darkMode ? "th-light" : "th-dark"}>{t('adminPage.rolesManagement.tableRoles.roleMethod')}</th>
                                        <th scope="col" className={darkMode ? "th-light" : "th-dark"}>{t('adminPage.rolesManagement.tableRoles.roleDescription')}</th>
                                        <th scope="col" className={darkMode ? "action-col th-light" : "action-col th-dark"}>{t('adminPage.usersManagement.tableUsers.actions')}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        listRoles && listRoles.length > 0 && listRoles.map((item, index) => {
                                            return (
                                                <tr key={`table-role-${index}`}>
                                                    <td className={darkMode ? "light" : "dark-card"}><span className="ms-4">{item.id}</span></td>
                                                    <td className={darkMode ? "light" : "dark-card"}>{item.url}</td>
                                                    <td className={darkMode ? "light" : "dark-card"}>{item.method}</td>
                                                    <td className={darkMode ? "light" : "dark-card"}>{item.description}</td>
                                                    <td className={darkMode ? "light action-col" : "dark-card action-col"}>
                                                        <button className={darkMode ? "btn btn-delete btn-light border-0" : "btn btn-delete btn-dark border-0"}
                                                            onClick={() => handleShowModalConfirmUnassignRole(item)}
                                                            type="button"
                                                            data-bs-toggle="tooltip" data-bs-placement="top" title={t('adminPage.rolesManagement.tableRoles.tooltipUnassign')}
                                                        ><FaUserMinus />
                                                        </button>
                                                    </td>

                                                </tr>
                                            )
                                        })
                                    }
                                    {
                                        listRoles && listRoles.length === 0 &&
                                        <tr>
                                            <td colSpan={"6"} className={darkMode ? "light" : "dark-card"}>{t('adminPage.rolesManagement.tableRoles.error')}</td>
                                        </tr>
                                    }


                                </tbody>
                            </table>
                        </div>
                    </div>
                    <ReactPaginate
                        nextLabel={t('adminPage.rolesManagement.tableRoles.next')}
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={3}
                        marginPagesDisplayed={2}
                        pageCount={pageCount}
                        previousLabel={t('adminPage.rolesManagement.tableRoles.prev')}
                        pageClassName="page-item"
                        pageLinkClassName="page-link"
                        previousClassName="page-item"
                        previousLinkClassName="page-link"
                        nextClassName="page-item"
                        nextLinkClassName="page-link"
                        breakLabel="..."
                        breakClassName="page-item"
                        breakLinkClassName="page-link"
                        containerClassName={`pagination ${darkMode ? "pagination-light" : "pagination-dark"}`}
                        activeClassName="active"
                        renderOnZeroPageCount={null}
                        forcePage={currentPage - 1}
                    />
                </Modal.Body>
                <Modal.Footer className={darkMode ? "modal-footer light" : "modal-footer dark"}>
                    <Button variant="secondary" onClick={handleClose}>
                        {t('adminPage.usersManagement.modalAddUsers.buttonCancel')}
                    </Button>
                </Modal.Footer>
            </Modal >
            <ModalConfirmUnassignRole
                show={showModalConfirmUnassignRole}
                setShow={setShowModalConfirmUnassignRole}
                dataUnassign={dataUnassign}
                fetchListRoles={fetchListRoles}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                darkMode={darkMode}
            />


        </>
    );
}
export default ModalUnassignRole