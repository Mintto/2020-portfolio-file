
const 
create = function(element){ // create
	return document.createElement(element);
};
HTMLElement.prototype.clone = function(){ // clone
	return this.cloneNode();
}
function App(){
	let 
	canvas = document.getElementById("canvas"),
	ctx = canvas.getContext("2d"),
	draw = {
		Type : function(array=[]){ // DrawType
			this.canvas = create("canvas");
			this.ctx = this.canvas.getContext("2d");
			this.array = Array.from( Array(40), y => y = Array.from( Array(80) , x => "" ) );
			this.canvas.width = 1200;
			this.canvas.height = 600;
			if( array.length !== 0 )
				array.forEach( v => this.array[v[1]-1][v[0]-1] = "block" );
			draw.Line(this.canvas,this.ctx,this.array);
		},
		Line: function(canvas,ctx,array){ // DrawLine
			ctx.clearRect(0,0,canvas.width,canvas.height);
			array.forEach( (y,yidx) =>{
				y.forEach( (x,xidx) =>{
					if( x === "block") draw.Rect(ctx,(xidx*15),(yidx*15),15,15);
					if( yidx ) draw.Rect(ctx,(xidx*15),(yidx*15),15,1,"lightgray");
					if( xidx ) draw.Rect(ctx,(xidx*15),(yidx*15),1,15,"lightgray");
				} );
			} );
			ctx.beginPath();
			ctx.rect(0,0,canvas.width,canvas.height);
			ctx.stroke();
		},
		Rect:function(ctx,x,y,width,height,color="black"){ // DrawRect
			ctx.beginPath();
			ctx.fillStyle = color;
			ctx.rect(x,y,width,height);
			ctx.fill();
		}
	};
	draw.Type.prototype = {
		change: function(){ // change
			draw.Line(canvas,ctx,this.array);
		},
		CreateImage : function(){ // createImage
			let img = create("img");
			img.src = this.canvas.toDataURL();
			img.style.width = 300+"px";
			img.style.height = 200+"px";
			$("#type .img-list").append(img);
		}
	}
	function ObjEmpty(obj){ // ObjectEmpty
		for(let i in obj) obj[i] = {};
			return obj;
	}
	function bgBox(dx,dy){
		this.div = create("div");
		this.div.classList.add("point");
		this.dx = dx;
		this.dy = dy;
		this.mx = dx;
		this.my = dy;
		this.move(this.mx,this.my);
	}
	bgBox.prototype.move = function(mx,my){
		let 
		box = $("#layout .container").offset(),
		left = box.left+this.dx*15, top = box.top+this.dy*15;
		this.mx = mx;
		this.my = my;
		if( this.mx < this.dx  ) left = box.left+this.mx*15;
		if( this.my < this.dy  ) top = box.top+this.my*15;
		this.div.style.width = (Math.abs(this.dx-this.mx)+1)*15+"px";
		this.div.style.height = (Math.abs(this.dy-this.my)+1)*15+"px";
		this.div.style.left = left+"px";
		this.div.style.top = top+"px";
		$("#layout .drag-box").append(this.div);
	}
	canvas.width = 1200;
	canvas.height = 600;
	$.getJSON("plan.json",JSONLoad);
	function JSONLoad(json){ // JSONLoad
		let		
		color = json.color,
		bg = false,
		drag = false,
		out = false,
		dragBooth = "",
		data = !!localStorage.getItem("data") ? JSON.parse(localStorage.getItem("data")) : { type:0, booth:ObjEmpty(Object.assign({},color)) },
		select = !!localStorage.getItem("select") ? localStorage.getItem("select") : "A1",
		TypeList = Object.entries(json).map( f => f[0].indexOf("road") !== -1 ? f[1] : [] ).map( v => new draw.Type(v)),
		EventList = {
			TypeChange:function(){ // TypeChange
				$("#layout .drag-box>div").remove();
				data.booth = ObjEmpty(Object.assign({},color));
				data.type = $(this).index();
				TypeList[data.type].change();
				save();
			},
			ColorChage:function(){ // ColorChage
				select = $("#color").val();
				$("#color-box").css({"background":color[select]});
				save();
			},
			CanvasMousedown:function(e){ // CanvasMousedown
				bg = true;
				$("#layout .drag-box>div").each( (idx,item) => {
					if( $(item).text() === select ) $(item).addClass("point");
				} )
				dragBooth = new bgBox(Math.floor(e.offsetX/15),Math.floor(e.offsetY/15));
			},
			Mousemove:function(e){ // Mousemove
				if( bg ){
					let box = $("#layout .container").offset();
					dragBooth.move(Math.floor((e.pageX-box.left)/15),Math.floor((e.pageY-box.top)/15));
				}
			},
			Mouseup:function(){ // Mouseup
				if( bg ){
					bg = false;
					$("#layout .drag-box>div").removeClass("point");
					if( Math.abs(dragBooth.dx-dragBooth.mx)+1 < 2 || Math.abs(dragBooth.dy-dragBooth.my)+1 < 2  ){
						$("#layout .drag-box>div:last-child").remove();
						alert("부스가 2x2 보다 작습니다.");
					}else if( out || check() ){
						$("#layout .drag-box>div:last-child").remove();
						alert("LAYOUT영역을 벗어났거나 통행로 또는 다른 부스영역과 겹칩니다.");
					}else{
						$("#layout .drag-box>div").remove();
						data.booth[select].p1 = { x:dragBooth.dx,y:dragBooth.dy };
						data.booth[select].p2 = { x:dragBooth.mx,y:dragBooth.my };
						boothCreate();
					}
					out = false;
				}
				dragBooth = "";
				save();
				/*
				드래그 -
				이동 
				
				검사 - 
				밖에 나가는거 검사
				박스랑 박스 겹치면 검사
				저장-
				삭제-
				*/
			}, 
			Canvasleave:function(){ // Canvasleave
				if( bg || drag ){
					out = true;
				}
			},
			Canvasenter:function(){ // Canvasenter
				if( bg || drag ){
					out = false;
				}
			}
		};
		function init(){
			TypeList[data.type].change();
			TypeList.forEach(v => v.CreateImage());
			boothCreate();
			option();
			event();
		}
		function event(){
			$(document)
			.on("click","#type .img-list>img",EventList.TypeChange)
			.on("change","#color",EventList.ColorChage)
			.on("mousedown","#canvas",EventList.CanvasMousedown)
			.on("mousemove",EventList.Mousemove)
			.on("mouseup",EventList.Mouseup)
			.on("mouseleave","#canvas",EventList.Canvasleave)
			.on("mouseenter","#canvas",EventList.Canvasenter)
			.on("mousedown","#layout .drag-box>div",EventList.BoxMousedown)
		}
		function option(){
			let colorwrap = document.getElementById("color");
			for(let i in color){
				let option = create("option");
				option.textContent = i;
				option.value = i;
				colorwrap.append(option);
			}
			$("#color").val(select);
			EventList.ColorChage();
		}
		function boothCreate(){
			Object.entries(data.booth).forEach( v => {
				if( Object.entries(v[1]).length ){
					let 
					div = create("div"),
					box = v[1],
					offset = $("#layout .container").offset();
					div.textContent = v[0];
					div.style.background = color[v[0]];
					div.style.width = (Math.abs(box.p1.x-box.p2.x)+1)*15+"px";
					div.style.height = (Math.abs(box.p1.y-box.p2.y)+1)*15+"px";
					div.style.left = box.p2.x < box.p1.x ? offset.left+box.p2.x*15+"px" : offset.left+box.p1.x*15+"px";
					div.style.top = box.p2.y < box.p1.y ? offset.top+box.p2.y*15+"px" : offset.top+box.p1.y*15+"px";
					$("#layout .drag-box").append(div);
				}
			} )
		}
		function check(){ // 블럭 겹치는거 해야됨
			for(let y = Math.min(dragBooth.dy,dragBooth.my); y<=Math.max(dragBooth.dy,dragBooth.my); y++ ){
				for(let x = Math.min(dragBooth.dx,dragBooth.mx); x<=Math.max(dragBooth.dx,dragBooth.mx); x++ ){
					if( TypeList[data.type].array[y][x] === "block" ){
						return true;
					}
				}
			}
			return false;
		}
		function save(){
			localStorage.setItem("data",JSON.stringify(data));
			localStorage.setItem("select",select);
		}
		init();
	}
}
window.onload = function(){
	App();
}