import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';
import { FaPlusCircle, FaFolderPlus, FaMinusCircle } from "react-icons/fa";
import Select from 'react-select';
import _, { intersection } from 'lodash';
import { getAllQuizForAdmin, getQuizWithQA, postUploadFile, postUpsertQA } from '../../../../services/apiService';
import "yet-another-react-lightbox/styles.css";
import Lightbox from "yet-another-react-lightbox";
import Captions from "yet-another-react-lightbox/plugins/captions";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/plugins/captions.css";
import { useTranslation } from 'react-i18next';
import { API_URL } from '../../../../views/App';
const ModalUpdateQA = (props) => {
    const { show, setShow, darkMode } = props
    const { t } = useTranslation();
    const handleClose = () => {
        setShow(false);
        setQuestions(initQuestions);
        setSelectedOption(null);
    }
    const [initQuestions, setInitQuestions] = useState([
        {
            id: uuidv4(),
            description: '',
            image: '',
            imageFile: '',
            isValidQuestion: true,
            answers: [{
                id: uuidv4(),
                description: '',
                correctAnswer: false,
                isValidAnswer: true
            }]
        }
    ])
    const [selectedOption, setSelectedOption] = useState(null);
    const [isValidSelected, setIsValidSelected] = useState(true);
    const [open, setOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState({
        src: '',
        title: ''
    })
    const [listQuiz, setListQuiz] = useState("");
    const [questions, setQuestions] = useState(initQuestions)

    useEffect(() => {
        fetchListQuiz();
    }, [])

    useEffect(() => {
        if (selectedOption && selectedOption.value) {
            fetchQuizWithQA();
        }

    }, [selectedOption])
    const fetchListQuiz = async () => {
        let res = await getAllQuizForAdmin();
        if (res && res.EC === 0) {
            let newQuiz = res.DT.map(item => {
                return {
                    value: item.id,
                    label: `${item.id}-${item.name}`
                }
            })
            setListQuiz(newQuiz);
        }
    }

    const fetchQuizWithQA = async () => {
        let res = await getQuizWithQA(+selectedOption.value);
        if (res && res.EC === 0) {
            //add state isValidQuestion and isValidAnswer to state questions
            let data = res.DT.QuizQuestions.map(q => {
                return {
                    ...q,
                    isValidQuestion: true, // mặc định valid
                    answers: q.QuizAnswers.map(a => ({
                        ...a,
                        isValidAnswer: true  // mặc định valid
                    }))
                }
            })
            setQuestions(data);


        }
    }

    //convert file to base64 fuction
    const toBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }
    const handleAddnRemoveQuestions = (type, id) => {
        if (type === 'ADD') {
            const newQuestions = {
                id: uuidv4(),
                description: '',
                imageFile: '',
                isValidQuestion: true,
                answers: [{
                    id: uuidv4(),
                    description: '',
                    correctAnswer: false,
                    isValidAnswer: true
                }]
            }
            setQuestions([...questions, newQuestions]);
        }

        if (type === 'REMOVE') {
            let questionClone = _.cloneDeep(questions);
            questionClone = questionClone.filter(item => item.id !== id);
            setQuestions(questionClone)
        }
    }
    const handleAddnRemoveAnswers = (type, questionId, answerId) => {
        let questionsClone = _.cloneDeep(questions);
        if (type === 'ADD') {
            const newAnswer = {
                id: uuidv4(),
                description: '',
                correctAnswer: false,
                isValidAnswer: true
            }
            let index = questionsClone.findIndex(item => item.id === questionId);
            questionsClone[index].answers.push(newAnswer)
            setQuestions(questionsClone)
        }



        if (type === 'REMOVE') {
            let index = questionsClone.findIndex(item => item.id === questionId);
            questionsClone[index].answers = questionsClone[index].answers.filter(item => item.id !== answerId)
            setQuestions(questionsClone)
        }

    }

    const handleOnChangeQuestionDescription = (type, questionId, value) => {
        if (type === 'QUESTION') {
            let questionsClone = _.cloneDeep(questions);
            let index = questionsClone.findIndex(item => item.id === questionId);
            if (index > -1) {
                questionsClone[index].description = value;
                questionsClone[index].isValidQuestion = true;
                setQuestions(questionsClone);
            }
        }
    }

    const handleOnchangeImageFile = async (questionId, event) => {
        let questionsClone = _.cloneDeep(questions);
        let index = questionsClone.findIndex(item => item.id === questionId);
        if (index > -1 && event.target && event.target.files && event.target.files[0]) {
            let file = event.target.files[0];
            let base64 = await toBase64(file);
            questionsClone[index].imageFile = base64;
            questionsClone[index].image = '/uploads/' + event.target.files[0].name;
            setQuestions(questionsClone);
            toast.success(`${t('adminPage.quizzesManagement.modalUpsertQA.previewImage')}`);
        }
    }

    const handleAnswerQuestion = (type, questionId, answerId, value) => {
        let questionsClone = _.cloneDeep(questions);
        let index = questionsClone.findIndex(item => item.id === questionId);

        if (index > -1) {
            questionsClone[index].answers = questionsClone[index].answers.map(item => {
                if (item.id === answerId) {
                    if (type === 'CHECKBOX') {
                        item.correctAnswer = value;
                    }
                    if (type === 'INPUT_ANSWER') {
                        item.description = value;
                        item.isValidAnswer = true;
                    }
                }
                return item;
            })

            setQuestions(questionsClone);
        }
    }
    const handleValidate = () => {
        //validate select quiz
        if (_.isEmpty(questions)) {
            toast.error(`${t('adminPage.quizzesManagement.modalUpsertQA.emptyQA')}`);
            return;
        }
        if (_.isEmpty(selectedOption)) {
            setIsValidSelected(false)
            return;
        }
        else {
            setIsValidSelected(true)
        }
        // validate questions
        let updatedQuestions = _.cloneDeep(questions);
        let isValid = true;
        for (let i = 0; i < updatedQuestions.length; i++) {
            if (!updatedQuestions[i].description) {

                updatedQuestions[i].isValidQuestion = false;
                isValid = false;
            } else {
                updatedQuestions[i].isValidQuestion = true;
            }
            if (!updatedQuestions[i].image) {
                toast.error(`${t('adminPage.quizzesManagement.modalUpsertQA.emptyFile')}`)
                isValid = false;
            }

        }


        //validate answers
        let hasCorrectAnswer = false;
        for (let i = 0; i < updatedQuestions.length; i++) {
            for (let j = 0; j < updatedQuestions[i].answers.length; j++) {
                if (!updatedQuestions[i].answers[j].description) {

                    updatedQuestions[i].answers[j].isValidAnswer = false
                    isValid = false

                }
                else {
                    updatedQuestions[i].answers[j].isValidAnswer = true
                }
                if (updatedQuestions[i].answers[j].correctAnswer === true) {
                    hasCorrectAnswer = true;
                }
            }

        }
        if (!hasCorrectAnswer) {
            toast.error(`${t("adminPage.questionsManagement.correctAnswerError")}`)
            isValid = false;
        }
        setQuestions(updatedQuestions)
        return isValid;
    };
    const handleSubmitQuestions = async () => {
        //---validate data---
        console.log(questions);
        if (!handleValidate()) return;
        
        return;
        let res = await postUpsertQA({
            quizId: selectedOption.value,
            questions: questions
        })


        if (res && res.EC === 0) {
            toast.success(`${t('adminPage.quizzesManagement.modalUpsertQA.upsertQASucceed')}`);
            handleClose();
        }
        if (res && res.EC !== 0) {
            toast.error(res.EM)
        }
    }
    const handlePreviewImage = (questionId) => {
        let questionsClone = _.cloneDeep(questions);
        let index = questionsClone.findIndex(item => item.id === questionId);
        if (index > -1) {
            setOpen(true)
            if (questionsClone[index].imageFile) {
                setPreviewImage({
                    src: URL.createObjectURL(questionsClone[index].imageFile),
                    title: questionsClone[index].image.split('/').pop()
                })
            } else {
                setPreviewImage({
                    src: `${API_URL}${questionsClone[index].image}`,
                    title: questionsClone[index].image.split('/').pop()
                })
            }

        }

    }
    const checkQuestionEmpty = () => {
        if (_.isEmpty(questions)) {
            return true;
        }
        return false;

    }
    //custom style select
    const getCustomStyles = (darkMode) => ({
        menuPortal: base => ({ ...base, zIndex: 9999 }),
        control: (base) => ({
            ...base,
            backgroundColor: darkMode ? "#0d305a" : "#fff",
            color: darkMode ? "#fff" : "#000",
            borderColor: darkMode ? "#ffffffff" : "#ccc",
            boxShadow: "none",
            ":hover": {
                borderColor: darkMode ? "#63a4ff" : "#888",
            },
        }),
        menu: (base) => ({
            ...base,
            backgroundColor: darkMode ? "#0d305a" : "#fff",
            color: darkMode ? "#fff" : "#000",
        }),
        option: (base, state) => ({
            ...base,
            backgroundColor: state.isSelected
                ? (darkMode ? "#104e8b" : "#e6f0ff")
                : state.isFocused
                    ? (darkMode ? "#1e90ff" : "#f0f8ff")
                    : (darkMode ? "#0d305a" : "#fff"),
            color: darkMode ? "#fff" : "#000",
            cursor: "pointer",
        }),
        singleValue: (base) => ({
            ...base,
            color: darkMode ? "#fff" : "#000",
        }),
        placeholder: (base) => ({
            ...base,
            color: darkMode ? "#bbb" : "#666",
        }),
    });
    return (

        <Modal show={show} onHide={handleClose} size="xl" backdrop="static" className='modal-updateQA' >
            <Modal.Header closeButton className={darkMode ? "light" : "dark"} closeVariant={darkMode ? "black" : "white"}>
                <Modal.Title>{t('adminPage.quizzesManagement.modalUpsertQA.title')}</Modal.Title>
            </Modal.Header>
            <Modal.Body className={darkMode ? "modal-body light" : "modal-body dark"}>
                <div className="questions-content">
                    <div className='mt-4 ms-4'>
                        <div className="questions-select col-6 form-group" >
                            <label >{t('adminPage.quizzesManagement.modalUpsertQA.selectQuiz')}</label>
                            <Select
                                styles={getCustomStyles(!darkMode)}
                                className={`${isValidSelected ? "" : "is-invalid"} `}
                                classNamePrefix="react-select"
                                defaultValue={selectedOption}
                                onChange={(option) => {
                                    setSelectedOption(option)
                                    setIsValidSelected(true)
                                }}
                                options={listQuiz}
                                menuPortalTarget={document.body}
                                required

                            />
                            <div className="invalid-feedback">{t('adminPage.quizzesManagement.modalUpsertQA.invalidSelect')}</div>
                        </div>

                        {
                            questions && questions.length > 0 ?
                                questions.map((question, index_question) => {
                                    return (

                                        <div key={question.id} className='q-main mb-4'>
                                            <div className='mt-3'>{t('adminPage.quizzesManagement.modalUpsertQA.addQuestions')}</div>
                                            <div className="questions ">
                                                <FloatingLabel
                                                    label={`${t('adminPage.quizzesManagement.modalUpsertQA.q')} ${index_question + 1}${t('adminPage.quizzesManagement.modalUpsertQA.s')} `}
                                                    className={darkMode ? "floating-light mb-3 col-6" : "floating-dark mb-3 col-6"}
                                                >
                                                    <Form.Control
                                                        className={darkMode ? "form-control light" : "form-control dark-card"}
                                                        placeholder="Name"
                                                        value={question.description}
                                                        onChange={(event) => handleOnChangeQuestionDescription('QUESTION', question.id, event.target.value)}
                                                        isInvalid={!question.isValidQuestion}
                                                        required />
                                                    <Form.Control.Feedback type="invalid">
                                                        {t('adminPage.quizzesManagement.modalUpsertQA.invalidQuestion')}
                                                    </Form.Control.Feedback>
                                                </FloatingLabel>
                                                <div className='col-2 uploadFile-container' >
                                                    <label className='label-uploadFile' htmlFor={`${question.id} `}><FaFolderPlus />{t('adminPage.quizzesManagement.modalUpsertQA.uploadImage')}</label>
                                                    <input
                                                        type="file"
                                                        id={`${question.id} `}
                                                        hidden
                                                        accept="image/*"
                                                        onChange={(event) => handleOnchangeImageFile(question.id, event)} />

                                                    <div className='file-name'>
                                                        <span>
                                                            {question.image ?
                                                                <span onClick={() => handlePreviewImage(question.id)}>
                                                                    {question.image.split('/').pop()}
                                                                </span>
                                                                :
                                                                `${t('adminPage.quizzesManagement.modalUpsertQA.emptyFile')} `}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="action-btn">
                                                    <button className='btn-plus btn' onClick={() => { handleAddnRemoveQuestions("ADD", '') }}><FaPlusCircle /></button>
                                                    {
                                                        questions.length > 1
                                                        &&
                                                        <button className='btn-minus btn' onClick={() => { handleAddnRemoveQuestions("REMOVE", question.id) }}><FaMinusCircle /></button>
                                                    }

                                                </div>
                                            </div>
                                            {
                                                question.answers && question.answers.length > 0 &&
                                                question.answers.map((answer, index_answer) => {
                                                    return (
                                                        <div key={answer.id} className="answers-content mt-3">

                                                            <input
                                                                className="form-check-input"
                                                                type="checkbox"
                                                                checked={answer.correctAnswer}
                                                                onChange={(event) => handleAnswerQuestion('CHECKBOX', question.id, answer.id, event.target.checked)}
                                                            />
                                                            <FloatingLabel
                                                                label={`${t('adminPage.quizzesManagement.modalUpsertQA.a')} ${index_answer + 1}${t('adminPage.quizzesManagement.modalUpsertQA.s1')} `}
                                                                className={darkMode ? "floating-light mb-3 col-6" : "floating-dark mb-3 col-6"}
                                                            >
                                                                <Form.Control
                                                                    className={darkMode ? "form-control light" : "form-control dark-card"}
                                                                    placeholder="Name"
                                                                    value={answer.description}
                                                                    onChange={(event) => handleAnswerQuestion('INPUT_ANSWER', question.id, answer.id, event.target.value)}
                                                                    isInvalid={!answer.isValidAnswer}
                                                                    required />
                                                                <Form.Control.Feedback type="invalid">
                                                                    {t('adminPage.quizzesManagement.modalUpsertQA.invalidAnswer')}
                                                                </Form.Control.Feedback>
                                                            </FloatingLabel>
                                                            <div className="action-btn">
                                                                <button className='btn-plus btn' onClick={() => { handleAddnRemoveAnswers("ADD", question.id) }}><FaPlusCircle /></button>
                                                                {
                                                                    question.answers.length > 1 &&
                                                                    <button className='btn-minus btn' onClick={() => { handleAddnRemoveAnswers("REMOVE", question.id, answer.id) }}><FaMinusCircle /></button>
                                                                }

                                                            </div>

                                                        </div>
                                                    )
                                                })
                                            }

                                        </div>
                                    )
                                })
                                :
                                <p className='noti-emptyQA'>{t('adminPage.quizzesManagement.modalUpsertQA.emptyQA1')}</p>

                        }
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer className={darkMode ? "modal-footer light" : "modal-footer dark"}>
                <Button variant="secondary" onClick={handleClose}>
                    {t('adminPage.usersManagement.modalAddUsers.buttonCancel')}
                </Button>
                <Button
                    variant="primary"
                    onClick={() => handleSubmitQuestions()}
                    disabled={checkQuestionEmpty()}>
                    {t('adminPage.usersManagement.modalAddUsers.buttonSave')}
                </Button>
            </Modal.Footer>
            <Lightbox
                open={open}
                close={() => setOpen(false)}
                plugins={[Captions, Zoom]}
                zoom={{ scrollToZoom: true }}
                slides={previewImage ? [previewImage] : []}
                render={{
                    buttonPrev: () => null, // ẩn nút Prev
                    buttonNext: () => null, // ẩn nút Next
                }}
            />
        </Modal>

    )
}
export default ModalUpdateQA