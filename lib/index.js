#!/usr/bin/env node

'use strict';

var argv = require('minimist')(process.argv.slice(2), {boolean: ['nostandby', 'nolog']});
var Sombrero = require('sombrero-node');
var debug = require('./debug');
var tmp = require('tmp');
var timers = require('timers');

tmp.setGracefulCleanup();

options(function(err, url, options) {
  if (err) {
    throw err;
  }

  console.log('options:', options);

  /// Start node

  var node = Sombrero(url, options);

  if (! argv.nolog) {
    debug(node);
  }

  timers.setTimeout(join, 1e3);

  function join() {
    var join = argv.join;
    if (join && ! Array.isArray(join)) {
      join = [join];
    }
    if (join) {
      join.forEach(function(url) {
        node.join(url);
      });
    }
  }
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
      },
      port: argv.port,
      gossip: {
        port: argv['gossip-port']
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
  console.log('\t--db=</path/to/db>: database path');
  console.log('\t--port=<port>: sombrero port');
  console.log('\t--gossip-port=<port>: sombrero gossip port');
  console.log('\t--join=<URL>: URL of node to join');
  console.log('\t--nolog=<URL>: don\'t spit out logs');
}