import {getQuery, postQuery} from "./Utils";

export function getStudents(){
    return getQuery("students")
}

export function addStudent(q){
    return postQuery("add_student",q)
}

export function delStudent(id){
    return postQuery("del_student",id)
}