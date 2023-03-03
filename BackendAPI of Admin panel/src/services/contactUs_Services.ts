import {DocumentDefinition,FilterQuery,UpdateQuery,QueryOptions} from 'mongoose';
import cont,{contDocument} from "../models/contactUs_Model";
export function createCont(input:DocumentDefinition<contDocument>)
{
    return cont.create(input);
}
export function findCont(query:FilterQuery<contDocument>,options:QueryOptions={learn:true}){
    return cont.findOne(query,{},options);
}
export function findC() {
    return cont.find();
}
export function findAndUpdateCont(
    query:FilterQuery<contDocument>,
    update:UpdateQuery<contDocument>,
    options:QueryOptions
)
{
    return cont.findOneAndUpdate(query,update,options)
}

export function deletecont(query:FilterQuery<contDocument>)
{
    return cont.deleteOne(query);
}
export function findContAll(query:FilterQuery<contDocument>,options:QueryOptions={learn:true}){
    return cont.find(query,{},options);
}