class blogIdDTO{
    
    constructor(blog){
        this.title=blog.title,
        this.content=blog.content,
        this.photo=blog.photopath,
        this._id=blog._id,
        this.authorName=blog.author.name,
        this.authorUsername=blog.author.username,
        this.CreatedAt=blog.CreatedAt

    }
}
module.exports=blogIdDTO;