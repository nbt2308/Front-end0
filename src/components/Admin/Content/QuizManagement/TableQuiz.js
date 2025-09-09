import { FaPen, FaTrashAlt } from "react-icons/fa";
import { useTranslation } from 'react-i18next';
import PerfectScrollbar from 'react-perfect-scrollbar'
const TableQuiz = (props) => {
    const { handleBtnUpdateQuiz, handleBtnDeleteQuiz, listQuiz, darkMode } = props
    const { t } = useTranslation();
    return (
        <>
            <div className="scrollbar">
                <PerfectScrollbar >
                    <table className="table table-hover ">
                        <thead>
                            <tr>
                                <th scope="col" className={darkMode ? "th-light" : "th-dark"}><span className="ms-4">ID</span></th>
                                <th scope="col" className={darkMode ? "th-light" : "th-dark"}>{t('adminPage.quizzesManagement.tableQuiz.nameQuiz')}</th>
                                <th scope="col" className={darkMode ? "th-light" : "th-dark"}>{t('adminPage.quizzesManagement.tableQuiz.descriptionQuiz')}</th>
                                <th scope="col" className={darkMode ? "th-light" : "th-dark"}>{t('adminPage.quizzesManagement.tableQuiz.difficultyQuiz')}</th>
                                <th scope="col" className={darkMode ? "action-col th-light" : "action-col th-dark"}>{t('adminPage.usersManagement.tableUsers.actions')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                listQuiz && listQuiz.length > 0 && listQuiz.map((item, index) => {
                                    return (
                                        <tr key={`table-user-${index}`}>
                                            <td className={darkMode ? "light" : "dark-card"}><span className="ms-4">{item.id}</span></td>
                                            <td className={darkMode ? "light" : "dark-card"}>{item.name}</td>
                                            <td className={darkMode ? "light" : "dark-card"}>{item.description}</td>
                                            <td className={darkMode ? "light" : "dark-card"}>{item.difficulty}</td>
                                            <td className={darkMode ? "action-col light" : "action-col dark-card"}>
                                                <button
                                                    className={darkMode ? "btn mx-3 btn-edit btn-light" : "btn mx-3 btn-edit btn-dark"}
                                                    type="button"
                                                    data-bs-toggle="tooltip" data-bs-placement="top" title="Edit"
                                                    onClick={() => handleBtnUpdateQuiz(item)}

                                                ><FaPen className="icon-edit" /></button>
                                                <button className={darkMode ? "btn btn-delete btn-light" : "btn btn-delete btn-dark"}
                                                    type="button"
                                                    onClick={() => handleBtnDeleteQuiz(item)}
                                                    data-bs-toggle="tooltip" data-bs-placement="top" title="Delete"
                                                ><FaTrashAlt className="icon-delete" /></button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                            {
                                listQuiz && listQuiz.length === 0 &&
                                <tr>
                                    <td colSpan={"5"}>{t('adminPage.quizzesManagement.tableQuiz.notFound')}</td>
                                </tr>
                            }


                        </tbody>
                    </table>
                </PerfectScrollbar>
            </div>
        </>
    )
}
export default TableQuiz