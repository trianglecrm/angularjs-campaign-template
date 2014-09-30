/* 
 * This Factory Handles all the alerts of the app
 */


module.factory('AlertHandler', function(){
    return {
        alert : function(msg){
            jError(
                "<div>We are sorry but we could not process your request.<br/><h2>"+msg+"</h2>Please correct and try again.</div>",
                {
                    autoHide : true, // added in v2.0
                    TimeShown : 3000,
                    HorizontalPosition : 'center',
                    onCompleted : function(){ // added in v2.0

                    }
                }
            );
        }
    }
});


/* 
 * This Factory Handles every Ajax Call in the app calling out controller.php
 */

module.factory('ServiceHandler', ['$http',function($http){
    return {
        post : function(action,params){
            return $http.post('TriangleCRM/Controller.php', {
                action : action,
                data : params
            });
        }
    }
}]);

/* 
 * This Factory Handles every cookie set or get
 */

module.factory('BakeCookie', function($cookieStore){
    return {
        set : function(name, data){
            $cookieStore.put(name,data);
        },
        remove: function(name){
            $cookieStore.remove(name);
        },
        get: function(name){
            return $cookieStore.get(name);
        }
    }
});

/* 
 * This Factory encrypts the CC number before sending it to the server
 */

module.factory('encrypt', function(){
    return {
        encryptData: function(toencrypt){
            var $pem="-----BEGIN PUBLIC KEY-----\
MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAM1RXGYKyXlCGcGvFYeNCD+yzVAOoK+w\
2awyE6vOCSqhR0pAWFgpWOuwbrL5M78PILmZc85ipbzoz6Vtv4IvYJUCAwEAAQ==\
-----END PUBLIC KEY-----";
        var $key = RSA.getPublicKey($pem);
        return RSA.encrypt(toencrypt,$key);
        }
    };
});

/* 
 * This Factory get the params from the query string
 */


module.factory('ParameterByName', function(){
    return {
        get : function(name) {
                name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
                var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
                    results = regex.exec(location.search);
                return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
            }
    }
});