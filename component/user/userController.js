const User = require("./userModel");

module.exports = {
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
                {isAdmin: false},
                {password: 0, isAdmin: 0}
            );
            res.send(users);
        } catch (err) {
            res.send(err);
        }
    },

    search: async (req, res, next) => {
        const keyword = req.query.keyword;

        const users = await User.find(
            {
                $and: [
                    {$or: [{username: {$regex: `.*${keyword}.*`}}, {email: {$regex: `.*${keyword}.*`}}]},
                    {isAdmin: false}
                ]
            },
            {password: 0, isAdmin: 0}
        );

        res.status(200).json({users});
    },

    blockUser: async (req, res, next) => {
        const userId = req.params.id;
        const user = await User.findById(userId);
        console.log(user)
        if(user) {
            User.update({_id: userId}, {isBlock: !user.isBlock})
                .then(response => {
                    res.status(200).json({message: 'OK', isBlock: !user.isBlock})
                }).catch(err => res.status(500));
        } else {
            res.status(400).json({message: 'user not found'})
        }
    },
};
