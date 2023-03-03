import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const SECRET_KEY = "NOTESAPI";
import { createUser, findAndUpdate, findUser, deleteuser, findU } from '../services/userServices'


const register = async (req: Request, res: Response) => {
    if (!req.body || !req.file) {
        res.json({ "status": 404, "message": "Please Fill the field Properly" });
    }
    else if (req.body.password != req.body.confirmPassword) {
        res.json({ "status": 401, "message": "Please Match the password" });
    }
    else {
        const { email, password, firstname, lastname, mob, xgen, city, dob, role } = req.body
        const file = req.file.originalname;
        const user = await findUser({ email: email });
        if (user) {
            res.json({ "status": 400, "message": "User Already Registered" });
        }
        else {
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(password, salt);
            const mydata = await createUser({
                email: email, password: hash, firstname: firstname, lastname: lastname, mob: mob, xgen: xgen, city: city, role: role, image: file, dob: dob
            });
            res.json({ "status": 200, "message": "Data is successfully inserted!!" });
        }
    }
}





const log = async (req: Request, res: Response) => {
    if (!req.body.email) {
        res.json({ "status": 400, "message": "Please fill the data properly!!!" });
    }
    else {
        const user = await findUser({ email: req.body.email, role: 'Admin' });
        if (user) {
            const hash = user.password;
            var pass = await bcrypt.compare(req.body.password, hash)
            if (pass) {
                const token = jwt.sign({ email: user.email, id: user._id }, SECRET_KEY);
                res.json({ "status": 200, "message": "Successfully logged In", data: user, token: token });
            }
        }
        else {
            res.json({ "status": 400, "message": "Please fill the data properly!!!" });
        }
    }
}



const login = async (req: Request, res: Response) => {
    if (!req.body.email) {
        res.json({ "status": 400, "message": "Please fill the data properly!!!" });
    }
    else {
        const user = await findUser({ email: req.body.email });
        if (user) {
            const hash = user.password;
            var pass = await bcrypt.compare(req.body.password, hash)
            if (pass) {
                const token = jwt.sign({ email: user.email, id: user._id }, SECRET_KEY);
                res.json({ "status": 200, "message": "Successfully logged In", data: user, token: token });
            }
        }
        else {
            res.json({ "status": 400, "message": "Please fill the data properly!!!" });
        }
    }
}







const userData = async (req: Request, res: Response) => {
    const id = req.params.id;
    const user = await findUser({ "_id": id });
    return res.json({ "status": 200, "message": "User Infomation Get", data: user });
}

const user = async (req: Request, res: Response) => {

    const user = await findU();
    
    res.json({ "status": 200, "message": "Data is successfully inserted!!", data: user });
}

const editUser = async (req: Request, res: Response) => {
    const id = req.params.id;
    const user = await findUser({ _id: id });
    res.json({ "status": 200, "message": "Edit Data is Picked for Update", data: user });
};

const updateUser = async (req: Request, res: Response) => {
    const { email, password, firstname, lastname, mob, xgen, city, dob, role } = req.body
    const file = req.file?.originalname;
    const id = req.params.id;
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    const user = await findAndUpdate({ _id: id }, {
        email: email, password: hash, firstname: firstname, lastname: lastname, mob: mob, xgen: xgen, city: city, role: role, image: file, dob: dob
    }, { new: true });
    return res.json({ "status": 200, "message": "Data is successfully Updated!!" });

};

const deleteUser = async (req: Request, res: Response) => {
    const id = req.params.id;
    const check = await findUser({ _id: id, role: 'Admin' });
    console.log(check);
    if (!check) {
        const mydata = await deleteuser({ _id: id });
        return res.json({ "status": 200, "message": "User is successfully deleted!!" });
    }
    return res.json({ "status": 401, "message": "User is Admin u can't delete" });

};


export { login, register, log, userData, editUser, updateUser, user, deleteUser }

