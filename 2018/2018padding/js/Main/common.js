$(document).ready(function(){

	var cut=0;

	$(document).on("mouseenter","#box>div>div",function(){
		var idx = $(this).index("#box>div>div");
		
		if( idx ==0  ){ /* 0 일때  cut 1 로 되고  cut 이 1 */
			if( cut==0 || cut ==2 || cut==3){
				cut=1
				$(this).append('<div class="on adidas"><a href="#" art=""> <img src="./css/image/Main/Main_logo1.png" alt="Main_logo1"/></a> </div>')
				$(this).find(".on").animate({ opacity: "1" }).parents("div").siblings().find(".on").remove()
			}
		}
		else if( idx==1){
			if( cut==0 || cut ==1 || cut==3){
				cut=2

				$(this).append('<div class="on beanpole"> <a href="#" art=""><img src="./css/image/Main/Main_logo2.png" alt="Main_logo2"/> </a></div>')
				$(this).find(".on").animate({ opacity: "1" }).parents("div").siblings().find(".on").remove()
			}
		}
		else if( idx==2 ){
			if( cut==0 || cut ==1 || cut==2){
				cut=3
				$(this).append('<div class="on eider"><a href="#" art=""> <img src="./css/image/Main/Main_logo3.png" alt="Main_logo2"/> </a></div>')
				$(this).find(".on").animate({ opacity: "1" }).parents("div").siblings().find(".on").remove()
			}
		}
	})
})

