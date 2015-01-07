'use strict';

require('colors');

function Logger(node) {
  return function log() {
    var s = arguments[0] || '';
    s = ('[' + Date.now() + '] ').yellow + ('[' + node.id + '] ').green + s;
    arguments[0] = s;
    console.log.apply(console, arguments);
  };
}

module.exports = debug;

function debug(node) {
  var log = Logger(node);
  node.once('loaded', function() {
    log('loaded');
  });
  node.on('state', function(state) {
    log('state:', state);
  });
  node.on('AppendEntries', function(args) {
    log('-> AppendEntries: %j', args);
  });
  node.on('RequestVote', function(args) {
    log('-> RequestVote: %j', args);
  });
  node.on('vote granted', function(node) {
    log('vote granted to', node);
  });
  node.on('outgoing call', function(peer, type, message) {
    log('<- outgoing call to %s of type "%s": %j', peer.id, type, message);
  });
  node.on('response', function(peer, err, args) {
    log('<- response: %j', peer.id, err, args);
  });
  node.on('election timeout', function() {
    log('election timeout');
  });
  node.on('reply', function() {
    log('-> reply %j', arguments);
  });
  node.on('reset election timeout', function() {
    log('reset election timeout');
  });
  node.on('joined', function(peer) {
    log('joined %s', peer.id);
  });
  node.on('connecting', function(peer) {
    log('connecting to %s', peer.id);
  });
  node.on('connected', function(peer) {
    log('connected from %s', peer.id);
  });
  node.on('disconnected', function(peer) {
    log('disconnected from %s', peer.id);
  });
  node.on('listening', function(address) {
    log('listening on %s', address);
  });
  node.on('cluster change', function(change) {
    log('gossiped cluster change:', change);
  });
}