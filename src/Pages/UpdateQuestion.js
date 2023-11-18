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

function addAnswer(q){
    return fetch(process.env.REACT_APP_LOCAL_URL+"/add_answer",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(q)
    })
}

function delAnswer(id){
    return fetch(process.env.REACT_APP_LOCAL_URL+"/del_answer",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(id)
    })
}

function toggleAdd(){
    const el = document.getElementById("addq")
    el.hidden=!el.hidden
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
                        return res
                    })
                    .then((res)=>{
                        setAnswers(res)
                    })
            })
    },[])

    return(
        <div>
            <AddAnswer setQ={setAnswers}/>
            <div>{question.id+" "+question.question+" "+question.type}</div>
            <div onClick={toggleAdd}>Add answer</div>
            <div>
                {answers.map(answer=>(
                    <AnswerMin key={answer.id} answer={answer} setQ={setAnswers}/>
                ))}
            </div>
        </div>
    )
}

function AnswerMin({setQ,answer}){
    const del=(e)=>{
        e.preventDefault()
        delAnswer(answer.id)
            .then(()=>{
                getAnswersByQuestion(answer.questionId)
                    .then(res => res.json())
                    .then((res)=>{
                        setQ(res)
                    })
            })
    }
    return(
        <div>
            <div key={answer.id}> {answer.id+ "  " +answer.answer+ "  " +answer.correct}</div>
            <div onClick={del}>delete</div>
        </div>
    )
}

function AddAnswer({setQ}) {
    let st={
        position:"fixed",
        width: "50%",
        height: "50%",
        left:"25%",
        top:"25%",
        background: "#0077ff",
    }
    let params = useParams();
    const[answer,setAnswer]=useState('')
    const[correct,setCorrect]=useState(false)
    const handleClick=(e)=>{
        e.preventDefault()
        const q= {answer:answer,
            correct:correct,
            questionId:params.id
        }
        addAnswer(q)
            .then(()=>{
                getAnswersByQuestion(params.id)
                    .then(res => res.json())
                    .then((res)=>{
                        setQ(res)
                        toggleAdd()
                        setAnswer("")
                        setCorrect(false)
                    })
            })
    }
    return(
        <div id="addq" style={st} hidden>
            <div onClick={toggleAdd}>X</div>
            <form noValidate autoComplete="off">
                <input id="question"
                       value={answer}
                       onChange={(e)=>setAnswer(e.target.value)}
                />
                <input checked={correct}  onChange={(e)=>{setCorrect(e.target.checked)}} type="checkbox" id="correct" name="correct" />
                <label htmlFor="correct">correct??</label>
                <button color="secondary" onClick={handleClick}>
                    Submit
                </button>
            </form>
        </div>
    )
}
