import React from 'react';
import {Route} from "react-router-dom";
import App from "../Pages/App";
import Login from "../Pages/Login";


export default function Routes() {
    return(
        <Routes>
            <Route path="/" element={<App/>}/>
            <Route path="/login" element={<Login/>}/>
        </Routes>
    )
}