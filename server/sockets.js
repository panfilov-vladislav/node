(function(require, exports) {

    var nerve = require('./nerve.js');
    var https = nerve.use('@https');
    var sockets = nerve.use('@sockets');

    var clients = new Array();
    
    
    function authorization(handshake, fn) {
        var cookieString = handshake.headers.cookie;
        if (!cookieString) return fn(null, false);;
        var cookies = new Array();
        var cookieList = cookieString.split("; ");        
        for (var i in cookieList) {
            var cookie = cookieList[i].split("=");
            cookies[unescape(cookie[0])] = unescape(cookie[1]);
        }
        var token = cookies['token'];
        handshake.token = token;
        fn(null, true);
    };



    https.on('ready', function(data, callback){
        var https = data.https;
        var io = require('socket.io').listen(https);
    
        io.configure(function(){
            io.set('log level', 0);
            io.set('authorization', authorization);
        });

    
        io.sockets.on('connection', function (client){
            var token = client.handshake.token;
            clients[token] = client;

            client.on('message',    function(message, fn){ 
                sockets.emit('message', {token:token, message:message}, fn); 
            });
            client.on('disconnect',  function(message){ 
                clients[token] = undefined;
                sockets.emit('disconnected', {token:token, message:message});
            });
            sockets.emit('connected', {token:token});
        });
    
        sockets.emit('ready');
    }); 
    
    //console.log(sockets);
    sockets.on('send',   function(data, callback){
        if (!data.token) return;
        var client = clients[data.token];
        if (!client) return;        
        client.emit('message',data.message);
    }); 

})(require, exports);