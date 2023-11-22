import {getQuery, postQuery} from "./Utils";

export function getDisciplines(){
    return getQuery("disciplines")
}

export function getDisciplineById(id){
    return postQuery("discipline_by_id",id)
}

export function addDiscipline(q){
    return postQuery("add_discipline",q)
}

export function addDisciplineToCollection(q){
    return postQuery("add_discipline_to_collection",q)
}

export function delDiscipline(id){
    return postQuery("del_discipline",id)
}

export function delDisciplineToCollection(q){
    return postQuery("del_discipline_to_collection",q)
}