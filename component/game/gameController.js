const userDAL = require("../user/userDAL");
const GameDAL = require("./gameDAL");

module.exports = {
  allFinishGame: async (req, res, next) => {
    // console.log("aaaaa");
    try {
      const games = await GameDAL.allFinishGame();
      // console.log(games)
      const gamesWithUsername = []
      for (let game of games) {
        // console.log(game)
        const xPlayer = await userDAL.getUsernameById(game.xPlayer);
        const oPlayer = await userDAL.getUsernameById(game.oPlayer)
        gamesWithUsername.push({
          ...game._doc,
          xPlayerUsername: xPlayer ? xPlayer.username : "",
          oPlayerUsername: oPlayer ? oPlayer.username : "",
        })
      }
      // console.log("games", gamesWithUsername);
      res.status(200).send(gamesWithUsername);
    } catch (err) {
      res.send(err);
    }
  },
};
