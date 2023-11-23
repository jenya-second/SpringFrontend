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
        <div>
            <AddGroupToQuestion setQ={setGroup}/>
            <div>{group.id+" "+group.name + "   collection: "+ group.collection?.name}</div>
            <div onClick={toggleAddForm}>Add question</div>
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
        <div>
            <div>
                <div>{question.id + " " + question.name}</div>
            </div>
            <div onClick={del}>delete</div>
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
        background: "#0077ff",
    }
    const scrollRef = useRef(null);
    const[question,setQuestion]=useState({})
    const[questions,setQuestions]=useState([])
    const handleClick=(e)=>{
        e.preventDefault()
        const q= {groupId:params.id,questionId:question.id}
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