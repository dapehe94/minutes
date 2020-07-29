const config = require('config.json');
const db = require('_helpers/db');
const Minute = db.Minute;

module.exports = {
    getAll,
    getAllByAttendeeId,
    getAllByAuthorId,
    getById,
    create,
    update,
    delete: _delete
};

async function getAll() {
    return await Minute.find().populate(['attendees','author','company']);
}

async function getAllByAttendeeId(id) {
    return await Minute.find({ attendees : id }).populate(['attendees','author','company']);
}

async function getAllByAuthorId(id) {
    return await Minute.find({ author : id }).populate(['attendees','author','company']);
}

async function getById(id) {
    return await Minute.findById(id).populate(['attendees','author','company']);
}

async function create(minuteParam, user_id) {
    minuteParam.attendees.push(user_id);
    const minute = new Minute(minuteParam);
    await minute.save();
}

async function update(id) {
    const minute = await Minute.findById(id);
    await minute.save();
}

async function _delete(id) {
    await Minute.findByIdAndRemove(id);
}