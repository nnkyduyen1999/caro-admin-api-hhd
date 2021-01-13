const User = require("./userModel");
const GameDAL = require("../game/gameDAL");
const UserDAL = require("./userDAL");

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
        if (user) {
            User.update({_id: userId}, {isBlock: !user.isBlock})
                .then(response => {
                    res.status(200).json({message: 'OK', isBlock: !user.isBlock})
                }).catch(err => res.status(500));
        } else {
            res.status(400).json({message: 'user not found'})
        }
    },
    getFinishedGamesById: async (req, res, next) => {
        try {
            const listGameFromDB = await GameDAL.getFinishedGamesByUserIdDAL(
                req.params.id
            );
            const newListGame = await Promise.all(
                listGameFromDB.map(async (game) => {
                    console.log(game);
                    const xName = await UserDAL.loadUsernameById(game.xPlayer);
                    const oName = await UserDAL.loadUsernameById(game.oPlayer);
                    return {
                        roomId: game.roomId,
                        xPlayer: game.xPlayer,
                        oPlayer: game.oPlayer,
                        xUsername: xName ? xName.username : ``,
                        oUsername: oName ? oName.username : ``,
                        winner: game.winner,
                        time: game.createTime,
                        messages: game.history.length === 0 ? [] : game.history[game.history.length-1].messages,
                    };
                })
            );
            //console.log("new list", newListGame);
            if (newListGame) {
                res.status(200).send(newListGame);
            }
        } catch (err) {
            console.log(err);
            res.status(404).send({message: "Error happening ..."});
        }
    },
};
