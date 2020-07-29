const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//var User = mongoose.model('User');

const minute = new Schema({
    subject: { type: String, required: true },
    text: { type: String, required: true },
    location: { type: String, required: true },
    date: { type: Date, required: true },
    starttime: { type: Date, required: true },
    endtime: { type: Date, required: true },
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    company: { type: Schema.Types.ObjectId, ref: "Company", required: true },    
    attendees: [{ type: Schema.Types.ObjectId, ref: "User" }],
    created: { type: Date, default: Date.now }
});

minute.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Minute', minute);