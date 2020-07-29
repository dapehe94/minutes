const express = require('express');
const router = express.Router();
const taskService = require('./tasks.service');

// routes
router.post('/create', create);
router.get('/', getAll);
router.get('/:id', getById);
router.put('/:id', update);
router.delete('/:id', _delete);

module.exports = router;

function create(req, res, next) {    
    taskService.create(req.body)
        .then(data => res.json(data))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    taskService.getAll()
        .then(tasks => res.json(tasks))
        .catch(err => next(err));
}

function getById(req, res, next) {
    taskService.getById(req.params.id)
        .then(task => task ? res.json(task) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req, res, next) {
    taskService.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    taskService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}