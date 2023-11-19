import {getQuery, postQuery} from "./Utils";

export function getUniversities(){
    return getQuery("universities")
}

export function addUniversity(q){
    return postQuery("add_university",q)
}

export function delUniversity(id){
    return postQuery("del_university",id)
}