var EventEmitter = require('events').EventEmitter;

var emitter = new EventEmitter();


emitter.on('log', console.log)

emitter.emit('log', 'Hello')
emitter.emit('Error', 'Hello2')
