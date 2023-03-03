import {Schema,Document, model, Mixed} from "mongoose";

export interface itemDocument extends Document{
    item_name:string,
    file:string,
    des:string,
    price:Number,
    qnty:Number,
    cate_Id?:Mixed
}

interface item{
    item_name:string,
    file:string,
    des:string,
    price:Number,
    qnty:Number,
    cate_Id?:Mixed
    
}

const itemSchema = new Schema<item>({
    item_name :{
        type : String,
        required :true
    },
    file :{
        type : String,
        required :true
    },
    des :{
        type : String,
        required :true
    },
    price :{
        type : Number,
        required :true
    },
    qnty :{
        type : Number,
        required :true
    },
    cate_Id :{ 
        type: Schema.Types.ObjectId, 
        ref: 'Cate',
        required :true 
    }
},{timestamps : true});


const itemModel = model<item>('item',itemSchema);
export default itemModel;



