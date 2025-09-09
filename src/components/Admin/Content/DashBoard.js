import "./DashBoard.scss"
import { RiAdminLine, RiBaseStationLine } from "react-icons/ri";
import { FaRegUser, FaCheckSquare, FaListAlt } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";
import { BsFillQuestionSquareFill } from "react-icons/bs";
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, ResponsiveContainer } from "recharts";
import { getDashboard } from "../../../services/apiService";
import { useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';
import { useOutletContext } from "react-router-dom";
const DashBoard = (props) => {
    const { darkMode } = useOutletContext();
    const [dataOverview, setDataOverview] = useState("");
    const [dataChart, setDataChart] = useState([]);
    const { t } = useTranslation();


    useEffect(() => {
        fetchDataOverview();
    }, [])
    const fetchDataOverview = async () => {
        let res = await getDashboard();
        if (res && res.EC === 0) {
            setDataOverview(res.DT);

            //process data chart
            let Quizzes = 0, Questions = 0, Answers = 0;
            Quizzes = res?.DT?.others?.countQuiz ?? 0;
            Questions = res?.DT?.others?.countQuestions ?? 0;
            Answers = res?.DT?.others?.countAnswers ?? 0;

            const data = [
                {
                    "name": `${t('adminPage.dashboard.quizStatistics.quizzes')}`,
                    "Quizzes": Quizzes

                },
                {
                    "name": `${t('adminPage.dashboard.quizStatistics.questions')}`,
                    "Questions": Questions

                },
                {
                    "name": `${t('adminPage.dashboard.quizStatistics.answers')}`,
                    "Answers": Answers

                },

            ]
            setDataChart(data);
        }
    }
    return (
        <>
            <div className={darkMode ? "dashboard-container light" : "dashboard-container dark"}>
                <div className={darkMode ? "breadcrumb-container  light" : "breadcrumb-container  dark-card"}>
                    <div className="dashboard-title">
                        {t('adminPage.dashboard.dashboardTitle')}
                    </div>
                    <div className="nav-breadcrumb d-flex justify-content-center align-items-center">

                        <ol className="breadcrumb">
                            <li className={darkMode ? "breadcrumb-item  basic-light" : "breadcrumb-item basic-dark"}><a href="/">{t('adminPage.breadcrumb.home')}</a></li>
                            <li className={darkMode ? "breadcrumb-item active-light" : "breadcrumb-item active-dark"} aria-current="page">{t('adminPage.breadcrumb.dashboard')}</li>
                        </ol>

                    </div>
                </div>

                <div className="dashboard-content">
                    <div className="top">
                        <div className="row">
                            <div className="col-md-3 col-sm-6 mb-3">
                                <div className={darkMode ? "card p-3  light" : "card p-3  dark-card"}>
                                    <div className="stats w-75">
                                        <span className="text-1">{t('adminPage.dashboard.totalUsers')}</span>
                                        <span className="text-2">
                                            {dataOverview && dataOverview.users &&
                                                dataOverview.users.total ?
                                                <>
                                                    {dataOverview.users.total}
                                                </>
                                                :
                                                <>
                                                    0
                                                </>
                                            }
                                        </span>
                                    </div>
                                    <div className="icon w-25">
                                        <FiUsers style={{ color: "red" }} />
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3 col-sm-6 mb-3">
                                <div className={darkMode ? "card p-3  light" : "card p-3  dark-card"}>
                                    <div className="stats w-75">
                                        <span className="text-1">{t('adminPage.dashboard.users')}</span>
                                        <span className="text-2">
                                            {
                                                dataOverview && dataOverview.users &&
                                                    dataOverview.users.countUsers ?
                                                    <>
                                                        {dataOverview.users.countUsers}
                                                    </>
                                                    :
                                                    <>0</>
                                            }
                                        </span>
                                    </div>
                                    <div className="icon w-25">
                                        <FaRegUser style={{ color: "purple" }} />
                                    </div>


                                </div>
                            </div>
                            <div className="col-md-3 col-sm-6 mb-3">
                                <div className={darkMode ? "card p-3  light" : "card p-3  dark-card"}>
                                    <div className="stats w-75">
                                        <span className="text-1">{t('adminPage.dashboard.admins')}</span>
                                        <span className="text-2">{
                                            dataOverview && dataOverview.users &&
                                                dataOverview.users.countAdmin ?
                                                <>
                                                    {dataOverview.users.countAdmin}
                                                </>
                                                :
                                                <>0</>
                                        }</span>
                                    </div>
                                    <div className="icon w-25">
                                        <RiAdminLine style={{ color: "blue" }} />
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3 col-sm-6 mb-3 ">
                                <div className={darkMode ? "card p-3  light" : "card p-3  dark-card"}>
                                    <div className="stats w-75">
                                        <span className="text-1">{t('adminPage.dashboard.online')}</span>
                                        <span className="text-2">1</span>
                                    </div>
                                    <div className="icon w-25">
                                        <RiBaseStationLine style={darkMode ? { color: "green" } : { color: "#05b905" }} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bottom">
                        <div className="row">
                            <div className="col-md-6 col-sm-6 mb-3">
                                <div className={darkMode ? "card p-3 chart light" : "card p-3 chart dark-card"}>
                                    <span className="text-1">{t('adminPage.dashboard.quizStatistics.quizStatisticsTitle')}</span>
                                    <ResponsiveContainer width="95%" height="100%">
                                        <BarChart data={dataChart} style={{
                                            fontSize: 14,
                                            color: "#000000ff",
                                            
                                            fontFamily: "Arial",
                                            fontWeight: "bold",
                                        }}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="name" stroke={darkMode?"#000":"#8ba1b7"}/>
                                            <YAxis stroke={darkMode?"#000":"#8ba1b7"} />
                                            <Tooltip  />
                                            <Legend />
                                            <Bar dataKey="Quizzes" fill="#3B82F6" />
                                            <Bar dataKey="Questions" fill="#8B5CF6" />
                                            <Bar dataKey="Answers" fill="#10B981" />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                            <div className="col-md-6 col-sm-4 mb-3">
                                <div className={darkMode ? "card p-3 others light" : "card p-3 others dark-card"}>
                                    <span className="text-1">{t('adminPage.dashboard.others.othersTitle')}</span>
                                    <div class="row align-items-center mb-3 child">
                                        <div class="col-auto icon"><FaListAlt style={{ color: "#3B82F6" }} /></div>
                                        <div class="col text-1">{t('adminPage.dashboard.others.totalQuizzes')}</div>
                                        <div class="col-auto text-2 me-2">
                                            {
                                                dataOverview && dataOverview.others
                                                    &&
                                                    dataOverview.others.countQuiz ?
                                                    <>
                                                        {dataOverview.others.countQuiz}
                                                    </>
                                                    :
                                                    <>0</>
                                            }
                                        </div>
                                    </div>

                                    <div class="row align-items-center mb-3 child">
                                        <div class="col-auto icon"><BsFillQuestionSquareFill style={{ color: "#8B5CF6" }} /></div>
                                        <div class="col text-1">{t('adminPage.dashboard.others.totalQuestions')}</div>
                                        <div class="col-auto text-2 me-2">
                                            {
                                                dataOverview && dataOverview.others
                                                    &&
                                                    dataOverview.others.countQuestions ?
                                                    <>
                                                        {dataOverview.others.countQuestions}
                                                    </>
                                                    :
                                                    <>0</>
                                            }
                                        </div>
                                    </div>

                                    <div class="row align-items-center child">
                                        <div class="col-auto icon"><FaCheckSquare style={{ color: "#10B981" }} /></div>
                                        <div class="col text-1">{t('adminPage.dashboard.others.totalAnswers')}</div>
                                        <div class="col-auto text-2 me-2">
                                            {
                                                dataOverview && dataOverview.others
                                                    &&
                                                    dataOverview.others.countAnswers ?
                                                    <>
                                                        {dataOverview.others.countAnswers}
                                                    </>
                                                    :
                                                    <>0</>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default DashBoard;