import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";

function getQuestions(){
    return fetch(process.env.REACT_APP_LOCAL_URL+"/questions")
        .then((res)=>{
            if(res.ok){
                return res
            }
        })
}

function delQuestion(id){
    return fetch(process.env.REACT_APP_LOCAL_URL+"/del_question",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(id)
    })
}

function addQuestion(q){
    return fetch(process.env.REACT_APP_LOCAL_URL+"/add_question",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(q)
    })
}
function toggleAdd(){
    const el = document.getElementById("addq")
    el.hidden=!el.hidden
}
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
            .then(res => res.json())
            .then((result) => {
                    setQuestions(result);
                    return result
                }
            )
    },[])

    return(
        <div style={ss}>
            <AddQuestion setQ={setQuestions}/>
            <div>Questions</div>
            <div onClick={toggleAdd}>Add question</div>
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
                .then(res => res.json())
                .then((res)=>{
                    setQ(res)
                })
        })
    }
    return(
        <div style={st1}>
            <div>
                <div style={st}>{question.id}</div>
                <div style={st}>{question.type}</div>
                <div style={st}>{question.question}</div>
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
    const[question,setQuestion]=useState('')
    const[type,setType]=useState('')
    const handleClick=(e)=>{
        e.preventDefault()
        const q= {question,type}
        addQuestion(q)
        .then(()=>{
            getQuestions()
                .then(res => res.json())
                .then((res)=>{
                    setQ(res)
                    toggleAdd()
                    setQuestion("")
                    setType("")
                })

        })
    }
    return(
        <div id="addq" style={st} hidden>
            <div onClick={toggleAdd}>X</div>
            <form noValidate autoComplete="off">
                <input id="question"
                       value={question}
                       onChange={(e)=>setQuestion(e.target.value)}
                />
                <input id="type"
                       value={type}
                       onChange={(e)=>setType(e.target.value)}
                />
                <button color="secondary" onClick={handleClick}>
                    Submit
                </button>
            </form>
        </div>
    )
}
