const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

router.get('/', (req, res) => {
 Tag.findAll({
  attributes: [ 'id', 'tag_name' ],
  include : [
    {
      model: Product,
      through: ProductTag,
      as: 'product_tags'
    }
  ]
 })
 .then(dbData => res.json(dbData))
 .catch((err) => {
   console.log(err);
   res.status(500).json(err);
 });
});

router.get('/:id', (req, res) => {
  Tag.findOne({
    attributes: [ 'id', 'tag_name' ],
    where: { id: req.params.id },
    include : [
      {
        model: Product,
        through: ProductTag,
        as: 'product_tags'
      }
    ]
   })
   .then(dbData => res.json(dbData))
   .catch((err) => {
     console.log(err);
     res.status(500).json(err);
   });
});

router.post('/', (req, res) => {
  Tag.create({
    tag_name: req.body.tag_name
  })
  .then((dbData) => res.status(200).json(dbData))
  .catch((err) => {
      console.log(err);
      res.status(400).json(err);
  });
});

router.put('/:id', (req, res) => {
  Tag.update({
    tag_name: req.body.tag_name
  },
  {
    where: { id: req.params.id },
  })
  .then(dbData => {
    if (!dbData) {
      res.status(404).json({message: 'No tag found with this id'});
      return;
    };
    res.json(dbData);
  })  .catch((err) => {
      console.log(err);
      res.status(400).json(err);
  });
});

router.delete('/:id', (req, res) => {
  Tag.destroy({
    where: { id: req.params.id }
  })
  .then(dbData => {
    if (!dbData) {
      res.status(404).json({message: 'No tag found with this id'});
      return;
    };
    res.json(dbData)
  })
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;
