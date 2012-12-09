
define(function(require, exports) {
	
	var channels = new Array();
	
	function getHandlers(channelName,subject){
		var channel = channels[channelName];
		if (!channel) channel = channels[channelName] = new Array();
		var handlers = channel[subject];
		if (!handlers) handlers = channel[subject] = new Array();
		return handlers;	
	}
	function on(subject, handler) {
		
		if (typeof handler != 'function') return false;
		if (typeof subject != 'string') return false;
		if ( subject === '') return false;
		
		var handlers = getHandlers(this.channel(),subject);
		handlers.push(handler);
		
	}
	function emit(subject, data, fn) {
		if (typeof subject != 'string') return;
		if (typeof data === 'function') {callback = data; data = {}; }
		if (typeof callback != 'function') {callback = function(){}; }
		console.log(''+this.channel()+" :: "+subject);
		var handlers = getHandlers(this.channel(),subject);
		
		for (var i in handlers) 
			setTimeout((function(handler){return function(){handler(data,fn)};})(handlers[i]),0);
	}
	exports.use = function(channelName){
		if (typeof channelName != 'string') channelName = '@default';
		if (channelName === '') channelName = '@default';
		
		return {
			channel : function(){ return channelName},
			on : (function(){ return on})(),
			emit : (function(){return emit })()
		}
	}

});

