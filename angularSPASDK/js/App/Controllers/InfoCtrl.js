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
