'======================'
'Client :: sandbox.js     '
'======================'

define(function(require, exports, module) {
    
    var nerve = require('nerve').enter({from:'sandbox'});

  
    function start(){
    	nerve.emit({to:'transport', subject:'disconnect', data:'data to disconnect'});
    }

    exports.start = (function(){ return start })();

});