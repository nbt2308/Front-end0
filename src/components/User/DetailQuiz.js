import { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router";
import { getDataQuiz, postSubmitAnswer } from "../../services/apiService";
import './DetailQuiz.scss';
import ModalResult from "./ModalResult";
import Questions from "./Questions";
import RightContent from "./QuizContent/RightContent";
import _ from "lodash";
const DetailQuiz = (props) => {
    const params = useParams();
    const quizId = params.id;
    const location = useLocation();
    const Navigate = useNavigate();
    const [dataQuiz, setDataQuiz] = useState([]);
    const [index, setIndex] = useState(0);

    const [showModalResult, setShowModalResult] = useState(false);
    const [dataModalResult, setDataModalResult] = useState("");
    useEffect(() => {
        fetchQuestions();
    }, [quizId])

    //handle raw data
    const fetchQuestions = async () => {
        let res = await getDataQuiz(quizId);
        if (res && res.EC === 0) {
            let raw = res.DT;
            let data = _.chain(raw)
                .groupBy('id')
                .map((item, index) => {
                    let answerContainer = []
                    let questionDescription, image = null;
                    item.forEach((temp, index) => {
                        if (index === 0) {
                            questionDescription = temp.description
                            image = temp.image
                        }
                        temp.answers.isChecked = false
                        answerContainer.push(temp.answers)
                    })
                    return {
                        questionid: index, answerContainer, questionDescription, image
                    };
                }).value();
            setDataQuiz(data);
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
        let question = dataQuizClone.find(item => +item.questionid === +questionID)
        if (question && question.answerContainer) {
            let result = question.answerContainer.map(item => {
                if (+item.id === +answerID) {
                    item.isChecked = !item.isChecked;
                }
                return item;
            })
            question.answerContainer = result;
        }
        let index = dataQuizClone.findIndex(item => +item.questionid === +questionID)
        if (index > -1) {
            dataQuizClone[index] = question;
            setDataQuiz(dataQuizClone);
        }

    }
    const handleFinish = async () => {
        let payload = {
            quizId: +quizId,
            answers: []
        }

        if (dataQuiz && dataQuiz.length > 0) {
            dataQuiz.forEach(item => {
                let questionId = item.questionid;
                let userAnswerId = [];

                //get userAnswerId
                item.answerContainer.forEach(answer => {
                    if (answer.isChecked === true) {
                        userAnswerId.push(answer.id);
                    }
                })

                payload.answers.push({
                    questionId: +questionId,
                    userAnswerId: userAnswerId
                })
            })
            let res = await postSubmitAnswer(payload);
            if (res && res.EC === 0) {
                setShowModalResult(true);
                setDataModalResult({
                    countCorrect: res.DT.countCorrect,
                    countTotal: res.DT.countTotal,
                    quizData: res.DT.quizData
                })
            }
            else {

            }

        }
    }
    return (
        <div className="detail-quiz-container">
            <div className="detail-quiz-header">
                <button className="btn btn-primary" onClick={() => { Navigate("/") }}>Go to Homepage </button>
                <h1>Quiz {quizId}: {location?.state?.title}</h1>
            </div>
            <div className="quiz-content">
                <div className="left-content">
                    <div className="question-container">
                        <Questions
                            questionIndex={index}
                            handleDataCheckbox={handleDataCheckbox}
                            data={dataQuiz && dataQuiz.length > 0 ? dataQuiz[index] : []} />

                    </div>
                    <div className="footer">
                        <button className="btn btn-secondary" onClick={() => { handlePrev() }}>Prev</button>
                        <button className="btn btn-primary mx-3" onClick={() => { handleNext() }}>Next</button>
                        <button className="btn btn-warning" onClick={() => { handleFinish() }}>Finish</button>
                    </div>

                </div>
                <div className="right-content">
                    <RightContent
                        dataQuiz={dataQuiz}
                        handleFinish={handleFinish} 
                        setIndex={setIndex}/>
                </div>
            </div>
            <ModalResult
                show={showModalResult}
                setShow={setShowModalResult}
                dataModalResult={dataModalResult}
            />
        </div>
    )
}
export default DetailQuiz;