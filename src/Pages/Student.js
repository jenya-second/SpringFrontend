import React, {useEffect, useRef, useState} from "react";
import {addStudent, delStudent, getStudents} from "../Requests/StudentRequests";
import {ScrollBox, toggleAddForm} from "../Utils/Utils";
import {getUniversities} from "../Requests/UniversityRequests";

export default function StudentPage(){
    const [students,setStudents]=useState([])

    useEffect(() => {
        getStudents()
            .then(setStudents)
    }, []);

    return <div>
        <AddStudent setQ={setStudents}/>
        <div>Students</div>
        <div onClick={toggleAddForm}>Add student</div>
        <div>
            {students.map(student=>(
                <StudentMin setQ={setStudents} student={student} key={student.id}/>
            ))}
        </div>
    </div>
}

export function StudentMin({setQ,student}){
    const del=(e)=>{
        e.preventDefault()
        delStudent(student.id)
            .then(()=>{
                getStudents()
                    .then(setQ)
            })
    }
    return(
        <div>
            <div>
                <div>{student.id + " " + student.name + " " + student.university?.name + " " + student.group}</div>
            </div>
            <div onClick={del}>delete</div>
        </div>
    )
}

function AddStudent({setQ}) {
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
    const[chatId,setChatId]=useState('')
    const[group,setGroup]=useState('')
    const[university,setUniversity]=useState({})
    const[universities,setUniversities]=useState([])
    const handleClick=(e)=>{
        e.preventDefault()
        let a= parseInt(chatId)
        const q= {name,chatId:a,group,university}
        addStudent(q)
            .then(()=>{
                getStudents()
                    .then((res)=>{
                        setQ(res)
                        toggleAddForm()
                        setName("")
                        setChatId("")
                        setGroup("")
                        setUniversity({})
                        scrollRef.current.a();
                    })
            })
    }
    useEffect(()=>{
        getUniversities()
            .then(setUniversities)
    },[])

    return <div id="addForm" style={st} hidden>
        <div onClick={toggleAddForm}>X</div>
        <form noValidate autoComplete="off">
            <input id="name"
                   value={name}
                   onChange={(e)=>setName(e.target.value)}
            />
            <input id="chatId"
                   value={chatId}
                   onChange={(e)=>setChatId(e.target.value)}
            />
            <input id="group"
                   value={group}
                   onChange={(e)=>setGroup(e.target.value)}
            />
            <ScrollBox ref={scrollRef} setQ={setUniversity} list={universities}/>
            <button color="secondary" onClick={handleClick}>
                Submit
            </button>
        </form>
    </div>;
}