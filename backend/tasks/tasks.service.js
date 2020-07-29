const config = require('config.json');
const db = require('_helpers/db');
const Task = db.Task;
const User = db.User;

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function getAll() {
    return await Task.find();
}

async function getById(id) {
    return await Task.findById(id);
}

async function create({task, user_id}) {
    const user = await User.findById(user_id).populate(['companies']);
    if (!user) throw 'User not found';
    const tarea = new Task(task);
    await tarea.save();
    user.companies.push(tarea);
    await user.save();
    return {task: tarea, user: user};
}

async function update(id) {
    const task = await Task.findById(id);
    await task.save();
}

async function _delete(id) {
    await Task.findByIdAndRemove(id);
}