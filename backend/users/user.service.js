const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const upload = require('_helpers/upload');
const User = db.User;
const Company = db.Company;

module.exports = {
    authenticate,
    getAll,
    getAllbyCompanyId,
    getAttendees,
    getById,
    create,
    uploadavatar,
    update,
    delete: _delete
};

async function authenticate({ email, password }) {
    const user = await User.findOne({ email }).populate(['companies','setting.selectedcompany']);
    if (user && bcrypt.compareSync(password, user.hash)) {
        const { hash, ...userWithoutHash } = user.toObject();
        const token = jwt.sign({ sub: user.id }, config.secret);
        return {
            ...userWithoutHash,
            token
        };
    }
}

async function getAll() {
    return await User.find().select('-hash').populate(['companies','setting.selectedcompany']);
}

async function getAllbyCompanyId(id) {
    return await User.find({companies: id});
}

async function getAttendees(userid, companyid) {
    return await User.find({ companies: companyid, _id: { $ne: userid } }).select(['name']);
    //return await User.find({ name: new RegExp(query, 'i'), companies: companyid }).select(['name']);
}

async function getById(id) {
    return await User.findById(id).select('-hash').populate(['companies','setting.selectedcompany']);
}

async function create(userParam) {
    // validate
    if (await User.findOne({ email: userParam.email })) {
        throw 'Email "' + userParam.email + '" is already taken';
    }

    const user = new User(userParam);

    // hash password
    if (userParam.password) {
        user.hash = bcrypt.hashSync(userParam.password, 10);
    }

    // save user
    await user.save();
}

async function uploadavatar(id, avatar) {
    upload.single(avatar)
    console.log(avatar)
}

async function update(id, userParam) {
    const user = await User.findById(id).populate(['companies','setting.selectedcompany']);

    // validate
    if (!user) throw 'User not found';
    if ( user.email !== userParam.user.email && await User.findOne({ email: userParam.user.email }) ) {
        throw 'Email "' + userParam.user.email + '" is already taken';
    }

    // hash password if it was entered
    if (userParam.user.password) {
        userParam.user.hash = bcrypt.hashSync(userParam.user.password, 10);
    }

    // If only update selectedcompany
    if (userParam.user.setting.selectedcompany) {
        const company = await Company.findById(userParam.user.setting.selectedcompany);
        userParam.user.setting.selectedcompany = company;
    }

    // copy userParam properties to user
    Object.assign(user, userParam.user);

    return await user.save();
}

async function _delete(id) {
    await User.findByIdAndRemove(id);
}