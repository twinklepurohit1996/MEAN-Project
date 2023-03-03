import express from 'express';
import {cateShow,insertC,editCate,deleteCate,updateCate, showCate} from '../controllers/cateControllers'
import auth from '../middleware/middleware';

const cateRoutes=express.Router();

cateRoutes.post('/insertCate',auth,insertC);

cateRoutes.get('/editCate/:id',auth,editCate);

cateRoutes.post('/updateCate/:id',auth,updateCate);

cateRoutes.get('/delCate/:id',auth,deleteCate);

//Backend show
cateRoutes.get('/showC',auth,cateShow);

//FrontEnd Show
cateRoutes.get('/showCateFront',showCate);
export { cateRoutes }