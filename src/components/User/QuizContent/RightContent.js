import CountDownTimer from "./CountDownTimer";
import { useRef } from "react";
import { useTranslation } from 'react-i18next';
const RightContent = (props) => {
    const { dataQuiz, handleFinishResult, setIndex ,check,setCheck} = props
    const refDiv = useRef([]);
    const { t } = useTranslation();
    
     
    const onTimeUp = () => {
        handleFinishResult();
        setCheck(prev=>({
            ...prev,
            isFinish:true
        }))
    }

    const getClassQuestion = (index, question) => {


        if (question && question.answerContainer.length > 0) {
            let isAnswered = question.answerContainer.find(a => a.isChecked === true)

            if (isAnswered) {
                return "question bg-success-subtle"
            }
        }
        return "question";
    }
    const handleClickQuestion = (question, index) => {
         setIndex(index);
        if (refDiv.current) {
            refDiv.current.forEach(item => {
                if (item && item.className === "question clicked") {
                    item.className = "question"
                }
            })
        }
        if (question && question.answerContainer.length > 0) {
            let isAnswered = question.answerContainer.find(a => a.isChecked === true)
            if (isAnswered) {
                return ;
            }
        }
       
        refDiv.current[index].className = "question clicked"
        
    }
    return (
        <>
            <div className="timer-container">
                <div className="timer">
                    {
                        dataQuiz && dataQuiz.length>0 
                        ? 
                        <CountDownTimer onTimeUp={onTimeUp} check={check}/>
                        :
                        <span>00:00</span>
                    }
                    
                    </div>
            </div>
            <div className="questions-container">
                {dataQuiz && dataQuiz.length > 0 ?
                    dataQuiz.map((item, index) => {
                        return (
                            <div
                                key={`Question-${index + 1}`}
                                className={getClassQuestion(index, item)}
                                onClick={() => handleClickQuestion(item, index)}
                                ref={element => refDiv.current[index] = element}>
                                {index + 1}
                            </div>
                        )
                    })
                    :
                    <span className="text-danger fs-3 fw-medium">{t('usersPage.noti')}</span>
                }



            </div>
        </>
    )
}
export default RightContent