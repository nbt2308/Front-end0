import _ from "lodash"
const Questions = (props) => {
    const { data, questionIndex,handleDataCheckbox } = props;
    if (_.isEmpty(data)) {
        return (<></>)
    }

    const handleCheckbox=(event, answerID,questionID)=>{
        console.log('check:',answerID,questionID);
        handleDataCheckbox(answerID,questionID);
        
    }
    return (
        <>
        {
            data.image ?
            <div className="question-image">
                <img src={`data:image/jpeg;base64,${data.image}`} alt="QuestionImage" />
            </div>
            :
            <div className="question-image">

            </div>
        }
            
            <div className="question-content">
                <span>Question {questionIndex + 1}: {data.questionDescription}?</span>
            </div>
            <div className="answer">
                {data.answerContainer && data.answerContainer.length &&
                    data.answerContainer.map((answer, index) => {
                        return (
                            <div key={`answer-${index}`} className="a-child">
                                <div class="form-check">
                                    <input 
                                    className="form-check-input" 
                                    type="checkbox" 
                                    checked={answer.isChecked} 
                                    onChange={(event)=>{handleCheckbox(event,answer.id, data.questionid)}} 
                                    />
                                    <label className="form-check-label" >
                                        {answer.description}
                                    </label>
                                </div>
                                
                            </div>
                        )
                    })}
            </div>
        </>
    )
}
export default Questions