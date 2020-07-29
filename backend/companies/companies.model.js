const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const company = new Schema({
    name: { type: String, required: true },
    createdDate: { type: Date, default: Date.now }
});

company.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Company', company);