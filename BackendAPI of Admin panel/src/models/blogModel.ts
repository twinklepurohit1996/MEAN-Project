import {Schema,Document, model} from "mongoose";

export interface blogDocument extends Document{
    title:string,
    des:string,
    author:string,
    image:string
}

interface blog{
    title:string,
    des:string,
    author:string,
    image:string
}

const blogSchema = new Schema<blog>({
    title :{
        type : String,
        required :true
    },
    des :{
        type : String,
        required :true
    },
    author :{
        type : String,
        required :true
    },
    image:{
        type:String,
        required:true
    },
},{timestamps : true});


const blogModel = model<blog>('Blog',blogSchema);
export default blogModel;