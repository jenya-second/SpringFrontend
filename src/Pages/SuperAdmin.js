import React, {useEffect, useState} from "react";
import {toggleAddForm} from "../Utils/Utils";
import {addSuperAdmin, delSuperAdmin, getSuperAdmins} from "../Requests/SuperAdminRequests";


export default function SuperAdminPage(){
    const [superAdmins,setSuperAdmins]=useState([])

    useEffect(() => {
        getSuperAdmins()
            .then(setSuperAdmins)
    }, []);

    return <div>
        <AddSuperAdmin setQ={setSuperAdmins}/>
        <div>Super Admins</div>
        <div onClick={toggleAddForm}>Add Super Admin</div>
        <div>
            {superAdmins.map(superAdmin=>(
                <SuperAdminMin setQ={setSuperAdmins} superAdmin={superAdmin} key={superAdmin.id}/>
            ))}
        </div>
    </div>
}

export function SuperAdminMin({setQ,superAdmin}){
    const del=(e)=>{
        e.preventDefault()
        delSuperAdmin(superAdmin.id)
            .then(()=>{
                getSuperAdmins()
                    .then(setQ)
            })
    }
    return(
        <div>
            <div>
                <div>{superAdmin.id + " " + superAdmin.login + " " + superAdmin.pass}</div>
            </div>
            <div onClick={del}>delete</div>
        </div>
    )
}

function AddSuperAdmin({setQ}) {
    let st={
        position:"fixed",
        width: "50%",
        height: "50%",
        left:"25%",
        top:"25%",
        background: "#6ca5ff",
    }
    const[login,setLogin]=useState('')
    const[pass,setPass]=useState('')

    const handleClick=(e)=>{
        e.preventDefault()
        const q= {login,pass}
        addSuperAdmin(q)
            .then(()=>{
                getSuperAdmins()
                    .then((res)=>{
                        setQ(res)
                        toggleAddForm()
                        setLogin("")
                        setPass("")
                    })

            })
    }

    return <div id="addForm" style={st} hidden>
        <div onClick={toggleAddForm}>X</div>
        <form noValidate autoComplete="off">
            <input id="login"
                   value={login}
                   onChange={(e)=>setLogin(e.target.value)}
            />
            <input id="pass"
                   value={pass}
                   onChange={(e)=>setPass(e.target.value)}
            />
            <button color="secondary" onClick={handleClick}>
                Submit
            </button>
        </form>
    </div>;
}