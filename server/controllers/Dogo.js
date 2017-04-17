const models = require('../models');
const Dogo = models.Dogo;

const makerPage = (req, res) => {
  Dogo.DogoModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error has occured' });
    }

    return res.render('dogoApp', { csrfToken: req.csrfToken(), dogos: docs });
  });
};

const makeDogo = (req, res) => {
  if (!req.body.name || !req.body.age) {
    return res.status(400).json({ error: 'Bork! Name and age are required' });
  }

  const dogoData = {
    name: req.body.name,
    age: req.body.age,
    owner: req.session.account._id,
  };

  const newDogo = new Dogo.DogoModel(dogoData);

  const dogoPromise = newDogo.save();

  dogoPromise.then(() => res.json({ redirect: '/dogoMaker' }));

  dogoPromise.catch((err) => {
    console.log(err);
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Dogo already exists.' });
    }

    return res.status(400).json({ error: 'An error occurred' });
  });

  return dogoPromise;
};

const getDogos = (request, response) => {
  const req = request;
  const res = response;

  return Dogo.DogoModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'an Error occured' });
    }

    return res.json({ dogos: docs });
  });
};

module.exports.makerPage = makerPage;
module.exports.getDogos = getDogos;
module.exports.make = makeDogo;
