import express from 'express';
import {fInsert,showFeedback,deleteF,status,show} from '../controllers/feedbackControllers'
const feedbackRoutes = express.Router();

feedbackRoutes.post('/feedbackInsert',fInsert);

//Backend Show Table
feedbackRoutes.get('/showF',showFeedback);

feedbackRoutes.get('/delFeedback/:id',deleteF);

feedbackRoutes.post('/active/:id',status);

//FrondEnd Show
feedbackRoutes.get('/showB',show);

export { feedbackRoutes }