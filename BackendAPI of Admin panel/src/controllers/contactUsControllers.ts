import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const SECRET_KEY = "NOTESAPI";
import { createCont, findAndUpdateCont, findCont, deletecont, findC, findContAll } from '../services/contactUs_Services';
const cont = async (req: Request, res: Response) => {
    if (!req.body) {
        return res.json({ "status": 404, "message": "Please Fill the Data Properly" });
    }
    else {
        const { name, email, message, title } = req.body;
        const mydata = await createCont({ name: name, email: email, title: title, message: message });
        return res.json({ "status": 200, "message": "Contact Us Request Sent Successfully!!" });
    }


};
// "email" : { $regex: req.body.search}
const showContactus = async (req: Request, res: Response) => {
    console.log(req.body);
    if (req.body.search) {
        const user1 = await findContAll({
            $or: [
                { "name": { $regex: req.body.search } }, { "email": { $regex: req.body.search } }, { "message": { $regex: req.body.search } }, { "title": { $regex: req.body.search } }
            ]
        });
        res.json({ "status": 200, "message": "Data is successfully show!!", data: user1 });

    }
    else {
        const user = await findC();
        res.json({ "status": 201, "message": "Data is successfully show!!", data: user });

    }
    // if(req.body.email && req.body.title)
    // {
    //     const check3 = await findContAll({ email:req.body.email ,title:req.body.title});
    //     return res.json({ "status": 200, "message": "Data is successfully show!!", data:check3 });
    // }
    // else if(req.body.title)
    // {
    //     const check2 = await findContAll({ title:req.body.title });
    //     return res.json({ "status": 200, "message": "Data is successfully show!!", data:check2 });
    // }
    // else if(req.body.email)
    // {
    //     const check1 = await findContAll({ email:req.body.email });
    //     return res.json({ "status": 200, "message": "Data is successfully show!!", data:check1 });
    // }
    // 

}

const deleteContact = async (req: Request, res: Response) => {
    const id = req.params.id;
    const mydata = await deletecont({ _id: id });
    return res.json({ "status": 200, "message": "Data is successfully deleted!!" });

};

const getEmail = async (req: Request, res: Response) => {
    const useremail = await findC().distinct('email');
    res.json({ "status": 200, "message": "Data is successfully show!!", data: useremail });

}



export { cont, showContactus, deleteContact, getEmail }

