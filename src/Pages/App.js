import '../css/App.css';
import React from 'react';
import {Link} from "react-router-dom";
import {createAuthProvider} from "../Utils/Auth";
import Header from "../Utils/Header";
export const {useAuth, getUserInfo, authFetch, login, logout, getName} = createAuthProvider();

function App() {
    const [logged,userInfo] = useAuth();
    return (
        <div>
            {userInfo.role>2 &&
                (
                    <div><Link to={"/superAdmin"}>SuperAdmin</Link></div>
            )}
            {userInfo.role>1 &&(<>
            <div><Link to={"/admin"}>Admin</Link></div>
            <div><Link to={"/teacher"}>Teacher</Link></div>
            </>)}
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
