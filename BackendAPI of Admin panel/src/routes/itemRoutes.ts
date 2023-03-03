import express from 'express';
import {item,itemShow,insertItem,editItem,updateItem,deleteItem,getItem} from '../controllers/itemContorllers'

import multer from 'multer';
import auth from '../middleware/middleware';

var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './public/images/itemImage');
     },
    filename: function (req, file, cb) {
        cb(null , file.originalname);
    }
});
var upload = multer({ storage: storage })
const itemRoutes=express.Router();

itemRoutes.get('/item',auth,item);

itemRoutes.post('/insertItem',upload.single('file'),auth,insertItem);

itemRoutes.get('/editItem/:id',auth,editItem);

itemRoutes.post('/updateItem/:id',auth,upload.single('file'),updateItem);

itemRoutes.get('/delItem/:id',auth,deleteItem);

itemRoutes.get('/showI',auth,itemShow);

//Frontend Item
itemRoutes.get('/getData/:id',getItem)

export { itemRoutes }