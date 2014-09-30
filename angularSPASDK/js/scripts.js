$(document).ready(function() {
	$('.bottom-form').focus(function() {
		window.scrollTo(0, 0);
		$('#Shipping_First_Name').focus();
	});

});
function submitOrder() {
	window.internal = true;
	IHS.submit('Registration');
	return false;
}

function submitOrderBottom() {

	window.scrollTo(0, 0);
	$('#Shipping_First_Name').focus();
}

function get_var(variable) {
	var query = window.location.search.substring(1);
	var vars = query.split('&');
	for (var i = 0; i < vars.length; i++) {
		var pair = vars[i].split('=');
		if (decodeURIComponent(pair[0]) == variable) {
			return decodeURIComponent(pair[1]);
		}
	}

	return '';
}

function createCookie(name, value, days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
		var expires = "; expires=" + date.toGMTString();
	} else
		var expires = "";
	document.cookie = name + "=" + value + expires + "; path=/";
}

function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for (var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == ' ')
		c = c.substring(1, c.length);
		if (c.indexOf(nameEQ) == 0)
			return c.substring(nameEQ.length, c.length);
	}
	return null;
}

function eraseCookie(name) {
	createCookie(name, "", -1);
}

createCookie('_sub', get_var('sub'), 1);
createCookie('_c1', get_var('c1'), 1);
createCookie('_c2', get_var('c2'), 1);
createCookie('_c3', get_var('c3'), 1); 