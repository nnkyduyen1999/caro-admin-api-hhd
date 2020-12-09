const User = require('../User/userModel')

module.exports = {
    loadById: async (req, res, next) => {
        const id =  "5fcd0beb2e5bc007d5789fc8"
        const user = await User.findById(id);
        res.json(user);
    }
}
