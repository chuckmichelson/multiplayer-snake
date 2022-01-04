const { GRID_SIZE } = require('./constants');

module.exports = {
  initGame,
  gameLoop,
  getUpdatedVelocity,
}

function initGame() {
  const state = createGameState()
  randomFood(state);
  return state;
}

function createGameState() {
  console.log("made it to createGameState")
  return {
    players: [{
      pos: {
        x: 3,
        y: 10,
      },
      vel: {
        x: 0,
        y: 0,
      },
      snake: [
        {x: 1, y: 10},
        {x: 2, y: 10},
        {x: 3, y: 10},
      ],
    }, {
      pos: {
        x: 18,
        y: 10,
      },
      vel: {
        x: 0,
        y: 0,
      },
      snake: [
        {x: 20, y: 10},
        {x: 19, y: 10},
        {x: 18, y: 10},
      ],
    }],
    food: {},
    gridsize: GRID_SIZE,
    score: 0,
  };
}

function gameLoop(state) {
  console.log("made it to gameLoop")
  if (!state) {
    return;
  }

  const playerOne = state.players[0];

  var nUP = 0
  var nDOWN = 0
  var nLEFT = 0
  var nRIGHT = 0
  // for (let i = 0; i < state.players.length; i++) {
  //   playerOne.pos.x += state.players[i].vel.x;
  //   playerOne.pos.y += state.players[i].vel.y;
  // }

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
      playerOne.vel.x = 1;
      playerOne.vel.y = 0;
    }
    if (max_arrow_val === nLEFT ) {
      playerOne.vel.x = -1;
      playerOne.vel.y = 0;
    }
    if (max_arrow_val === nUP ) {
      playerOne.vel.x = 0;
      playerOne.vel.y = 1;
    }
    if (max_arrow_val === nDOWN ) {
      playerOne.vel.x = 0;
      playerOne.vel.y = -1;
    }
  }
  playerOne.pos.x += playerOne.vel.x;
  playerOne.pos.y += playerOne.vel.y;



  if (playerOne.pos.x < 0 || playerOne.pos.x > GRID_SIZE || playerOne.pos.y < 0 || playerOne.pos.y > GRID_SIZE) {
    return 2;
  }



  if (state.food.x === playerOne.pos.x && state.food.y === playerOne.pos.y) {
    playerOne.snake.push({ ...playerOne.pos });
    playerOne.pos.x += playerOne.vel.x;
    playerOne.pos.y += playerOne.vel.y;
    randomFood(state);
  }


  if (playerOne.vel.x || playerOne.vel.y) {
    for (let cell of playerOne.snake) {
      if (cell.x === playerOne.pos.x && cell.y === playerOne.pos.y) {
        return 2;
      }
    }

    playerOne.snake.push({ ...playerOne.pos });
    playerOne.snake.shift();
  }


  return false;
}

function randomFood(state) {
  food = {
    x: Math.floor(Math.random() * GRID_SIZE),
    y: Math.floor(Math.random() * GRID_SIZE),
  }

  for (let cell of state.players[0].snake) {
    if (cell.x === food.x && cell.y === food.y) {
      return randomFood(state);
    }
  }

  state.food = food;
}

function getUpdatedVelocity(keyCode) {
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


