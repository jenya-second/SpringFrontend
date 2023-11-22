import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css';
import App from './Pages/App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./Pages/Login";
import {QuestionPage} from "./Pages/Question";
import {UpdateQuestion} from "./Pages/UpdateQuestion";
import StudentPage from "./Pages/Student";
import UniversityPage from "./Pages/University";
import SuperAdminPage from "./Pages/SuperAdmin";
import AdminPage from "./Pages/Admin";
import TeacherPage from "./Pages/Teacher";
import {CollectionPage} from "./Pages/Collection";
import {UpdateCollection} from "./Pages/UpdateCollection";
import {DisciplinePage} from "./Pages/Discipline";
import {UpdateDiscipline} from "./Pages/UpdateDiscipline";
import {GroupPage} from "./Pages/Group";
import {UpdateGroup} from "./Pages/UpdateGroup";
import {TestPage} from "./Pages/Test";
import {UpdateTest} from "./Pages/UpdateTest";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/student" element={<StudentPage/>}/>
            <Route path="/question/:id" element ={<UpdateQuestion/>} action={({ params }) => {}}/>
            <Route path="/question" element={<QuestionPage/>}/>
            <Route path="/university" element={<UniversityPage/>}/>
            <Route path="/superAdmin" element={<SuperAdminPage/>}/>
            <Route path="/admin" element={<AdminPage/>}/>
            <Route path="/teacher" element={<TeacherPage/>}/>
            <Route path="/collection/:id" element ={<UpdateCollection/>} action={({ params }) => {}}/>
            <Route path="/collection" element={<CollectionPage/>}/>
            <Route path="/discipline/:id" element ={<UpdateDiscipline/>} action={({ params }) => {}}/>
            <Route path="/discipline" element={<DisciplinePage/>}/>
            <Route path="/group/:id" element ={<UpdateGroup/>} action={({ params }) => {}}/>
            <Route path="/group" element={<GroupPage/>}/>
            <Route path="/test/:id" element ={<UpdateTest/>} action={({ params }) => {}}/>
            <Route path="/test" element={<TestPage/>}/>
        </Routes>
    </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
