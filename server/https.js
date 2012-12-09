
(function(require, exports) {
    
    var nerve = require('./nerve.js');
    var https = nerve.use('@https');
    var app = nerve.use('@app');
    var sockets = nerve.use('@sockets');

    
    var fs = require('fs');
    var express = require('express');


    var config = {
        $https: {
            key: fs.readFileSync(__dirname+'/../ssl/flyfish-20120604.key'),
            cert: fs.readFileSync(__dirname+'/../ssl/flyfish-20120604.pem')
        },
        faviconPath: __dirname+'/../client/stylesheets/favicon/favicon.ico',
        staticPath:  __dirname+'/../client/',
        session:{
            secret: 'smbi',
            cookie : { path: '/', httpOnly: false, maxAge: 1000*60}
        }
    };

    var $https = express.createServer(config.$https);

    // Configuration

    $https.configure(function(){
        $https.set('views', __dirname + '/../client');
        //https.set('view engine', 'jade') ;
        $https.set("view engine", "html");
        $https.register(".html", require("jqtpl").express);
    
        $https.use(express.favicon(config.faviconPath),1); 
        $https.use(express.cookieParser());
        $https.use(express.session(config.session));
        $https.use(express.bodyParser());
        $https.use(express.methodOverride());
        $https.use($https.router);
        $https.use(express.static(config.staticPath));
    });

    $https.configure('development', function(){
        $https.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
    });

    $https.configure('production', function(){
        $https.use(express.errorHandler());
    });

    //console.log($https);
    app.on('ready', function(info, data, callback){
        https.emit('ready', {https:$https});
    });

    sockets.on('ready', function(info, data, callback){
        $https.listen(3000, function(){
            https.emit('started', {https: https});
        });
    });
})(require, exports);









