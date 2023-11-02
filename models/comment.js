const {mongoose,Schema} = require("mongoose");

const commentSchema = new Schema({
    comment:
    {
     type:String,
    }
 }, {timestamps:true})
 
 
 const Comment = mongoose.model("comment", commentSchema);
 
 module.exports = Comment