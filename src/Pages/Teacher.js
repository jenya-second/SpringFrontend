import React, {useEffect, useRef, useState} from "react";
import {ScrollBox, toggleAddForm} from "../Utils/Utils";
import {getUniversities} from "../Requests/UniversityRequests";
import {addTeacher, delTeacher, getTeachers} from "../Requests/TeacherRequests";

export default function TeacherPage(){
    const [teachers,setTeachers]=useState([])

    useEffect(() => {
        getTeachers()
            .then(setTeachers)
    }, []);

    return <div>
        <AddTeacher setQ={setTeachers}/>
        <div>Teachers</div>
        <div onClick={toggleAddForm}>Add Teacher</div>
        <div>
            {teachers.map(teacher=>(
                <TeacherMin setQ={setTeachers} teacher={teacher} key={teacher.id}/>
            ))}
        </div>
    </div>
}

export function TeacherMin({setQ,teacher}){
    const del=(e)=>{
        e.preventDefault()
        delTeacher(teacher.id)
            .then(()=>{
                getTeachers()
                    .then(setQ)
            })
    }
    return(
        <div>
            <div>
                <div>{teacher.id + " " + teacher.name+ " " + teacher.login+ " " + teacher.pass + " " + teacher.university?.name}</div>
            </div>
            <div onClick={del}>delete</div>
        </div>
    )
}

function AddTeacher({setQ}) {
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
    const[pass,setPass]=useState('')
    const[login,setLogin]=useState('')
    const[tgAccount,setTgAccount]=useState('')
    const[university,setUniversity]=useState({})
    const[universities,setUniversities]=useState([])
    const handleClick=(e)=>{
        e.preventDefault()
        const q= {name,login,pass,tgAccount,university}
        addTeacher(q)
            .then(()=>{
                getTeachers()
                    .then((res)=>{
                        setQ(res)
                        toggleAddForm()
                        setName("")
                        setPass("")
                        setLogin("")
                        setTgAccount("")
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
            <input id="login"
                   value={login}
                   onChange={(e)=>setLogin(e.target.value)}
            />
            <input id="pass"
                   value={pass}
                   onChange={(e)=>setPass(e.target.value)}
            />
            <input id="tgAccount"
                   value={tgAccount}
                   onChange={(e)=>setTgAccount(e.target.value)}
            />
            <ScrollBox ref={scrollRef} setQ={setUniversity} list={universities}/>
            <button color="secondary" onClick={handleClick}>
                Submit
            </button>
        </form>
    </div>;
}