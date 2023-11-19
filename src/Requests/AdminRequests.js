import {getQuery, postQuery} from "./Utils";

export function getAdmins(){
    return getQuery("admins")
}

export function addAdmin(q){
    return postQuery("add_admin",q)
}

export function delAdmin(id){
    return postQuery("del_admin",id)
}