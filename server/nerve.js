(function(require, exports) {
	
	var channels = new Array();
	    
	function getHandlers(channelName,subject){
		var channel = channels[channelName];
		if (!channel) channel = channels[channelName] = new Array();
		var handlers = channel[subject];
		if (!handlers) handlers = channel[subject] = new Array();
		return handlers;	
	}
	function setHandler(channelName,subject,handler){
		var handlers;
		handlers = getHandlers('@','@');				
		handlers.push(handler);
		if (channelName != '@'){
			handlers = getHandlers(channelName,'@');		
			handlers.push(handler);
			if (subject != '@'){
				handlers = getHandlers(channelName,subject);	
				handlers.push(handler);
			}
		}
		console.log(channels);
	}
	function on(subject, handler) {
		
		if (typeof handler != 'function') return false;
		if (typeof subject != 'string') return false;
		if ( subject === '') return false;
		
		handlers = getHandlers(this.channel(),subject);	
		handlers.push(handler);
		
	}
	function emit(subject, data, fn) {
		if (typeof subject != 'string') return;
		
		if (subject === '') return;
		if (subject === '@') return;
		var channel = this.channel();
		if (channel === '@') return;
		
		if (typeof data === 'function') {fn = data; data = {}; }
		if (typeof fn != 'function') {fn = function(){}; }
		
		if (data === undefined) data = {};
		data.__subject = subject;
		data.__channel = channel;
		
		console.log(''+this.channel()+" :: "+subject);

		var handlers; 
		handlers = getHandlers(channel, subject);
		for (var i in handlers) 
			setTimeout((function(handler){return function(){handler(data,fn)};})(handlers[i]),0);	
		handlers = getHandlers(channel, '@');
		for (var i in handlers) 
			setTimeout((function(handler){return function(){handler(data,fn)};})(handlers[i]),0);	
		handlers = getHandlers('@', '@');
		for (var i in handlers) 
			setTimeout((function(handler){return function(){handler(data,fn)};})(handlers[i]),0);	
	
			
	}
	exports.use = function(channelName, info){
		
		if (typeof channelName != 'string') channelName = '@default';
		if (channelName === '') channelName = '@default';
		
		return {
			info  : 	 function(){ return info		},
			channel : 	 function(){ return channelName	},
			on : 		(function(){ return on			})(),
			emit : 		(function(){ return emit		})()
		}
	}

})
(require, exports);