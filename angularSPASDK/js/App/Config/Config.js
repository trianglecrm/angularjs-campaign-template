/* 
 * This config allow you to get values from the query string using locationProvider
 */

module.config(['$locationProvider', function($locationProvider){
    //$locationProvider.html5Mode(true);    
}]);


/* 
 * This config to add the SPA's routing 
 */

module.config(function($routeProvider) {
    $routeProvider
            // route for the home page
            .when('/', {
                    templateUrl : '/templates/contents/index.php',
                    controller  : 'InfoCtrl'
            })
            .when('/index', {
                    templateUrl : '/templates/contents/index.php',
                    controller  : 'InfoCtrl'
            })

            // route for the about page
            .when('/order', {
                    templateUrl : '/templates/contents/order.php',
                    controller  : 'CcCtrl'
            })

            // route for the sucess page
            .when('/success', {
                    templateUrl : '/templates/contents/success.php',
                    controller  : 'SuccessCtrl'
            })
            
            // route for the step2 order page
            .when('/step2-order', {
                    templateUrl : '/templates/contents/step2-order.php',
                    controller  : 'CcCtrl'
            })
            
            // route for the step2 sucess page
            .when('/step2-success', {
                    templateUrl : '/templates/contents/step2-success.php',
                    controller  : 'SuccessCtrl'
            })
            .when('/step3', {
                    templateUrl : '/templates/contents/step3-order.php',
                    controller  : 'CcCtrl'
            })
            .otherwise({
                    redirectTo: '/'
                  });
});

