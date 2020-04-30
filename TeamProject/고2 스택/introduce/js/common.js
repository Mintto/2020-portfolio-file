const offset_top = target => window.pageYOffset + target.getBoundingClientRect().top; 

class App
{
	constructor(){

		// scroll
		this.wscrollY = window.wscrollY;
		this.screenHegiht = window.innerHeight
		this.scrollH;

		// offset 
		this.con1_h4 = offset_top(document.querySelector(".content1 .banner>h4>span")) + 30;
		this.con1_p = offset_top(document.querySelector(".content1 .banner>span")) + 30;
		this.con1_span = offset_top(document.querySelector(".content1 .banner>div>span")) + 30;
		this.con2_h4 = offset_top(document.querySelector(".content2 h4")) + 30;
		this.con2_p = offset_top(document.querySelector(".content2 p")) + 30;
		this.con2_img = offset_top(document.querySelector(".content2 img")) + 30;

		this.con3_img1 = offset_top(document.querySelector(".content3 .container>div:nth-child(1)")) + 30;
		this.con3_img2 = offset_top(document.querySelector(".content3 .container>div:nth-child(2)")) + 30;
		this.con3_img3 = offset_top(document.querySelector(".content3 .container>div:nth-child(3)")) + 30;
		this.con3_img4 = offset_top(document.querySelector(".content3 .container>div:nth-child(4)")) + 30;


		//  function 
		this.event();
		this.scroll();
	}

	event(){
		$(document).on("scroll",this.scroll.bind(this))
		.on('click', '.menu_slider', slideMenu)
		.on('click', '.close_menu', closeMenu)
		.on('scroll', scrollEvent)
	}

	scroll(e){
		this.wscrollY = window.scrollY;
		this.scrollH = this.wscrollY + this.screenHegiht;

		//  con 1
		if( this.con1_h4 <= this.scrollH ) document.querySelector(".content1 .banner>h4>span").classList.add("opacity_top");
		if( this.con1_p <= this.scrollH ) document.querySelector(".content1 .banner>span").classList.add("opacity_top");
		if( this.con1_span <= this.scrollH ) document.querySelector(".content1 .banner>div>span").classList.add("opacity_top");
		// con 2
		if( this.con2_h4 <= this.scrollH ) document.querySelector(".content2 h4").classList.add("opacity_top");
		if( this.con2_p <= this.scrollH ) document.querySelector(".content2 p").classList.add("opacity_top");
		if( this.con2_img <= this.scrollH ) document.querySelector(".content2 img").classList.add("opacity_top");
		// con  3
		if(this.con3_img1 <= this.scrollH ) document.querySelector(".content3 .container>div:nth-child(1)").classList.add("opacity_left") 
		if(this.con3_img2 <= this.scrollH ) document.querySelector(".content3 .container>div:nth-child(2)").classList.add("opacity_right") 
		if(this.con3_img3 <= this.scrollH ) document.querySelector(".content3 .container>div:nth-child(3)").classList.add("opacity_left") 
		if(this.con3_img4 <= this.scrollH ) document.querySelector(".content3 .container>div:nth-child(4)").classList.add("opacity_right") 
	}


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

window.onload = () => new App();

