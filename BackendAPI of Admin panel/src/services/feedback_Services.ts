import {DocumentDefinition,FilterQuery,UpdateQuery,QueryOptions} from 'mongoose';
import feedback,{feedbackDocument} from "../models/feedbackModel";
export function createFeedback(input:DocumentDefinition<feedbackDocument>)
{
    return feedback.create(input);
}
export function findFeedback(query:FilterQuery<feedbackDocument>,options:QueryOptions={learn:true}){
    return feedback.findOne(query,{},options);
}
export function findAndUpdateF(
    query:FilterQuery<feedbackDocument>,
    update:UpdateQuery<feedbackDocument>,
    options:QueryOptions
)
{
    return feedback.findOneAndUpdate(query,update,options)
}

export function deleteFeedback(query:FilterQuery<feedbackDocument>)
{
    return feedback.deleteOne(query);
}
export function findF() {
    return feedback.find();
}

export function findFeedbackAll(query:FilterQuery<feedbackDocument>,options:QueryOptions={learn:true}){
    return feedback.find(query,{},options);
}