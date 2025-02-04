const mongoose = require('mongoose');

const versionSchema = new mongoose.Schema(
    {
        content:String,
        author:{
            type:mongoose.Schema.Types.ObjectId,
            ref : "User"
        }
    },
    {timestamps:true}
)
const Version = mongoose.model('Version', versionSchema)
module.exports = Version