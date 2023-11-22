import '../css/App.css';
import React from 'react';
import {Link} from "react-router-dom";

function App() {
    return (
        <div>
            <div><Link to={"/superAdmin"}>SuperAdmin</Link></div>
            <div><Link to={"/admin"}>Admin</Link></div>
            <div><Link to={"/teacher"}>Teacher</Link></div>
            <div><Link to={"/student"}>Student</Link></div>
            <div><Link to={"/university"}>University</Link></div>
            <div><Link to={"/students_answer"}>StudentsAnswer</Link></div>
            <div><Link to={"/discipline"}>Disciplines</Link></div>
            <div><Link to={"/collection"}>Collection</Link></div>
            <div><Link to={"/group"}>Group</Link></div>
            <div><Link to={"/question"}>Question</Link></div>
            <div><Link to={"/test"}>Test</Link></div>
        </div>
    );
}

export default App;
