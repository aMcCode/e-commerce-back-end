const router = require('express').Router();
const { Category, Product } = require('../../models');

router.get('/', (req, res) => {
  Category.findAll({
    attributes: [ 'id', 'category_name' ],
    include: [ Product ]
  })
  .then(dbCatData => res.json(dbCatData))
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.get('/:id', (req, res) => {
  Category.findAll({
    attributes: [ 'id', 'category_name' ],
    where: { id: req.params.id },
    include: [ Product ]
  })
  .then(dbCatData => res.json(dbCatData))
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.post('/', (req, res) => {
  Category.create({
    category_name: req.body.category_name
  })
  .then(dbCatData => res.json(dbCatData))
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.put('/:id', (req, res) => {
  Category.update({
    category_name: req.body.category_name
  },
  {
    where: { id: req.params.id }
  })
  .then(dbCatData => {
    if (!dbCatData) {
      res.status(404).json({message: 'No category found with this id'});
      return;
    };
    res.json(dbCatData);
  })
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.delete('/:id', (req, res) => {
  Category.destroy({
    where: { id: req.params.id }
  })
  .then(dbCatData => {
    if (!dbCatData) {
      res.status(404).json({message: 'No category found with this id'});
      return;
    };
    res.json(dbCatData)
  })
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;
