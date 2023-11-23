import React, {useEffect, useRef, useState} from "react";
import {ScrollBox, toggleAddForm} from "../Utils/Utils";
import {addGroup, delGroup, getGroups} from "../Requests/GroupRequests";
import {Link} from "react-router-dom";
import {getCollections} from "../Requests/CollectionRequests";

export function GroupPage() {
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
    const[groups,setGroups]=useState([])
    useEffect(()=>{
        getGroups()
            .then((res)=>{
                setGroups(res)
            })
    },[])

    return(
        <div style={ss}>
            <AddGroup setQ={setGroups}/>
            <div>Groups</div>
            <div onClick={toggleAddForm}>Add group</div>
            <div style={st}>
                {groups.map(group=>(
                    <GroupMin setQ={setGroups} group={group} key={group.id}/>
                ))}
            </div>
        </div>
    )
}

function GroupMin({setQ,group}) {
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
        delGroup(group.id)
            .then(()=>{
                getGroups()
                    .then(setQ)
            })
    }
    return(
        <div style={st1}>
            <div>
                <div style={st}>{group.id}</div>
                <div style={st}>{group.name+ "   collection: " + group.collection?.name}</div>
            </div>
            <Link style={st2} to={"/group/"+group.id}>update</Link>
            <div style={st2} onClick={del}>delete</div>
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
        background: "#0077ff",
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