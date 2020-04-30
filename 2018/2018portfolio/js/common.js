	/* 풀페이지 스크롤 ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ*/
$(document).ready(function(){
		$("body").css({overflow:'hidden'});
		$(this).scrollTop(0);
	});

    var pos =0 ;

$(document).on("mousewheel",function (e) {
	var E= e.originalEvent.wheelDelta;

	var len = $("#item1>div").length;
	console.log(E)


	if(!$('#item1').is(':animated')) {
        if (E < 0 && pos < len - 1) { /* 0 <= 4 */  /*  0 <=  2  1 2    */
            ++pos;
            console.log(pos);
            $("#item1").stop().animate({
                top: -pos * 100 + "%"
            }, 1000)
            /* 아래 */
        }
        else if (E > 0 && pos > 0) { /* 0 > -1*/ /*    */
            --pos
            console.log(pos)
            $("#item1").stop().animate({
                top: -pos * 100 + "%"
            }, 1000)
            /* 위*/
        }
    }

	$("#item2>li.focus").removeClass("focus")
	$("#item2>li").eq(pos).addClass("focus")
})

	$(document).on("click","#item2>li",function () {
		$("#item2>li").removeClass("focus")
		$(this).addClass("focus")
		var len =$(this).index()
		pos = len
        $("#item1").stop().animate({
			top: -pos*100+"%"
        },1000)
    })

/* 버튼 */

    $(document).on("click",".btn1",function () {
        $("#item1").animate({top:0+"%"},1000)
        pos=0
        $("#item2>li.focus").removeClass("focus")
        $("#item2>li").eq(pos).addClass("focus")
    })

    $(document).on("click",".btn2",function () {
        $("#item1").animate({top:-100+"%"},1000)
        pos=1
        $("#item2>li.focus").removeClass("focus")
        $("#item2>li").eq(pos).addClass("focus")
    })

    $(document).on("click",".btn3",function () {
        $("#item1").animate({top:-200+"%"},1000)
        pos=2
        $("#item2>li.focus").removeClass("focus")
        $("#item2>li").eq(pos).addClass("focus")
    })

    $(document).on("click",".btn4",function () {
        $("#item1").animate({top:-300+"%"},1000)
        pos=3
        $("#item2>li.focus").removeClass("focus")
        $("#item2>li").eq(pos).addClass("focus")
    })

/* fade_slide */
    $(document).ready(function () {
        var fade_pos = 0 , fade_len = $(".fade_slide li").length;
        setInterval(function () {
            fade_pos = (fade_pos + 1) % fade_len
            $(".fade_slide>ul>li.active").removeClass("active")
            $(".fade_slide>ul>li").eq(fade_pos).addClass("active")
        },5000)
    })
    /* left_slide */
    $(document).ready(function () {
        var left_pos = 0 , left_len = $(".left_slide li").length;
        setInterval(function () {
            left_pos = (left_pos + 1) % left_len
            $(".left_slide>ul").animate({
                marginLeft:-left_pos*100+"%"
            },1000)
        },3000)
    })
    /* top_slide*/
    $(document).ready(function () {
        var top_pos = 0 , top_len = $(".top_slide li").length;
        setInterval(function () {
            top_pos = (top_pos + 1) % top_len
            $(".top_slide>ul").animate({
                marginTop:-top_pos*300+"px"
            },1000)
        },4000)
    })

    /* dropDown*/
    $(document).on("mouseenter mouseleave",".oneDrop>ul>li",function () {
        $(this).find("ul").stop().slideToggle(300)
    })

    $(document).on("mouseenter mouseleave",".twoDrop>ul>li",function () {
        $(this).parents(".twoDrop").find(".sub_menu").stop().slideToggle(300)
    })

    /* MegaDrop*/
