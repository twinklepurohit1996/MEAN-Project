import {Schema,Document, model, Mixed} from "mongoose";

export interface feedbackDocument extends Document{
    username:String,
    rating:Number,
    feedback:String,
    user_Id:String,
    active?:Boolean
}

interface feedback{
    username:String,
    rating:Number,
    feedback:String,
    user_Id:String,
    active?:Boolean
    
}

const feedbackSchema = new Schema<feedback>({
    username :{
        type : String,
        required :true
    },
    rating :{
        type : Number,
        required :true
    },
    feedback :{
        type : String,
        required :true
    },
    user_Id :{ 
        type: Schema.Types.ObjectId, 
        ref: 'User',
        required :true 
    },
    active:{
        type: Boolean,
        default:false,
        
    },
},{timestamps : true});


const feedbackModel = model<feedback>('feedback',feedbackSchema);
export default feedbackModel;



