import Select from 'react-select';
import { FaPlusCircle, FaFolderPlus, FaMinusCircle } from "react-icons/fa";
import { useState, useEffect } from 'react';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import "./ManageQuestions.scss"
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash';
import "yet-another-react-lightbox/styles.css";
import Lightbox from "yet-another-react-lightbox";
import Captions from "yet-another-react-lightbox/plugins/captions";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/plugins/captions.css";
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { getAllQuizForAdmin, postCreateNewQuestion, postCreateNewAnswer } from '../../../../services/apiService';
import { useOutletContext } from 'react-router-dom';
import Breadcrumb from '../../BreadCrump/Breadcrumb';
const ManageQuestions = (props) => {
    const { darkMode, breadCrumb, setBreadCrumb } = useOutletContext();
    const { t } = useTranslation();
    const [initQuestions, setInitQuestions] = useState([
        {
            id: uuidv4(),
            description: '',
            imageFile: '',
            imageName: '',
            isValidQuestion: true,
            answers: [{
                id: uuidv4(),
                description: '',
                isCorrect: false,
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
        setBreadCrumb("questionsManagement");
    }, [])
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

    const handleAddnRemoveQuestions = (type, id) => {
        if (type === 'ADD') {
            const newQuestions = {
                id: uuidv4(),
                description: '',
                imageFile: '',
                imageName: '',
                isValidQuestion: true,
                answers: [{
                    id: uuidv4(),
                    description: '',
                    isCorrect: false,
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
                isCorrect: false,
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

    const handleOnchangeImageFile = (questionId, event) => {
        let questionsClone = _.cloneDeep(questions);
        let index = questionsClone.findIndex(item => item.id === questionId);
        if (index > -1 && event.target && event.target.files && event.target.files[0]) {
            questionsClone[index].imageFile = event.target.files[0];
            questionsClone[index].imageName = event.target.files[0].name;
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
                        item.isCorrect = value;
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
            if(!updatedQuestions[i].imageFile){
                toast.error(`${t('adminPage.quizzesManagement.modalUpsertQA.emptyFile')}`)
                isValid = false;
            }
            
        }


        //validate answers
        for (let i = 0; i < updatedQuestions.length; i++) {
            for (let j = 0; j < updatedQuestions[i].answers.length; j++) {
                if (!updatedQuestions[i].answers[j].description) {

                    updatedQuestions[i].answers[j].isValidAnswer = false
                    isValid = false

                }
                else {
                    updatedQuestions[i].answers[j].isValidAnswer = true
                }
            }

        }

        setQuestions(updatedQuestions)
        return isValid;
    };
    const handleSubmitQuestions = async () => {
        //---validate data---
        if (!handleValidate()) return;

        //submit question/answer(but not sequence)
        // await Promise.all(questions.map(async(question)=>{
        //     const q= await postCreateNewQuestion(
        //         +selectedOption.value,
        //         question.description,
        //         question.imageFile
        //     )
        //     console.log('q',q.DT);
        //     await Promise.all(question.answers.map(async(answer)=>{
        //         await postCreateNewAnswer(
        //             answer.description, answer.isCorrect, q.DT.id
        //         )
        //     }))

        // }))

        // toast.success("Create new questions and answers success")


        //submit question/answer(sequence)
        for (const question of questions) {
            const q = await postCreateNewQuestion(
                +selectedOption.value,
                question.description,
                question.imageFile
            )
            for (const answer of question.answers) {
                await postCreateNewAnswer(
                    answer.description, answer.isCorrect, q.DT.id
                )
            }
        }
        toast.success(`${t("adminPage.questionsManagement.createSucceed")}`)
        setQuestions(initQuestions);
        setIsValidSelected(true);


    }
    const handlePreviewImage = (questionId) => {
        let questionsClone = _.cloneDeep(questions);
        let index = questionsClone.findIndex(item => item.id === questionId);
        if (index > -1) {
            setOpen(true)
            setPreviewImage({
                src: URL.createObjectURL(questionsClone[index].imageFile),
                title: questionsClone[index].imageName
            })
        }

    }
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
        <div className={darkMode ? "manageQuestions-container light" : "manageQuestions-container dark"}>

            {/* Breadcrumb */}
            <Breadcrumb
                breadCrumb={breadCrumb}
                darkMode={darkMode}
            />

            <div className={darkMode ? "questions-content light-card" : "questions-content dark-card"}>
                <div className='mt-4 ms-4'>
                    <div className="questions-select col-6 form-group" >
                        <label >{t('adminPage.quizzesManagement.modalUpsertQA.selectQuiz')}</label>
                        <Select
                            className={`${isValidSelected ? "" : "is-invalid"}`}
                            classNamePrefix="react-select"
                            defaultValue={selectedOption}
                            onChange={(option) => {
                                setSelectedOption(option)
                                setIsValidSelected(true)
                            }}
                            options={listQuiz}
                            menuPortalTarget={document.body}
                            required
                            styles={getCustomStyles(!darkMode)}
                        />
                        <div className="invalid-feedback">{t('adminPage.quizzesManagement.modalUpsertQA.invalidSelect')}</div>
                    </div>
                    {
                        questions && questions.length > 0 &&
                        questions.map((question, index_question) => {
                            return (
                                <div key={question.id} className='q-main mb-4'>
                                    <div className='mt-3'>{t('adminPage.quizzesManagement.modalUpsertQA.addQuestions')}</div>

                                    <div className="questions ">
                                        <FloatingLabel
                                            label={`${t('adminPage.quizzesManagement.modalUpsertQA.q')} ${index_question + 1}${t('adminPage.quizzesManagement.modalUpsertQA.s')}`}
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
                                            <label className='label-uploadFile' htmlFor={`${question.id}`}><FaFolderPlus />{t('adminPage.quizzesManagement.modalUpsertQA.uploadImage')}</label>
                                            <input
                                                type="file"
                                                id={`${question.id}`}
                                                hidden
                                                accept="image/*"
                                                onChange={(event) => handleOnchangeImageFile(question.id, event)} />

                                            <div className='file-name'>
                                                <span>
                                                    {question.imageName ?
                                                        <span onClick={() => handlePreviewImage(question.id)}>
                                                            {question.imageName}
                                                        </span>
                                                        :
                                                        `${t('adminPage.quizzesManagement.modalUpsertQA.emptyFile')}`}
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
                                                        checked={answer.isCorrect}
                                                        onChange={(event) => handleAnswerQuestion('CHECKBOX', question.id, answer.id, event.target.checked)}
                                                    />
                                                    <FloatingLabel
                                                        label={`${t('adminPage.quizzesManagement.modalUpsertQA.a')} ${index_answer + 1}${t('adminPage.quizzesManagement.modalUpsertQA.s1')}`}
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

                    }
                    {
                        questions && questions.length > 0 &&
                        <div>
                            <button
                                className='btn btn-primary mb-4 btn-save-questions'
                                onClick={() => handleSubmitQuestions()}
                            > {t('adminPage.questionsManagement.save')}</button>
                        </div>
                    }

                </div>
            </div>
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
        </div>
    )
}
export default ManageQuestions