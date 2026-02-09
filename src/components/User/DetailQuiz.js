import { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router";
import { getDataQuiz, postSubmitAnswer } from "../../services/apiService";
import './DetailQuiz.scss';
import ModalResult from "./ModalResult";
import ModalConfirmSelect from "./ModalConfirmSelect";
import ModalConfirmQuit from "./ModalConfirmQuit";
import Questions from "./Questions";
import RightContent from "./QuizContent/RightContent";
import _ from "lodash";
import { CiLogout } from "react-icons/ci";
import { useTranslation } from 'react-i18next';
const DetailQuiz = (props) => {
    const { t } = useTranslation();
    const params = useParams();
    const quizId = params.id;
    const location = useLocation();
    const Navigate = useNavigate();
    const [dataQuiz, setDataQuiz] = useState([]);
    const [index, setIndex] = useState(0);

    const [showModalConfirmSelect, setShowModalConfirmSelect] = useState(false);
    const [showModalConfirmQuit, setShowModalConfirmQuit] = useState(false);
    const [showModalResult, setShowModalResult] = useState(false);
    const [dataModalResult, setDataModalResult] = useState("");

    const [check, setCheck] = useState({
        isQuit: false,
        isFinish: false,
        isShowAnswer: false,
        onTimeUp: false
    })
    useEffect(() => {
        fetchQuestions();
    }, [quizId])

    //handle raw data
    const fetchQuestions = async () => {
        let res = await getDataQuiz(quizId);
        if (res && res.EC === 0) {
            let raw = res.DT;
            let newDT = raw.map(question => {
                return {
                    ...question,
                    QuizAnswers: question.QuizAnswers.map(answer => ({
                        ...answer,
                        isChecked: false,
                        isCorrect: false
                    }))
                }
            })
            setDataQuiz(newDT);
        }
    }



    const handlePrev = () => {
        if (index - 1 < 0) {
            return;
        }
        setIndex(index - 1);
    }
    const handleNext = () => {
        if (dataQuiz && dataQuiz.length > index + 1) {
            setIndex(index + 1);
        }

    }
    const handleDataCheckbox = (answerID, questionID) => {
        let dataQuizClone = _.cloneDeep(dataQuiz);
        let question = dataQuizClone.find(item => +item.id === +questionID)
        if (question && question.QuizAnswers) {
            let result = question.QuizAnswers.map(item => {
                if (+item.id === +answerID) {
                    item.isChecked = !item.isChecked;
                }
                return item;
            })
            question.QuizAnswers = result;
        }
        let index = dataQuizClone.findIndex(item => +item.id === +questionID)
        if (index > -1) {
            dataQuizClone[index] = question;
            setDataQuiz(dataQuizClone);
        }

    }
    const handleQuit = () => {
        setShowModalConfirmQuit(true);
    }
    const handleCheck = () => {
        setShowModalConfirmSelect(true);

    }
    const handleFinishResult = async () => {
        let payload = {
            quizId: +quizId,
            answers: []
        }

        if (dataQuiz && dataQuiz.length > 0) {
            dataQuiz.forEach(item => {
                let questionId = item.id;
                let userAnswerId = [];

                //get userAnswerId
                item.QuizAnswers.forEach(answer => {
                    if (answer.isChecked === true) {
                        userAnswerId.push(answer.id);
                    }
                })

                payload.answers.push({
                    questionId: +questionId,
                    userAnswerId: userAnswerId
                })
            })
            
            //select * from quizanswer where
            let res = await postSubmitAnswer(payload);
            if (res && res.EC === 0) {

                setDataModalResult({
                    countCorrect: res.DT.countCorrect,
                    countTotal: res.DT.countTotal,
                    quizData: res.DT.quizData
                })
                setShowModalResult(true);
                

                //update dataquiz with correct answer
                if (res.DT && res.DT.quizData) {
                    let dataQuizClone = _.cloneDeep(dataQuiz);
                    let a = res.DT.quizData;
                    for (let q of a) {
                        for (let i = 0; i < dataQuizClone.length; i++) {
                            if (+q.questionId === +dataQuizClone[i].id) {
                                //update answer
                                let newAnswer = [];
                                for (let j = 0; j < dataQuizClone[i].QuizAnswers.length; j++) {
                                    let s = q.systemAnswers.find(item => +item.id === +dataQuizClone[i].QuizAnswers[j].id)
                                    if (s) {
                                        dataQuizClone[i].QuizAnswers[j].isCorrect = true;
                                    }
                                    newAnswer.push(dataQuizClone[i].QuizAnswers[j])
                                }
                                dataQuizClone[i].QuizAnswers = newAnswer
                            }
                        }
                    }
                    setDataQuiz(dataQuizClone);
                }

            }
            else {

            }

        }
    }
    
    return (
        <div className="detail-quiz-container">
            <div className="detail-quiz-header">
                <button className="btn btn-danger" onClick={() => { handleQuit() }}><CiLogout className="icon" /> </button>
                <h1>{location?.state?.title}</h1>
            </div>
            <div className="quiz-content">
                <div className="left-content">
                    <div className="question-container">
                        <Questions
                            questionIndex={index}
                            handleDataCheckbox={handleDataCheckbox}
                            data={dataQuiz && dataQuiz.length > 0 ? dataQuiz[index] : []}
                            check={check}
                        />

                    </div>
                    <div className="footer">
                        <button className="btn btn-secondary" onClick={() => { handlePrev() }}>{t('usersPage.buttonPrev')}</button>
                        <button className="btn btn-primary mx-3" onClick={() => { handleNext() }}>{t('usersPage.buttonNext')}</button>
                        <button
                            className="btn btn-warning"
                            onClick={() => { handleCheck() }}
                            disabled={check.isFinish}
                        >
                            {t('usersPage.buttonFinish')}
                        </button>
                    </div>

                </div>
                <div className="right-content">
                    <RightContent
                        dataQuiz={dataQuiz}
                        handleFinishResult={handleFinishResult}
                        setIndex={setIndex}
                        check={check}
                        setCheck={setCheck} />
                </div>
            </div>
            <ModalResult
                show={showModalResult}
                setShow={setShowModalResult}
                dataModalResult={dataModalResult}
                check={check}
                setCheck={setCheck}
            />
            <ModalConfirmSelect
                show={showModalConfirmSelect}
                setShowModalResult={setShowModalResult}
                setShow={setShowModalConfirmSelect}
                check={check}
                setCheck={setCheck}
                handleFinishResult={handleFinishResult}
            />
            <ModalConfirmQuit
                show={showModalConfirmQuit}
                setShow={setShowModalConfirmQuit}
                setCheck={setCheck}
                check={check}
            />
        </div>
    )
}
export default DetailQuiz;