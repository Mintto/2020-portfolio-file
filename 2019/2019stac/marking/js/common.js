$(document).ready(function(){
	var filter = "win16|win32|win64|mac";
	var moblie;
	let width = window.outerWidth;
	let max = 1050+300;


	if(navigator.platform){

		if(0 > filter.indexOf(navigator.platform.toLowerCase())){
			moblie = true;
		}else{
			moblie = false;
		}
	}

	// $(window).resize(function(){
	// 	width = window.outerWidth;
	// 	max = 1050+300;

	// 	if( width < max ){
	// 		document.querySelector(".canvasBox").style.width = width+'px';
	// 		Array.from(document.querySelectorAll(".canvasBox>canvas")).forEach( v=>{
	// 			if( width < 500 ){
	// 				if( -335 > -320+(Number(width-500))){
	// 					v.style.left = -335 +"px";	
	// 				}else{
	// 					v.style.left = -320+(Number(width-500)) +"px";	
	// 				}
	// 			}else{
	// 				v.style.left = -320+"px";	
	// 			}
	// 		})
	// 	}else{
	// 		document.querySelector(".canvasBox").style.width = 1050+'px';
	// 		Array.from(document.querySelectorAll(".canvasBox>canvas")).forEach( v=>{
	// 			v.style.left = 0+"px";	
	// 		})
	// 	}
		
	// })
	// if( moblie || width < max ){
	// 	document.querySelector(".canvasBox").style.width = 980+'px';
	// 	Array.from(document.querySelectorAll(".canvasBox>canvas")).forEach( v=>{
	// 		if( width < 500 ){
	// 			console.log(width-500)
	// 			v.style.left = -320+(Number(width-500)) +"px";	
	// 		}else{
	// 			v.style.left = -320+"px";	
	// 		}
	// 	})
	// }else{
	// 	document.querySelector(".canvasBox").style.width = 1050+'px';
	// 	Array.from(document.querySelectorAll(".canvasBox>canvas")).forEach( v=>{
	// 		v.style.left = 0+"px";	
	// 	})
	// }

})