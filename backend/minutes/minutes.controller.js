const express = require('express');
const router = express.Router();
const minuteService = require('./minutes.service');

// routes
router.post('/create', create);
router.get('/', getAll);
router.get('/attendee/:id', getAllByAttendeeId);
router.get('/author/:id', getAllByAuthorId);
router.get('/:id', getById);
router.put('/:id', update);
router.delete('/:id', _delete);

module.exports = router;

function create(req, res, next) {    
    minuteService.create(req.body, req.user.sub)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    minuteService.getAll()
        .then(minutes => res.json(minutes))
        .catch(err => next(err));
}

function getAllByAttendeeId(req, res, next) {
    minuteService.getAllByAttendeeId(req.params.id)
        .then(minutes => minutes ? res.json(minutes) : res.sendStatus(404))
        .catch(err => next(err));
}

function getAllByAuthorId(req, res, next) {
    minuteService.getAllByAuthorId(req.params.id)
        .then(minutes => minutes ? res.json(minutes) : res.sendStatus(404))
        .catch(err => next(err));
}


function getById(req, res, next) {
    minuteService.getById(req.params.id)
        .then(minute => minute ? res.json(minute) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req, res, next) {
    minuteService.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    minuteService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}