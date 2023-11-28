import {useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {getQuestionById} from "../Requests/QuestionRequests";
import {addAnswer, delAnswer, getAnswersByQuestion} from "../Requests/AnswerRequests";
import {toggleAddForm} from "../Utils/Utils";

export function UpdateQuestion() {
    let params = useParams();
    const[question, setQuestion]=useState({answers:[]})
    useEffect(()=>{
        getQuestionById(params.id)
            .then(setQuestion)
    },[])

    return(
        <div className="m-3">
            <AddAnswer setQ={setQuestion} question={question}/>
            <div className="bg-primary-subtle p-3 text-primary-emphasis fs-5 rounded-2 d-grid">
                <div>{"Name: "+question.name}</div>
                <div>{"Type: "+question.type}</div>
                <div className="btn btn-secondary gap-2 d-md-block" onClick={toggleAddForm}>Add answer</div>
                {!question?.valid && <div className="form-text text-danger">Question is wrong formed. You still can chose it in collections and groups, but it won't be chosen in tests</div>}
            </div>
            <div>
                {question.answers.map(answer=>(
                    <AnswerMin key={answer.id} answer={answer} setQ={setQuestion} question={question}/>
                ))}
            </div>
        </div>
    )
}

function AnswerMin({setQ,answer,question}){
    const del=(e)=>{
        e.preventDefault()
        delAnswer(answer.id)
            .then(()=>{
                getQuestionById(question.id)
                    .then(setQ)
            })
    }
    return(
        <div className="border border-success bg-success-subtle m-1 p-2 text-primary-emphasis fs-6 rounded-4 d-grid">
            <div className="bg-primary-subtle border border-primary p-1 text-primary-emphasis fs-6 rounded-2 d-grid">
                <div> {"Name:" +answer.name}</div>
                <div> {"Correct: " + answer.correct}</div>
            </div>
            <div className="d-inline">
                <div className="btn btn-danger m-1" onClick={del}>delete</div>
            </div>
        </div>
    )
}

function AddAnswer({setQ,question}) {
    let st={
        position:"fixed",
        width: "50%",
        height: "50%",
        left:"25%",
        top:"25%",
        background: "#6ca5ff",
    }
    let params = useParams();
    const[name,setName]=useState('')
    const[correct,setCorrect]=useState(false)
    const handleClick=(e)=>{
        e.preventDefault()
        const q= {name:name,
            correct:correct,
            question:question
        }
        addAnswer(q)
            .then(()=>{
                getQuestionById(params.id)
                    .then((res)=>{
                        setQ(res)
                        toggleAddForm()
                        setName("")
                        setCorrect(false)
                    })
            })
    }
    return(
        <div id="addForm" className="rounded-3" style={st} hidden>
            <div className="m-3 btn-close" onClick={toggleAddForm}></div>
            <form className="m-3" noValidate autoComplete="off">
                <div className="m-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input id="question"
                           className="form-control"
                           value={name}
                           onChange={(e)=>setName(e.target.value)}
                    />
                </div>
                <div className="m-3">
                    <label htmlFor="correct" className="form-label">Correct?</label>
                    <input className="form-check-input" checked={correct} onChange={(e)=>{setCorrect(e.target.checked)}} type="checkbox" id="correct" name="correct" />
                </div>
                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                    <button className="btn btn-primary" onClick={handleClick}>
                        Submit
                    </button>
                </div>
            </form>
        </div>
    )
}
