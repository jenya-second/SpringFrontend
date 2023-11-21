import {getQuery, postQuery} from "./Utils";

export function getCollectionById(id){
    return postQuery("collection_by_id",id)
}

export function getCollections(){
    return getQuery("collections")
}

export function delCollection(id){
    return postQuery("del_collection",id)
}

export function addCollection(q){
    return postQuery("add_collection",q)
}

export function addCollectionToQuestion(q){
    return postQuery("add_collection_to_question",q)
}

export function delCollectionToQuestion(q){
    return postQuery("del_collection_to_question",q)
}