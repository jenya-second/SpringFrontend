import {useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {getQuestionById} from "../Requests/QuestionRequests";
import {addAnswer, delAnswer, getAnswersByQuestion} from "../Requests/AnswerRequests";
import {toggleAddForm} from "../Utils/Utils";

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
            {!question.valid && <>Question is wrong formed. You still can chose it in collections and groups, but it won't be chosen in tests</>}
            <AddAnswer setQ={setAnswers} question={question}/>
            <div>{question.id+" "+question.name+" "+question.type}</div>
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
                getAnswersByQuestion(answer.question.id)
                    .then(setQ)
            })
    }
    return(
        <div>
            <div key={answer.id}> {answer.id+ "  " +answer.name+ "  " +answer.correct}</div>
            <div onClick={del}>delete</div>
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
        background: "#0077ff",
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
                getAnswersByQuestion(params.id)
                    .then((res)=>{
                        setQ(res)
                        toggleAddForm()
                        setName("")
                        setCorrect(false)
                    })
            })
    }
    return(
        <div id="addForm" style={st} hidden>
            <div onClick={toggleAddForm}>X</div>
            <form noValidate autoComplete="off">
                <input id="question"
                       value={name}
                       onChange={(e)=>setName(e.target.value)}
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
