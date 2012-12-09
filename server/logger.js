(function(require, exports) {
	
	var allEvents = require('./nerve.js').use('@');

	allEvents.on('@', function(info, data, callback){
		console.log('123');
	});

})
(require, exports);