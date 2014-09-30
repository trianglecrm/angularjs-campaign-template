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
                alert($('#cc_number').value);
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
  

