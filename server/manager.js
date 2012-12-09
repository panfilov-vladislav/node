(function(require, exports) {
	
	var nerve = require('./nerve.js')
	var sockets = nerve.use('@sockets');
	var manager = nerve.use('@manager');

	
	sockets.on('@', function(data,fn){
		//console.log(fn);
		fn('answer from server');
    })

})
(require, exports);