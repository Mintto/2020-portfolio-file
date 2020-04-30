
var 
canvas , ctx ,
moveX, moveY ,
ImgArr = [] , count = 0,
Mdrag = false ,
offset = { downX : null , downY : null , moveX : null , moveY : null },
Imgidx;


function init(){
	event();
}
function event(){
	$(document).on("mousedown",".dragImg",function(e){
		Mdrag = true;
		Imgidx = $(this).data("idx");
		return false;

	}).on("dblclick",".dragImg",function(e){
		Imgidx = $(this).data("idx");
		DrawImg()
		return false;
	})
	$(".canvasBox").on("mousemove",function(e){
		if( Mdrag ){
			offset.moveX = e.pageX;
			offset.moveY = e.pageY;
			$(`.dragImg[data-idx=${Imgidx}]`).css({ left: ImgArr[Imgidx].x + ( offset.moveX - offset.downX)+"px" , top: ImgArr[Imgidx].y + ( offset.moveY - offset.downY)+"px"  })
		}
		// return false;
	}).on("mousedown",function(e){
		offset.downX = e.pageX;
		offset.downY = e.pageY;
	}).on("mouseup",function(e){
		if( Mdrag ){
			ImgArr[Imgidx].x =  Number($(`.dragImg[data-idx=${Imgidx}]`).css("left").split("px")[0]);
			ImgArr[Imgidx].y =  Number($(`.dragImg[data-idx=${Imgidx}]`).css("top").split("px")[0]);
			Mdrag = false;
		}
	})

	$("canvas")
	.on("dragover",function(e){
		moveX = e.offsetX , moveY = e.offsetY;
		return false; 
	})
	.on("drop",function(e){
		e.preventDefault();  
		e.stopPropagation();
		e.dataTransfer = e.originalEvent.dataTransfer;
		var files = e.target.files || e.dataTransfer.files;
		if( files.length > 1) return alert("1개씩만 올릴수 있습니다.");
		if (files[0].type.match(/image.*/)) {
			createImg(window.URL.createObjectURL(files[0]));		
		}

	});
}
function createImg(img){
	let ImgUrl = new Image();
	ImgUrl.src = img;
	ImgUrl.addEventListener('load',function(){
		ImgArr[count] = { item : img , x : moveX , y: moveY };
		$(".canvasBox").append( $(`<div class="dragImg" data-idx=${count}></div> `).css({ "background":`url(${img}) no-repeat`,'background-size':"100% 100%" , "width":ImgUrl.width , "height" : ImgUrl.height , "left" : moveX+"px" , "top" : moveY +"px" , "z-index" : count+1 }) )
		count++;
	})
}
function DrawImg(){
	let ImgUrl = new Image();
	ImgUrl.src = ImgArr[Imgidx].item;
	ImgUrl.addEventListener('load',function(){
		canvas = document.querySelector(`.focus`);
		ctx = canvas.getContext("2d");
		ctx.drawImage(ImgUrl, ImgArr[Imgidx].x, ImgArr[Imgidx].y);
		$(`.dragImg[data-idx=${Imgidx}]`).remove();
	})

}


window.onload = ()=>{
	init();
}



