const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
        },
        description:{
            type:String,
        },
        visible:{
            type:Boolean,
            default:false
        },
        createdBy:{
            type:mongoose.Schema.Types.ObjectId,
            ref : "User"
        },
        first:{
            type:mongoose.Schema.Types.ObjectId,
            ref : "Version"
        }

    },
    {timestamps:true}
)

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;