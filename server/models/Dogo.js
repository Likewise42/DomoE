const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const _ = require('underscore');

let DogoModel = {};

const convertId = mongoose.Types.ObjectId;
const setName = (name) => _.escape(name).trim();

const DogoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    set: setName,
  },

  breed: {
    type: String,
    trim: true,
    required: true,
  },

  owner: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'Account',
  },

  createdData: {
    type: Date,
    default: Date.now,
  },
});

DogoSchema.statics.toAPI = (doc) => ({
  name: doc.name,
  breed: doc.breed,
});

DogoSchema.statics.findByOwner = (ownerId, callback) => {
  const search = {
    owner: convertId(ownerId),
  };

  return DogoModel.find(search).select('name breed').exec(callback);
};

DogoModel = mongoose.model('Dogo', DogoSchema);

module.exports.DogoModel = DogoModel;
module.exports.DogoSchema = DogoSchema;
