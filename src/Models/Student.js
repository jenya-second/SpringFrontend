import React from "react";

export default function Student({student}){
    return (<div style={{margin:"10px",padding:"15px", textAlign:"left"}} key={student.id}>
        Id:{student.id}<br/>
        Name:{student.name}<br/>
        Email:{student.pass}
    </div>)
}