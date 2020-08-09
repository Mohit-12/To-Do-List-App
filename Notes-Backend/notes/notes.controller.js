const express = require('express');
const router = express.Router();
const noteService = require('./note.service');

// routes
router.get('/', getAll);
router.post('/create', createNote);
router.get('/user/:userId', getByUser);
router.get('/:id', getById);
router.put('/:id', update);
router.delete('/:id', _delete);

module.exports = router;


function getAll(req, res, next) {
    noteService.getAll()
        .then(notes => res.json(notes))
        .catch(err => next(err));
}

function createNote(req, res, next) {
    noteService.create(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function getById(req, res, next) {
    noteService.getById(req.params.id)
        .then(note => note ? res.json(note) : res.sendStatus(404))
        .catch(err => next(err));
}

function getByUser(req, res, next) {
    noteService.getByUser(req.params.userId)
        .then(notes => res.json(notes))
        .catch(err => next(err));
}

function update(req, res, next) {
    noteService.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    noteService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}