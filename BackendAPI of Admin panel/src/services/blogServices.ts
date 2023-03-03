import {DocumentDefinition,FilterQuery,UpdateQuery,QueryOptions} from 'mongoose';
import blog,{blogDocument} from "../models/blogModel";
export function createBlog(input:DocumentDefinition<blogDocument>)
{
    return blog.create(input);
}
export function findBlog(query:FilterQuery<blogDocument>,options:QueryOptions={learn:true}){
    return blog.findOne(query,{},options);
}
export function findB() {
    return blog.find();
}
export function findAndUpdateBlog(
    query:FilterQuery<blogDocument>,
    update:UpdateQuery<blogDocument>,
    options:QueryOptions
)
{
    return blog.findOneAndUpdate(query,update,options)
}

export function deleteB(query:FilterQuery<blogDocument>)
{
    return blog.deleteOne(query);
}