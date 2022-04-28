// path coming into this file root/api/thoughts
const router = require('express').Router();

// path coming into this file root/api/users
const {
  getAllThoughts,
  getThoughtById,
  addThought,
  updateThought,
  removeThought
} = require('../../controllers/thought-controller');

// /api/thoughts/
router
  .route('/')
  .get(getAllThoughts)
  .post(addThought);

// /api/thoughts/:id where id is the thought id
router
  .route('/:id')
  .get(getThoughtById)
  .put(updateThought)
  .delete(removeThought);

module.exports = router;


