const mongoose = require('mongoose');

const requestSchema = mongoose.Schema({
    project:{
        type:mongoose.Schema.Types.ObjectId,
        ref : "Project"
    },
    from:{
        type:mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
    to:{
        type:mongoose.Schema.Types.ObjectId,
        ref : "User"   
    },
    prev_version:{
        type:mongoose.Schema.Types.ObjectId,
        ref : "Version"
    },
    version:{
        type:mongoose.Schema.Types.ObjectId,
        ref : "Version"
    },
    accepted:{
        type:Boolean,
        default:false
    },
    message:{
        type:String
    }
})

const Request = mongoose.model('Request', requestSchema);
module.exports = Request;