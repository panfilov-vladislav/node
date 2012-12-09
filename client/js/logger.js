define(function(require, exports, module) {
    
    var name = 'client@logger';
    var nerve = require('nerve').enter({from:name});
    
    nerve.on({},function(event, callback){
		console.log('{ '+'from: '+event.from+', subject: '+event.subject+' }');
	});

    
});