var internal;
  if (internal != 1) {
    setTimeout(function(){window.onunload = function(event){
            if (internal != 1) {
                window.onunload = null;
                window.location.href = '#/'+ downsell;
                event.preventDefault();
            }
    }},1000);
  } else {
    internal = 0;
  }
