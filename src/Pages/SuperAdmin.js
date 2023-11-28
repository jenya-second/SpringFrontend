import React, {useEffect, useState} from "react";
import {getNames, toggleAddForm} from "../Utils/Utils";
import {addSuperAdmin, delSuperAdmin, getSuperAdmins} from "../Requests/SuperAdminRequests";


export default function SuperAdminPage(){
    const [superAdmins,setSuperAdmins]=useState([])

    useEffect(() => {
        getSuperAdmins()
            .then(setSuperAdmins)
    }, []);

    return <div className="m-3">
        <AddSuperAdmin setQ={setSuperAdmins}/>
        <div className="bg-primary-subtle p-3 text-primary-emphasis fs-5 rounded-2 d-grid">
            <div>Super Admins</div>
            <div className="btn btn-secondary gap-2 d-md-block" onClick={toggleAddForm}>Add Super Admin</div>
        </div>
        <div>
            {superAdmins.sort().map(superAdmin=>(
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
        <div className="border border-success bg-success-subtle m-1 p-2 text-primary-emphasis fs-6 rounded-4 d-grid">
            <div className="bg-primary-subtle border border-primary p-1 text-primary-emphasis fs-6 rounded-2 d-grid">
                <div>{"Login: " + superAdmin.login}</div>
                <div>{"Password: " + superAdmin.pass}</div>
            </div>
            <div className="d-inline"><div className="btn btn-secondary" onClick={del}>delete</div></div>

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
    const[names,setNames]=useState([])

    const handleClick=(e)=>{
        e.preventDefault()
        if(names.includes(login) || login<1){
            alert("Wrong login")
            return;
        }
        const q= {login,pass}
        addSuperAdmin(q)
            .then(()=>{
                getSuperAdmins()
                    .then((res)=>{
                        setQ(res)
                        toggleAddForm()
                        setLogin("")
                        setPass("")
                        getNames()
                            .then(setNames)
                    })

            })
    }

    useEffect(()=>{
        getNames()
            .then(setNames)
    },[])

    return <div id="addForm" style={st} className="rounded-3" hidden>
        <div className="m-3 btn-close" onClick={toggleAddForm}></div>
        <form className="m-3" noValidate autoComplete="off">
            <div className="m-3">
                <label htmlFor="login" className="form-label">Login</label>
                <input id="login"
                       className="form-control"
                       value={login}
                       onChange={(e)=>setLogin(e.target.value)}
                />
                {names.includes(login) && <span className="form-text position-absolute text-danger">Login already exists</span>}
                {login<1 && <span className="form-text position-absolute text-danger">Wrong login</span>}
            </div>
            <div className="m-3">
                <label htmlFor="pass" className="form-label">Password</label>
                <input id="pass"
                       className="form-control"
                       value={pass}
                       onChange={(e)=>setPass(e.target.value)}
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