const chalk = require('chalk'); // Color package
const clear = require('clear'); // Clear CLI
const roguelike = require('roguelike/level/roguelike'); // Dungeon generator
const readline = require('readline-sync'); //Input reader


// Data for room generation
var level = roguelike({
  width: 40,
  height: 25,
  retry: 100,
  special: false,
  room: {
    ideal: 11,
    min_width: 3,
    max_width: 9,
    min_height: 3,
    max_height: 9
  }
});

// Creation of numeric dungeon matrix
var world = level.world;

// console clear 
clear();

// Upper dungeon frame
console.log(' +' + '-'.repeat(world[0].length) + '+');


// add Enemy (7) && Powerup (8) to matrix
var enemy = 0;
var power = 0;
for (var i = 1; i > 0; i++) {
  for (var y = 0; y < world.length; y++) {
    for (var x = 0; x < world[y].length; x++) {
      var tile = world[y][x];
      var rand = Math.ceil(Math.random() * 70);
      if (tile === 1 && enemy < 4 && rand === 3) { //Enemy Generation
        enemy++;
        world[y][x] = 7;
      }
      if (tile === 1 && power < 1 && rand === 3) { //Enemy Generation
        power++;
        world[y][x] = 8;
      }
    }
  }
  if (enemy === 4 && power === 1) {
    i = -1;
  }
}

// matrix conversion to symbol


for (var y = 0; y < world.length; y++) {
  var row = '';

  for (var x = 0; x < world[y].length; x++) {
    var tile = world[y][x];

    if (tile === 0) {
      row += chalk.grey('.');
    } else if (tile === 1) {
      row += ' ';
    } else if (tile === 2) {
      row += chalk.white('#');
    } else if (tile === 3) {
      row += chalk.red('/');
    } else if (tile === 4) {
      row += 'X';
    } else if (tile === 5) {
      row += chalk.yellow('a');
    } else if (tile === 6) {
      row += '◧';
    } else if (tile === 7) {
      row += 'b';
    } else if (tile === 8) {
      row += 'O';
    } else {
      row += world[y][x];
    }
  }
  // Print row by row, left and right frame
  console.log(' |' + row + '| ');
}
console.log(' +' + '-'.repeat(world[0].length) + '+');



// Input management for moventment (a-left, w-up, d-right, s-down)
var isPowered = false;

for (var i = 1; i > 0; i++) {
  let input = readline.keyIn("input:");
  if (input === "e") {
    i = -1
  }
  clear();
  console.log(' +' + '-'.repeat(world[0].length) + '+');
  for (var y = 0; y < world.length; y++) {
    var row = '';
    for (var x = 0; x < world[y].length; x++) {
      var tile = world[y][x];
      if (tile === 5 || tile === 9) {
        if (input == 'w') {
          if (world[y - 1][x] === 7 && world[y][x] != 9) { //Game Over
            i = -1;
          } else if (world[y - 1][x] === 8) { //Poweup
            world[y][x] = 1;
            world[y - 1][x] = 9;
            isPowered = true;
          } else if (world[y - 1][x] === 6) { //Dungeon Complete
            world[y][x] = 1;
            world[y - 1][x] = 5;
            i = -1;
          } else if (world[y - 1][x] != 2) { //Check if the target tile isn't wall
            world[y][x] = 1;
            if (isPowered == true){
              world[y - 1][x] = 9;
            } else{
              world[y - 1][x] = 5;
            }
          }
        }
        if (input == 'a') {
          if (world[y][x - 1] === 7 && world[y][x] != 9) { //Game Over
            i = -1;
          } else if (world[y][x - 1] === 8) { //Poweup
            world[y][x] = 1;
            world[y][x - 1] = 9;
            isPowered = true;
          } else if (world[y][x - 1] === 6) { //Dungeon Complete
            world[y][x] = 1;
            world[y][x - 1] = 5;
            i = -1;
          } else if (world[y][x - 1] != 2) { //Check if the target tile isn't wall
            world[y][x] = 1;
            if (isPowered == true){
              world[y][x - 1] = 9;  
            } else{
              world[y][x - 1] = 5;
            }
          }
        }
        if (input == 'd') {
          if (world[y][x + 1] === 7 && world[y][x] != 9) { //Game Over
            i = -1;
          } else if (world[y][x + 1] === 8) { //Poweup
            world[y][x] = 1;
            world[y][x += 1] = 9;
            isPowered = true;
          } else if (world[y][x + 1] === 6) { //Dungeon Complete
            world[y][x] = 1;
            world[y][x += 1] = 5;
            i = -1;
          } else if (world[y][x + 1] != 2) { //Check if the target tile isn't wall
            world[y][x] = 1;
            if (isPowered == true){
              world[y][x += 1] = 9;
            } else{
              world[y][x += 1] = 5;
            }
          }
        }
        if (input == 's') {
          if (world[y + 1][x] === 7 && world[y][x] != 9) { //Game Over
            i = -1;
          } else if (world[y + 1][x] === 8) { //Poweup
            world[y][x] = 1;
            world[y += 1][x] = 9;
            isPowered = true;
          } else if (world[y + 1][x] === 6) { //Dungeon Complete
            world[y][x] = 1;
            world[y += 1][x] = 5;
            i = -1;
          } else if (world[y + 1][x] != 2) { //Check if the target tile isn't wall
            world[y][x] = 1;
            if (isPowered == true){
              world[y += 1][x] = 9;
            } else{
              world[y += 1][x] = 5;
            }
          }
        }
      }
    }
  }

  // World refresh
  for (var y = 0; y < world.length; y++) {
    var row = '';

    for (var x = 0; x < world[y].length; x++) {
      var tile = world[y][x];
      if (tile === 0) {
        row += chalk.grey('.');
      } else if (tile === 1) {
        row += ' ';
      } else if (tile === 2) {
        row += chalk.white('#');
      } else if (tile === 3) {
        row += chalk.red('/');
      } else if (tile === 4) {
        row += 'X';
      } else if (tile === 5) {
        row += chalk.yellow('a');
      } else if (tile === 6) {
        row += '◧';
      } else if (tile === 7) {
        row += 'b';
      } else if (tile === 8) {
        row += 'O';
      } else if (tile === 9) {
        row += chalk.yellow('A');
      } else {
        row += world[y][x];
      }
    }

    console.log(' |' + row + '| ');

  }

  // End frame
  console.log(' +' + '-'.repeat(world[0].length) + '+');
}