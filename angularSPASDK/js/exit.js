var internal = 0;
window.onbeforeunload = function (e) {
    if(internal != 1){
        var message = "If you stay on the page you will be redirected to a new product",
        e = e || window.event;
        // For IE and Firefox
        if (e) {
        e.returnValue = message;
        }
        // For Safari
        setTimeout(function(){
            window.location.href = '#/'+ downsell+'?downsell=1';
        },1000);
        return message;
    }
    return ;
};

