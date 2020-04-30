const 
create = function(element){
	return document.createElement(element);
};
HTMLElement.prototype.clone = function(){ // clone
	return this.cloneNode();
}
function App(){
	let
	Mcanvas = document.getElementById("canvas"),
	Mctx = canvas.getContext('2d');
	canvas.width = 1200;
	canvas.height = 600;
	$.getJSON("plan.json",function(json){ // getJSON
		let road = Array.from(new Set(Object.entries(json).map( v => v[0].indexOf("road") !== -1 ? v[1] : [] ))),
		color = json.color,
		copyColor = Object.assign({},color),
		cloneArr = {},
		dragArr = [],
		drag = false,
		boxdrag = false,
		dragTarget = "",
		out= false;
		for(let i in copyColor){
			copyColor[i] = {};
		}
		data = !!localStorage.getItem("data") ? JSON.parse(localStorage.getItem("data")) : { type: 0,booth:Object.assign({}, copyColor ) },
		savedata = !!localStorage.getItem("savedata") ? JSON.parse(localStorage.getItem("savedata")) : [],
		select = !!localStorage.getItem("select") ? localStorage.getItem("select") : "A1",
		eventList = {
			ColorChage : function(e){
				select = $("#color").val();
				$("#color-box").css({ "background":`${color[$("#color").val()]}`});
				size();
				save();
			},
			TypeChage: function(e){
				$("#layout .container>div").remove();
				for(let i in data.booth){
					data.booth[i] = {};
				}
				data.type = $(this).index();
				CanvasLine();
				size();
				save();
			},
			CanvasMouseleave:function(e){
				if( drag ){
					out = true;
				}
			},
			CanvasMousemove:function(e){
				if( drag){
					out = false;
				}
			},
			CanvasMousedown:function(e){
				drag = true;
				delete cloneArr.p1;
				delete cloneArr.p2;
				dragArr.push(new dragBox(Math.floor(e.offsetX/15),Math.floor(e.offsetY/15)));
				cloneArr.p1 = { x : Math.floor(e.offsetX/15) , y : Math.floor(e.offsetY/15) };
			},
			Mousemove:function(e){
				if( drag ){
					let box = $("#layout .container").offset(),
					dx = dragArr[dragArr.length-1].dx,
					dy = dragArr[dragArr.length-1].dy,
					left = dx+Math.floor(Math.abs(box.left+dx*15-e.pageX)/15),
					top  = dy+Math.floor(Math.abs(box.top+dy*15-e.pageY)/15);
					if( e.pageX < box.left+dx*15 ){
						left = (dx-Math.floor(Math.abs(box.left+dx*15-e.pageX)/15))-1;
					}
					if( e.pageY < box.top+dy*15 ){
						top = (dy-Math.floor(Math.abs(box.top+dy*15-e.pageY)/15))-1;
					}
					dragArr[dragArr.length-1].move(left,top);
					cloneArr.p2 = { x : Math.floor(e.offsetX/15) , y : Math.floor(e.offsetY/15) };
				}
				if( boxdrag ){
					
				}
			},
			Mouseup:function(e){
				if( drag ){
				drag = false;
					if( sizeCheck() ){
						$("#layout .container>div:last-child").remove();
						delete cloneArr.p1;
						delete cloneArr.p2;
						alert("부스가 2x2 보다 작습니다.");
					}else if( out || !check() ){
						$("#layout .container>div:last-child").remove();
						delete cloneArr.p1;
						delete cloneArr.p2;
						out = false;
						alert("LAYOUT영역을 벗어났거나 통행로 또는 다른 부스영역과 겹칩니다.");
					}else{
						$("#layout .container>div").remove();
						data.booth[select].p1 = Object.assign({}, cloneArr.p1 );
						data.booth[select].p2 = Object.assign({}, cloneArr.p2 );
						Object.entries(data.booth).forEach( (v,idx) =>{
							if( Object.entries(v[1]).length ){
								BoothBox(v[1].p1.x, v[1].p1.y, v[1].p2.x, v[1].p2.y ,v[0],color[v[0]]);
							}
						} )
						size();
					}
				}
				if(boxdrag){
					boxdrag = false;
					dragTarget = "";
				}
				save();
			},
			dragBoxMousedown:function(e){
				boxdrag = true;
				dragTarget = $(this);
			}
		};
		road = road.map( (v,idx) => new DrawImage(v))
		function init(){ // init
			CanvasLine();
			type();
			option();
			event();
			Object.entries(data.booth).forEach( (v,idx) =>{
				if( Object.entries(v[1]).length ){
					BoothBox(v[1].p1.x, v[1].p1.y, v[1].p2.x, v[1].p2.y ,v[0],color[v[0]]);
				}
			} )
		}
		function event(){
			$(document)
			.on("change","#layout .work select",eventList.ColorChage)
			.on("click","#type .img-list img",eventList.TypeChage)
			.on("mousedown","#canvas",eventList.CanvasMousedown)
			.on("mouseleave","#canvas",eventList.CanvasMouseleave)
			.on("mousemove","#canvas",eventList.CanvasMousemove)
			.on("mousemove",eventList.Mousemove)
			.on("mouseup",eventList.Mouseup)
			.on("mousedown","#layout .container>div",eventList.dragBoxMousedown)
		}
		function dragBox(dx,dy){
			this.div = create("div");
			this.div.classList.add("point");
			this.dx = dx;
			this.dy = dy;
			this.mx = dx;
			this.my = dy;
			this.move();
		}
		function size(){
			let rect = data.booth[select];
			if( Object.entries(rect).length ){
				width = Math.abs(rect.p1.x-rect.p2.x)+1,
				height = Math.abs(rect.p1.y-rect.p2.y)+1;
				$(".work .size").text(`${width*height}㎡`);
			}else{
				$(".work .size").text(`0㎡`);
			}
		}
		function check(){ // check
			let 
			dragBox = dragArr[dragArr.length-1],
			booth = Object.entries(data.booth).filter( f => f[0] != select && Object.entries(f[1]).length );
			for(let y = Math.min(dragBox.my,dragBox.dy); y <= Math.max(dragBox.my,dragBox.dy); y++ ){
				for(let x = Math.min(dragBox.mx,dragBox.dx); x <= Math.max(dragBox.mx,dragBox.dx); x++ ){
					if( road[data.type].array[y][x] == "block" ){
						return false;
					}
				}
			}
			return booth.every( v => {
				if( Math.min(v[1].p1.y,v[1].p2.y) <= Math.min(dragBox.my,dragBox.dy) && Math.min(dragBox.my,dragBox.dy) <= Math.max(v[1].p1.y,v[1].p2.y) ){
					if( Math.min(v[1].p1.x,v[1].p2.x) <= Math.min(dragBox.mx,dragBox.dx) && Math.min(dragBox.mx,dragBox.dx) <= Math.max(v[1].p1.x,v[1].p2.x) ){
						return false;
					}else if( Math.min(v[1].p1.x,v[1].p2.x) <= Math.max(dragBox.mx,dragBox.dx) && Math.max(dragBox.mx,dragBox.dx) <= Math.max(v[1].p1.x,v[1].p2.x) ){
						return false;
					}
				}else if( Math.min(v[1].p1.y,v[1].p2.y) <= Math.max(dragBox.my,dragBox.dy) && Math.max(dragBox.my,dragBox.dy) <= Math.max(v[1].p1.y,v[1].p2.y) ){
					if( Math.min(v[1].p1.x,v[1].p2.x) <= Math.min(dragBox.mx,dragBox.dx) && Math.min(dragBox.mx,dragBox.dx) <= Math.max(v[1].p1.x,v[1].p2.x) ){
						return false;
					}else if( Math.min(v[1].p1.x,v[1].p2.x) <= Math.max(dragBox.mx,dragBox.dx) && Math.max(dragBox.mx,dragBox.dx) <= Math.max(v[1].p1.x,v[1].p2.x) ){
						return false;
					}
				}
				return true;
			} );
		}
		function sizeCheck(){
			let dragBox = dragArr[dragArr.length-1];
			if( dragBox.dx == dragBox.mx || dragBox.dy == dragBox.my ){
				return true;
			}
			return false;
		}
		dragBox.prototype.move = function(mx=this.mx,my=this.my){
			let left = this.dx*15 , top = this.dy*15;
			this.mx = mx;
			this.my = my;
			if( this.mx < this.dx  ){
				left = this.mx*15;
			}
			if( this.my < this.dy  ){
				top = this.my*15;
			}
			this.div.style.width = (Math.abs(this.dx-this.mx)+1)*15+"px";
			this.div.style.height = (Math.abs(this.dy-this.my)+1)*15+"px";
			this.div.style.left = left+"px";
			this.div.style.top = top+"px";
			$("#layout .container").append(this.div);
		}
		function BoothBox(x1,y1,x2,y2,text,color){ // BoothBox
			let div = create("div"),
			left = x1*15, top = y1*15;
			if( x2 < x1 ) left = x2*15;
			if( y2 < y1 ) top = y2*15;
			div.textContent = text;
			div.style.background = color;
			div.style.width = (Math.abs(x1-x2)+1)*15+"px";
			div.style.height = (Math.abs(y1-y2)+1)*15+"px";
			div.style.left = left+"px";
			div.style.top = top+"px";
			$("#layout .container").append(div);
		}
		function type(){ // type
			road.forEach( v =>{
				v.draw();
			});
		}
		function option(){ // option
			for(let i in color){
				let option = create("option");
				option.value = i;
				option.textContent = i;
				$("#color").append(option);
			}
			$("#color").val(select);
			eventList.ColorChage();
		}
		function CanvasLine(canvas=Mcanvas,ctx=Mctx,array=road[data.type].array){ // CanvasLine
			ctx.clearRect(0,0,canvas.width,canvas.height);
			array.forEach((y,yidx)=>{
				y.forEach((x,xidx)=>{
					if( x === "block" ){
						draw(ctx,(xidx*15),(yidx*15),15,15);
					}
					if( yidx != 0 ){
						draw(ctx,(xidx*15),(yidx*15),15,1,"lightgray");
					}
					if( xidx != 0){
						draw(ctx,(xidx*15),(yidx*15),1,15,"lightgray");
					}
				});
			});
			ctx.beginPath();
			ctx.rect(0,0,canvas.width,canvas.height);
			ctx.stroke();
		}
		function DrawImage(array=[]){ // DrawImage
			this.canvas = Mcanvas.clone();
			this.ctx = this.canvas.getContext("2d");
			this.array = Array.from( Array(40), v => v = Array.from( Array(80) , j => j = "" ) );
			if( array.length !== 0 ){
				array.forEach( (v,idx) =>{
					this.array[v[1]-1][v[0]-1] = "block";
				});
			}
			CanvasLine(this.canvas,this.ctx,this.array);
		}
		DrawImage.prototype.draw = function(){
			let img = create("img");
			img.src = this.canvas.toDataURL();
			$("#type .img-list").append(img);
		}
		function draw(ctx,x1,y1,x2,y2,color="black"){ // draw
			ctx.beginPath();
			ctx.fillStyle = color;
			ctx.rect(x1,y1,x2,y2);
			ctx.fill();
		}
		function save(){ // save
			localStorage.setItem("data",JSON.stringify(data));
			localStorage.setItem("savedata",JSON.stringify(savedata));
			localStorage.setItem("select",select);
		}
		init();
	});

}
window.onload = function(){
	App();
}