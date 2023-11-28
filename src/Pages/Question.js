import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {addQuestion, delQuestion, getQuestions} from "../Requests/QuestionRequests";
import {toggleAddForm} from "../Utils/Utils";

export function QuestionPage() {
    const[questions,setQuestions]=useState([])
    useEffect(()=>{
        getQuestions()
            .then(setQuestions)
    },[])

    return(
        <div className="m-3">
            <AddQuestion setQ={setQuestions}/>
            <div className="bg-primary-subtle p-3 text-primary-emphasis fs-5 rounded-2 d-grid">
                <div>Questions</div>
                <div className="btn btn-secondary gap-2 d-md-block" onClick={toggleAddForm}>Add question</div>
            </div>
            <div>
                {questions.map(question=>(
                    <QuestionMin setQ={setQuestions} question={question} key={question.id}/>
                ))}
            </div>
        </div>
    )
}

function QuestionMin({setQ,question}) {
    const del=(e)=>{
        e.preventDefault()
        delQuestion(question.id)
        .then(()=>{
            getQuestions()
                .then(setQ)
        })
    }
    return(
        <div className="border border-success bg-success-subtle m-1 p-2 text-primary-emphasis fs-6 rounded-4 d-grid">
            <div className="bg-primary-subtle border border-primary p-1 text-primary-emphasis fs-6 rounded-2 d-grid">
                <div>{"Name: " + question.name}</div>
                <div>{"Type: " + question.type}</div>
                <div>{"isValid: " + question.valid}</div>
            </div>
            <div className="d-inline">
                <div className="btn btn-danger m-1" onClick={del}>delete</div>
                <Link className="btn btn-info" to={"/question/"+question.id}>update</Link>
            </div>
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
        background: "#6ca5ff",
    }
    const[name,setName]=useState('')
    const[type,setType]=useState('SingleChoice')
    const handleClick=(e)=>{
        e.preventDefault()
        const q= {name,type,is_valid:false}
        addQuestion(q)
        .then(()=>{
            getQuestions()
                .then((res)=>{
                    setQ(res)
                    toggleAddForm()
                    setName("")
                    setType("SingleChoice")
                })

        })
    }
    return(
        <div id="addForm" className="rounded-3" style={st} hidden>
            <div className="m-3 btn-close" onClick={toggleAddForm}></div>
            <form className="m-3" noValidate autoComplete="off">
                <div className="m-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input id="name"
                           className="form-control"
                           value={name}
                           onChange={(e)=>setName(e.target.value)}
                    />
                </div>
                <div className="m-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <select className="form-select" value={type} onChange={(e)=>setType(e.target.value)} id="type">
                        <option value="SingleChoice">SingleChoice</option>
                        <option value="MultiplyChoice">MultipleChoice</option>
                        <option value="3">CalculationTask</option>
                    </select>
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

