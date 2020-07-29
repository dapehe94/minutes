const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const task = new Schema({
    name: { type: String, required: true },
    duedate: { type: Date, required: true },
    complete: { type: Boolean, default: false},
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    company: { type: Schema.Types.ObjectId, ref: "Company", required: true },
    minute: { type: Schema.Types.ObjectId, ref: "Minute", required: true },    
    created: { type: Date, default: Date.now }
});

task.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Task', task);