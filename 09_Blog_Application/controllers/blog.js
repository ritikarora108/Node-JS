import Blog from "../models/blog.js"
import Comment from "../models/comment.js";

const handleCreateNewBlog = async (req,res) => {
    const blog = await Blog.create({
        title: req.body.title,
        body: req.body.body,
        coverImageURL: `/uploads/${req.file.filename}`,
        createdBy: req.user._id,
    })
    res.redirect(`/blog/${blog._id}`);
} 

const handleGetBlogDetails =  async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.blogId).populate("createdBy");
        const comments = await Comment.find({ blogId: req.params.blogId }).populate("createdBy");

        // console.log(comments);
        return res.render('blog', {
            user: req.user,
            blog,
            comments,
        })
    } catch (error) {
        console.log(error)
    }
}

const handlePostComment = async (req, res) => {
    try {
        await Comment.create({
            content: req.body.content,
            blogId: req.params.blogId,
            createdBy: req.user._id,
        })

        return res.redirect(`/blog/${req.params.blogId}`);
    } catch (error) {
        console.log(error);
    }
}

export default { handleCreateNewBlog, handleGetBlogDetails, handlePostComment };