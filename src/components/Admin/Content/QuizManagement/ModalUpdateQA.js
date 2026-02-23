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
    const { show, setShow, themeState } = props
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
            if (!updatedQuestions[i].description || updatedQuestions[i].description.trim()==="") {

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
                if (!updatedQuestions[i].answers[j].description || updatedQuestions[i].answers[j].description.trim()==="") {

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
        if (!handleValidate()) return;

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
    const getCustomStyles = (themeState) => ({
        menuPortal: base => ({ ...base, zIndex: 9999 }),
        control: (base) => ({
            ...base,
            backgroundColor: themeState ? "#0d305a" : "#fff",
            color: themeState ? "#fff" : "#000",
            borderColor: themeState ? "#ffffffff" : "#ccc",
            boxShadow: "none",
            ":hover": {
                borderColor: themeState ? "#63a4ff" : "#888",
            },
        }),
        menu: (base) => ({
            ...base,
            backgroundColor: themeState ? "#0d305a" : "#fff",
            color: themeState ? "#fff" : "#000",
        }),
        option: (base, state) => ({
            ...base,
            backgroundColor: state.isSelected
                ? (themeState ? "#104e8b" : "#e6f0ff")
                : state.isFocused
                    ? (themeState ? "#1e90ff" : "#f0f8ff")
                    : (themeState ? "#0d305a" : "#fff"),
            color: themeState ? "#fff" : "#000",
            cursor: "pointer",
        }),
        singleValue: (base) => ({
            ...base,
            color: themeState ? "#fff" : "#000",
        }),
        placeholder: (base) => ({
            ...base,
            color: themeState ? "#bbb" : "#666",
        }),
    });
    return (
        <Modal
            show={show}
            onHide={handleClose}
            size="xl"
            backdrop="static"
            className='modal-upsert-qa'
        >
            <Modal.Header closeButton className={themeState ? "light" : "dark"}>
                <Modal.Title>{t('adminPage.quizzesManagement.modalUpsertQA.title')}</Modal.Title>
            </Modal.Header>
            <Modal.Body className={themeState ? "modal-body light" : "modal-body dark"}>
                <div className='container-fluid'>
                    {/* Select Quiz */}
                    <div className="row mb-4">
                        <div className="col-12 col-md-6">
                            <label className="mb-2">{t('adminPage.quizzesManagement.modalUpsertQA.selectQuiz')}</label>
                            <Select
                                styles={getCustomStyles(!themeState)}
                                className={`${isValidSelected ? "" : "is-invalid"}`}
                                classNamePrefix="react-select"
                                defaultValue={selectedOption}
                                onChange={(option) => {
                                    setSelectedOption(option);
                                    setIsValidSelected(true);
                                }}
                                options={listQuiz}
                                placeholder={t('adminPage.quizzesManagement.modalUpsertQA.selectQuiz')}
                                menuPortalTarget={document.body}
                            />
                        </div>
                    </div>

                    {/* Danh sách câu hỏi */}
                    {questions && questions.length > 0 &&
                        questions.map((question, index_question) => {
                            return (
                                <div key={question.id} className='q-main mb-5 border-bottom pb-4'>
                                    <h6 className='mb-3 text-uppercase fw-bold text-primary'>
                                        {t('adminPage.quizzesManagement.modalUpsertQA.addQuestions')} {index_question + 1}
                                    </h6>

                                    {/* Question Input & Image & Action */}
                                    <div className="row g-3 align-items-center">
                                        <div className="col-12 col-md-6">
                                            <FloatingLabel label={`${t('adminPage.quizzesManagement.modalUpsertQA.q')} ${index_question + 1}`}>
                                                <Form.Control
                                                    value={question.description}
                                                    onChange={(e) => handleOnChangeQuestionDescription('QUESTION', question.id, e.target.value)}
                                                    isInvalid={!question.isValidQuestion}
                                                    placeholder="Question description"
                                                />
                                            </FloatingLabel>
                                        </div>

                                        <div className='col-12 col-md-4 d-flex align-items-center gap-2'>
                                            <label className='badge bg-primary mb-0' htmlFor={`${question.id}`}>
                                                <FaFolderPlus /> {t('adminPage.quizzesManagement.modalUpsertQA.uploadImage')}
                                            </label>
                                            <input type="file" id={`${question.id}`} hidden accept="image/*"
                                                onChange={(e) => handleOnchangeImageFile(question.id, e)}
                                            />
                                            <div className='file-name text-truncate' style={{ maxWidth: '150px' }}>
                                                {question.imageName ?
                                                    <span className="text-primary cursor-pointer text-decoration-underline" onClick={() => handlePreviewImage(question.id)}>
                                                        {question.imageName}
                                                    </span>
                                                    : <small className="text-muted">{t('adminPage.quizzesManagement.modalUpsertQA.emptyFile')}</small>
                                                }
                                            </div>
                                        </div>

                                        <div className="col-12 col-md-2 d-flex gap-2 justify-content-md-end">
                                            <button className='btn btn-primary btn-sm' onClick={() => handleAddnRemoveQuestions("ADD")}><FaPlusCircle /></button>
                                            {questions.length > 1 &&
                                                <button className='btn btn-danger btn-sm' onClick={() => handleAddnRemoveQuestions("REMOVE", question.id)}><FaMinusCircle /></button>
                                            }
                                        </div>
                                    </div>

                                    {/* Answers Section */}
                                    <div className="ms-0 ms-md-5 mt-4">
                                        {question.answers.map((answer, index_answer) => (
                                            <div key={answer.id} className="row g-2 mb-2 align-items-center">
                                                <div className="col-auto">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        style={{ width: '25px', height: '25px' }}
                                                        checked={answer.isCorrect}
                                                        onChange={(e) => handleAnswerQuestion('CHECKBOX', question.id, answer.id, e.target.checked)}
                                                    />
                                                </div>
                                                <div className="col">
                                                    <FloatingLabel label={`${t('adminPage.quizzesManagement.modalUpsertQA.a')} ${index_answer + 1}`}>
                                                        <Form.Control
                                                            value={answer.description}
                                                            onChange={(e) => handleAnswerQuestion('INPUT_ANSWER', question.id, answer.id, e.target.value)}
                                                            isInvalid={!answer.isValidAnswer}
                                                            placeholder="Answer"
                                                        />
                                                    </FloatingLabel>
                                                </div>
                                                <div className="col-auto d-flex gap-2">
                                                    <button className='btn btn-outline-primary btn-sm' onClick={() => handleAddnRemoveAnswers("ADD", question.id)}><FaPlusCircle /></button>
                                                    {question.answers.length > 1 &&
                                                        <button className='btn btn-outline-danger btn-sm' onClick={() => handleAddnRemoveAnswers("REMOVE", question.id, answer.id)}><FaMinusCircle /></button>
                                                    }
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </Modal.Body>
            <Modal.Footer className={themeState ? "modal-footer light" : "modal-footer dark"}>
                <Button variant="secondary" onClick={handleClose}>
                    {t('adminPage.usersManagement.modalAddUsers.buttonCancel')}
                </Button>
                <Button variant="primary" onClick={() => handleSubmitQuestions()}>
                    {t('adminPage.usersManagement.modalAddUsers.buttonSave')}
                </Button>
            </Modal.Footer>

            <Lightbox
                open={open}
                close={() => setOpen(false)}
                slides={[{ src: previewImage }]}
                plugins={[Zoom]}
                render={{ buttonPrev: () => null, buttonNext: () => null }}
            />
        </Modal>
    );
}
export default ModalUpdateQA