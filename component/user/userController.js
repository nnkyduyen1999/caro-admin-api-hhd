const User = require("./userModel");

module.exports = {
  loadById: async (req, res, next) => {
    const id = "5fcd0beb2e5bc007d5789fc8";
    const user = await User.findById(id);
    res.json(user);
  },

  getUserById: async (req, res, next) => {
    try {
      const userInfo = await User.findById(req.params.id);
      if (!userInfo) {
        throw new Error("User not found");
      }
      res.send(userInfo);
    } catch (err) {
      res.send(err);
    }
  },

  allUser: async (req, res, next) => {
    try {
      const users = await User.find(
        { isAdmin: false },
        { password: 0, isAdmin: 0 }
      );
      res.send(users);
    } catch (err) {
      res.send(err);
    }
  },
};
