import {getQuery, postQuery} from "../Utils/Utils";

export function getSuperAdmins(){
    return getQuery("super_admins")
}

export function addSuperAdmin(q){
    return postQuery("add_super_admin",q)
}

export function delSuperAdmin(id){
    return postQuery("del_super_admin",id)
}