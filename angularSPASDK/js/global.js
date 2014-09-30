var globalFunctions = (function () {
	var obj = {}, privateVariable = 1;
        
	obj.alert = function(msg){
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
        };
        
        obj.ServiceHandlerPost = function(action,params){
            return $.post( "TriangleCRM/Controller.php", { 
                action : action,
                data : params });
        };
        
        obj.setCookie = function(name,data){
            $.cookie(name, data);
        };
        
        obj.removeCookie = function(name){
            $.removeCookie(name);
        };
        
        obj.getCookie = function(name){
            return $.cookie(name);
        };
        
        obj.encryptData = function(toencrypt){
            var $pem="-----BEGIN PUBLIC KEY-----\
MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAM1RXGYKyXlCGcGvFYeNCD+yzVAOoK+w\
2awyE6vOCSqhR0pAWFgpWOuwbrL5M78PILmZc85ipbzoz6Vtv4IvYJUCAwEAAQ==\
-----END PUBLIC KEY-----";
            var $key = RSA.getPublicKey($pem);
            return RSA.encrypt(toencrypt,$key);
        };
        
        obj.getDate = function(days) {  
            var dayNames = new Array("Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday");    
            var monthNames = new Array("January","February","March","April","May","June","July","August","September","October","November","December"); 
            var now = new Date();   
            now.setDate(now.getDate() + days);   
            var nowString =  dayNames[now.getDay()] + ", " + monthNames[now.getMonth()] + " " + now.getDate() + ", " + now.getFullYear();   
            return nowString;
        };
        
        obj.getYear = function(year) {   
            var now = new Date();    
            var nowString = now.getFullYear();   
            document.write(nowString);
        };
        
        obj.processer = function(action){
            if(action == 'show'){
                $("#button-processing").show();
                $("#button-submit").hide();
            }
            else{
                $("#button-processing").hide();
                $("#button-submit").show();
            }
        };
        
        obj.getParameterByName = function( name ){
            name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
            var regexS = "[\\?&]"+name+"=([^&#]*)", 
                regex = new RegExp( regexS ),
                results = regex.exec( window.location.href );
            if( results == null ){
              return "";
            } else{
              return decodeURIComponent(results[1].replace(/\+/g, " "));
            }
        };
        
        return obj;
}());

var infoModule = (function (gf) {
        var billinfo = {}, obj = {} ;
        if(gf.getParameterByName('redirected')){  // check if the user is here because a redirect
            gf.alert("You're here because a this information is needed");
        }
	function save(){
            populateElements();
            gf.processer('show');
            jsonObj = JSON.stringify(billinfo);
            gf.ServiceHandlerPost('createprospect',jsonObj).done(function(response){
                response = JSON.parse(response);
                if(response.State == 'Success'){
                    billinfo.ProspectID = response.Result.ProspectID;
                    gf.setCookie('billingInfo',billinfo);
                    window.location.href = "/order.php";
                }
                else{
                    gf.processer();
                    gf.alert(response.Info);
                }
            });
            return false;
        };
        
        function populateElements(){
            billinfo.step = '1';
            billinfo.hasFormSubmitted = '';
            billinfo.campaign_id = '117';
            billinfo.domain_name = location.host +'/specialoffer/';
            billinfo.country = 'US';
            billinfo.fields_fname = $('#fields_fname').val() || '';
            billinfo.fields_lname = $('#fields_lname').val() || '';
            billinfo.fields_address1 = $('#fields_address1').val() || '';
            billinfo.fields_address2 = $('#fields_address2').val() || '';
            billinfo.fields_city = $('#fields_city').val() || '';
            billinfo.fields_state = $('#fields_state').val() || '';
            billinfo.fields_zip = $('#fields_zip').val() || '';
            billinfo.fields_country = $('#fields_country').val() || billinfo.country;
            billinfo.fields_phone = $('#fields_phone').val() || '';
            billinfo.fields_email = $('#fields_email').val() || '';
        };
        
        obj.save = save;
        obj.billingInfo = billinfo;
        
        return obj;
        
}(globalFunctions));