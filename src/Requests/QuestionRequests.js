import {getQuery, postQuery} from "../Utils/Utils";

export function getQuestionById(id){
    return postQuery("question_by_id",id)
}

export function getQuestions(){
    return getQuery("questions")
}

export function delQuestion(id){
    return postQuery("del_question",id)
}

export function addQuestion(q){
    return postQuery("add_question",q)
}