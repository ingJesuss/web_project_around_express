const Card = require('../models/Cards');

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => {
      res.status(200).json(cards);
    })
    .catch((err) => {
      console.error('Error al obtener las cards:', err);
      res.status(500).json('Error al obtener las cards');
    });
};

// crear nueva tarjeta
Card.create({name, link, owner, likes, createdAt })
.then((newCard) => {
  res.status(201).json(newCard);
})
.catch((err)=>{
  
})




module.exports = {
  getCards,
  createCard
};
