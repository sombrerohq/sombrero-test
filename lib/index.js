#!/usr/bin/env node

'use strict';

var argv = require('minimist')(process.argv.slice(2), {boolean: ['nostandby']});
var Sombrero = require('sombrero-node');
var debug = require('./debug');
var tmp = require('tmp');
tmp.setGracefulCleanup();

options(function(err, url, options) {
  if (err) {
    throw err;
  }

  console.log('options:', options);

  /// Start node

  var node = Sombrero(url, options);

  debug(node);
});



function options(cb) {
  // Parse options


  var url = argv._[0];
  if (! url) {
    error('No URL provided')
  }

  var dbPath = argv.db;

  if (! dbPath) {
    tmp.dir(haveDir);
  }
  else {
    haveDir(null, dbPath);
  }

  function haveDir(err, dir) {
    var options = {
      skiff: {
        standby: !argv.nostandby,
        dbPath: dir
      }
    };

    cb(err, url, options);
  }

}

/// Error

function error(msg) {
  console.error(msg);
  usage();
  process.exit(1);
}

function usage() {
  console.log('Usage:\n');
  console.log('%s %s <options> <URL>\n', process.argv[0], process.argv[1]);
  console.log('Options:');
  console.log('\t--nostandby: don\'t standby');
  console.log('\t--db=</path/to/db: database path');
}