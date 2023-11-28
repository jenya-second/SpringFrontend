import React, {useEffect,useState} from "react";
import {toggleAddForm} from "../Utils/Utils";
import {addCollection, delCollection, getCollections} from "../Requests/CollectionRequests";
import {Link} from "react-router-dom";


export function CollectionPage() {

    const[collections,setCollections]=useState([])
    useEffect(()=>{
        getCollections()
            .then(setCollections)
    },[])

    return(
        <div className="m-3">
            <AddCollection setQ={setCollections}/>
            <div className="bg-primary-subtle p-3 text-primary-emphasis fs-5 rounded-2 d-grid">
                <div>Collections</div>
                <div className="btn btn-secondary gap-2 d-md-block" onClick={toggleAddForm}>Add collection</div>
            </div>
            <div>
                {collections.map(collection=>(
                    <CollectionMin setQ={setCollections} collection={collection} key={collection.id}/>
                ))}
            </div>
        </div>
    )
}

function CollectionMin({setQ,collection}) {
    const del=(e)=>{
        e.preventDefault()
        delCollection(collection.id)
            .then(()=>{
                getCollections()
                    .then(setQ)
            })
    }
    return(
        <div className="border border-success bg-success-subtle m-1 p-2 text-primary-emphasis fs-6 rounded-4 d-grid">
            <div className="bg-primary-subtle border border-primary p-1 text-primary-emphasis fs-6 rounded-2 d-grid">
                <div>{"Name: " + collection.name}</div>
            </div>
            <div className="d-inline">
                <div className="btn btn-danger m-1" onClick={del}>delete</div>
                <Link className="btn btn-info" to={"/collection/"+collection.id}>update</Link>
            </div>
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
        background: "#6ca5ff",
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
            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                <button className="btn btn-primary" onClick={handleClick}>
                    Submit
                </button>
            </div>
        </form>
    </div>;
}