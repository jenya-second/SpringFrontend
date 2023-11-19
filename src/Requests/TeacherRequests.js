import {getQuery, postQuery} from "./Utils";

export function getTeachers(){
    return getQuery("teachers")
}

export function addTeacher(q){
    return postQuery("add_teacher",q)
}

export function delTeacher(id){
    return postQuery("del_teacher",id)
}