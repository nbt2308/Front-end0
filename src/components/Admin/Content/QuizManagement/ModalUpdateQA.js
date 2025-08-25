import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';
import { FaPlusCircle, FaFolderPlus, FaMinusCircle } from "react-icons/fa";
import Select from 'react-select';
import _ from 'lodash';
import { getAllQuizForAdmin, postCreateNewQuestion, postCreateNewAnswer, getQuizWithQA } from '../../../../services/apiService';
import "yet-another-react-lightbox/styles.css";
import Lightbox from "yet-another-react-lightbox";
import Captions from "yet-another-react-lightbox/plugins/captions";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/plugins/captions.css";
const ModalUpdateQA = (props) => {
    const { show, setShow } = props

    const handleClose = () => setShow(false);
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
                    label: `${item.id}-${item.description}`
                }
            })
            setListQuiz(newQuiz);
        }
    }

    const fetchQuizWithQA = async () => {
        let res = await getQuizWithQA(selectedOption.value)
        if (res && res.EC === 0) {
            //add state isValidQuestion and isValidAnswer to state questions
            let data = res.DT.qa.map(q => {
                return {
                    ...q,
                    isValidQuestion: true, // mặc định valid
                    answers: q.answers.map(a => ({
                        ...a,
                        isValidAnswer: true  // mặc định valid
                    }))
                }
            })

            //convert base64 string to file object
            let newQA = [];
            for (let i = 0; i < data.length; i++) {
                let q = data[i];
                if (q.imageFile) {
                    q.imageName=`Question-${q.id}.jpg`
                    q.imageFile = await urltoFile(`data:image/jpg;base64,${q.imageFile}`, `Question-${q.id}.jpg`, 'image/jpg')
                }
                newQA.push(q);
            }
            setQuestions(newQA);
            console.log('check new',newQA);
            

        }
    }

    //convert BASE64 string to file object fuction
    const urltoFile=(url, filename, mimeType)=> {
        if (url.startsWith('data:')) {
            var arr = url.split(','),
                mime = arr[0].match(/:(.*?);/)[1],
                bstr = atob(arr[arr.length - 1]),
                n = bstr.length,
                u8arr = new Uint8Array(n);
            while (n--) {
                u8arr[n] = bstr.charCodeAt(n);
            }
            var file = new File([u8arr], filename, { type: mime || mimeType });
            return Promise.resolve(file);
        }
        return fetch(url)
            .then(res => res.arrayBuffer())
            .then(buf => new File([buf], filename, { type: mimeType }));
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
            toast.success("Upload image success. Click image's name to preview");
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

    const handleSubmitQuestions = async () => {
        //---validate data---
        //validate select quiz
        if (_.isEmpty(selectedOption)) {
            setIsValidSelected(false)
            return;
        }
        else {
            setIsValidSelected(true)
        }


        //validate questions
        let updatedQuestions = _.cloneDeep(questions);
        let isValidQuestion_flag = true;
        for (let i = 0; i < updatedQuestions.length; i++) {
            if (!updatedQuestions[i].description) {
                isValidQuestion_flag = false;
                updatedQuestions[i].isValidQuestion = false;
                break;
            } else {
                updatedQuestions[i].isValidQuestion = true;
            }

        }
        if (isValidQuestion_flag === false) {
            setQuestions(updatedQuestions);
            return;
        }

        //validate answers
        let isValidAnswer_flag = true;
        for (let i = 0; i < updatedQuestions.length; i++) {
            for (let j = 0; j < updatedQuestions[i].answers.length; j++) {
                if (!updatedQuestions[i].answers[j].description) {
                    isValidAnswer_flag = false;
                    updatedQuestions[i].answers[j].isValidAnswer = false
                    break;
                }
                else {
                    updatedQuestions[i].answers[j].isValidAnswer = true
                }
            }
            if (isValidAnswer_flag === false)
                break;
        }

        if (isValidAnswer_flag === false) {
            setQuestions(updatedQuestions)
            return;
        }


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
        toast.success(`Create questions and answers succeed`)
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
    return (

        <Modal show={show} onHide={handleClose} size="xl" backdrop="static" className='modal-updateQA' >
            <Modal.Header closeButton>
                <Modal.Title>Update Questions and Answers</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="questions-content">
                    <div className='mt-4 ms-4'>
                        <div className="questions-select col-6 form-group" >
                            <label >Select quiz</label>
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
                                styles={{
                                    menuPortal: base => ({ ...base, zIndex: 9999 })
                                }}
                            />
                            <div className="invalid-feedback">Please select a quiz</div>
                        </div>
                        <div className='mt-3'>Add questions</div>
                        {
                            questions && questions.length > 0 &&
                            questions.map((question, index_question) => {
                                return (
                                    <div key={question.id} className='q-main mb-4'>
                                        <div className="questions ">
                                            <div className="form-floating mt-1 col-6">
                                                <input
                                                    type="text"
                                                    className={`form-control ${!question.isValidQuestion ? "is-invalid" : ""}`}
                                                    placeholder="name@example.com"
                                                    value={question.description}
                                                    onChange={(event) => handleOnChangeQuestionDescription('QUESTION', question.id, event.target.value)}
                                                />
                                                <div className="invalid-feedback">Question cannot be empty</div>
                                                <label >Question {index_question + 1}'s description</label>
                                            </div>
                                            <div className='col-2 uploadFile-container' >
                                                <label className='label-uploadFile' htmlFor={`${question.id}`}><FaFolderPlus />Upload image</label>
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
                                                            "0 file is uploaded"}
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
                                                        <div className="form-floating mt-1 ">
                                                            <input
                                                                type="text"
                                                                className={`form-control ${!answer.isValidAnswer ? "is-invalid" : ""}`}
                                                                placeholder="name@example.com"
                                                                value={answer.description}
                                                                onChange={(event) => handleAnswerQuestion('INPUT_ANSWER', question.id, answer.id, event.target.value)}
                                                            />
                                                            <div className="invalid-feedback">Answer cannot be empty</div>
                                                            <label >Answer {index_answer + 1}</label>
                                                        </div>
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
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleClose}>
                    Save Changes
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