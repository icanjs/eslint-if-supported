#!/usr/bin/env node
var exec = require('child_process').exec;
var command = process.argv.slice(2).join(' ');

if (!command) {
  console.error('Please provide the command to run, e.g. "eslint-if-supported semistandard --fix"');
}

if (process.version[1] >= 4) {
  console.log('> ' + command);
  exec(command, function (error, stdout, stderr) {
    if (error) {
      console.log(stdout);
      process.exit(1);
    }
    if (stdout) {
      console.log('stdout', stdout);
    }
    process.exit(0);
  });
} else {
  console.log('Skipping ESLint on unsupported node version ' + process.version);
  process.exit(0);
}
