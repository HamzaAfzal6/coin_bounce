const express=require('express');
const router=express.Router();
const userController=require('../controller/userController');
const auth = require('../middleware/auth');
const blogController=require('../controller/blogController');
const commentController=require('../controller/commentController');
const photoController=require('../controller/photoController');

//auth routes
router.post('/adduser',userController.reg);
router.post('/login',userController.login);
router.get('/users',userController.allUsers);
router.post('/logout',userController.logout);
router.get('/refresh',userController.refesh);
//blog routes
router.post('/blog',blogController.addblog);
router.get('/blogs',blogController.allBlogs);
router.get('/blog/:id',blogController.blogById);
router.put('/blogupdate/:id',blogController.updateBlog);
router.delete('/blog/:id',blogController.deleteBlog);
//comment routes
router.post('/comment',commentController.add);
router.get('/comments/:id',commentController.getbyid);

router.post('/photo',photoController.addphoto);

module.exports=router;