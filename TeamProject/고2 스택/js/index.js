  function siteLoad (){
	$('head').append(`<style>
		.addin1{position: relative; top: 0px; opacity: 1; transition-delay:0.1s}
		.addin2{position: relative; top: 0px; opacity: 1; transition-delay:0.2s}
	</style>`);
	slide();
}

function slide(){
	$('.slide').each( function (idx, target) {
		var obj      = $(target).find('ul')
		var len      = $(target).find('li').length
		var playTime = $(target).data('time')
		var delay    = $(target).data('delay')
		var type     = $(target).data('type')
		var arrow    = $(target).data('arrow')
		var bullet   = $(target).data('bullet')
		var pos      = 0
		var timer

		obj.find('li').eq(pos).addClass('active')
		obj.css('position', 'relative')

		if (bullet) {
			var wrapStyle  = 'position:absolute; bottom:20px; left:0; right:0; text-align:center;'
			var childStyle = 'width:30px; height:3px; background:#fff; transition:0.5s; display:inline-block; margin:0 4px; border-radius:2px'
			var bulletWrap = $('<div class="pos"></div>').attr('style', wrapStyle)
			for (var i = 0; i < len; i++) {
				var bulletChild = $('<a href="#"></a>').attr('style', childStyle)
				if (i == 0) bulletChild.addClass('active').css('background', '#f5c998')
					bulletChild.appendTo(bulletWrap)
			}
			bulletWrap.appendTo(target)
		}

		if(type == 'fade')
			obj.find('li').css({position:'absolute',left:0,top:0,width:'100%',height:'100%'}).not('.active').hide()

		function play () {
			clearTimeout(timer)	

			if (++pos >= len)  pos = 0
				if (pos < 0) pos = len-1
					$(target).find(".pos a.active").removeClass('active').css("background","#fff")
				$(target).find(".pos a").eq(pos).addClass('active').css("background","#f5c998")
				if (type == 'fade') {
					obj.find('li.active').removeClass('active').stop().fadeOut(playTime)
					obj.find('li').eq(pos).addClass('active').stop().fadeIn(playTime)
				}

				timer = setTimeout(play, delay)
			}

			$(target).find('.arrow').on('click', function () {
				if ($(this).hasClass('left')) pos -= 2
					play()
				return false
			})

			$(target).find('.pos a').on('click', function () {
				pos = $(this).index() - 1
				play()
				return false
			})

			timer = setTimeout(play, delay)
		} )
}

function slideMenu(){
	$('.slide_menu').css({"left":"0"})
	$('.menu_wrap').css({"visibility":"visible"})
}	

function closeMenu(){
	$('.slide_menu').css({"left":"-50%"})
	$('.menu_wrap').css({"visibility":"hidden"})
}	

function scrollEvent(){
	var windowTop = $(window).scrollTop();
	if (windowTop > 10) {
		$("header").css({"background":"white"})
	}else{
		$("header").css({"background":"rgba(255, 255, 255, 0)"})
	}
}

function box_scrollEvent (){
	var st = $(window).scrollTop();
	var sh = $(window).height();
	var sp = st + sh;
	$('.box_active').each(function(idx, target) {
		var active_type = $(target).data('type')
		var it = $(this).offset().top;
		var ih = $(this).height();
		var ip = it + ih;
		if (st <= it && sp >= ip) {	
			if (active_type == 'Fx_img1') {
				$(this).addClass('addin1')
			}else if(active_type == 'Fx_img2'){
				$(this).addClass('addin2')
			}
		}
	});
}

function clickUp(){
    $('#popup').css({"display":"block"})
}
function closeUp(){
   $('#popup').css({"display":"none"})
}

function dragUpClose(){
	$('#dragUp').css({"display":"none"})
}

function putUp(){
	$('#put').css({"display":"block"})
}
function putClose(){
	$('#put').css({"display":"none"})
}

function apply(){
	$('#apply').css({"display":"none"})
}


$(siteLoad)
.on('click', '.menu_slider', slideMenu)
.on('click', '.close_menu', closeMenu)
.on('scroll', scrollEvent)
.on('scroll', box_scrollEvent)
.on('click', '.popupBtn', clickUp)
.on('click', '.close', closeUp)
.on('click', '.closeUp', dragUpClose)
.on('click', '#btn3', putUp)
.on('click', '#put>.close', putClose)
.on('click', '#apply>.close', apply)