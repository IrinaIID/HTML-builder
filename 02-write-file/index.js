const fs = require('fs');
const path = require('path');
const { exit } = require('process');
const { stdin, stdout } = process;

const output = fs.createWriteStream(path.resolve(__dirname, 'text.txt'));

stdout.write('Hello, enter text in console \n');

stdin.on('data', (data) => {
  if (data.toString().trim() === 'exit') {
    stdout.write('You wrote "exit". Exit from the program.');
    exit();
  }
  output.write(data);
});

process.on('SIGINT', () => {
  stdout.write('You applied "Crtl + C". Exit from the program.');
  exit();
});