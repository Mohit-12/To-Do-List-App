const mongoose = require('mongoose');
const userModel = require('../users/user.model');
const Schema = mongoose.Schema;

const schema = new Schema({
    title: { type: String, unique: true, required: true },
    description: { type: String, required: true },
    isDone: { type: Boolean, required: true, default: false },
    isArchive: { type: Boolean, required: true, default: false},
    createdBy: { type: String, required: true},
    createdDate: { type: Date, default: Date.now }
});

schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.hash;
    }
});

module.exports = mongoose.model('Note', schema);