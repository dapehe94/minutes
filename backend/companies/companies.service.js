const config = require('config.json');
const db = require('_helpers/db');
const Company = db.Company;
const User = db.User;

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function getAll() {
    return await Company.find();
}

async function getById(id) {
    return await Company.findById(id);
}

async function create({company, user_id}) {
    const user = await User.findById(user_id).populate(['companies','setting.selectedcompany']);
    if (!user) throw 'User not found';    
    const newcompany = new Company(company);
    await newcompany.save();
    user.companies.push(newcompany);

    // Si es la primera empresa que crea
    // se añade esta como por defecto
    if(user.companies.length == 1) {
        user.setting.selectedcompany = newcompany;
    }

    await user.save();

    return {company: newcompany, user: user};
}

async function update(id) {
    const company = await Company.findById(id);
    await company.save();
}

async function _delete(id) {
    await Company.findByIdAndRemove(id);
}