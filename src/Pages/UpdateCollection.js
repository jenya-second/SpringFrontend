import {useParams} from "react-router-dom";
import React, {useEffect, useRef, useState} from "react";
import {ScrollBox, toggleAddForm} from "../Requests/Utils";
import {addCollectionToQuestion, delCollectionToQuestion, getCollectionById} from "../Requests/CollectionRequests";
import {getQuestions} from "../Requests/QuestionRequests";

export function UpdateCollection() {
    let params = useParams();
    const[collection, setCollection]=useState({questions:[]})
    // const[answers, setAnswers]=useState([])

    useEffect(()=>{
        getCollectionById(params.id)
            .then((res)=>{
                setCollection(res)
            })
    },[])

    return(
        <div>
            <AddCollectionToQuestion setQ={setCollection}/>
            <div>{collection.id+" "+collection.name}</div>
            <div onClick={toggleAddForm}>Add question</div>
            <div>
                {collection.questions.map(question=>(
                    <CollectionToQuestionMin key={question.id} question={question} setQ={setCollection}/>
                ))}
            </div>
        </div>
    )
}

export function CollectionToQuestionMin({setQ,question}){
    let params = useParams();
    const del=(e)=>{
        e.preventDefault()
        let q={questionId:question.id,collectionId:params.id}
        delCollectionToQuestion(q)
            .then(()=>{
                getCollectionById(params.id)
                    .then(setQ)
            })
    }
    return(
        <div>
            <div>
                <div>{question.id + " " + question.type + " " + question.name}</div>
            </div>
            <div onClick={del}>delete</div>
        </div>
    )
}

function AddCollectionToQuestion({setQ}) {
    let params = useParams();
    let st={
        position:"fixed",
        width: "50%",
        height: "50%",
        left:"25%",
        top:"25%",
        background: "#0077ff",
    }
    const scrollRef = useRef(null);
    const[question,setQuestion]=useState({})
    const[questions,setQuestions]=useState([])
    const handleClick=(e)=>{
        e.preventDefault()
        const q= {questionId:question.id,collectionId:params.id}
        addCollectionToQuestion(q)
            .then(()=>{
                getCollectionById(params.id)
                    .then((res)=>{
                        setQ(res)
                        toggleAddForm()
                        setQuestion({})
                        scrollRef.current.a();
                    })
            })
    }
    useEffect(()=>{
        getQuestions()
            .then(setQuestions)
    },[])

    return <div id="addForm" style={st} hidden>
        <div onClick={toggleAddForm}>X</div>
        <form noValidate autoComplete="off">
            <ScrollBox ref={scrollRef} setQ={setQuestion} list={questions}/>
            <button color="secondary" onClick={handleClick}>
                Submit
            </button>
        </form>
    </div>;
}