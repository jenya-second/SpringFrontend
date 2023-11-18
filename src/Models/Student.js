import React, {useEffect} from "react";


function getStudents(){
    return fetch(process.env.REACT_APP_LOCAL_URL+"/students")
        .then((res)=>{
            if(res.ok){
                return res
            }
        })
}
export default function StudentPage(){
    useEffect(() => {
        getStudents()
            .then(res => res.json())
            .then((res)=>{
                console.log(res)
            })
    }, []);

    return (<div style={{margin:"10px",padding:"15px", textAlign:"left"}} >

    </div>)
}

export function Student({student}){
    return (<div style={{margin:"10px",padding:"15px", textAlign:"left"}} key={student.id}>
        Id:{student.id}<br/>
        Name:{student.name}<br/>
        Email:{student.pass}
    </div>)
}