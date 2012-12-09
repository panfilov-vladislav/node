define(function(require, exports, module) {
    
    var nerve = require('nerve');

    var sockets = nerve.use('@sockets');
	sockets.on('send', 		function(data, fn){server.emit('message', data, fn)});
	//sockets.on('disconnect',function(data, callback){server.emit('disconnect',	data, callback)});
		
	var host = document.location.protocol+'//'+document.location.host;
	var server = io.connect(host);
	server.on('connect',	function(data)			{ sockets.emit('connected',    data)			});
	server.on('message',	function(data, callback){ sockets.emit('message', 	   data, callback)	});
	server.on('disconnect',	function(data)			{ sockets.emit('disconnected', data)			});
		
});


	
