
/* 
 * This function allow us to load JS code from templates using type="text/javascript-lazy"
 */

/*global angular */
(function (ng) {
  'use strict';

  var app = ng.module('ngLoadScript', []);

  app.directive('script', function() {
    return {
      restrict: 'E',
      scope: false,
      link: function(scope, elem, attr) {
        if (attr.type === 'text/javascript-lazy') {
          var code = elem.text();
          var f = new Function(code);
          f();
        }
      }
    };
  });

}(angular));

/* 
 * Global Module for all the app
 */

var module = angular.module('app',['ngCookies','ngRoute']);

module.directive('script', function() {
    return {
      restrict: 'E',
      scope: false,
      link: function(scope, elem, attr) 
      {
        if (attr.type==='text/javascript-lazy') 
        {
          var s = document.createElement("script");
          s.type = "text/javascript";                
          var src = elem.attr('src');
          if(src!==undefined)
          {
              s.src = src;
          }
          else
          {
              var code = elem.text();
              s.text = code;
          }
          document.head.appendChild(s);
          elem.remove();
        }
      }
    };
  });

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


/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


module.filter( 'range', function() {
      var filter = 
        function(arr, lower, upper) {
          for (var i = lower; i <= upper; i++) arr.push(i)
          return arr
        }
      return filter
    } );



/* 
 * This Directive checks the Credit Card expiration 
 * Only needs the dropdowns with the names: ccinfo.expMonth and ccinfo.expYear
 */

module.directive( 'cardExpiration' , function(AlertHandler){
      var directive =
        { require: 'ngModel'
        , link: function(scope, elm, attrs, ctrl,$event){
            scope.$watch('[ccinfo.expMonth,ccinfo.expYear]',function(){
                if(scope.ccinfo.expMonth != '' && scope.ccinfo.expYear != ''){
                    today = new Date();
                    selected = new Date();
                    selected.setMonth(scope.ccinfo.expMonth);
                    selected.setYear(scope.ccinfo.expYear)
                    if(today >= selected){
                        AlertHandler.alert('Please select a valid date!');
                        scope.ccinfo.expYear = '';
                        scope.ccinfo.expMonth = '';
                        return false;
                    }
                }
              return true
            },true)
          }
        }
      return directive
      });
      
      
/* 
 * This Directive allow us to include html pages without the need of a controller 
 * Used in the index.html to include header and footer
 */    
      
module.directive('staticInclude', ['$http','$templateCache','$compile','$timeout',function($http, $templateCache, $compile,timer) {
    return function(scope, element, attrs) {
        timer(function(){
            var templatePath = attrs.staticInclude;
            $http.get(templatePath, { cache: $templateCache }).success(function(response) {
                var contents = element.html(response).contents();
                $compile(contents)(scope);
            });
        },'1500');
    };
}]);


/* 
 * This Directive prevents the number insertion  
 * add onlyDigits to input
 */  

module.directive('onlyDigits', function () {
    return {
      require: 'ngModel',
      restrict: 'A',
      link: function (scope, element, attr, ctrl) {
        function inputValue(val) {
          if (val) {
            var digits = val.replace(/[^0-9]/g, '');

            if (digits !== val) {
              ctrl.$setViewValue(digits);
              ctrl.$render();
            }
            return parseInt(digits,10);
          }
          return undefined;
        }            
        ctrl.$parsers.push(inputValue);
      }
    };
});
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
/* 
 * This is the Controller for the CC Page
 */

module.controller( 'CcCtrl' , function($scope,$locale,$window,ServiceHandler,$location,AlertHandler,BakeCookie,encrypt,ParameterByName) {
      billingInfo = BakeCookie.get('billingInfo');
      if(billingInfo == undefined){ // check if the user went through the correct order 
          $window.location.href = "#/?redirected=1";
      }
      $scope.templates = { header  : 'templates/headers/header.html',
                          templateCC : 'templates/ccTemplate.html',
                          footer : 'templates/footers/footer.html',
                          content : 'templates/contents/order.html',
                          content2 : 'templates/contents/step2-order.html'
                      };
      $scope.ccinfo = {};
      $scope.ccinfo.planID = orderSettings.Result.planID;
      $scope.ccinfo.trialPackageID = orderSettings.Result.trialPackageID;
      $scope.ccinfo.chargeForTrial = orderSettings.Result.chargeForTrial;
      $scope.ccinfo.campaign_id = orderSettings.Result.campaign_id;
      $scope.ccinfo.firstName = billingInfo.firstName;
      $scope.ccinfo.lastName = billingInfo.lastName;
      $scope.ccinfo.address1 = billingInfo.address1;
      $scope.ccinfo.address2 = billingInfo.address2 || '';
      $scope.ccinfo.city = billingInfo.city;
      $scope.ccinfo.state = billingInfo.state;
      $scope.ccinfo.zip = billingInfo.zip;
      $scope.ccinfo.country = billingInfo.country;
      $scope.ccinfo.phone = billingInfo.phone;
      $scope.ccinfo.email = billingInfo.email;
      $scope.ccinfo.sendConfirmationEmail = orderSettings.Result.sendConfirmationEmail;
      $scope.ccinfo.affiliate = ParameterByName.get('aff') || '';
      $scope.ccinfo.subAffiliate = ParameterByName.get('sub') || '';
      $scope.ccinfo.prospectID = billingInfo.ProspectID;
      $scope.ccinfo.description = orderSettings.Result.description;
      $scope.ccinfo.successRedirect = orderSettings.Result.successRedirect;
      $scope.currentYear = new Date().getFullYear();
      $scope.currentMonth = new Date().getMonth() + 1;
      $scope.months = $locale.DATETIME_FORMATS.MONTH;
      $scope.showEl = orderShowEl.Result;
      $scope.save = function(){  // save function, called when submit
        $("#button-processing").show();
        $("#button-submit").hide();
        var oldCC = $scope.ccinfo.creditCard; 
        $scope.ccinfo.creditCard = encrypt.encryptData(oldCC);
        jsonObj = JSON.stringify($scope.ccinfo);
        ServiceHandler.post('CreateSubscription',jsonObj
        ).then(function(response){
            if(response.data.State == 'Success'){
                internal = true;
                var success = $scope.ccinfo.successRedirect;
                $window.location.href = "#/"+success.split('.')[0];
            }
            else{
                if(response.data.Info == 'Test charge. ERROR'){
                    var success = $scope.ccinfo.successRedirect;
                    $window.location.href = "#/"+success.split('.')[0];
                }
                else{
                    $("#button-processing").hide();
                    $("#button-submit").show();
                    $scope.ccinfo.creditCard = oldCC;
                    AlertHandler.alert(response.data.Info);
                }
            }
        });
        return false;
      };
      $scope.hoverIn = function(){
        jQuery(".whatiscvv").stop(true, false).show('slow');
      };
      $scope.hoverOut = function(){
        jQuery(".whatiscvv").stop(true, false).hide('slow');
      };
      $scope.typeChange = function(){
            var type = $scope.ccinfo.paymentType;
            if(type==1){
                $('#cc_number').attr('data-ng-pattern','[0-9]{4} *[0-9]{6} *[0-9]{5}');
                $('#cc_number').attr('maxlength','15');
                $('#cc_cvv').attr('maxlength','4');
                $('#cc_cvv').attr('data-ng-pattern','[0-9]{4}');
            }
            else{
                $('#cc_number').attr('data-ng-pattern','[0-9]{13,16}');
                $('#cc_number').attr('maxlength','16');
                $('#cc_cvv').attr('data-ng-pattern','[0-9]{3}');
                $('#cc_cvv').attr('maxlength','3');
            }
      };
      $scope.getDate = function(days) {  
	var dayNames = new Array("Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday");    
	var monthNames = new Array("January","February","March","April","May","June","July","August","September","October","November","December"); 
	var now = new Date();   
	now.setDate(now.getDate() + days);   
	var nowString =  dayNames[now.getDay()] + ", " + monthNames[now.getMonth()] + " " + now.getDate() + ", " + now.getFullYear();   
        return nowString;
       };
       $scope.ccCheck = function(){
         var type = $scope.ccinfo.paymentType,
                 creditCard = $('#cc_number').val();
            if(type==undefined){
                AlertHandler.alert('Please select a Card Type first');
            }
            else{
                if(creditCard == undefined){
                    
                }
                else{
                    if(type==1){
                        if(creditCard.toString().length != 15)
                            AlertHandler.alert('The credit card number for AMEX should have 15 digits');
                    }
                    else{
                        if(creditCard.toString().length != 16)
                            AlertHandler.alert('The credit card number for Visa, MasterCard and Discover should have 15 digits');
                    }
                }
            }
     };
     $scope.cvvCheck = function(){
         var type = $scope.ccinfo.paymentType;
         var cvv = $('#cc_cvv').val();
            if(type==undefined){
                AlertHandler.alert('Please select a Card Type first');
            }
            else{
                if(cvv == undefined){
                }
                else{
                    if(type==1){
                        if(cvv.toString().length != 4)
                            AlertHandler.alert('The CVV number for AMEX should have 4 digits');
                    }
                    else{
                        if(cvv.toString().length != 3)
                            AlertHandler.alert('The CVV number for Visa, MasterCard and Discover should have 3 digits');
                    }
                }
            }
     };
    });
  


/* 
 * This is the Info/index Controller
 */


module.controller( 'InfoCtrl' , ['$scope','$window','$location','ServiceHandler','AlertHandler','BakeCookie','ParameterByName',
    function($scope,$window,$location,ServiceHandler,AlertHandler,BakeCookie,ParameterByName) {
      if($location.search().redirected == 1){  // check if the user is here because a redirect
          AlertHandler.alert("You're here because a this information is needed");
      }
      $scope.$on('$destroy', function() {
            window.onbeforeunload = undefined;
         });
         $scope.$on('$locationChangeStart', function(event, next, current) {
            if(!confirm("Are you sure you want to leave this page?")) {
               event.preventDefault();
            }
         });
      $scope.templates = { header  : 'templates/headers/header.html',
                          templateBill : 'templates/billingTemplate.html',
                          footer : 'templates/footers/footer.html',
                          content : 'templates/contents/index.html'
                      };
      $scope.billinfo = {};
      $scope.billinfo.step = '1';
      $scope.billinfo.hasFormSubmitted = '';
      $scope.billinfo.campaign_id = '117';
      $scope.billinfo.domain_name = $location.host()+'/specialoffer/';
      $scope.billinfo.country = 'US';
      jQuery('#header-alert').show();
      $scope.showEl = indexShowEl.Result;
      $scope.states = [
        {
            "name": "Alabama",
            "abbreviation": "AL"
        },
        {
        "name": "Alaska",
        "abbreviation": "AK"
        },
        {
        "name": "Arizona",
        "abbreviation": "AZ"
        },
        {
        "name": "Arkansas",
        "abbreviation": "AR"
        },
        {
        "name": "California",
        "abbreviation": "CA"
        },
        {
        "name": "Colorado",
        "abbreviation": "CO"
        },
        {
        "name": "Connecticut",
        "abbreviation": "CT"
        },
        {
        "name": "Delaware",
        "abbreviation": "DE"
        },
        {
        "name": "District Of Columbia",
        "abbreviation": "DC"
        },
        {
        "name": "Florida",
        "abbreviation": "FL"
        },
        {
        "name": "Georgia",
        "abbreviation": "GA"
        },
        {
        "name": "Hawaii",
        "abbreviation": "HI"
        },
        {
        "name": "Idaho",
        "abbreviation": "ID"
        },
        {
        "name": "Illinois",
        "abbreviation": "IL"
        },
        {
        "name": "Indiana",
        "abbreviation": "IN"
        },
        {
        "name": "Iowa",
        "abbreviation": "IA"
        },
        {
        "name": "Kansas",
        "abbreviation": "KS"
        },
        {
        "name": "Kentucky",
        "abbreviation": "KY"
        },
        {
        "name": "Louisiana",
        "abbreviation": "LA"
        },
        {
        "name": "Maine",
        "abbreviation": "ME"
        },
        {
        "name": "Maryland",
        "abbreviation": "MD"
        },
        {
        "name": "Massachusetts",
        "abbreviation": "MA"
        },
        {
        "name": "Michigan",
        "abbreviation": "MI"
        },
        {
        "name": "Minnesota",
        "abbreviation": "MN"
        },
        {
        "name": "Mississippi",
        "abbreviation": "MS"
        },
        {
        "name": "Missouri",
        "abbreviation": "MO"
        },
        {
        "name": "Montana",
        "abbreviation": "MT"
        },
        {
        "name": "Nebraska",
        "abbreviation": "NE"
        },
        {
        "name": "Nevada",
        "abbreviation": "NV"
        },
        {
        "name": "New Hampshire",
        "abbreviation": "NH"
        },
        {
        "name": "New Jersey",
        "abbreviation": "NJ"
        },
        {
        "name": "New Mexico",
        "abbreviation": "NM"
        },
        {
        "name": "New York",
        "abbreviation": "NY"
        },
        {
        "name": "North Carolina",
        "abbreviation": "NC"
        },
        {
        "name": "North Dakota",
        "abbreviation": "ND"
        },
        {
        "name": "Ohio",
        "abbreviation": "OH"
        },
        {
        "name": "Oklahoma",
        "abbreviation": "OK"
        },
        {
        "name": "Oregon",
        "abbreviation": "OR"
        },
        {
        "name": "Pennsylvania",
        "abbreviation": "PA"
        },
        {
        "name": "Rhode Island",
        "abbreviation": "RI"
        },
        {
        "name": "South Carolina",
        "abbreviation": "SC"
        },
        {
        "name": "South Dakota",
        "abbreviation": "SD"
        },
        {
        "name": "Tennessee",
        "abbreviation": "TN"
        },
        {
        "name": "Texas",
        "abbreviation": "TX"
        },
        {
        "name": "Utah",
        "abbreviation": "UT"
        },
        {
        "name": "Vermont",
        "abbreviation": "VT"
        },
        {
        "name": "Virginia",
        "abbreviation": "VA"
        },
        {
        "name": "Washington",
        "abbreviation": "WA"
        },
        {
        "name": "West Virginia",
        "abbreviation": "WV"
        },
        {
        "name": "Wisconsin",
        "abbreviation": "WI"
        },
        {
        "name": "Wyoming",
        "abbreviation": "WY"
        }
      ];
      $scope.save = function(info){ // fuction fired after submit form
        $("#button-submit").hide();
        $("#button-processing").show();
        jsonObj = JSON.stringify(info);
        ServiceHandler.post('createprospect',jsonObj)
        .then(function(response){
            if(response.data.State == 'Success'){
                info.ProspectID = response.data.Result.ProspectID;
                BakeCookie.set('billingInfo',info);
                internal = true;
                $window.location.href = "#/order";
            }
            else{
                $("#button-processing").hide();
                $("#button-submit").show();
                AlertHandler.alert(response.data.Info);
            }
        });
        return false;
      };
      $scope.processing = function(){
          
      };
      $scope.getDate = function(days) {  
	var dayNames = new Array("Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday");    
	var monthNames = new Array("January","February","March","April","May","June","July","August","September","October","November","December"); 
	var now = new Date();   
	now.setDate(now.getDate() + days);   
	var nowString =  dayNames[now.getDay()] + ", " + monthNames[now.getMonth()] + " " + now.getDate() + ", " + now.getFullYear();   
        return nowString;
       };
    }]);

/* 
 * This is the Controller for the CC Page
 */

module.controller( 'SuccessCtrl' , function($scope) {
      $scope.templates = { header  : 'templates/headers/header.html',
                          footer : 'templates/footers/footer.html',
                          content : 'templates/contents/success.html'
                      };
});
  

