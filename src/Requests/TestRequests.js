import {getQuery, postQuery} from "../Utils/Utils";

export function getTests(){
    return getQuery("tests")
}

export function getTestById(id){
    return postQuery("test_by_id",id)
}

export function getTestToGroupByTest(q){
    return postQuery("tests_to_groups",q)
}

export function getTestToGroupByTestId(q){
    return postQuery("tests_to_groups_by_test_id",q)
}
export function addTest(q){
    return postQuery("add_test",q)
}

export function addTestToGroup(q){
    return postQuery("add_test_to_group",q)
}

export function delTest(id){
    return postQuery("del_test",id)
}

export function delTestToGroup(q){
    return postQuery("del_test_to_group",q)
}