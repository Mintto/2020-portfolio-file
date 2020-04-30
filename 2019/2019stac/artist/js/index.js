function siteLoad (){
	$('head').append(`<style>
	 .addin{position: relative; top: 0px; opacity: 1}

	</style>`);
	scrollEvent()
}

function scrollEvent (){
	var st = $(window).scrollTop();
	var sh = $(window).height();
	var sp = st + sh;
	$('.active').each(function() {
		var it = $(this).offset().top;
		var ih = $(this).height();
		var ip = it + ih;
		if (st <= it && sp >= ip) {
			$(this).addClass('addin')
		}
	});
}

$(siteLoad)
.on('scroll', scrollEvent)
