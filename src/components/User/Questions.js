import _ from "lodash"
import "yet-another-react-lightbox/styles.css";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/plugins/captions.css";
import { useState } from "react";
import { useTranslation } from 'react-i18next';
import { FaCheck } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { API_URL } from "../../views/App";
const Questions = (props) => {
    const { data, questionIndex, handleDataCheckbox,check } = props;
    const [open, setOpen] = useState(false);
    const { t } = useTranslation();
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
                            src={`${API_URL}${data.image}`}
                            alt="QuestionImage"
                            onClick={() => handlePreviewImage()} />
                        <Lightbox
                            open={open}
                            close={() => setOpen(false)}
                            plugins={[ Zoom]}
                            zoom={{ scrollToZoom: true }}
                            slides={data.image?[
                                {
                                    src: `${API_URL}${data.image}`,
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
                <span>{t('usersPage.question')} {questionIndex + 1}: {data.description}</span>
            </div>
            <div className="answer">
                {data.QuizAnswers && data.QuizAnswers.length &&
                    data.QuizAnswers.map((answer, index) => {
                        return (
                            <div key={`answer-${index}`} className="a-child">
                                <div class="form-check" >
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        checked={answer.isChecked}
                                        disabled={check.isShowAnswer}
                                        onChange={(event) => { handleCheckbox(event, answer.id, data.id) }}
                                    />
                                    <label className="form-check-label" >
                                        {answer.description}
                                    </label>
                                    {
                                        check.isShowAnswer===true&&
                                        <>
                                        {
                                            answer.isCorrect===true&& <FaCheck className="correct"/>
                                        }
                                        {
                                            answer.isChecked===true &&answer.isCorrect===false&& <IoClose className="incorrect"/>

                                        }
                                        </>
                                    }
                                </div>

                            </div>
                        )
                    })}
            </div>
        </>
    )
}
export default Questions