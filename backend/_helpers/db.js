const config = require('config.json');
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || config.connectionString, { useCreateIndex: true, useNewUrlParser: true });
mongoose.Promise = global.Promise;

module.exports = {
    Company: require('../companies/companies.model'),
    User: require('../users/user.model'),
    Minute: require('../minutes/minutes.model'),
    Task: require('../tasks/tasks.model')
};