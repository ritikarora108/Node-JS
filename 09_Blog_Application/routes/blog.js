import { Router } from "express";
import upload from "../services/fileUpload.js"
import Blog from "../models/blog.js"
import Comment from "../models/comment.js"
import blogController from "../controllers/blog.js"

const { handleCreateNewBlog, handleGetBlogDetails, handlePostComment } = blogController;

const router = Router();

router.get('/add-new', (req, res) => {
    res.render('addBlog', {
        user: req.user,
    })
});

router.post('/', upload.single('coverImage'), handleCreateNewBlog)
router.get('/:blogId', handleGetBlogDetails)

router.post('/comment/:blogId', handlePostComment)


export default router;