import React, {useEffect, useRef, useState} from "react";
import {getNames, ScrollBox, toggleAddForm} from "../Utils/Utils";
import {getUniversities} from "../Requests/UniversityRequests";
import {addTeacher, delTeacher, getTeachers} from "../Requests/TeacherRequests";

export default function TeacherPage(){
    const [teachers,setTeachers]=useState([])

    useEffect(() => {
        getTeachers()
            .then(setTeachers)
    }, []);

    return <div className="m-3">
        <AddTeacher setQ={setTeachers}/>
        <div className="bg-primary-subtle p-3 text-primary-emphasis fs-5 rounded-2 d-grid">
            <div>Teachers</div>
            <div className="btn btn-secondary gap-2 d-md-block" onClick={toggleAddForm}>Add Teacher</div>
        </div>
        <div>
            {teachers.sort().map(teacher=>(
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
        <div className="border border-success bg-success-subtle m-1 p-2 text-primary-emphasis fs-6 rounded-4 d-grid">
            <div className="bg-primary-subtle border border-primary p-1 text-primary-emphasis fs-6 rounded-2 d-grid">
                <div>{"Name: " + teacher.name}</div>
                <div>{"Login: " + teacher.login}</div>
                <div>{"Password " + teacher.pass}</div>
                <div>{"University: " + teacher.university?.name}</div>
            </div>
            <div className="d-inline"><div className="btn btn-secondary" onClick={del}>delete</div></div>
        </div>
    )
}

function AddTeacher({setQ}) {
    let st={
        position:"fixed",
        width: "50%",
        height: "80%",
        left:"25%",
        top:"10%",
        background: "#6ca5ff",
    }
    const scrollRef = useRef(null);
    const[name,setName]=useState('')
    const[pass,setPass]=useState('')
    const[login,setLogin]=useState('')
    const[tgAccount,setTgAccount]=useState('')
    const[university,setUniversity]=useState({})
    const[universities,setUniversities]=useState([])
    const[names,setNames]=useState([])
    const handleClick=(e)=>{
        e.preventDefault()
        if(names.includes(login) || login<1){
            alert("Wrong login")
            return;
        }
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
                        getNames()
                            .then(setNames)
                    })
            })
    }
    useEffect(()=>{
        getNames()
            .then(setNames)
        getUniversities()
            .then(setUniversities)
    },[])

    return <div id="addForm" style={st} className="rounded-3" hidden>
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
            <div className="m-3">
                <label htmlFor="login" className="form-label">Login</label>
                <input id="login"
                       className="form-control"
                       value={login}
                       onChange={(e)=>setLogin(e.target.value)}
                />
                {names.includes(login) && <div className="form-text position-absolute text-danger">Login already exists</div>}
                {login<1 && <div className="form-text position-absolute text-danger">Wrong login</div>}
            </div>
            <div className="m-3">
                <label htmlFor="pass" className="form-label">Password</label>
                <input id="pass"
                       className="form-control"
                       value={pass}
                       onChange={(e)=>setPass(e.target.value)}
                />
            </div>
            <div className="m-3">
                <label htmlFor="tgAccount" className="form-label">TgAccount</label>
                <input id="tgAccount"
                       className="form-control"
                       value={tgAccount}
                       onChange={(e)=>setTgAccount(e.target.value)}
                />
            </div>
            <ScrollBox ref={scrollRef} setQ={setUniversity} list={universities} item={"University"}/>
            <button className="btn btn-primary" onClick={handleClick}>
                Submit
            </button>
        </form>
    </div>
}