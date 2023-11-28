import {useParams} from "react-router-dom";
import React, {useEffect, useRef, useState} from "react";
import {ScrollBox, toggleAddForm} from "../Utils/Utils";
import {addGroupToQuestion, delGroupToQuestion, getGroupById} from "../Requests/GroupRequests";

export function UpdateGroup() {
    let params = useParams();
    const[group, setGroup]=useState({questions:[]})
    // const[collection, setCollection]=useState({questions:[]})

    useEffect(()=>{
        getGroupById(params.id)
            .then((res)=>{
                setGroup(res)
            })
    },[])

    return(
        <div className="m-3">
            <AddGroupToQuestion setQ={setGroup}/>
            <div className="bg-primary-subtle p-3 text-primary-emphasis fs-5 rounded-2 d-grid">
                <div>{"Collection: "+ group.collection?.name}</div>
                <div className="btn btn-secondary gap-2 d-md-block" onClick={toggleAddForm}>Add question</div>
            </div>
            <div>
                {group.questions.map(question=>(
                    <GroupToQuestionMin key={question.id} question={question} setQ={setGroup}/>
                ))}
            </div>
        </div>
    )
}

function GroupToQuestionMin({setQ,question}){
    let params = useParams();
    const del=(e)=>{
        e.preventDefault()
        let q= {groupId:params.id,questionId:question.id}
        delGroupToQuestion(q)
            .then(()=>{
                getGroupById(params.id)
                    .then(setQ)
            })
    }
    return(
        <div className="border border-success bg-success-subtle m-1 p-2 text-primary-emphasis fs-6 rounded-4 d-grid">
            <div className="bg-primary-subtle border border-primary p-1 text-primary-emphasis fs-6 rounded-2 d-grid">
                <div>{"Name: " + question.name}</div>
            </div>
            <div className="d-inline">
                <div className="btn btn-danger m-1" onClick={del}>delete</div>
            </div>
        </div>
    )
}

function AddGroupToQuestion({setQ}) {
    let params = useParams();
    let st={
        position:"fixed",
        width: "50%",
        height: "50%",
        left:"25%",
        top:"25%",
        background: "#6ca5ff",
    }
    const scrollRef = useRef(null);
    const[question,setQuestion]=useState({})
    const[questions,setQuestions]=useState([])
    const handleClick=(e)=>{
        e.preventDefault()
        const q= {groupId:parseInt(params.id),questionId:question.id}
        console.log(q)
        addGroupToQuestion(q)
            .then(()=>{
                getGroupById(params.id)
                    .then((res)=>{
                        setQ(res)
                        toggleAddForm()
                        setQuestion({})
                        scrollRef.current.a();
                    })
            })
    }
    useEffect(()=>{
        getGroupById(params.id)
            .then((res)=>{
                setQuestions(res.collection.questions)
            })
    },[])

    return <div id="addForm" className="rounded-3" style={st} hidden>
        <div className="m-3 btn-close" onClick={toggleAddForm}></div>
        <form className="m-3" noValidate autoComplete="off">
            <ScrollBox ref={scrollRef} setQ={setQuestion} list={questions} item={"Question"}/>
            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                <button className="btn btn-primary" onClick={handleClick}>
                    Submit
                </button>
            </div>
        </form>
    </div>;
}