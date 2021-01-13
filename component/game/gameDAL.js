const Game = require("./gameModel");

module.exports = {
  allFinishGame: () => {
      return Game.find({isFinish: true});
  },

  getFinishedGamesByUserIdDAL: (userId) => {
    return Game.find()
      .or([{ xPlayer: userId }, { oPlayer: userId }])
      .and([{ isFinish: true }]);
  },
};
