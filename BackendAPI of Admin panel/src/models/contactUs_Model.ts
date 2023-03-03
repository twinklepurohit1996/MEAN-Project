import {Schema,Document, model} from "mongoose";

export interface contDocument extends Document{
    name:string,
    email:string,
    message:string,
    title:string
}

interface cont{
    name:string,
    email:string,
    message:string,
    title:string
}

const contSchema = new Schema<cont>({
    name :{
        type : String,
        required :true
    },
    email :{
        type : String,
        required :true
    },
    message :{
        type : String,
        required :true
    },
    title:{
        type:String,
        enum:['Job opportunity','Shopping'],
        default:'Job opportunity'
    },
},{timestamps : true});


const contModel = model<cont>('Cont',contSchema);
export default contModel;