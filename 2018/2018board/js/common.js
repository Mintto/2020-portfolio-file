
$(document).ready(function(){
	var move_T;
	var ctx = document.getElementsByTagName('canvas')[0].getContext('2d');
	$(document).on("mousedown","canvas",function(e){
		ctx.beginPath();
		move_T = true;
		$(document).on("mousemove","canvas",function(e){
			if( move_T == false) return false
				ctx.lineTo(e.offsetX,e.offsetY)
				ctx.stroke();
				$(document).on("mouseout","canvas",function(){
					ctx.beginPath();
				})
		})
	})
	.on("mouseup",function(){
			move_T = false;
	})
})