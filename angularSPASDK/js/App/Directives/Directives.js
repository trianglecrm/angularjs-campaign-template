
/* 
 * This Directive checks the Credit Card expiration 
 * Only needs the dropdowns with the names: ccinfo.expMonth and ccinfo.expYear
 */

module.directive( 'cardExpiration' , function(){
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
                        alert('Please select a valid date!');
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

//module.directive('confirmOnExit', function() {
//    return {
//        link: function($scope, elem, attrs) {
//
//            $scope.$on('$locationChangeStart', function(event, next, current) {
//                alert('me');
//                if ($scope.myForm.$dirty) {
//                    if(!confirm("Ahh the form is dirty, do u want to continue?")) {
//                        event.preventDefault();
//                    }
//                }
//            });
//
//            window.onbeforeunload = function(){
//                alert('me');
//                if ($scope.myForm.$dirty) {
//                    return "The Form is Dirty.";
//                }
//            }
//        }
//    };
//});

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