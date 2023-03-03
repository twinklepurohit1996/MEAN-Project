import express from 'express';
import connects from '../BackendAPI of Admin panel/src/config/db';
import auth from '../BackendAPI of Admin panel/src/middleware/middleware'
import bodyParser from 'body-parser';
import path from 'path';
import expressSession from 'express-session';
import  cookieparser  from "cookie-parser";
import cors from 'cors'
import * as dotenv from 'dotenv' 

const app = express();
dotenv.config()
const PORT =process.env.PORT  || 5000;
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.static(path.join(__dirname,'/node_modules/bootstrap/dist/')));
app.use(express.static(path.join(__dirname,'/node_modules/jquery/dist')));
app.use(cookieparser())
app.use(cors());

app.use(expressSession({secret: "Your secret key",resave: true,saveUninitialized: true}));
declare module 'express-session' {
    interface SessionData {
      userid: any;
      token:any;
    }
  }
import {userRoutes} from './src/routes/userRoutes';
app.use('/',userRoutes);

import {cateRoutes} from './src/routes/cateRoutes';
app.use('/cate',cateRoutes);

import {itemRoutes} from './src/routes/itemRoutes';
app.use('/item',itemRoutes);

import {blogRoutes} from './src/routes/blogRouters';
app.use('/blog',blogRoutes);

import {contactUsRoutes} from './src/routes/contactUsRoutes';
app.use('/contactUs',contactUsRoutes);

import {feedbackRoutes} from './src/routes/feedbackRoutes';
app.use('/feedback',feedbackRoutes);

connects();
app.listen(PORT,():void=>{console.log(`server is running on ${PORT}`)});