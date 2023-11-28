import React, {useEffect, useState} from "react";
import {toggleAddForm} from "../Utils/Utils";
import {addDiscipline, delDiscipline, getDisciplines} from "../Requests/DisciplineRequests";
import {Link} from "react-router-dom";

export function DisciplinePage() {
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
    const[disciplines,setDisciplines]=useState([])
    useEffect(()=>{
        getDisciplines()
            .then(setDisciplines)
    },[])

    return(
        <div style={ss}>
            <AddDiscipline setQ={setDisciplines}/>
            <div>Disciplines</div>
            <div onClick={toggleAddForm}>Add discipline</div>
            <div style={st}>
                {disciplines.map(discipline=>(
                    <DisciplineMin setQ={setDisciplines} discipline={discipline} key={discipline.id}/>
                ))}
            </div>
        </div>
    )
}

function DisciplineMin({setQ,discipline}) {
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
        delDiscipline(discipline.id)
            .then(()=>{
                getDisciplines()
                    .then(setQ)
            })
    }
    return(
        <div style={st1}>
            <div>
                <div style={st}>{discipline.id}</div>
                <div style={st}>{discipline.name}</div>
            </div>
            <Link style={st2} to={"/discipline/"+discipline.id}>update</Link>
            <div style={st2} onClick={del}>delete</div>
        </div>
    )
}

function AddDiscipline({setQ}) {
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
        addDiscipline(q)
            .then(()=>{
                getDisciplines()
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