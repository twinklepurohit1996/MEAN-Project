import express from 'express';
import multer from 'multer';
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images/userImage');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
var upload = multer({ storage: storage })
import { register, log, userData,  editUser,updateUser, deleteUser, user,login} from '../controllers/userControllers'
const userRoutes = express.Router();

// Backend and frontend register same
userRoutes.post('/register', upload.single('file'), register);

//BackEnd Login 
userRoutes.post('/login', [], log);

//FrontEnd Login 
userRoutes.post('/loginFront', [], login);

//
userRoutes.get('/show', user);

//Backend user edit , delete , show
userRoutes.get('/editUser/:id', editUser);

userRoutes.post('/updateUser/:id', upload.single('file'), updateUser);

userRoutes.get('/delUser/:id', deleteUser);

//Backend user data display(login user data)

userRoutes.get('/userInfo/:id', userData);




export { userRoutes }