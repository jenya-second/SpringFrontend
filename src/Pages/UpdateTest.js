import {useParams} from "react-router-dom";
import React, {useEffect, useRef, useState} from "react";
import {getGroupsByCollectionId} from "../Requests/GroupRequests";
import {ScrollBox, toggleAddForm} from "../Utils/Utils";
import {
    addTestToGroup,
    delTestToGroup,
    getTestById,
    getTestToGroupByTest,
    getTestToGroupByTestId
} from "../Requests/TestRequests";

export function UpdateTest() {
    let params = useParams();
    const[test, setTest]=useState({groups:[]})
    const[testToGroups, setTestToGroups]=useState([])

    useEffect(()=>{
        getTestById(params.id)
            .then((res)=>{
                setTest(res)
                getTestToGroupByTest(res)
                    .then(setTestToGroups)
            })
    },[])

    return(
        <div className="m-3">
            <AddTestToGroup setQ={setTestToGroups}/>
            <div className="bg-primary-subtle p-3 text-primary-emphasis fs-5 rounded-2 d-grid">
                <div>{"Name: "+test.name}</div>
                <div>{"Collection: "+ test.collection?.name}</div>
                <div className="btn btn-secondary gap-2 d-md-block" onClick={toggleAddForm}>Add group</div>
            </div>
            <div>
                {testToGroups.map(testToGroup=>(
                    <TestToGroupMin key={testToGroup.id} testToGroup={testToGroup} setQ={setTestToGroups}/>
                ))}
            </div>
        </div>
    )
}

function TestToGroupMin({setQ,testToGroup}){
    let params = useParams();
    const del=(e)=>{
        e.preventDefault()
        delTestToGroup(testToGroup.id)
            .then(()=>{
                getTestToGroupByTestId(params.id)
                    .then(setQ)
            })
    }
    return(
        <div className="border border-success bg-success-subtle m-1 p-2 text-primary-emphasis fs-6 rounded-4 d-grid">
            <div className="bg-primary-subtle border border-primary p-1 text-primary-emphasis fs-6 rounded-2 d-grid">
                <div>{"Group: " + testToGroup.group.name}</div>
                <div>{"Questions count: " + testToGroup.questionsCount}</div>
            </div>
            <div className="d-inline">
                <div className="btn btn-danger m-1" onClick={del}>delete</div>
            </div>
        </div>
    )
}

function AddTestToGroup({setQ}) {
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
    const[test,setTest]=useState({})
    const[group,setGroup]=useState({})
    const[groups,setGroups]=useState([])
    const[questionsCount,setQuestionsCount]=useState(0)
    const handleClick=(e)=>{
        e.preventDefault()
        const q= {group,test,questionsCount}
        addTestToGroup(q)
            .then(()=>{
                getTestToGroupByTestId(params.id)
                    .then((res)=>{
                        setQ(res)
                        toggleAddForm()
                        setGroup({})
                        setQuestionsCount(0)
                        scrollRef.current.a();
                    })
            })
    }
    useEffect(()=>{
        getTestById(params.id)
            .then((res)=>{
                setTest(res)
                getGroupsByCollectionId(res.collection.id)
                    .then(setGroups)
            })
    },[])

    return <div id="addForm" className="rounded-3" style={st} hidden>
        <div className="m-3 btn-close" onClick={toggleAddForm}></div>
        <form className="m-3" noValidate autoComplete="off">
            <div className="m-3">
                <label htmlFor="countQuestions" className="form-label">Count questions</label>
                <input id="countQuestions"
                       type="number"
                       className="form-control"
                       value={questionsCount}
                       onChange={(e)=>setQuestionsCount(e.target.value)}
                />
            </div>
            <ScrollBox ref={scrollRef} setQ={setGroup} list={groups} item={"Group"}/>
            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                <button className="btn btn-primary" onClick={handleClick}>
                    Submit
                </button>
            </div>
        </form>
    </div>;
}