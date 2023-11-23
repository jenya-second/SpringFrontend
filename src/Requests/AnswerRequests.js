import {postQuery} from "../Utils/Utils";

export function getAnswersByQuestion(id){
    return postQuery("answers_by_question",id)
}

export function addAnswer(q){
    return postQuery("add_answer",q)
}

export function delAnswer(id){
    return postQuery("del_answer",id)
}