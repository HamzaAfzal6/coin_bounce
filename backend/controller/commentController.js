const joi=require('joi');
const mongodbIdPattern=/^[0-9a-fA-F]{24}$/;
const Comment=require('../models/comment');

const CommentDTO = require('../dto/commentDTO');


const commentController={

    async add(req,res,next){
const addCommentSchema=joi.object({

comment:joi.string().required(),
blog:joi.string().regex(mongodbIdPattern).required(),
author:joi.string().regex(mongodbIdPattern).required()
});
const{error}=addCommentSchema.validate(req.body);
if(error){
    return next(error);}
const {comment,blog,author}=req.body;
try{
const newComment=new Comment({
comment,
blog,
author
});
 await newComment.save(newComment);
}
catch(error){return next(error);}

res.status(200).json({message:'commented'});

},


async getbyid(req,res,next){

const getSchema=joi.object({

    id:joi.string().regex(mongodbIdPattern).required()
});
const{error}=getSchema.validate(req.params);
if(error){
    return next(error);
}
const{id}=req.params;
let comments;
try{
 comments=await Comment.find({blog:id}).populate('author');
}
catch(error){
    return next(error);
}
let cDTO=[];
for(let i=0;i<comments.length;i++){
    const obj=new CommentDTO(comments[i]);
    cDTO.push(obj);

}
res.status(201).json({data:cDTO});

}

}
module.exports=commentController