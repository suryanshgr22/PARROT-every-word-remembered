const mongoose = require('mongoose');

const commitSchema  = new mongoose.Schema(
    {
        project:{
            type:mongoose.Schema.Types.ObjectId,
            ref : "Project"
        },
        parent:{
            required : true,
            type:mongoose.Schema.Types.ObjectId,
            ref : "Version"
        },
        child:{
            type:mongoose.Schema.Types.ObjectId,
            ref : "Version"
        },
        message:{
            type:String
        },
        createdBy:
            {
                type:mongoose.Schema.Types.ObjectId,
                ref : "User"
            }
        ,
        head:{
            type: Boolean,
            default:false
        }
    },
    {timestamps:true}
)

const Commit = mongoose.model('Commit', commitSchema)

module.exports = Commit;
