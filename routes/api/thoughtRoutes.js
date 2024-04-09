const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  createReaction,
  deleteReaction,
} = require('../../controllers/thoughtController');

// /api/thoughts
router.route('/')
        // GET to get all thoughts
        .get(getThoughts)
        // POST to create a new thought
        // (don't forget to push the created thought's ID to the associated user's thoughts array field)
        .post(createThought);

// /api/thoughts/:thoughtId
router.route('/:thoughtId')
        // GET to get a single thought by its ID
        .get(getSingleThought)
        // PUT to update a thought by its ID
        .put(updateThought)
        // DELETE to remove thought by its ID
        .delete(deleteThought);

// /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions')
        // POST to create a reaction stored in a single thought's reactions array field
        .post(createReaction)
        // DELETE to pull and remove a reaction by the reaction's reactionId value
        .delete(deleteReaction);

module.exports = router;