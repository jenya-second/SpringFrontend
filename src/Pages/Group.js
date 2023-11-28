import React, {useEffect, useRef, useState} from "react";
import {ScrollBox, toggleAddForm} from "../Utils/Utils";
import {addGroup, delGroup, getGroups} from "../Requests/GroupRequests";
import {Link} from "react-router-dom";
import {getCollections} from "../Requests/CollectionRequests";

export function GroupPage() {
    const[groups,setGroups]=useState([])
    useEffect(()=>{
        getGroups()
            .then((res)=>{
                setGroups(res)
            })
    },[])

    return(
        <div className="m-3">
            <AddGroup setQ={setGroups}/>
            <div className="bg-primary-subtle p-3 text-primary-emphasis fs-5 rounded-2 d-grid">
                <div>Groups</div>
                <div className="btn btn-secondary gap-2 d-md-block" onClick={toggleAddForm}>Add group</div>
            </div>
            <div>
                {groups.map(group=>(
                    <GroupMin setQ={setGroups} group={group} key={group.id}/>
                ))}
            </div>
        </div>
    )
}

function GroupMin({setQ,group}) {
    const del=(e)=>{
        e.preventDefault()
        delGroup(group.id)
            .then(()=>{
                getGroups()
                    .then(setQ)
            })
    }
    return(
        <div className="border border-success bg-success-subtle m-1 p-2 text-primary-emphasis fs-6 rounded-4 d-grid">
            <div className="bg-primary-subtle border border-primary p-1 text-primary-emphasis fs-6 rounded-2 d-grid">
                <div>{"Name: " +group.name}</div>
                <div>{"Collection: " + group.collection?.name}</div>
            </div>
            <div className="d-inline">
                <div className="btn btn-danger m-1" onClick={del}>delete</div>
                <Link className="btn btn-info" to={"/group/"+group.id}>update</Link>
            </div>
        </div>
    )
}

function AddGroup({setQ}) {
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
        addGroup(q)
            .then(()=>{
                getGroups()
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