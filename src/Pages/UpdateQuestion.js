import {useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {getQuestionById} from "../Requests/QuestionRequests";
import {addAnswer, delAnswer, getAnswersByQuestion} from "../Requests/AnswerRequests";
import {toggleAddForm} from "../Requests/Utils";

export function UpdateQuestion() {
    let params = useParams();
    const[question, setQuestion]=useState({})
    const[answers, setAnswers]=useState([])

    useEffect(()=>{
        getQuestionById(params.id)
            .then((res)=>{
                setQuestion(res)
                return res;
            })
            .then((res)=>{
                getAnswersByQuestion(res.id)
                    .then(setAnswers)
            })
    },[])

    return(
        <div>
            <AddAnswer setQ={setAnswers}/>
            <div>{question.id+" "+question.question+" "+question.type}</div>
            <div onClick={toggleAddForm}>Add answer</div>
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
                    .then(setQ)
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
                    .then((res)=>{
                        setQ(res)
                        toggleAddForm()
                        setAnswer("")
                        setCorrect(false)
                    })
            })
    }
    return(
        <div id="addForm" style={st} hidden>
            <div onClick={toggleAddForm}>X</div>
            <form noValidate autoComplete="off">
                <input id="question"
                       value={answer}
                       onChange={(e)=>setAnswer(e.target.value)}
                />
                <input checked={correct}  onChange={(e)=>{setCorrect(e.target.checked)}} type="checkbox" id="correct" name="correct" />
                <label htmlFor="correct">Correct?</label>
                <button color="secondary" onClick={handleClick}>
                    Submit
                </button>
            </form>
        </div>
    )
}
