const App = new app();

function app(){
	let width = window.innerWidth, height= window.innerHeight;
	let moblie_check = false; 
	let moblie = false;

	//  init 
	this.init = _ =>{
		moblie_setting();
		event();
		lang();
		slider_and_popup();
		moblie_settings()
	}
	// moblie ( check )
	function moblie_setting(){
		var filter = "win16|win32|win64|mac";
		if(navigator.platform){
			if(0 > filter.indexOf(navigator.platform.toLowerCase())){
				moblie_check = true;
			}else{
				moblie_check = false;
			}
		}
		var mobileArr = new Array("iPhone", "iPod", "BlackBerry", "Android", "Windows CE", "LG", "MOT", "SAMSUNG", "SonyEricsson");
		for(var txt in mobileArr){
		    if(navigator.userAgent.match(mobileArr[txt]) != null){
		    	moblie = mobileArr[txt];
		        break;
		    }
		}
	}
	function moblie_settings(){
		if( moblie_check == true || moblie != false ){
			$(window).resize(function(){
				moblie_option();
			})
			moblie_option();
		}

	}
	function moblie_option(){
		let width = window.innerWidth; 
		let height = window.innerHeight; 
		//  lang
		if( width > 873 ){
			let lang_style = {'width':'15.38vh' , 'height':'15.38vh'};
			let font_size = {'font-size':"2.34vh"};
			$(".lang_title").css( lang_style).find("span").css( lang_style ).siblings("ul").find("li").css( lang_style).parents(".lang_title").find("button").css( font_size);	
			$('.skip_btn').css({'width':'12.09vh','height':'12.09vh'});
		}else{
			let lang_style = {'width':'15.38vw' , 'height':'15.38vw' , 'max-width':"188px"};
			let font_size = {'font-size':"3.5vw"};
			$(".lang_title").css( lang_style).find("span").css( lang_style ).siblings("ul").find("li").css( lang_style).parents(".lang_title").find("button").css( font_size);	
			$('.skip_btn').css({'width':'12.09vw','height':'12.09vw','max-width':'66.3px','max-height':'66.3px'});
		}
		//  sound
		if( width > 662){
			let sound_stlye = {'right':'17.44vh','top':'3.05vh','max-width':'51px','width':'9.3vh','max-height':'51px','height':'9.3vh','z-index':'2'};
			$(".sound_btn").css(sound_stlye);
		}else{
			let sound_stlye = {'right':'17.44vw','top':'3.05vw','max-width':'51px','width':'9.3vw','max-height':'51px','height':'9.3vw','z-index':'2'};
			$(".sound_btn").css(sound_stlye);
		}
		// one 
		if( width > 699){
			let  one_style = {'width':'406px','height':'406px'};
			$('.one').css( one_style);

			let item = $(".item_blue_one .text_wrap");
			let item2 = $(".one_effect .text_wrap");
			let KOR = { 'font-size':'21.51px', 'letter-spacing':'15.6px', }
			let ENG = { 'font-size':'29px', 'letter-spacing':'4.2px', 'line-height':'39px' }
			let CHN = { 'font-size':'27px', 'font-weight':'bold','letter-spacing':'4.3px', }
			let JPN = { 'font-size':'27px', 'font-weight':'bold','letter-spacing':'4.8px', }
			let KOR1 = { 'font-size':'21.51px', 'letter-spacing':'15.6px' }
			let ENG1 = { 'font-size':'29px', 'letter-spacing':'4.2px', 'line-height':'39px' }
			let JPN1 = { 'font-size':'27px', 'letter-spacing':'4.3px' }
			let CHN1 = { 'font-size':'27px', 'letter-spacing':'4.8px' }
			if( $(item).is(".KOR") ){
				 $(item).find("p").css(KOR);
				 $(item2).find("p").css(KOR);
			}
			else if( $(item).is(".ENG") ){ 
				 $(item).find("p").css(ENG); 
				 $(item2).find("p").css(ENG);
			}
			else if( $(item).is(".CHN") ){
				 $(item).find("p").css(CHN);
				 $(item2).find("p").css(CHN);
			}
			else if( $(item).is(".JPN") ){
				 $(item).find("p").css(JPN);
				 $(item2).find("p").css(JPN);
			}
			let button = {'width':'20px','height':'20px','top':'3px'}
			$(".item_blue_one .text_wrap button").css(button);
		}else{
			let  one_style = {'width':'56vw','height':'56vw'};
			$('.one').css( one_style);
			let item = $(".item_blue_one .text_wrap");
			let item2 = $(".one_effect .text_wrap");
			let KOR = { 'font-size':'3.75vw', 'letter-spacing':'1.6vw' }
			let ENG = { 'font-size':'4.44vw', 'letter-spacing':'0.65vw', 'line-height':'5.97vw' }
			let JPN = { 'font-size':'4.72vw', 'letter-spacing':'0.75vw' }
			let CHN = { 'font-size':'4.72vw', 'letter-spacing':'0.95vw' }
			let KOR1 = { 'font-size':'3.75vw', 'letter-spacing':'1.6vw' }
			let ENG1 = { 'font-size':'4.34vw', 'letter-spacing':'0.65vw', 'line-height':'5.97vw' }
			let JPN1 = { 'font-size':'4.19vw', 'letter-spacing':'0.75vw' }
			let CHN1 = { 'font-size':'4.19vw', 'letter-spacing':'0.95vw' }
			if( $(item).is(".KOR") ){
				 $(item).css({'left':'5.39vw'}).find("p").css(KOR);
				 $(item2).find("p").css(KOR1);
			}
			else if( $(item).is(".ENG") ){
			 	$(item).css({ 'left':'0.9vw','margin-top':'-2vw'}).find("p").css(ENG); 
			 	$(item2).find("p").css(ENG1);
			}
			else if( $(item).is(".JPN") ){
			 	$(item).css({'left':'1vw','margin-top':'-2vw'}).find("p").css(JPN);
			 	$(item2).find("p").css(JPN1);
			}
			else if( $(item).is(".CHN") ){
			 	$(item).css({'left':'7vw','margin-top':'-2vw'}).find("p").css(CHN);
			 	$(item2).find("p").css(CHN1);
			}
			let button = {'width':'2.77vw','height':'2.77vw','top':'0.27vw'}
			$(item).find("button").css(button);
		}
		if( width > 873){
			$(".play_title span").css({ 'font-size':'3.33vh'});
		}
	}
	function event(){
		setTimeout(function(){ $(".all_cover").animate({ opacity:"0"},400,function(){ $(this).css({display:"none"})}) },1100) // start background_cover
		$(document)
			.on("click",".start",function(){
				start_animation();
				$(".text_wrap button").animate({ opacity:"0"},3000);
				$(this).css({ display:"none"});
				if( moblie_check == true || moblie != false) $(".lang_title").find("ul").animate({ opacity:"0"},500,function(){ $(this).css({ display:"none"}) });
			}).on("click",".skip_btn",function(){ // skip _btn
				$(".lang_title").addClass("active")
				$(".sound_btn").css({ display:"none"});
				$(this).animate({ opacity:"0"},function(){ $(this).css({display:"none"}); });
				$("main").attr("style","transition: all 1s cubic-bezier(0.165, 0.84, 0.44, 1) 1s; top: -100%;");
			})
	}
	//  lang change 
	function lang(){
		if( moblie_check == true || moblie != false){
			let on = false;
			$(document).on("click",".lang_title",function(){
				if( on != true ) {
					on = true;
					$(this).stop().css({ height:"auto"}).find("ul").animate({ opacity:"1"},500);
				}else{
					on = false;
					$(this).stop().find("ul").animate({ opacity:"0"},10,function(){ $(this).parents(".lang_title").css({ height:"15.38vw"})});
				}
			})
		}else{
			$(document).on("mouseenter",".lang_title",function(){
				$(this).css({ height:"auto"}).find("ul").stop().animate({ opacity:"1"},500);
			}).on("mouseleave",".lang_title",function(){
				$(this).find("ul").stop().animate({ opacity:"0"},500,function(){ $(this).parents(".lang_title").css({ height:"91px"})});
			})
		}
		change()
	
		function change(){
			$(document).on("click",".lang_title li",function(){
				let idx = $(this).index();
				let span = $(this).parents(".lang_title").find("span button").text();
				let li = $(this).find("button").text();
				$(".item_blue_one .text_wrap").removeClass(span).addClass(li);
				$(".one_effect .text_wrap").removeClass(span).addClass(li);
				$(this).parents(".lang_title").find("span button").text(li);
				$(this).find("button").text(span);
				$(this).parents("ul").stop().animate({ opacity:"0"},500,function(){ $(this).parents(".lang_title").css({ height:"91px"}) });
				if( li == "KOR"){
					$(".item_blue_one .text_wrap p").html(`서로 다른 너와 내가 만나서`);
					$(".one_effect .text_wrap p").html(`함께 찾아가는 ONE DREAM`);
				}else if( li == "ENG"){
					let blue_one_txt = "You and I,<br>Different but together";
					blue_one_txt = blue_one_txt.toUpperCase();
					$(".item_blue_one .text_wrap p").html(blue_one_txt)
					$(".one_effect .text_wrap p").html(`We explore ONE DREAM`);
				}else if( li == "JPN"){
					$(".item_blue_one .text_wrap p").html(`異なる君と僕が出会えて`);
					$(".one_effect .text_wrap p").html(`一緒に探し出す ONE DREAM`);
				}else if( li == "CHN"){
					$(".item_blue_one .text_wrap p").html(`互不相同的你我相遇`);
					$(".one_effect .text_wrap p").html(`携手共寻ONE DREAM`);
				}

				if( li =="ENG" || li=="JPN" || li =="CHN"){
					$(".play_title").each(function(){
						let name= $(this).data("name");
						$(this).find("p").html(name);
						$(this).css({ "font-family":"'Ciutadella-Bold'","font-size":"22px"})
						$(".last_txt").css({ "font-family":"'Ciutadella-Bold'","font-size":"22px","color":"rgba(0,174,255,.8)"}).find("span").eq(0).css({ opacity:"1"});
					})
				}
				if( li =="KOR"){
					$(".play_title").each(function(){
						let name= $(this).data("name");
						let korname = $(this).data("korname");
						$(this).html(`<p>${korname} <span> <span>(</span>${name}<span>)</span> </span> </p>`);
						$(this).css({ "font-family":"'SDnfxGothicNeoaUniTTF-gBd','Ciutadella-Bold'","font-size":"17px"})
						$(".last_txt").css({ "font-family":"'Ciutadella-Bold'","font-size":"21px","color":"rgba(0,174,255,.8)"}).find("span").eq(0).css({ opacity:".8"});
					})
				}
				if( moblie_check == true || moblie != false) moblie_option();
			})
		}
		load();

		function load(){
			let span = $(".lang_title").find("span button").text();
			$(".item_blue_one .text_wrap").addClass(span);
			$(".one_effect .text_wrap").addClass(span);
		}
	}

	// slider and popup ( pc , moblie  = ok )
	function slider_and_popup(){
		let pop_up = false;
		let idx = 10;
		let down_x , move_x;
		let len = $(".play_list_btn li").length - 1;
		$(".play_list>li").each(function(e){ $(this).attr("data-idx",e); }) // play_list idx 
		onload();
		if( moblie_check == true || moblie != false) moblie_slider(); 
		else pc_slider();
		function moblie_slider(){
			$(document)
				.on("touchstart",".content2",function(e){ // down 
					let E = e.originalEvent;
					down_x = E.targetTouches[0].pageX;
				}).on("touchmove",".content2",function(e){ // move 
					let E = e.originalEvent;
					move_x = E.targetTouches[0].pageX;
				}).on("touchend",".content2",function(){ slider_result(); })
		}
		function pc_slider(){
			let on = false;
			$(document)
				.on("mousedown",".content2",function(e){ // down X 
					on = true;				
					down_x = e.pageX;	
					console.log("down"+down_x);
				}).on("mousemove",".content2",function(e){ // move X
					if( on != true) return false;
					move_x = e.pageX;
					console.log("move"+move_x);
				}).on("mouseup",".content2",function(){ 
					on = false;
					slider_result();
				 })
		}

		function slider_result(){
			let width = window.innerWidth ,height = window.innerHeight;
			if( pop_up == true) return false;
			let result = 0;
			if( down_x > move_x && down_x-move_x > 50 &&idx < len && move_x != null && down_x != null) idx ++;
			else if( down_x < move_x && down_x-move_x < -50 && idx > 0 &&  move_x != null && down_x != null) idx--;		
			else return false;
			for(let i=0; i<idx; i++){ result += $(".play_list>li").eq(i).outerWidth(true)/2 + $(".play_list>li").eq(i+1).outerWidth(true)/2; }	
			$(".play_list").attr("style","transition: margin-left 300ms ease 0s; margin-left: -"+result+"px;");
			if( moblie_check == true || moblie != false) $(".play_list .play_title").css({ display:"none"}).parents(".play_list").children("li").eq(idx).find(".play_title").css({ display:"block"});
			if( width < 700 ) $(".play_list>li").eq(idx).css({ opacity:"1"}).siblings("li").css({ opacity:"0.5"});
			$(".play_list_btn li").removeClass("active").eq(idx).addClass("active");
			down_x = null , move_x = null;
		}

		$(document)
			.on("click",".play_list_btn li",function(){ // play_btn ( click )
				let width = window.innerWidth ,height = window.innerHeight;
				let aidx = $(this).index() , result = 0;
				let bidx = (aidx-idx)*300;
				for(let i=0; i<aidx; i++){ result += $(".play_list>li").eq(i).outerWidth(true)/2 + $(".play_list>li").eq(i+1).outerWidth(true)/2; }
				bidx < 0 ? bidx = -bidx : bidx;		
				if( moblie_check == true || moblie != false) $(".play_list .play_title").css({ display:"none"}).parents(".play_list").children("li").eq(aidx).find(".play_title").css({ display:"block"});
				$(".play_list_btn li").removeClass("active").eq(aidx).addClass("active");
				$(".play_list").attr("style","transition: margin-left "+bidx+"ms ease 0s; margin-left: -"+result+"px;")		
			if( width < 700 ) $(".play_list>li").eq(aidx).css({ opacity:"1"}).siblings("li").css({ opacity:"0.5"});
				idx = aidx;
			}).on("click",".play_list li li:not(.thumb01)",function(){ // img 
				pop_up = true;
				let img_attr = $(this).find("span").data("img");
				let img_idx = $(this).parents("li").data("idx");	
				$(".pop_video").css({ display:"none"}).siblings(".pop_img").css({ display:"block"}).find("img").attr("src",`images/${img_attr}.jpg`).parents(".pop_box").css({ "z-index":"9999" , display:"block"}).animate({ opacity:"1"},500);
				pop_a(img_idx);
			}).on("click",".play_list li .thumb01",function(){ // video 
				if ( $(this).parents("li").is(".play_list00")) return false;
				pop_up = true;
		 		let img_src = $(this).find("span").data("src");
				let img_idx = $(this).parents("li").data("idx");	
				$(".pop_img").css({ display:"none"}).siblings(".pop_video").css({ display:"block"}).append(`<iframe allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" width="1000" height="560" src="https://www.youtube.com/embed/${img_src}?autoplay=1&mute=1" frameborder="0"></iframe>`).parents(".pop_box").css({ "z-index":"9999" , display:"block"}).animate({ opacity:"1"},500);
				pop_a(img_idx);
			}).on("click",".pop_box",function(){
				pop_up = false;
				$(this).animate({ opacity:"0"},500,function(){ $(this).css({ "z-index":"unset" , display:"none"}) }).find("iframe").remove();
			})

		function pop_a(i){
			let width = window.innerWidth ,height = window.innerHeight;
			let result = 0;
			idx = i;
			for(let i=0; i<idx; i++){ result += $(".play_list>li").eq(i).outerWidth(true)/2 + $(".play_list>li").eq(i+1).outerWidth(true)/2; }
			$(".play_list").attr("style","transition: margin-left 300ms ease 0s; margin-left: -"+result+"px;");
			$(".play_list_btn li").removeClass("active").eq(idx).addClass("active");
			if( moblie_check == true || moblie != false) $(".play_list .play_title").css({ display:"none"}).parents(".play_list").children("li").eq(idx).find(".play_title").css({ display:"block"});
			if( width < 700 ) $(".play_list>li").eq(idx).css({ opacity:"1"}).siblings("li").css({ opacity:"0.5"});	
		}

		function onload(){
			let result =0;
			let width = window.innerWidth ,height = window.innerHeight;
			for(let i=0; i<idx; i++){ result += $(".play_list>li").eq(i).outerWidth(true)/2 + $(".play_list>li").eq(i+1).outerWidth(true)/2; }
			$(".play_list").attr("style","transition: margin-left none ease 0s; margin-left: -"+result+"px;");
			if( moblie_check == true || moblie != false) $(".play_list .play_title").css({ display:"none"}).parents(".play_list").children("li").eq(idx).find(".play_title").css({ display:"block"});
			if( width < 700 ) $(".play_list>li").eq(idx).css({ opacity:"1"}).siblings("li").css({ opacity:"0.5"});
		}
	}
	// start animation
	function start_animation(){
		start();
		function start(){
			setTimeout(function(){
				$(".sound_btn").css({ display:"none"});
				$(".item_blue_one .text_wrap").animate({ opacity:"0"},500,function(){ $(this).css({display:"none"})});
				blue_one();
			},2500)
		}
		function blue_one(){
			$(".item_blue_one .blue_one_container .one").attr("style","transition: all 1.5s cubic-bezier(0.23, 1, 0.32, 1) 0s; transform: translate(0px, 0px); box-shadow: rgba(255, 255, 255, 0) 15px 15px 80px; left:0; top:0;");
			setTimeout(function(){
				$(".item_blue_one .blue_one_container .one").attr("style","transition: all 0.5s ease 0s; transform: translate(0px, 0px); box-shadow: rgba(255, 255, 255, 0) 15px 15px 80px; opacity: 0; left:0;top:0;");
				 one_effect(); 
			},1500)
		}
		function one_effect(){
			let row = $(".one_wrap .one_row div") , column = $(".one_wrap .one_column div");;
			let row_len = $(row).length , column_len = $(column).length ;
			$(".one_effect .text_wrap").attr("style","transition: all 0.4s linear 0s; opacity: 1;");
			$(".one_wrap").attr("style","transition: all 1.5s linear 0s; transform: rotate(-90deg) translate(50%,-50%);");
			$(".one_effect .one_blue").attr("style","background:#0000ff;  transition: all 1.5s linear 0s; opacity: 0;");
			for(let i=0; i<row_len; i++){
				setTimeout(function(){
					$(row).eq(i-1).attr("style","transition: all 0.9s linear 0s; opacity:0.7; width:0%");
					setTimeout(function(){ $(row).eq(i-1).attr("style","transition: all 0.3s linear 0s; opacity:0; width:29%"); },900)
				},i*100);
			}
			for(let i=0; i<column_len; i++){
				setTimeout(function(){
					$(column).eq(i-1).attr("style","transition: all 0.9s linear 0s; opacity:0.7; width:0%");
					setTimeout(function(){ $(column).eq(i-1).attr("style","transition: all 0.3s linear 0s; opacity:0; width:29%"); },900)
				},i*100);
			}
			setTimeout(function(){ circle_effect() },1550)
		}
		function circle_effect(){
			$(".item_circle .txt").eq(0).attr("style","opacity:1");
			setTimeout(function(){
				$('.item_circle .txt').attr("style","transition: all 0.8s cubic-bezier(0.165, 0.84, 0.44, 1) 0s; opacity: 1;").addClass("rotate");
				$(".one_effect .text_wrap").attr("style","transition: all 0.4s linear 0s; opacity: 0;");
				setTimeout(function(){ $(".circle_effect .circle_light").attr("style","transition: all 0.5s linear 0.7s; opacity: 1;"); },150) 
				setTimeout(function(){
					$(".circle_bg").attr("style","transition: all 1s linear 0.7s; opacity: 1;");
					$('.item_circle .txt').attr("style","transition: all 0.7s cubic-bezier(0.165, 0.84, 0.44, 1) 0.2s; opacity: 0.3; ").addClass("turn");

					$(".circle_effect .circle_logo").attr("style"," transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1) 0.5s; transform: translate(-50%,-50%); opacity: 1; ");
					$(".circle_effect .circle_logo img").attr("style","transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1) 0.5s; transform: scale(1); opacity: 1;");
					setTimeout(function(){ last(); },3000)
				},2000)
			},2000)
		}
		function last(){
			 $("main").attr("style","transition: all 1s cubic-bezier(0.165, 0.84, 0.44, 1) 0s; top: -100%;");
			 $(".lang_title li").animate({ background:"rgba(255,255,255,.1)"},1000)
		 }
	}


}










$(document).ready(function(){
	App.init();
	document.getElementById("bgm1").play();
	setTimeout(function(){
	  let bgm1 = document.getElementById("bgm1");
	  let j = document.getElementById("bgm2");
	  $("iframe").remove();
	  $(document).on("click",".sound_btn",function(){
	  	$(this).toggleClass("active")
	  	if( $(this).is(".active")) bgm1.pause();
	  	else bgm1.play();
	  }).on("click",".start",function(){
	  	bgm1.pause();
	  	j.play();
	  }).on("click",".skip_btn",function(){
	  	j.pause();
	  	bgm1.pause();
	  	$("main").attr("style","transition: all 1s cubic-bezier(0.165, 0.84, 0.44, 1) 0s; top: -100%;");
	  });
	},400); 

})
