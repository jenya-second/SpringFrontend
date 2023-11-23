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
        <div>
            <AddTestToGroup setQ={setTestToGroups}/>
            <div>{test.id+" "+test.name + "   collection: "+ test.collection?.name}</div>
            <div onClick={toggleAddForm}>Add group</div>
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
        <div>
            <div>
                <div>{testToGroup.group.id + " " + testToGroup.group.name + " " + testToGroup.questionsCount}</div>
            </div>
            <div onClick={del}>delete</div>
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
        background: "#0077ff",
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

    return <div id="addForm" style={st} hidden>
        <div onClick={toggleAddForm}>X</div>
        <form noValidate autoComplete="off">
            <input id="countQuestions"
                   type="number"
                   value={questionsCount}
                   onChange={(e)=>setQuestionsCount(e.target.value)}
            />
            <ScrollBox ref={scrollRef} setQ={setGroup} list={groups}/>
            <button color="secondary" onClick={handleClick}>
                Submit
            </button>
        </form>
    </div>;
}