import { useEffect, useState } from "react"
import { getHistory } from "../../services/apiService"
import moment from 'moment-timezone';
import PerfectScrollbar from 'react-perfect-scrollbar'

import { useTranslation } from 'react-i18next';
const History = (props) => {
    const {themeState}=props
    const [listHistory, setListHistory] = useState([]);
    const { t } = useTranslation();
    useEffect(() => {
        fetchListHistory();
    }, [])
    const fetchListHistory = async () => {
        let res = await getHistory();
        if (res && res.EC === 0) {  
            
            let newData = res?.DT?.map(item => {

                return {
                    id: item.id,
                    quiz_name: item.Quiz.name,
                    total_questions: item.totalQuestions,
                    total_correct: item.totalCorrect,
                    date: moment(item.createdAt).tz("Asia/Ho_Chi_Minh").format('DD/MM/YYYY hh:mm:ss A')
                }
            }).reverse()

            setListHistory(newData)

        }
    }
    return (
        <>
            <div className={themeState ? "table-history-container mx-3 theme-card-light" : "table-history-container mx-3 theme-card-dark"}>
                <div className="title mb-3 ms-3 mt-3">{t('adminPage.accountProfile.history.title')}</div>

                <div className="table-content mb-3">
                    <PerfectScrollbar>
                        <table className="table text-center">
                            <thead>
                                <tr>
                                    <th scope="col" className={themeState ? "theme-th-light" : "theme-th-dark"}>ID</th>
                                    <th scope="col" className={themeState ? "theme-th-light" : "theme-th-dark"}>{t('adminPage.quizzesManagement.tableQuiz.nameQuiz')}</th>
                                    <th scope="col" className={themeState ? "theme-th-light" : "theme-th-dark"}>{t('adminPage.accountProfile.history.totalQuestions')}</th>
                                    <th scope="col" className={themeState ? "theme-th-light" : "theme-th-dark"}>{t('adminPage.accountProfile.history.totalCorrect')}</th>
                                    <th scope="col" className={themeState ? "theme-th-light" : "theme-th-dark"}>{t('adminPage.accountProfile.history.date')}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    listHistory && listHistory.length > 0 && listHistory.map((item, index) => {
                                        return (
                                            <tr key={`table-history-${index}`}>
                                                <th scope="row" className={themeState ? "light" : "theme-card-dark"}>{item.id}</th>
                                                <td className={themeState ? "light" : "theme-card-dark"}>{item.quiz_name}</td>
                                                <td className={themeState ? "light" : "theme-card-dark"}>{item.total_questions}</td>
                                                <td className={themeState ? "light" : "theme-card-dark"}>{item.total_correct}</td>
                                                <td className={themeState ? "light" : "theme-card-dark"}>{item.date}</td>
                                            </tr>
                                        )
                                    })
                                }
                                {
                                    listHistory && listHistory.length === 0 &&
                                    <tr>
                                        <td colSpan={"5"}>{t('adminPage.accountProfile.history.notFound')}</td>
                                    </tr>
                                }

                            </tbody>
                        </table>
                    </PerfectScrollbar>
                </div>

            </div>
        </>
    )
}
export default History