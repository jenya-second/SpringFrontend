import {createAuthProvider} from "./Auth";
import React from 'react';
import {Outlet} from "react-router-dom";
export const {useAuth, authFetch, login, logout, getName} = createAuthProvider();

export default function Header() {
    const [logged] = useAuth();
    if(!logged){
        window.location.replace("/login")
    }

    const clickHandle=()=>{
        logout()
        window.location.replace("/login")
    }

    return (
        <div>
            <header>
                Hello, {getName()}
                <div onClick={clickHandle}>Logout</div>
            </header>
            <Outlet/>
        </div>
    )
}