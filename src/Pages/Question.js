import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {addQuestion, delQuestion, getQuestions} from "../Requests/QuestionRequests";
import {toggleAddForm} from "../Utils/Utils";

export function QuestionPage() {
    let st={
        verticalAlign: "top",
        width: "90%",
        height: "90%",
        background: "#00ffc9",
        color: "#000",
        overflow: "scroll"
    }
    let ss={
        width: "100%",
        height: "100%"
    }
    const[questions,setQuestions]=useState([])
    useEffect(()=>{
        getQuestions()
            .then(setQuestions)
    },[])

    return(
        <div style={ss}>
            <AddQuestion setQ={setQuestions}/>
            <div>Questions</div>
            <div onClick={toggleAddForm}>Add question</div>
            <div style={st}>
                {questions.map(question=>(
                    <QuestionMin setQ={setQuestions} question={question} key={question.id}/>
                ))}
            </div>
        </div>
    )
}

function QuestionMin({setQ,question}) {
    let st={
        display:"inline-block",

        margin:"3px"
    }
    let st1={
        border:"solid",
        margin:"2px"
    }
    let st2={
        display:"inline-block",
        border:"solid",
        margin:"3px"
    }
    const del=(e)=>{
        e.preventDefault()
        delQuestion(question.id)
        .then(()=>{
            getQuestions()
                .then(setQ)
        })
    }
    return(
        <div style={st1}>
            <div>
                <div style={st}>{question.id}</div>
                <div style={st}>{question.type}</div>
                <div style={st}>{question.name}</div>
            </div>
            <Link style={st2} to={"/question/"+question.id}>update</Link>
            <div style={st2} onClick={del}>delete</div>
        </div>
    )
}

function AddQuestion({setQ}) {
    let st={
        position:"fixed",
        width: "50%",
        height: "50%",
        left:"25%",
        top:"25%",
        background: "#0077ff",
    }
    const[name,setName]=useState('')
    const[type,setType]=useState('1')
    const handleClick=(e)=>{
        e.preventDefault()
        const q= {name,type}
        addQuestion(q)
        .then(()=>{
            getQuestions()
                .then((res)=>{
                    setQ(res)
                    toggleAddForm()
                    setName("")
                    setType("1")
                })

        })
    }
    return(
        <div id="addForm" style={st} hidden>
            <div onClick={toggleAddForm}>X</div>
            <form noValidate autoComplete="off">
                <input id="name"
                       value={name}
                       onChange={(e)=>setName(e.target.value)}
                />
                <select value={type} onChange={(e)=>setType(e.target.value)} id="type">
                    <option value="1">SingleChoice</option>
                    <option value="2">MultipleChoice</option>
                    <option value="3">CalculationTask</option>
                </select>
                <button color="secondary" onClick={handleClick}>
                    Submit
                </button>
            </form>
        </div>
    )
}

