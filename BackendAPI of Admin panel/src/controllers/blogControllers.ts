import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const SECRET_KEY = "NOTESAPI";
import { createBlog, findBlog, findAndUpdateBlog, findB, deleteB } from '../services/blogServices';

const addBlog = async (req: Request, res: Response) => {
    if (!req.body || !req.file) {
        res.json({ "status": 404, "message": "Please Fill the field Properly" });
    }
    else {
        const { title, des, author } = req.body
        const file = req.file.originalname;
        const user = await findBlog({ title: title });
        if (user) {
            res.json({ "status": 400, "message": "Blog Already Inserted" });
        }
        else {
            const mydata = await createBlog({
                title: title, des: des, author: author, image: file
            });
            res.json({ "status": 200, "message": " Blog Data is successfully inserted!!" });

        }
    }
};

const showBlog = async (req: Request, res: Response) => {
    const user = await findB();
    res.json({ "status": 200, "message": "Data is successfully show!!", data: user });
}

const editBlog = async (req: Request, res: Response) => {
    const id = req.params.id;
    const blog = await findBlog({ _id: id });
    res.json({ "status": 200, "message": "Edit Data is Picked for Update", data: blog });
}

const updateBlog = async (req: Request, res: Response) => {
    const { title, des, author } = req.body
    const id = req.params.id;
    if (!req.file) 
    {
        const user = await findAndUpdateBlog({ _id: id }, {
            title: title, des: des, author: author
        }, { new: true });
        return res.json({ "status": 200, "message": "Data is successfully without image Updated!!" });
    }
    else {
        const file = req.file?.originalname;
        const user = await findAndUpdateBlog({ _id: id }, {
            title: title, des: des, author: author, image: file
        }, { new: true });
        return res.json({ "status": 200, "message": "Data is successfullywith image Updated!!" });
    }

}

const showBlogFront= async (req: Request, res: Response) => {
    const blog = await findB();
    res.json({ "status": 200, "message": "Data is successfully inserted!!", data: blog });
}

const showSingleBlog= async (req: Request, res: Response) => {
    const id = req.params.id;
    const blog = await findBlog({ _id: id });
    res.json({ "status": 200, "message": "Single Data pick For Single Blog Display by ID", data: blog })
};
const deleteBlog=async (req: Request, res: Response) => {
    const id = req.params.id;
    const mydata = await deleteB({ _id: id });
    return res.json({ "status": 200, "message": "Data is successfully deleted!!" });
};
export {showSingleBlog, editBlog, updateBlog,showBlogFront, addBlog, showBlog,deleteBlog }

