import React, {forwardRef, useImperativeHandle, useState} from "react";
import {createAuthProvider} from "./Auth";
export const {useAuth, authFetch, login, logout, getName} = createAuthProvider();

export function postQuery(url,par){
    return authFetch(process.env.REACT_APP_LOCAL_URL+url,{
        method: "POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(par)
    })
        .then((res)=>{
            if (res.ok) {
                return res
            } else {
                throw new Error("Bad request")
            }
        })
        .then(res=>res.json())
        .then((res)=>{
            if(res?.res)(
                logout()
            )
            else{
                return res
            }
        })
}

export function getQuery(url){
    return authFetch(process.env.REACT_APP_LOCAL_URL+url)
        .then((res)=>{
            if (res.ok) {
                return res
            } else {
                throw new Error("Bad request")
            }
        })
        .then(res=>res.json())
        .then((res)=>{
            if(res?.res)(
                logout()
            )
            else{
                return res
            }
        })
}

export function toggleAddForm(){
    const el = document.getElementById("addForm")
    el.hidden=!el.hidden
}

export const ScrollBox = forwardRef((props,ref)=> {
    let st={
        position:"absolute"
    }
    let st1={
        background:"#ffffff",
        width:"300px"
    }
    let dat=[]
    const [inp,setInp] = useState("")
    props.list.forEach((i)=>{
        if(i.name.toLowerCase().includes(inp.toLowerCase())){
            dat.push(i)
        }
    })
    useImperativeHandle(ref, () => ({
        a(){return setInp('');}
    }));
    return <div ref={ref}>
        <input id="scrollInput"
               value={inp}
               onChange={(e)=>{setInp(e.target.value)}}
               onFocus={()=>{
                   document.getElementById("scrollItems").hidden=false
               }}
        />
        <div hidden id="scrollItems" style={st}>
            {dat.map(i=>(
                <div style={st1} key={i.id} onClick={()=>{
                    document.getElementById("scrollItems").hidden=true
                    props.setQ(i)
                    setInp(i.name)
                }}>
                    {i.name}
                </div>
            ))}
        </div>
    </div>
})