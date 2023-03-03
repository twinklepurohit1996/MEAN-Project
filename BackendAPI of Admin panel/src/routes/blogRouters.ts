import express from 'express';
import multer from 'multer';
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images/blogImage');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
var upload = multer({ storage: storage })
import { showSingleBlog ,showBlogFront, editBlog, updateBlog, addBlog, showBlog,deleteBlog } from '../controllers/blogControllers'
const blogRoutes= express.Router();

blogRoutes.post('/addblog', upload.single('file'), addBlog);

blogRoutes.get('/showBlog', showBlog);

blogRoutes.get('/editBlog/:id', editBlog);

blogRoutes.post('/updateBlog/:id', upload.single('file'), updateBlog);

blogRoutes.get('/delBlog/:id', deleteBlog);

blogRoutes.get('/showblogFront', showBlogFront);

blogRoutes.get('/showSingleBlogFront/:id',showSingleBlog);

export { blogRoutes }