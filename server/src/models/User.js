const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    userId:String,
    username:String,
    picture:String,
    logs : [
        {type: Schema.Types.ObjectId,ref:'LogEntry'}
    ]
})

const UserEntry = mongoose.model('User', userSchema);

module.exports = UserEntry;