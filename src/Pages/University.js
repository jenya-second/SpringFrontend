import React, {useEffect, useState} from "react";
import {toggleAddForm} from "../Utils/Utils";
import {addUniversity, delUniversity, getUniversities} from "../Requests/UniversityRequests";


export default function UniversityPage(){
    const [universities,setUniversities]=useState([])

    useEffect(() => {
        getUniversities()
            .then(setUniversities)
    }, []);

    return <div>
        <AddUniversity setQ={setUniversities}/>
        <div>Universities</div>
        <div onClick={toggleAddForm}>Add University</div>
        <div>
            {universities.map(university=>(
                <UniversityMin setQ={setUniversities} university={university} key={university.id}/>
            ))}
        </div>
    </div>
}

export function UniversityMin({setQ,university}){
    const del=(e)=>{
        e.preventDefault()
        delUniversity(university.id)
            .then(()=>{
                getUniversities()
                    .then(setQ)
            })
    }
    return(
        <div>
            <div>
                <div>{university.id + " " + university.name}</div>
            </div>
            <div onClick={del}>delete</div>
        </div>
    )
}

function AddUniversity({setQ}) {
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
        addUniversity(q)
            .then(()=>{
                getUniversities()
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