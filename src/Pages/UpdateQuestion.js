import {useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";


function getQuestionById(id){
    return fetch(process.env.REACT_APP_LOCAL_URL+"/question_by_id",{
        method: "POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(id)
    })
        .then((res)=>{
            if(res.ok){
                return res
            }
        })
}

function getAnswersByQuestion(id){
    return fetch(process.env.REACT_APP_LOCAL_URL+"/answers_by_question",{
        method: "POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(id)
    })
        .then((res)=>{
            if(res.ok){
                return res
            }
        })
}
export function UpdateQuestion() {
    let params = useParams();
    const[question, setQuestion]=useState({})
    const[answers, setAnswers]=useState([])

    useEffect(()=>{
        getQuestionById(params.id)
            .then(res=>res.json())
            .then((res)=>{
                setQuestion(res)
                return res;
            })
            .then((res)=>{
                getAnswersByQuestion(res.id)
                    .then(res=>res.json())
                    .then((res)=>{
                        setAnswers(res)
                    })
            })
    },[])

    return(
        <div>
            <div>{question.question}</div>
            <div>
                {answers.map(answer=>(
                    <div key={answer.id}/>
                ))}
            </div>
        </div>
    )
}