import {DocumentDefinition,FilterQuery,UpdateQuery,QueryOptions} from 'mongoose';
import item,{itemDocument} from "../models/itemModels";
export function createItem(input:DocumentDefinition<itemDocument>)
{
    return item.create(input);
}
export function findItem(query:FilterQuery<itemDocument>,options:QueryOptions={learn:true}){
    return item.findOne(query,{},options);
}
export function findItemAll(query:FilterQuery<itemDocument>,options:QueryOptions={learn:true}){
    return item.find(query,{},options);
}
export function findI() {
    return item.find();
}
export function findAndUpdateI(
    query:FilterQuery<itemDocument>,
    update:UpdateQuery<itemDocument>,
    options:QueryOptions
)
{
    return item.findOneAndUpdate(query,update,options)
}

export function DeleteItem(
    query: FilterQuery<itemDocument>

){
    return item.deleteOne(query);
    
}