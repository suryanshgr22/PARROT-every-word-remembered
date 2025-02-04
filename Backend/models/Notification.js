const mongoose = require('mongoose');

const notifiactionSchema  = new mongoose.Schema(
    {
        to:{
            type:mongoose.Schema.Types.ObjectId,
            ref : "User",
            required: true        
        },
        from:{
            type:mongoose.Schema.Types.ObjectId,
            ref : "User",
            required: true
        },
        project:{
            type:mongoose.Schema.Types.ObjectId,
            ref : "Project",
            required: true
        },
        projectname:{
            type:String,
            required: true
        },
        parent:{
            type:mongoose.Schema.Types.ObjectId,
            ref : "Version",
            required: true
        },
        child:{
            type:mongoose.Schema.Types.ObjectId,
            ref : "Version",
            required: true
        },
        status:{
            type:String,
            enum: ['Pending', 'Rejected', 'Accepted'],
            default: 'Pending',
            required: true
        },
        message:{
            type:String
        }
    },
    {timestamps:true}
)

const Notification = mongoose.model('Notification', notifiactionSchema)

module.exports = Notification;
