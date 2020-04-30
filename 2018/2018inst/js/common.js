var  page = 3 ;
var idx , arr ,arr_len,slide_len;
$(window).scroll(function () {
    if($(window).scrollTop() == 0){ /* 스크롤 위치가 0 일때*/
        $(".header").css({"height":"80px"});
        $(".logo_box").css({"height":"80px"});
        $(".logo_box>ul>li:nth-child(1)").css({"border-right":"1px solid black"});
        $(".logo_box>ul>li:nth-child(2)>a>img").css({"opacity":"1","transition":"0.5s"});
        $(".nav_box").css({"top":"159px","transition":"0.5s"});
    }
    else  if($(window).scrollTop() != 0){  /* 스크롤 위치가 0 이 아닐때*/
        $(".header").css({"height":"60px","transition":"0.5s"});
        $(".logo_box").css({"height":"60px"});
        $(".logo_box>ul>li:nth-child(1)").css({"border-right":"none"});
        $(".logo_box>ul>li:nth-child(2)>a>img").css({"opacity":"0","transition":"0.5s"});
        $(".nav_box").css({"top":"85px","transition":"0.5s"});

    }
})
    .scroll(function() { /* 무한 스크롤 */
        if ($(window).scrollTop() == $(document).height() - $(window).height()) {
            if($(".check_box").is(":checked")) return false
            $(".section>.container").append('<div class="scroll_box"><div class="scroll_title"><span> 글'+page+' </span></div> <div class="scroll_slide"><ul class="slide"><li> </li><li> </li><li> </li><li> </li></ul><p  class="arrow left"> ◀ </p><p  class="arrow right"> ▶ </p></div><div class="scroll_like"><img src="./img/icon_like.png" alt="heart_img"><ul class="bullet"><li class="active"></li><li></li><li></li><li></li></ul></div></div>');
            page++;
        }
    });
$(document).ready(function () {/* 슬라이드 */
    slide_len=$(this).find(".slide:first>li").length;
    arr_len=$(this).find(".scroll_box").length;
    arr= new Array(arr_len);
        /* right */
        function right() { /* right arrow */
            if($(".slide").is(':animated')) return false
            idx= $(this).parents(".scroll_box").index();
            if(arr[idx]==undefined) arr[idx]=0
            if( arr[idx]>=slide_len-1) arr[idx]=3;
            else if( arr[idx]< slide_len-1){
                    arr[idx]++;
                    console.log(arr[idx])
                    if(!$(".slide").is(':animated')) {
                        $(this).siblings(".slide").stop().animate({marginLeft: -arr[idx] * 100 + "%"})
                        $(this).parents(".scroll_box").find(".bullet>li.active").removeClass("active")
                        $(this).parents(".scroll_box").find(".bullet>li").eq(arr[idx]).addClass("active")
                        if( arr[idx]==1) $(this).siblings(".left").css({display:"block"})
                        else if(arr[idx]==3) $(this).css({display:"none"})
                    }
                }
        } $(document).on("click",".right",right)
            /* left */
        function left() {
            if($(".slide").is(':animated')) return false
            idx= $(this).parents(".scroll_box").index();
            console.log(arr);
            console.log(idx);
            if( arr[idx]<=0) arr[idx]=0;
            else if( arr[idx]<= slide_len-1){
                arr[idx]--;
                console.log(arr[idx])
                if(!$(".slide").is(":animated")) {
                        $(this).siblings(".slide").animate({marginLeft: -arr[idx] * 100 + "%"})
                        $(this).parents(".scroll_box").find(".bullet>li.active").removeClass("active")
                        $(this).parents(".scroll_box").find(".bullet>li").eq(arr[idx]).addClass("active")
                    if( arr[idx]==2) $(this).siblings(".right").css({display:"block"})
                    else if(arr[idx]==0) $(this).css({display:"none"})
                    }
                }
        } $(document).on("click",".left",left)
})
    .on("dblclick",".scroll_slide",function () { /* 더블 */
        $(this).parents(".scroll_box").find(".scroll_like>img").addClass("like_on")
    })
    .on("click",".scroll_like>img",function () { /* 하트 */
        $(this).toggleClass("like_on")
    })
    .on("click",".check_box",function () { /* 체크 */
        if ($(".check_box").is(":checked")){
            $(".scroll_like").parents(".scroll_box").css({"display":"none"});
            $(".like_on").parents(".scroll_box").css({"display":"block"});
        }
        else{
            $(".scroll_like").parents(".scroll_box").css({"display":"block"});
        }
    })

