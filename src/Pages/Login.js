import React, {useState} from 'react';

export default function Login() {
    const[name,setName]=useState('')
    const[pass,setPass]=useState('')

    const handleClick=(e)=>{
        e.preventDefault()
        console.log({name,pass})
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