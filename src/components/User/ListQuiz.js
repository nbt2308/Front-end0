import { getQuizByUser } from "../../services/apiService"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import './ListQuiz.scss';

const ListQuiz = () => {
    const [arrQuiz, setArrQuiz] = useState([])
    const Navigate = useNavigate();
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
        <div className="list-quiz-container container">
            {
                arrQuiz && arrQuiz.length > 0 &&
                arrQuiz.map((item, index) => {
                    

                    return (
                        <div key={`${index}-quiz`} className="card" style={{ width: "18rem" }}>
                            <img className="card-img-top" src={`data:image/jpeg;base64,${item.image}`} alt="Card-image-cap" />
                            <div className="card-body">
                                <h5 className="card-title">Quiz {+`${index}` + 1}</h5>
                                <p className="card-text">{`${item.description}`}</p>
                                <button className="btn btn-primary" onClick={() => { Navigate(`/quiz/${item.id}`,{state:{title:item.description}}) }}>Start now</button>
                            </div>
                        </div>
                    )
                })
            }
            {
                arrQuiz && arrQuiz.length === 0 &&
                <div>
                    You don't have any quiz now...
                </div>
            }


        </div>
    )
}
export default ListQuiz