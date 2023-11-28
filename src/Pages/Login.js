import React, {useState} from 'react';
import {createAuthProvider} from "../Utils/Auth";
export const {useAuth, authFetch, login, logout, getName} = createAuthProvider();

export default function Login() {
    const[name,setName]=useState('')
    const[pass,setPass]=useState('')
    const [logged] = useAuth();
    if(logged){
        window.location.replace("/")
    }

    const handleClick=(e)=>{
        e.preventDefault()
        return fetch(process.env.REACT_APP_LOCAL_URL+"login",{
            method: "POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({login:name,password:pass})
        })
            .then((res)=>{
                if (res.ok) {
                    return res
                } else {
                    throw new Error("Bad request")
                }
            })
            .then(res=>res.json())
            .then((res)=> {
                if(res?.res){
                    alert("Can't find user")
                }
                else{
                    login(res,name)
                    window.location.replace("/")
                }
            })
    }
    let st={
        position:"fixed",
        width: "50%",
        height: "50%",
        left:"25%",
        top:"25%",
        background: "#6ca5ff",
    }
    return(
        <div style={st} className="rounded-3">
            <form className="m-3" noValidate autoComplete="off">
                <div className="m-3">
                    <label htmlFor="name" className="form-label">Login</label>
                    <input id="name"
                           className="form-control"
                           value={name}
                           onChange={(e)=>setName(e.target.value)}
                    />
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
        </div>
    )
}