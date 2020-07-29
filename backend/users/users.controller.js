const express = require('express');
const router = express.Router();
const userService = require('./user.service');

// routes
router.post('/authenticate', authenticate);
router.post('/register', register);
router.get('/', getAll);
router.get('/getallbycompanyid/:id', getAllbyCompanyId);
router.get('/getattendees/:companyid', getAttendees);
router.get('/getcurrent', getCurrent);
router.get('/:id', getById);
router.post('/uploadavatar/:id', uploadavatar);
router.put('/:id', update);
router.delete('/:id', _delete);

module.exports = router;

function authenticate(req, res, next) {
    userService.authenticate(req.body)
        .then(user => user ? res.json(user) : res.status(400).json({ message: 'Email or password is incorrect' }))
        .catch(err => next(err));
}

function register(req, res, next) {
    userService.create(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    userService.getAll()
        .then(users => res.json(users))
        .catch(err => next(err));
}

function getAllbyCompanyId(req, res, next) {
    userService.getAllbyCompanyId(req.params.id)
        .then(users => res.json(users))
        .catch(err => next(err));
}

function getAttendees(req, res, next) {
    //userService.getAttendees(req.query.query, req.params.id)
    // Pass req.user.sub with the user logged id to exclude it
    userService.getAttendees(req.user.sub, req.params.companyid)
        .then(users => res.json(users))
        .catch(err => next(err));
}

function getCurrent(req, res, next) {
    userService.getById(req.user.sub)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function getById(req, res, next) {
    userService.getById(req.params.id)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function uploadavatar(req, res, next) {
    userService.uploadavatar(req.params.id, req.body)
        .then((user) => res.json({user}))
        .catch(err => next(err));
}

function update(req, res, next) {
    userService.update(req.params.id, req.body)
        .then((user) => res.json({user}))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    userService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}