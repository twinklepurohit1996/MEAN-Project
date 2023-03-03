import mongoose,{connect} from "mongoose";

function connects()
{
    return connect("mongodb://0.0.0.0:27017/meanApi")
    .then(()=>{
        console.log("db connected");
    }).catch((error)=>{
        console.log(error);
    })
}

export default connects