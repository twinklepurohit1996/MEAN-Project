import {DocumentDefinition,FilterQuery,UpdateQuery,QueryOptions} from 'mongoose';
import cate,{cateDocument} from "../models/cateModels";
export function createCate(input:DocumentDefinition<cateDocument>)
{
    return cate.create(input);
}
export function findCate(query:FilterQuery<cateDocument>,options:QueryOptions={learn:true}){
    return cate.findOne(query,{},options);
}
export function findC() {
    return cate.find();
}
export function findAndUpdate(
    query:FilterQuery<cateDocument>,
    update:UpdateQuery<cateDocument>,
    options:QueryOptions
)
{
    return cate.findOneAndUpdate(query,update,options)
}

export function DeleteCate(
    query: FilterQuery<cateDocument>

){
    return cate.deleteOne(query);
    
}