const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const user = new Schema({
	name: { type: String, required: true },
    email: { type: String, unique: true, required: true },	
    hash: { type: String, required: true },
    companies: [{ type: Schema.Types.ObjectId, ref: "Company" }],
    setting: {
    	selectedcompany: { type: Schema.Types.ObjectId, ref: "Company", default: null }
    },
    profile: {
    	avatar: { type: String, default: 'src/assets/images/uploads/default.jpg'}
    },
    createdDate: { type: Date, default: Date.now }
});

user.set('toJSON', { virtuals: true });

module.exports = mongoose.model('User', user);