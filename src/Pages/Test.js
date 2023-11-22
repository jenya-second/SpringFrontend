import React, {useEffect, useRef, useState} from "react";
import {ScrollBox, toggleAddForm} from "../Requests/Utils";
import {Link} from "react-router-dom";
import {addTest, delTest, getTests} from "../Requests/TestRequests";
import {getCollections} from "../Requests/CollectionRequests";

export function TestPage() {
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
    const[tests,setTests]=useState([])
    useEffect(()=>{
        getTests()
            .then((res)=>{
                console.log(res)
                setTests(res)
            })
    },[])

    return(
        <div style={ss}>
            <AddTest setQ={setTests}/>
            <div>Tests</div>
            <div onClick={toggleAddForm}>Add test</div>
            <div style={st}>
                {tests.map(test=>(
                    <TestMin setQ={setTests} test={test} key={test.id}/>
                ))}
            </div>
        </div>
    )
}

function TestMin({setQ,test}) {
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
        delTest(test.id)
            .then(()=>{
                getTests()
                    .then(setQ)
            })
    }
    return(
        <div style={st1}>
            <div>
                <div style={st}>{test.id}</div>
                <div style={st}>{test.name + "   collection: " + test.collection?.name}</div>
            </div>
            <Link style={st2} to={"/test/"+test.id}>update</Link>
            <div style={st2} onClick={del}>delete</div>
        </div>
    )
}

function AddTest({setQ}) {
    let st={
        position:"fixed",
        width: "50%",
        height: "50%",
        left:"25%",
        top:"25%",
        background: "#0077ff",
    }
    const scrollRef = useRef(null);
    const[name,setName]=useState('')
    const[collection,setCollection] = useState({})
    const[collections,setCollections] = useState([])
    const handleClick=(e)=>{
        e.preventDefault()
        const q= {name,collection}
        addTest(q)
            .then(()=>{
                getTests()
                    .then((res)=>{
                        setQ(res)
                        toggleAddForm()
                        setName("")
                        scrollRef.current.a();
                    })
            })
    }

    useEffect(()=>{
        getCollections()
            .then(setCollections)
    },[])

    return <div id="addForm" style={st} hidden>
        <div onClick={toggleAddForm}>X</div>
        <form noValidate autoComplete="off">
            <input id="name"
                   value={name}
                   onChange={(e)=>setName(e.target.value)}
            />
            <ScrollBox ref={scrollRef} setQ={setCollection} list={collections}/>
            <button color="secondary" onClick={handleClick}>
                Submit
            </button>
        </form>
    </div>;
}