import React, {useState} from 'react';
import {postQuery} from "../Utils/Utils";

export default function Login() {
    const[name,setName]=useState('')
    const[pass,setPass]=useState('')

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
                postQuery("claim", res.accessToken)
                    .then(console.log)
            })
    }

    return(
        <div>
            <form noValidate autoComplete="off">
                <input id="name"
                       value={name}
                       onChange={(e)=>setName(e.target.value)}
                />
                <input id="pass"
                       value={pass}
                       onChange={(e)=>setPass(e.target.value)}
                />
                <button color="secondary" onClick={handleClick}>
                    Submit
                </button>
            </form>
        </div>
    )
}