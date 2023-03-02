import Blog from "../models/Blog.js";
import User from "../models/User.js";
import mongoose from "mongoose";

export const getAllBlogs = async (req, res, next) =>{
    let allBlogs;

    try {
        allBlogs = await Blog.find();

        if(!allBlogs){
            return res.status(404).json({message: "no blog found"});
        }

        return res.status(200).json({allBlogs});

    } catch (error) {
        return res.status(400).json({message: "something went wrong"});
    }
}

export const addBlogs = async (req, res, next) =>{
    const {
        title,
        image,
        description,
        user
    }= req.body;

    let existingUser;

    try {
        existingUser = await User.findById(user);

        if(!existingUser){
            return res.status(400).json({message:"Unauthorised"});
        }

        const blog = new Blog({
            title,
            image,
            description,
            user,
        });

        const session = await mongoose.startSession();
        session.startTransaction();
        await blog.save({session});

        existingUser.blogs.push(blog);
        await existingUser.save({session});
        await session.commitTransaction();
        return res.status(200).json({blog});

    } catch (error) {
        console.log(error);
        return res.status(400).json({message: "something went wrong"});
    }
}

export const updateBlogs = async (req, res, next) =>{
    const {title, description, image} = req.body;
    const blogId = req.params.id;
    let blog;
    
    try {
        blog = await Blog.findByIdAndUpdate(blogId,{
            title,
            description,
            image,
        });

        if(!blog) return res.status(500).json({message: "unable to update blog"});

        return res.status(200).json({blog});
    } catch (error) {
        
        return res.status(400).json({message: "Something went wrong"})
    }
}

export const getBlog = async (req, res, next) =>{
    let blog;

    try {
        blog = await Blog.findById(req.params.id);

        return res.status(200).json({blog});
    } catch (error) {
        return res.status(400).json({message: "Something went wrong"});
    }

}

export const deleteBlog = async (req,res,next)=>{
    let blogId=req.params.id;

    let blog;

    try {
        blog = await Blog.findByIdAndRemove(blogId).populate('user');
        await blog.user.blogs.pull(blog);
        await blog.user.save();
        if(!blog){
            return res.status(404).json({message: "Blog not found"});
        }

        return res.status(200).json({blog: blog,message: "Blog deleted successfully"});
    } catch (error) {
        return res.status(400).json({message: "Something went wrong"});
    }
}

export const getUserBlogs = async (req, res, next)=>{
    const userId= req.params.id;
    let userBlogs;

    try {
        userBlogs = await User.findById(userId).populate("blogs");

        if(!userBlogs){
            return res.status(404).json({message: "No blogs posted by this user"});
        }

        return res.status(200).json({blogs:userBlogs});

    } catch (error) {
        return res.status(400).json({message:"Something went wrong"});
    }
}