let floor_y;
let ball_x , ball_y;
let ball_r;
let sceen_x;
let block_x, block_y;
let block_w, block_h;
let space_check = false;
let loop;
let y = 2 , x = 4;
function App(){
	settings();
	function settings(){
		sceen_x = window.innerWidth;
		ball_r = $(".ball").width();
		floor_y = $(".floor").offset().top;	
		event();
		update();
	}
	function event(){
		$(document).on("keydown",function(e){
			let key = e.keyCode;
			if( !space_check ){
				if( key == 39 ){ // right
					x = x < 0 ? -x : x;
				}else if( key == 37 ){ // left
					x = x > 0 ? -x : x;
				}else if( key == 38){ // top
					y = y > 0 ? -y : y;
				}else if( key == 40 ){  // bottom
					y = y < 0 ? -y : y;
				}
			}
			if( key == 32){ // space
				if( !space_check) clearInterval(loop)
				else update();
				space_check = space_check == false ? true : false;
			}
		})
	}
	function ball(){
		ball_x = $(".ball").offset().left;
		ball_y = $(".ball").offset().top;
	}

	function update(){
		loop = setInterval(function(){
			ball();
				if( ball_y+ball_r+y >= floor_y || ball_y+y <= 0 ) y = -y;
				if( ball_x+ball_r+x >= sceen_x || ball_x+x <= 0 ) x = -x;
				$(".ball").css({ top:ball_y+y+"px", left:ball_x+x+"px"});
			
		},10)
	}
	function offsetXY(element){
		block_x = window.pageXOffset + element.getBoundingClientRect().left;
		block_y = window.pageYOffset + element.getBoundingClientRect().top;
	}

}

window.onload = function(){
	App();
}