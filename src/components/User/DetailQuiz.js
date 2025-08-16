import { useEffect, useState } from "react";
import { useParams, useLocation, data } from "react-router";
import { getDataQuiz } from "../../services/apiService";
import './DetailQuiz.scss';
import Questions from "./Questions";
import _, { result } from "lodash";
const DetailQuiz = () => {
    const params = useParams();
    const quizID = params.id;
    const location = useLocation();

    const [dataQuiz, setDataQuiz] = useState([]);
    const [index, setIndex] = useState(0);
    useEffect(() => {
        fetchQuestions();
    }, [quizID])

    //handle raw data
    const fetchQuestions = async () => {
        let res = await getDataQuiz(quizID);
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

    console.log('data quiz', dataQuiz);


    return (
        <div className="detail-quiz-container">
            <div className="detail-quiz-header">
                <button className="btn btn-primary">Go to Homepage </button>
                <h1>Quiz {quizID}: {location?.state?.title}</h1>
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
                        <button className="btn btn-warning" onClick={() => { handleDataCheckbox() }}>Finish</button>
                    </div>

                </div>
                <div className="right-content">

                </div>
            </div>


        </div>
    )
}
export default DetailQuiz;