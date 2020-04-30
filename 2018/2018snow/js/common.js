
function snow(){
	let snow = `<div class="snow"></div>`;
	let idx = 0;
	let top = 100;
	setInterval(function(){
		let rect = Math.floor(Math.random()*15)+5;
		let x = Math.floor(Math.random()*100)+0;
		let delay = Math.floor(Math.random()*10000)+3000;
		if( top == 80){
			top=100;
			$(".snow").remove();
		} 
		$(".snowbox").append(snow)
		$(".snow").eq(idx).css({ width : rect+"px" , height : rect+"px" , left : x+"%"}).animate({ top:top+"%"},delay,function(){
			// $(this).remove();
			// idx--;
		})
		if( $(".snow").length % 200 == 0){
			top--;
		}
		idx++;
	},100)
}

//  가로 세로 x위치 색깔 


snow();