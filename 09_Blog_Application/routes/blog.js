import { Router } from "express";
import upload from "../services/fileUpload.js"

import Blog from "../models/blog.js"
import Comment from "../models/comment.js"

const router = Router();

router.get('/add-new', (req, res) => {
    res.render('addBlog', {
        user: req.user,
    })
});

router.post('/', upload.single('coverImage'), async (req, res) => {
    const blog = await Blog.create({
        title: req.body.title,
        body: req.body.body,
        coverImageURL: `/uploads/${req.file.filename}`,
        createdBy: req.user._id,
    })
    res.redirect(`/blog/${blog._id}`);
})
router.get('/:blogId', async (req, res) => {
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

})

router.post('/comment/:blogId', async (req, res) => {
    await Comment.create({
        content: req.body.content,
        blogId: req.params.blogId,
        createdBy: req.user._id,
    })

    return res.redirect(`/blog/${req.params.blogId}`);

})


export default router;