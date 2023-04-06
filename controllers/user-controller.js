const { User, Thought } = require('../models');

const userController = {

//GET all users
  getAllUser(req, res) {
    User.find({})
      .populate([
        {
          path: "thoughts",
          select: "-__v",
        },
      ])
      .select("-__v")
      .sort({ _id: -1 })
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => {
        console.log(err);
        res.status(404).json(err);
      });
  },

//GET user by id
  getUserById({ params }, res) {
    User.findOne({ _id: params.id })
      .populate([
        {
          path: "thoughts",
          select: "-__v",
        },
      ])
      .select("-__v")
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No user found with this id" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => {
        console.log(err);
        res.status(404).json(err);
      });
  },

//POST - Create user
  createUser({ body }, res) {
    User.create(body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(404).json(err));
  },

//PUT - update user
  updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No user found with this id" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.status(400).json(err));
  },

//DELETE - Remove user
  deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.id })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: "No user found with this id" });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.status(404).json(err));
  },

// POST - Create Friend
  addFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $addToSet: { friends: params.friendId } },
      { new: true }
    )
    .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: "No friend found with this id" });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.status(404).json(err));
  },

// DELETE - Removes Friend
  deleteFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $pull: { friends: params.friendId } },
      { new: true }
    )
    .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: "No friend found with this id" });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.status(404).json(err));
  }

};

module.exports = userController;