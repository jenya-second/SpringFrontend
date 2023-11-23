import {getQuery, postQuery} from "../Utils/Utils";

export function getGroups(){
    return getQuery("groups")
}

export function getGroupById(id){
    return postQuery("group_by_id",id)
}

export function getGroupsByCollectionId(id){
    return postQuery("groups_by_collection_id",id)
}

export function addGroup(q){
    return postQuery("add_group",q)
}

export function addGroupToQuestion(q){
    return postQuery("add_group_to_question",q)
}

export function delGroup(id){
    return postQuery("del_group",id)
}

export function delGroupToQuestion(q){
    return postQuery("del_group_to_question",q)
}