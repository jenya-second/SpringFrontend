import React, {useEffect, useRef, useState} from "react";
import {getNames, ScrollBox, toggleAddForm} from "../Utils/Utils";
import {getUniversities} from "../Requests/UniversityRequests";
import {addAdmin, delAdmin, getAdmins} from "../Requests/AdminRequests";

export default function AdminPage(){
    const [admins,setAdmins]=useState([])

    useEffect(() => {
        getAdmins()
            .then(setAdmins)
    }, []);

    return <div>
        <AddAdmin setQ={setAdmins}/>
        <div>Admins</div>
        <div onClick={toggleAddForm}>Add admin</div>
        <div>
            {admins.map(admin=>(
                <AdminMin setQ={setAdmins} admin={admin} key={admin.id}/>
            ))}
        </div>
    </div>
}

export function AdminMin({setQ,admin}){
    const del=(e)=>{
        e.preventDefault()
        delAdmin(admin.id)
            .then(()=>{
                getAdmins()
                    .then(setQ)
            })
    }
    return(
        <div>
            <div>
                <div>{admin.id + " " + admin.name + " " + admin.login + " " + admin.pass + " " + admin.university?.name}</div>
            </div>
            <div onClick={del}>delete</div>
        </div>
    )
}

function AddAdmin({setQ}) {
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
    const[login,setLogin]=useState('')
    const[pass,setPass]=useState('')
    const[university,setUniversity]=useState({})
    const[universities,setUniversities]=useState([])
    const[names,setNames]=useState([])

    const handleClick=(e)=>{
        e.preventDefault()
        if(names.includes(login) || login<1){
            alert("Wrong login")
            return;
        }
        const q= {name,login,pass,university}
        addAdmin(q)
            .then(()=>{
                getAdmins()
                    .then((res)=>{
                        setQ(res)
                        toggleAddForm()
                        setName("")
                        setLogin("")
                        setPass("")
                        setUniversity({})
                        scrollRef.current.a();
                    })
            })
    }
    useEffect(()=>{
        getNames()
            .then(setNames)
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
            {names.includes(login) && <div>Login already exists</div>}
            {login<1 && <div>Wrong login</div>}
            <input id="login"
                   value={login}
                   onChange={(e)=>setLogin(e.target.value)}
            />
            <input id="pass"
                   value={pass}
                   onChange={(e)=>setPass(e.target.value)}
            />
            <ScrollBox ref={scrollRef} setQ={setUniversity} list={universities}/>
            <button color="secondary" onClick={handleClick}>
                Submit
            </button>
        </form>
    </div>;
}