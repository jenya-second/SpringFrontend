import React, {useEffect,useState} from "react";
import {toggleAddForm} from "../Utils/Utils";
import {addCollection, delCollection, getCollections} from "../Requests/CollectionRequests";
import {Link} from "react-router-dom";


export function CollectionPage() {
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
    const[collections,setCollections]=useState([])
    useEffect(()=>{
        getCollections()
            .then(setCollections)
    },[])

    return(
        <div style={ss}>
            <AddCollection setQ={setCollections}/>
            <div>Collections</div>
            <div onClick={toggleAddForm}>Add collection</div>
            <div style={st}>
                {collections.map(collection=>(
                    <CollectionMin setQ={setCollections} collection={collection} key={collection.id}/>
                ))}
            </div>
        </div>
    )
}

function CollectionMin({setQ,collection}) {
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
        delCollection(collection.id)
            .then(()=>{
                getCollections()
                    .then(setQ)
            })
    }
    return(
        <div style={st1}>
            <div>
                <div style={st}>{collection.id}</div>
                <div style={st}>{collection.name}</div>
            </div>
            <Link style={st2} to={"/collection/"+collection.id}>update</Link>
            <div style={st2} onClick={del}>delete</div>
        </div>
    )
}

function AddCollection({setQ}) {
    let st={
        position:"fixed",
        width: "50%",
        height: "50%",
        left:"25%",
        top:"25%",
        background: "#0077ff",
    }
    const[name,setName]=useState('')
    const handleClick=(e)=>{
        e.preventDefault()
        const q= {name}
        addCollection(q)
            .then(()=>{
                getCollections()
                    .then((res)=>{
                        setQ(res)
                        toggleAddForm()
                        setName("")
                    })
            })
    }

    return <div id="addForm" style={st} hidden>
        <div onClick={toggleAddForm}>X</div>
        <form noValidate autoComplete="off">
            <input id="name"
                   value={name}
                   onChange={(e)=>setName(e.target.value)}
            />
            <button color="secondary" onClick={handleClick}>
                Submit
            </button>
        </form>
    </div>;
}