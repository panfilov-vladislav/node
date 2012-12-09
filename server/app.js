(function(require, exports) {
	
	var app = require('./nerve.js').use('@app');

	//require('./logger.js');
	require('./https.js');
	require('./routes.js');
	require('./sockets.js');
	require('./manager.js');

	app.emit('ready');

})(require, exports);
//var sandbox = require ('./sandbox.js').start();