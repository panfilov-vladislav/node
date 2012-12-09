define(function(require, exports, module) {
    
    var nerve = require('nerve')
    var manager = nerve.use('@manager');
    var sockets = nerve.use('@sockets');
    
    sockets.on('connected', function(data, fn){
    	sockets.emit('send','message from client', function(answer){
    		console.log(answer);	
    	})
    });
});