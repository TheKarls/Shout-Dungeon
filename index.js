const chalk = require('chalk'); // Color package
const clear = require('clear'); // Clear CLI
const roguelike = require('roguelike/level/roguelike'); // Dungeon generator
const readline = require('readline-sync'); //Input reader



// Data for room generation
var level = roguelike({
  width: 31,
  height: 19,
  retry: 100,
  special: true,
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
    } else {
      row += world[y][x];
    }
  }
  // Print row by row, left and right frame
  console.log(' |' + row + '| ');
}
console.log(' +' + '-'.repeat(world[0].length) + '+');



// Input management for moventment (a-left, w-up, d-right, s-down)
for (var i = 1; i > 0; i++) {
  let input = readline.keyIn("input:");
  clear();
  console.log(' +' + '-'.repeat(world[0].length) + '+');
  for (var y = 0; y < world.length; y++) {
    var row = '';
    for (var x = 0; x < world[y].length; x++) {
      var tile = world[y][x];
      if (tile === 5) {
        if (input == 'w') {
          if (world[y - 1][x] != 2 && world[y - 1][x] != 6) { //Check if the target tile isn't wall or exit
            world[y][x] = 1;
            world[y - 1][x] = 5;
          }
          else if (world[y - 1][x] === 6){ // Exit management
            world[y][x] = 1;
            world[y - 1][x] = 5;
            i = -1;
          }
        }
        if (input == 'a') {
          if (world[y][x - 1] != 2 && world[y][x - 1] != 6) {
            world[y][x] = 1;
            world[y][x - 1] = 5;
          }
          else if (world[y][x - 1] === 6){
            world[y][x] = 1;
            world[y][x - 1] = 5;
            i = -1;
          }
        }
        if (input == 'd') {
          if (world[y][x + 1] != 2 && world[y][x + 1] != 6) {
            world[y][x] = 1;
            world[y][x += 1] = 5;
          }
          else if (world[y][x + 1] === 6){
            world[y][x] = 1;
            world[y][x += 1] = 5;
            i = -1;
          }
        }
        if (input == 's') {
          if (world[y + 1][x] != 2 && world[y + 1][x] != 6) {
            world[y][x] = 1;
            world[y += 1][x] = 5;
          }
          else if (world[y + 1][x] === 6){
            world[y][x] = 1;
            world[y += 1][x] = 5;
            i = -1;
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
      } else {
        row += world[y][x];
      }
    }

    console.log(' |' + row + '| ');

  }

  // End frame
  console.log(' +' + '-'.repeat(world[0].length) + '+');
}