function move(){

	$(document).on("mousemove",function(e){
		let x =e.pageX,y =e.pageY;
		$(".pointer").css({ left:x+"px", top:y+"px"})
	}).on("click",function(){
		$(".pointer").animate({ width:"250px", height:"250px"},100);
	})
}

window.onload = function(){
	move();
}