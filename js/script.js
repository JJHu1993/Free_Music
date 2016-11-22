$(document).ready( function() {
	selected_ip = null
	var $submenu = $('.submenu');
	var $mainmenu = $('.mainmenu');
	$submenu.hide();
	$submenu.first().delay(400).slideDown(700);
	$submenu.on('click','li', function() {
		$submenu.siblings().find('li').removeClass('chosen');
		$(this).addClass('chosen');
		selected_ip = $(this).context.innerText.split('<IP>')[1]
		localStorage.setItem('ip', selected_ip);
		$('input[id="switch-state"]').bootstrapSwitch('disabled', false, true);
		$('input[id="switch-state"]').bootstrapSwitch('state', false, false);
		console.log(selected_ip);




	});
	$mainmenu.on('click', 'li', function() {
		$(this).next('.submenu').slideToggle().siblings('.submenu').slideUp();
	});
	$mainmenu.children('li:last-child').on('click', function() {
		$mainmenu.fadeOut().delay(500).fadeIn();
	});

/**
*	button event
*/
	if(localStorage.getItem('ip') != null)
		$('input[id="switch-state"]').bootstrapSwitch('disabled', false, true);
	if(localStorage.getItem('isOpen') == 1 )
		$('input[id="switch-state"]').bootstrapSwitch('state', true, true);


	$('input[id="switch-state"]').on('switchChange.bootstrapSwitch', function(event, state) {
		if (state){
				ip = localStorage.getItem('ip')
	  		setup_pac_file(ip)
				localStorage.setItem('isOpen', 1);
		}
		else{
			turn_off_proxy()
			localStorage.setItem('isOpen', 0);
		}
	});
});
function setup1(){
	if((localStorage.getItem('ip') != null) && (localStorage.getItem('port') != null))
	$('#cur_proxy').empty().append('<p>Proxy set - '+localStorage.getItem('ip')+':'+localStorage.getItem('port')+'</p>');
else
	$('#cur_proxy').empty().append('<p>Proxy not used<p>');
}
