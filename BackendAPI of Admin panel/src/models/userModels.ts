import {Schema,Document, model,Model} from "mongoose";

export interface userDocument extends Document{
    email:string,
    password:string,
    firstname:string,
    lastname:string,
    mob:Number,
    xgen:string,
    city:string,
    role?:string,
    image:String,
    dob?:Date,

}

interface User{
    email:string,
    password:string,
    firstname:string,
    lastname:string,
    mob:Number,
    xgen:string,
    city:string,
    role?:string,
    image:String,
    dob?:Date,

}


const UserSchema = new Schema<User>({
    email :{
        type : String,
        required :true
    },
    password :{
        type : String,
        required :true
    },
    firstname :{
        type : String,
        required :true
    },
    lastname :{
        type : String,
        required :true
    },
    mob :{
        type : Number,
        required :true
    },
    xgen :{
        type: String,
        required:true
    },
    city :{
        type: String,
        required:true
    },
    role:{
        type:String,
        enum:['Admin','Developer','User'],
        default:'User'
    },
    dob :{
        type:   Date,
        required:true
    },
    image:{
        type:String,
        required:true
    }
},{timestamps : true});

const UserModel = model<User>('User',UserSchema);
export default UserModel;

