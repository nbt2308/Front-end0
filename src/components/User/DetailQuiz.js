import { useEffect } from "react";
import { useParams } from "react-router";
import { getDataQuiz } from "../../services/apiService";
import _ from "lodash";
const DetailQuiz = () => {
    const params = useParams();
    const quizID = params.id;
    useEffect(() => {
        fetchQuestions();
    },[quizID])

    //handle raw data
    const fetchQuestions = async () => {
        let res = await getDataQuiz(quizID);
        console.log('check question:',res);
        if(res && res.EC===0){
            let raw = res.DT;
            let data=_.chain(raw)
            .groupBy('id')
            .map((item, index) =>{ 
                let answerContainer=[]
                let questionDescription, image=null;
                item.forEach((temp,index)=>{
                    if(index===0){
                        questionDescription=temp.description
                        image=temp.image
                    }
                    answerContainer.push(temp.answers)
                }) 
                return {
                    questionid:index, answerContainer,questionDescription,image
                 };
             }).value();
             
             
        }
        
    }
    return (
        <div>
            detail quiz
        </div>
    )
}
export default DetailQuiz;