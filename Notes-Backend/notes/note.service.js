const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
// const { Note } = require('../_helpers/db');
const Note = db.Note;

module.exports = {
    getAll,
    getByUser,
    getById,
    create,
    update,
    delete: _delete
};

async function getAll() {
    return await Note.find();
}

async function getByUser(userId){
    return await Note.find({createdBy: userId})
}

async function getById(id) {
    return await Note.findById(id);
}

async function create(noteParam) {
    // validate
    if (await Note.findOne({ title: noteParam.title })) {
        throw 'Note "' + noteParam.title + '" is already exist';
    }
    const note = new Note(noteParam);

    // save note
    await note.save();
}

async function update(id, noteParam) {
    const note = await Note.findById(id);

    // validate
    if (!note) throw 'Note not found';

    // copy noteParam properties to note
    Object.assign(note, noteParam);

    await note.save();
}

async function _delete(id) {
    await Note.findByIdAndRemove(id);
}