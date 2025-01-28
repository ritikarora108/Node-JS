import { Router } from "express";
import upload from "../services/fileUpload.js"

import Blog from "../models/blog.js"

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
    const blog = await Blog.findById(req.params.blogId);
    return res.render('blog', {
        user: req.user,
        blog,
    })    

})


export default router;