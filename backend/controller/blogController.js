const joi=require('joi');
const fs=require('fs');
const Blog=require('../models/blog');
const Comment=require('../models/comment');
const mongodbIdPattern=/^[0-9a-fA-F]{24}$/;
const {BACKEND_SERVER_PATH,API_KEY}= require('../config/index');
const BlogDTO=require('../dto/blogdto');
const blogidDTO=require('../dto/blogbyidDTO');

const blogController={
//validate user data
async addblog(req,res,next){
const blogSchema=joi.object({
    title:joi.string().required(),
    author:joi.string().regex(mongodbIdPattern).required(),
    content:joi.string().required(),
    photo:joi.string().required()
}) 
const {error}=blogSchema.validate(req.body);
if(error){
    return next(error);
}

const {title,content,author,photo}=req.body;
//read buffer
const buffer=Buffer.from(photo.replace(/^data:image\/(png|jpg|jpeg);base64,/,''),'base64');
//alot random name
const imagePath=`${Date.now()}-${author}.png`;

//save locally
try{
    fs.writeFileSync(`storage/${imagePath}`,buffer);

}
catch(error){
    return next(error);
}
let newBlog;
try {
//save blog in db
 newBlog=new Blog({

title,
author,
content,
photopath:`${BACKEND_SERVER_PATH}/storage/${imagePath}`

});
  await newBlog.save();

} catch (error) {
  return next(error);
}
const blogDTO=new BlogDTO(newBlog);
 res.status(201).json({blog:blogDTO});
  



}, 
 async allBlogs (req, res, next) {
    // get all users
   await Blog.find()
    .then(docs => res.send(docs))
    .catch(err => console.log('error occurs' + JSON.stringify(err, undefined, 2)));
  },
  async blogById(req,res,next){
//validate id
//send responce
const BlogId=joi.object({
id:joi.string().regex(mongodbIdPattern).required()

});
const {error}=BlogId.validate(req.params);
if(error){
  return next(error);
}
let blog;
const {id}=req.params;
try{
  blog=await Blog.findById({_id:id}).populate('author');
}
catch(error){
  return next(error);
}
const blogdto=new blogidDTO(blog);
res.status(201).json({blog:blogdto});
},

async updateBlog(req,res,next){
//validation
// updation
const updateBlogSchema=joi.object({
title:joi.string().required(),
content:joi.string().required(),
author:joi.string().regex(mongodbIdPattern).required(),
blogId:joi.string().regex(mongodbIdPattern).required(),
photo:joi.string()

});
const {error}=updateBlogSchema.validate(req.body);
if(error){
  return next(error);
}
const{title,content,author,photo,blogId}=req.body;
//delete photo
//save new photo
let blog;
try{
  blog=Blog.findOne({_id:blogId});
}
catch(error){
  return next(error);
}
if(photo){
previousPhoto=blog.photopath;
previousphoto=previousPhoto.split('/').at(-1);   
fs.unlinkSync(`/storage/${previousphoto}`);   //delete
const buffer=Buffer.from(photo.replace(/^data:image\/(png|jpg|jpeg);base64,/,''),'base64');
//alot random name
const imagePath=`${Date.now()}-${author}.png`;

//save locally
try{
    fs.writeFileSync(`storage/${imagePath}`,buffer);

}
catch(error){
    return next(error);
}//save blog with photo

await Blog.updateOne({_id:blogId},{title,content,photopath:`${BACKEND_SERVER_PATH}/storage/${imagePath}`})
}
else{
await Blog.updateOne({_id:blogId},{title,content});




}
res.status(201).json({message:'blog updated'})
},




async deleteBlog(req,res,next){
  const delBlogSchema=joi.object({
    id:joi.string().regex(mongodbIdPattern).required()
  });
  const {error}=delBlogSchema.validate(req.params);
  if(error){
    return next(error);}
  const{id}=req.params;
  try{

await Blog.deleteOne({_id:id}); //del blog
await Comment.deleteMany({blog:id}); //del comments

  }
  catch(error){
    return next(error);
  }
  res.status(201).json({message:'blog deleted'});
}

}
module.exports=blogController;