import React from 'react';
import {Link} from "react-router-dom";
import {createAuthProvider} from "../Utils/Auth";
export const {useAuth, getUserInfo, authFetch, login, logout, getName} = createAuthProvider();

function App() {
    const [logged,userInfo] = useAuth();
    return (
        <div className="list-group m-2">
            {userInfo.role>2 &&
                (
                    <Link className="list-group-item list-group-item-action" to={"/superAdmin"}>SuperAdmin</Link>
            )}
            {userInfo.role>1 &&(<>
            <Link className="list-group-item list-group-item-action" to={"/admin"}>Admin</Link>
            <Link className="list-group-item list-group-item-action" to={"/teacher"}>Teacher</Link>
            </>)}
            <Link className="list-group-item list-group-item-action" to={"/student"}>Student</Link>
            <Link className="list-group-item list-group-item-action" to={"/university"}>University</Link>
            <Link className="list-group-item list-group-item-action" to={"/students_answer"}>StudentsAnswer</Link>
            <Link className="list-group-item list-group-item-action" to={"/discipline"}>Disciplines</Link>
            <Link className="list-group-item list-group-item-action" to={"/collection"}>Collection</Link>
            <Link className="list-group-item list-group-item-action" to={"/group"}>Group</Link>
            <Link className="list-group-item list-group-item-action" to={"/question"}>Question</Link>
            <Link className="list-group-item list-group-item-action" to={"/test"}>Test</Link>
        </div>
    );
}

export default App;
