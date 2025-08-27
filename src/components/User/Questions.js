import _ from "lodash"
import "yet-another-react-lightbox/styles.css";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/plugins/captions.css";
import { useState } from "react";
const Questions = (props) => {
    const { data, questionIndex, handleDataCheckbox } = props;
    const [open, setOpen] = useState(false);
    if (_.isEmpty(data)) {
        return (<></>)
    }

    const handleCheckbox = (event, answerID, questionID) => {

        handleDataCheckbox(answerID, questionID);

    }
   
    const handlePreviewImage = () => {
        
        setOpen(true)
    }
    return (
        <>
            {
                data.image ?
                    <div className="question-image">
                        <img
                            src={`data:image/jpeg;base64,${data.image}`}
                            alt="QuestionImage"
                            onClick={() => handlePreviewImage()} />
                        <Lightbox
                            open={open}
                            close={() => setOpen(false)}
                            plugins={[ Zoom]}
                            zoom={{ scrollToZoom: true }}
                            slides={data.image?[
                                {
                                    src: `data:image/jpeg;base64,${data.image}`,
                                    title: "Preview image",
                                },
                            ]: []}
                            render={{
                                buttonPrev: () => null, // ẩn nút Prev
                                buttonNext: () => null, // ẩn nút Next
                            }}
                        />
                    </div>
                    :
                    <div className="question-image">

                    </div>
            }

            <div className="question-content">
                <span>Question {questionIndex + 1}: {data.questionDescription}</span>
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
                                        onChange={(event) => { handleCheckbox(event, answer.id, data.questionid) }}
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