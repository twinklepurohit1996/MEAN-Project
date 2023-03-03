import {Request,Response} from 'express';
import {createCate,findAndUpdate,findCate,DeleteCate,findC} from '../services/cateServices'
import { findItem } from '../services/itemServices';


//Insert API of Categories
const insertC=async(req:Request,res:Response)=>{  
    if(!req.body.cname){
        res.json({"status":400,"message":"Please fill the data properly!!!"});
    }
    else
    {
        const mydata = await findCate({cate_name:req.body.cname});
        if(!mydata)
        {
            const member = await createCate({cate_name:req.body.cname});
            res.json({"status":200,"message":"Data is successfully inserted!!"});
        }  
        else
        {
            res.json({"status":401,"message":"Already Exist Categories!!!"});
        }
    }
  
}
//Show Categories Data
const cateShow=async(req:Request,res:Response)=>{
    const cate = await findC();
    res.json({"status":200,"message":"Data is successfully inserted!!",data:cate});
}


//Delete API of Categoies
const deleteCate = async(req:Request,res:Response)=>{
    const check = await findItem({cate_Id:req.params.id});
    // console.log("check"+check);
    if(!check)
    {
        const mydata = await DeleteCate({_id:req.params.id});
        return res.json({"status":200,"message":"Categories is successfully deleted!!"});
    }
    return res.json({"status":401,"message":"Categories already in use"});
};


//Edit Api of Categories
const editCate = async(req:Request,res:Response)=>{
    const id = req.params.id;
    const cate = await findCate({_id:id});
    res.json({"status":200,"message":"Edit Data is Picked for Update",data:cate});
};


//Update Api of Categories
const updateCate = async(req:Request,res:Response)=>{
    const id = req.params.id;
    const cname = req.body.cname;
    const cate = await findAndUpdate({_id:id},{cate_name:cname},{new:true});
    res.json({"status":200,"message":"Data is successfully Updated!!"});
};


//Show Categories in Front End Dropdown
const showCate = async (req:Request,res:Response)=>{
    const cate1 = await findC();
    return res.json({"status":200,"message":"Data is successfully GET For Categories dropdown!!",data:cate1});
};
export {cateShow,insertC,editCate,deleteCate,updateCate,showCate}