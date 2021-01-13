const User = require("./userModel");

module.exports = {
  getUsernameById: (id) => {
    return User.findById(id, { username: 1 });
  },
  loadUsernameById: (id) => {
    return User.findById(id, { username: 1, trophy: 1 });
  },
};
