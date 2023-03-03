import {DocumentDefinition,FilterQuery,UpdateQuery,QueryOptions} from 'mongoose';
import User,{userDocument} from "../models/userModels";
export function createUser(input:DocumentDefinition<userDocument>)
{
    return User.create(input);
}
export function findUser(query:FilterQuery<userDocument>,options:QueryOptions={learn:true}){
    return User.findOne(query,{},options);
}
export function findAndUpdate(
    query:FilterQuery<userDocument>,
    update:UpdateQuery<userDocument>,
    options:QueryOptions
)
{
    return User.findOneAndUpdate(query,update,options)
}

export function deleteuser(query:FilterQuery<userDocument>)
{
    return User.deleteOne(query);
}
export function findU() {
    return User.find();
}