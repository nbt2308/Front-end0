import "./DashBoard.scss"
import { RiAdminLine, RiBaseStationLine } from "react-icons/ri";
import { FaRegUser, FaCheckSquare, FaListAlt } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";
import { BsFillQuestionSquareFill } from "react-icons/bs";
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, ResponsiveContainer } from "recharts";
import { getDashboard } from "../../../services/apiService";
import { useEffect, useState } from "react";
const DashBoard = (props) => {
    const [dataOverview, setDataOverview] = useState("");
    const [dataChart, setDataChart] = useState([]);
    useEffect(() => {
        fetchDataOverview();
    }, [])
    const fetchDataOverview = async () => {
        let res = await getDashboard();
        if (res && res.EC === 0) {
            setDataOverview(res.DT);

            //process data chart
            let Quiz=0,Question=0,Answer=0;
            Quiz=res?.DT?.others?.countQuiz ?? 0;
            Question=res?.DT?.others?.countQuestions ?? 0;
            Answer=res?.DT?.others?.countAnswers ?? 0;

            const data = [
                {
                    "name": "Quizzes",
                    "Quiz": Quiz

                },
                {
                    "name": "Questions",
                    "Question": Question

                },
                {
                    "name": "Answer",
                    "Answer": Answer

                },

            ]
            setDataChart(data);
        }
    }

    console.log('daat',dataOverview);
    

    return (
        <>
            <div className="dashboard-container">
                <div className="breadcrumb-container">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a href="/admin">Home</a></li>
                            <li className="breadcrumb-item active" aria-current="page">Dashboard</li>
                        </ol>
                    </nav>
                </div>
                <div className="dashboard-title">
                    Analytics Dashboard
                </div>
                <div className="dashboard-content">
                    <div className="top">
                        <div className="row">
                            <div className="col-md-3 col-sm-6 mb-3">
                                <div className="card p-3 ">
                                    <div className="stats w-75">
                                        <span className="text-1">Total Users</span>
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
                                <div className="card p-3 ">
                                    <div className="stats w-75">
                                        <span className="text-1">Users</span>
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
                                <div className="card p-3 ">
                                    <div className="stats w-75">
                                        <span className="text-1">Admins</span>
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
                                <div className="card p-3 ">
                                    <div className="stats w-75">
                                        <span className="text-1">Online</span>
                                        <span className="text-2">1</span>
                                    </div>
                                    <div className="icon w-25">
                                        <RiBaseStationLine style={{ color: "green" }} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bottom">
                        <div className="row">
                            <div className="col-md-6 col-sm-6 mb-3">
                                <div className="card p-3 chart">
                                    <ResponsiveContainer width="95%" height="100%">
                                        <BarChart data={dataChart}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="name" />
                                            <YAxis />
                                            <Tooltip />
                                            <Legend />
                                            <Bar dataKey="Quiz" fill="#3B82F6" />
                                            <Bar dataKey="Question" fill="#8B5CF6" />
                                            <Bar dataKey="Answer" fill="#10B981" />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                            <div className="col-md-6 col-sm-4 mb-3">
                                <div className="card p-3 others">
                                    <span className="text-1">Others</span>
                                    <div class="row align-items-center mb-3 child">
                                        <div class="col-auto icon"><FaListAlt style={{ color: "#3B82F6" }} /></div>
                                        <div class="col text-1">Total Quizzes</div>
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
                                        <div class="col text-1">Total Questions</div>
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
                                        <div class="col text-1">Total Answers</div>
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