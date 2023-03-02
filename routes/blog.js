import express from 'express';
import { getAllBlogs, addBlogs, updateBlogs, getBlog, deleteBlog , getUserBlogs} from '../controllers/blog.js';

const blogRouter = express.Router();

blogRouter.get('/', getAllBlogs);
blogRouter.post('/add', addBlogs);
blogRouter.put('/update/:id', updateBlogs);
blogRouter.get('/:id', getBlog);
blogRouter.get('/user/:id', getUserBlogs);
blogRouter.delete('/delete/:id', deleteBlog);

export default blogRouter;