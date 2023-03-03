import {Schema,Document, model} from "mongoose";

export interface cateDocument extends Document{
    cate_name:string,
}

interface cate{
    cate_name:string,
}

const cateSchema = new Schema<cate>({
    cate_name :{
        type : String,
        required :true
    }
},{timestamps : true});


const cateModel = model<cate>('Cate',cateSchema);
export default cateModel;



