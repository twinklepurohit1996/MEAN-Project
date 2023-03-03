import { Request, Response } from 'express';
import { findC, findCate } from '../services/cateServices'
import { createItem, findAndUpdateI, findItem, DeleteItem, findI, findItemAll } from '../services/itemServices'

//Insert Api of Item
const insertItem = async (req: Request, res: Response) => {
    if (!req.body || !req.file) {
        res.json({ "status": 400, "message": "Please fill the data properly!!!" });
    }
    else {
        var { iname, des, price, qnty, cate_Id } = req.body;
        const file = req.file.originalname;
        const item = await findItem({ item_name: iname });
        if (!item) {
            const mydata = await createItem({
                item_name: iname, file: file, des: des, price: price, qnty: qnty, cate_Id
            });
            console.log(mydata);
            res.json({ "status": 200, "message": "Data is successfully inserted!!" });
        }
        else {
            res.json({ "status": 401, "message": "Already Exist Categories!!!" });
        }
    }

};

//DropDown of Categories
const item = async (req: Request, res: Response) => {
    const cate = await findC();
    res.json({ "status": 200, "message": "Data is successfully Get of Dropdown!!", data: cate });
}

//Show Item Data
const itemShow = async (req: Request, res: Response) => {
    // console.log("Helllo");
    const itemData = await findI().populate("cate_Id");
    res.json({ "status": 200, "message": "Data is successfully GET!!", data: itemData });

}

//Delete API of Item
const deleteItem = async (req: Request, res: Response) => {
    const id = req.params.id;

    const mydata = await DeleteItem({ _id: id });
    return res.json({ "status": 200, "message": "Data is successfully deleted!!" });



};

//Edit Api of Item
const editItem = async (req: Request, res: Response) => {
    const id = req.params.id;
    const item = await findItem({ _id: id }).populate("cate_Id");
    res.json({ "status": 200, "message": "Edit Data is Picked for Update", data: item });
};

//Update Api of Item
const updateItem = async (req: Request, res: Response) => {
    const id = req.params.id;
    const { iname, des, price, qnty, cate_Id } = req.body;
    if (!req.file) {
        console.log("without image")
        const cate = await findAndUpdateI({ _id: id }, { "item_name": iname, "price": price, "des": des, "qnty": qnty, "cate_Id": cate_Id }, { new: true });
        res.json({ "status": 200, "message": "Data is successfully without image Updated!!" });

    }
    else {
        console.log("image")

        const file = req.file?.originalname;
        const cate = await findAndUpdateI({ _id: id }, { "item_name": iname, "file": file, "price": price, "qnty": qnty, "cate_Id": cate_Id }, { new: true });
        res.json({ "status": 200, "message": "Data is successfully with image Updated!!" });
    }

};


//Frontend Item
const getItem = async (req: Request, res: Response) => {
    const id = req.params.id;
    const item = await findItemAll({ cate_Id: id });
    return res.json({ "status": 200, "message": "Data is successfully get by params", data: item });

}
export { item, itemShow, insertItem, editItem, updateItem, deleteItem, getItem }