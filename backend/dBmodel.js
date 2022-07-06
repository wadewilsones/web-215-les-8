import mongoose from "mongoose";

const postDb = mongoose.Schema({
    caption:String,
    user:String,
    image:String,
});


export default mongoose.model('postDb', postDb); 
