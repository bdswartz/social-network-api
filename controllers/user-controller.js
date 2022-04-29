const { User, Thought } = require('../models');

const userController = {
  // get all users  *****tested
  getAllUsers(req, res) {
    User.find({})
      .populate({
        path: 'thoughts'
        // select: '-__v'
      })
      .populate({
        path: 'friends'
        // select: '-__v'
      })
    //   .select('-__v')
      .sort({ _id: -1 })
      .then(dbUserData => res.json(dbUserData))
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  // get one user by id   *******tested
  getUserById({ params }, res) {
    User.findOne({ _id: params.id })
      .populate({
        path: 'thoughts',
        // select: '-__v'
      })
      .populate({
        path: 'friends',
        // select: '-__v'
      })
      // .select('-__v')
      .then(dbUserData => res.json(dbUserData))
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  // create a new User  ****tested
  createUser({ body }, res) {
    User.create(body)
      .then(dbUserData => res.json(dbUserData))
      .catch(err => res.json(err));
  },

  // update user by id  ******tested
  updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.json(err));
  },

  // delete User    ******tested (not with remove thoughts)
  deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.id })
      .then(dbUserData => {
       if(!dbUserData) {
        return res.status(404).json({ message: 'No user with this id!' });
       }
        const thoughtArray = dbUserData.thoughts;
        return Thought.deleteMany({
          _id: {
            $in: thoughtArray
          }
        });
      })
      .then(dbDeletedData => {
        if (!dbDeletedData) {
          res.status(404).json({ message: 'No thoughts found with this id!' });
          return;
        }
        res.json(dbDeletedData); 
      })
      .catch(err => res.json(err));
  },

  // add Friend   *****tested
  addFriend({params},res) {
    User.findOneAndUpdate(
      {_id: params.userId},
      { $push: { friends: params.friendId }},
      { new: true })
    .then(dbUserData => {
      if (!dbUserData) {
        res.status(404).json({ message: 'No user found with this id!' });
        return;
      }
      res.json(dbUserData)
    })
    .catch(err => res.json(err));
  },

 // remove Friend   *****tested
  removeFriend({params},res) {
    User.findOneAndUpdate(
      {_id: params.userId},
      { $pull: { friends: params.friendId }},
      { new: true })
    .then(dbUserData => {
      if (!dbUserData) {
        res.status(404).json({ message: 'No user found with this id!' });
        return;
      }
      res.json(dbUserData)
    })
    .catch(err => res.json(err));
  }
};

module.exports = userController;
