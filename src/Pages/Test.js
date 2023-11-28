import React, {useEffect, useRef, useState} from "react";
import {ScrollBox, toggleAddForm} from "../Utils/Utils";
import {Link} from "react-router-dom";
import {addTest, delTest, getTests} from "../Requests/TestRequests";
import {getCollections} from "../Requests/CollectionRequests";

export function TestPage() {
    const[tests,setTests]=useState([])
    useEffect(()=>{
        getTests()
            .then((res)=>{
                setTests(res)
            })
    },[])

    return(
        <div className="m-3">
            <AddTest setQ={setTests}/>
            <div className="bg-primary-subtle p-3 text-primary-emphasis fs-5 rounded-2 d-grid">
                <div>Tests</div>
                <div className="btn btn-secondary gap-2 d-md-block" onClick={toggleAddForm}>Add test</div>
            </div>
            <div>
                {tests.map(test=>(
                    <TestMin setQ={setTests} test={test} key={test.id}/>
                ))}
            </div>
        </div>
    )
}

function TestMin({setQ,test}) {
    const del=(e)=>{
        e.preventDefault()
        delTest(test.id)
            .then(()=>{
                getTests()
                    .then(setQ)
            })
    }
    return(
        <div className="border border-success bg-success-subtle m-1 p-2 text-primary-emphasis fs-6 rounded-4 d-grid">
            <div className="bg-primary-subtle border border-primary p-1 text-primary-emphasis fs-6 rounded-2 d-grid">
                <div>{"Name: " + test.name}</div>
                <div>{"Collection: " + test.collection?.name}</div>
                <a href={"https://t.me/DubnaTestBot?start="+test.name}>Link to test</a>
            </div>
            <div className="d-inline">
                <div className="btn btn-danger m-1" onClick={del}>delete</div>
                <Link className="btn btn-info" to={"/test/"+test.id}>update</Link>
            </div>
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
        background: "#6ca5ff",
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

    return <div id="addForm" className="rounded-3" style={st} hidden>
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
            <ScrollBox ref={scrollRef} setQ={setCollection} list={collections} item={"Collection"}/>
            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                <button className="btn btn-primary" onClick={handleClick}>
                    Submit
                </button>
            </div>
        </form>
    </div>;
}