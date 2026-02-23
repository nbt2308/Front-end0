import { getQuizByUser } from "../../services/apiService"
import { useEffect, useState } from "react"
import { useNavigate, useOutletContext } from "react-router-dom";
import './ListQuiz.scss';
import { useTranslation } from 'react-i18next';
import { API_URL } from "../../views/App";
const ListQuiz = () => {
    const { themeState } = useOutletContext();
    const [arrQuiz, setArrQuiz] = useState([])
    const Navigate = useNavigate();
    const { t } = useTranslation();
    useEffect(() => {
        getQuizData()
    }, [])

    const getQuizData = async () => {
        const data = await getQuizByUser();
        if (data && data.EC === 0) {
            setArrQuiz(data.DT);
        }
    }
   
    
    return (
        <div className="list-quiz-container container mb-4">
            {
                arrQuiz && arrQuiz.length > 0 &&
                arrQuiz.map((item, index) => {
                    return (
                        <div key={`${index}-quiz`} className="row">
                            <div  className={themeState?"card light":"card theme-card-dark"} >
                                <div className="image-preview">
                                    <img className="card-img-top" src={`${API_URL}${item.image}`} alt="Card-image-cap" />
                                </div>
                                <div className="card-body">
                                    <h5 className="card-title">Quiz {+`${index}` + 1}</h5>
                                    <p className="card-text">{`${item.description}`}</p>
                                    <button className="btn btn-primary" onClick={() => { Navigate(`/quiz/${item.id}`, { state: { title: item.description } }) }}>{t('usersPage.buttonStart')}</button>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
            {
                arrQuiz && arrQuiz.length === 0 &&
                <div className="container mt-3 alert alert-danger">
                    {t('usersPage.emptyQuiz')}
                </div>
            }


        </div>
    )
}
export default ListQuiz