// const { FRAME_RATE } = require('./constants');
// const { CANVAS_WIDTH } = require('./constants');
// const { CANVAS_HEIGHT } = require('./constants');
// const { PLANCHETTE_WIDTH } = require('./constants');
// const { PLANCHETTE_HEIGHT } = require('./constants');

const FRAME_RATE = 10;
const CANVAS_WIDTH = 838;
const CANVAS_HEIGHT = 554;
const PLANCHETTE_WIDTH = 120;
const PLANCHETTE_HEIGHT = 120;

module.exports = {
  initGame,
  gameLoop,
  getUpdatedVelocity,
}


// state = initGame()

function initGame() {
  console.log("made it to initGame()")
  const state = createGameState()
  return state;
}

function createGameState() {
  console.log("made it to createGameState")
  return {
    players: [{
      vel: {
        x: 0,
        y: 0,
      },
    },],
    planchette: {
      pos: {
        x: 100,
        y: 100,
      }
    },
    letters: "",
  };
}

function gameLoop(state) {
  console.log("made it to gameLoop")
  if (!state) {
    return;
  }

  // decision rule
  var nUP = 0
  var nDOWN = 0
  var nLEFT = 0
  var nRIGHT = 0
  for (let i = 0; i < state.players.length; i++) {
    if (state.players[i].vel.x === 1 ) {
      nRIGHT += 1
    }
    if (state.players[i].vel.x === -1 ) {
      nLEFT += 1
    }
    if (state.players[i].vel.y === 1 ) {
      nUP += 1
    }
    if (state.players[i].vel.y === -1 ) {
      nDOWN += 1
    }
  }
  var max_arrow_val = Math.max(nRIGHT, nLEFT, nUP, nDOWN)
  if (max_arrow_val != 0) {
    if (max_arrow_val === nRIGHT ) {
      planchette.pos.x += 5;
      planchette.pos.y += 0;
    }
    if (max_arrow_val === nLEFT ) {
      planchette.pos.x += -5;
      planchette.pos.y += 0;
    }
    if (max_arrow_val === nUP ) {
      planchette.pos.x += 0;
      planchette.pos.y += 5;
    }
    if (max_arrow_val === nDOWN ) {
      planchette.pos.x += 0;
      planchette.pos.y += -5;
    }
  }

  // if (playerOne.pos.x < 0 || playerOne.pos.x > GRID_SIZE || playerOne.pos.y < 0 || playerOne.pos.y > GRID_SIZE) {
  //   return 2;
  // }
  paintGame(state)

  return false;
}

function getUpdatedVelocity(keyCode) {
  console.log("made it to getUpdatedVelocity()")
  switch (keyCode) {
    case 32: { // space bar
      return { x: 0, y: 0 };
    }
    case 37: { // left
      return { x: -1, y: 0 };
    }
    case 38: { // down
      return { x: 0, y: -1 };
    }
    case 39: { // right
      return { x: 1, y: 0 };
    }
    case 40: { // up
      return { x: 0, y: 1 };
    }
  }
}



