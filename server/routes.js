
(function(require, exports) {
    
    var nerve = require('./nerve.js');
    var https = nerve.use('@https');
    var routes = nerve.use('@routes');

    var EXPIRES = 1000*60*15; // 15 минут 
    var crypto = require('crypto');


    function postLogin(req, res, next){
       //Прошел ли пользователь проверку??
        //Далее блок проверки пользователя
        // TODO реализовать механизм аутентификации пользователя
        //if (user) {passed = true;}
        var userData = {};//'123';
        //Конец блока проверки пользователя

        if (userData){ //Пользователь прошел аутентификацию
            var token = sessions.create(userData);
            var expires = sessions.expires(token);
            res.cookie('token', token, {expires: new Date(expires)});
            res.redirect('/');    
        }
        else{ //Пользователь не прошел аутентификацию
            res.render('login', { title: 'ReLog into smbi', error:'login incorrect'});    
        }
    }
    function getIndex(req, res, next){
	   /*var token = req.cookies.token;
        var expires = sessions.expires(token);
    
        if (expires < Date.now()){
            res.clearCookie('token');
            res.redirect('/login');
            return;
        }*/
    
        var token = crypto.createHash('sha256') 
            .update(Math.floor(Math.random()*Date.now()).toString())
            .digest('hex'); 

        res.cookie('token', token, {expires: new Date(Date.now()+EXPIRES)});
        res.render('', { title: 'Client'});
    }
    function getLogin(req, res, next){res.render('login', { title: 'Log into smbi' })}
    function getLogout(req, res, next){
        res.clearCookie('token');
        res.redirect('/');
    }

    https.on('ready', function(data,callback){
        //console.log(data);
        var $https = data.https;
        $https.get ('/',          getIndex);   
        $https.get ('/login',     getLogin);
        $https.post('/login',     postLogin)
        $https.post('/logout',    getLogout);
        routes.emit('ready');
    });     
})(require, exports);


