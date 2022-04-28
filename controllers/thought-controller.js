const { Thought , User } = require('../models');

const thoughtController = {
    // get all thoughts
    getAllThoughts(req, res) {
      Thought.find({})
        // .select('-__v')
        .sort({ _id: -1 })
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
          console.log(err);
          res.sendStatus(400);
        });
    },
  
    // get one thought by id
    getThoughtById({ params }, res) {
      Thought.findOne({ _id: params.id })
        // .select('-__v')
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
          console.log(err);
          res.sendStatus(400);
        });
    },
  
  // add (post) thought to user (ie user shares a thought)
  // user id is passed as a parameter in url
  addThought({ params, body }, res) {
    console.log(body);
    Thought.create(body)
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { _id: params.id },
          { $push: { thoughts: _id } },
          { new: true }
        );
      })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.json(err));
  },

    // update thought
    updateThought({ params, body }, res) {
      console.log(body);
      Thought.findOneAndUpdate(
          { _id: params.userId },
          { body },
          { new: true })
        .then(dbThoughtData => {
          if (!dbThoughtData) {
            res.status(404).json({ message: 'No thought found with this id!' });
            return;
          }
          res.json(dbUserData);
        })
        .catch(err => res.json(err));
    },
  


  // addReply({ params, body }, res) {
  //   Comment.findOneAndUpdate(
  //     { _id: params.commentId },
  //     { $push: { replies: body } },
  //     { new: true, runValidators: true }
  //   )
  //     .then(dbPizzaData => {
  //       if (!dbPizzaData) {
  //         res.status(404).json({ message: 'No pizza found with this id!' });
  //         return;
  //       }
  //       res.json(dbPizzaData);
  //     })
  //     .catch(err => res.json(err));
  // },

  // remove reply
// removeReply({ params }, res) {
//   Comment.findOneAndUpdate(
//     { _id: params.commentId },
//     { $pull: { replies: { replyId: params.replyId } } },
//     { new: true }
//   )
//     .then(dbPizzaData => res.json(dbPizzaData))
//     .catch(err => res.json(err));
// },

  // delete thought
  removeThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.id })
      .then(deletedThought => {
        if (!deletedThought) {
          return res.status(404).json({ message: 'No thought with this id!' });
        }
        return User.findOneAndUpdate(
          { _id: body.userId },
          { $pull: { thoughts: params.thoughtId } },
          { new: true }
        );
      })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        res.json(dbUserData); 
      })
      .catch(err => res.json(err));
  }
};

module.exports = thoughtController;
