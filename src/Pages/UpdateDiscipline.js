import {useParams} from "react-router-dom";
import React, {useEffect, useRef, useState} from "react";
import {getCollections} from "../Requests/CollectionRequests";
import {ScrollBox, toggleAddForm} from "../Utils/Utils";
import {addDisciplineToCollection, delDisciplineToCollection, getDisciplineById} from "../Requests/DisciplineRequests";

export function UpdateDiscipline() {
    let params = useParams();
    const[discipline, setDiscipline]=useState({collections:[]})

    useEffect(()=>{
        getDisciplineById(params.id)
            .then((res)=>{
                setDiscipline(res)
            })
    },[])

    return(
        <div>
            <AddDisciplineToCollection setQ={setDiscipline}/>
            <div>{discipline.id+" "+discipline.name}</div>
            <div onClick={toggleAddForm}>Add collection</div>
            <div>
                {discipline.collections.map(collection=>(
                    <DisciplineToCollectionMin key={collection.id} collection={collection} setQ={setDiscipline}/>
                ))}
            </div>
        </div>
    )
}

function DisciplineToCollectionMin({setQ,collection}){
    let params = useParams();
    const del=(e)=>{
        e.preventDefault()
        let q= {collectionId:collection.id,disciplineId:params.id}
        delDisciplineToCollection(q)
            .then(()=>{
                getDisciplineById(params.id)
                    .then(setQ)
            })
    }
    return(
        <div>
            <div>
                <div>{collection.id + " " + collection.name}</div>
            </div>
            <div onClick={del}>delete</div>
        </div>
    )
}

function AddDisciplineToCollection({setQ}) {
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
    const[collection,setCollection]=useState({})
    const[collections,setCollections]=useState([])
    const handleClick=(e)=>{
        e.preventDefault()
        const q= {collectionId:collection.id,disciplineId:params.id}
        addDisciplineToCollection(q)
            .then(()=>{
                getDisciplineById(params.id)
                    .then((res)=>{
                        setQ(res)
                        toggleAddForm()
                        setCollection({})
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
            <ScrollBox ref={scrollRef} setQ={setCollection} list={collections}/>
            <button color="secondary" onClick={handleClick}>
                Submit
            </button>
        </form>
    </div>;
}