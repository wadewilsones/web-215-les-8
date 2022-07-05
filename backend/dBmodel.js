import mongoose from "mongoose";

const { Schema } = mongoose;


const post = new Schema({
    username:String,
    userIcon:String,
    likes: Number,
    comments: [],
    descr: String,
    image:String,
});

const postDb = mongoose.model('makePost', post);


export default postDb 
