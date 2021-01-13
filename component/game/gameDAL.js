const Game = require("./gameModel");

module.exports = {
  allFinishGame: () => {
      return Game.find({isFinish: true});
  }

  
};
