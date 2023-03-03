import express from 'express';
import {  cont, showContactus, deleteContact,getEmail} from '../controllers/contactUsControllers'
const contactUsRoutes = express.Router();

contactUsRoutes.post('/contactUs', cont);

contactUsRoutes.post('/showContact', showContactus);

contactUsRoutes.get('/delContact/:id', deleteContact);

contactUsRoutes.get('/getEmail',getEmail);












export { contactUsRoutes }