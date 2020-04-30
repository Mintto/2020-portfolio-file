function App(){
	let canvas = document.getElementById("canvas"),
	ctx = canvas.getContext("2d");
	canvas.width = 1200;
	canvas.height = 600;
	function getJSON(json){ // getJSON
		let 
		color = json.color,
		TypeList = Object.entries(json).map( f => f[0].indexOf("road") !== -1 ? f[1] : [] ).map( array => {
			let arraylist = Array.from( Array(40) , (j,jidx) => j = Array.from( Array(80) , (v,vidx) => v = "" ));
			array.forEach( v => arraylist[v[1]-1][v[0]-1] = "block" );
			return arraylist;
		}),
		data = !!localStorage.getItem("data") ? JSON.parse(localStorage.getItem("data")) : { type: 0 , booth:defaultBooth() },
		savelist = !!localStorage.getItem("savelist") ? JSON.parse(localStorage.getItem("savelist")) : [],
		select = !!localStorage.getItem("select") ? localStorage.getItem("select") : "A1",
		divbox = {},
		target = "",
		canvasdrag = false,
		divdrag = false;
		function init(){
			TypeList.forEach(renderType);
			savelist.forEach(renderBooth);
			console.log(TypeList[data.type]);
			renderCanvas(TypeList[data.type]);
			renderDiv();
			renderOption();
			event();
		}
		function event(){
			$(document)
			.on("click","#type .img-list>img",onTypeClick)
			.on("change","#color",onColorChange)
			.on("mousedown","#canvas",onMousedownCanvas)
			.on("mousemove",onMousemove)
			.on("mouseup",onMouseup)
			.on("mousedown","#layout .container>div",onMousedownDiv)
			.on("click","#layout .save_btn",onClickSave)
			.on("click","#layout .delete_btn",onClickDelete)
			.on("click","#layout .save-list>img",onClickDataChange)
			.on("click","#layout .save-list>span",onClickSpanDelete)
		}
		// event
		function onTypeClick(){
			$("#layout .container>div").remove();
			data.type = $(this).index();
			data.booth = defaultBooth();
			renderCanvas(TypeList[data.type]);
			renderSize();
			save();
		}
		function onColorChange(){
			select = $("#color").val();
			$("#color-box").css({ "background":color[select] });
			renderSize();
			save();
		}
		function onMousedownCanvas(e){
			canvasdrag = true;
			divbox = { p1: getPos(e) , p2 : getPos(e) };
			$("#layout .container").append("<div></div>");
			$("#layout .container>div:last-child").css({ left:divbox.p1.x*15,top:divbox.p1.y*15,width:15,height:15 });
		}
		function onMousemove(e){
			if( canvasdrag ){
				divbox.p2 = getPos(e);
				let map = minmax();
				$("#layout .container>div:last-child").css({ left : map.min.x*15, top : map.min.y*15, width:(map.max.x-map.min.x+1)*15 , height:(map.max.y-map.min.y+1)*15 });
			}else if( divdrag ){
				divbox.p2 = getPos(e);
				$(target).css({ transform:`translate(${(divbox.p2.x-divbox.p1.x)*15}px,${(divbox.p2.y-divbox.p1.y)*15}px)`,'z-index':"9999" });
			}
		}
		function onMouseup(e){
			if( canvasdrag ){
				divbox = minmax();
				canvasdrag = false;
				$("#layout .container>div").remove();
				if( sizeCheck() ){
					divbox = null;
					alert("부스 크기가 2x2보다 작습니다.");
				}else if(layerCheck("canvas") ){
					divbox = null;
					alert("부스가 LAYOUT영역을 벗어났거나 통행로 또는 다른 부스영역과 겹칩니다.");
				}else{
					data.booth[select] = Object.assign({},divbox);
				}
				renderSize();
				renderDiv();
			}else if( divdrag ){
				let selectbooth = data.booth[target.text()],
				x = divbox.p2.x-divbox.p1.x,
				y = divbox.p2.y-divbox.p1.y;
				divbox = {
					p1: { x:selectbooth.min.x+x, y:selectbooth.min.y+y },
					p2: { x:selectbooth.max.x+x, y:selectbooth.max.y+y }
				}
				divbox = minmax();
				divdrag = false;
				$("#layout .container>div").remove();
				if(layerCheck("div") ){
					divbox = null;
					alert("부스가 LAYOUT영역을 벗어났거나 통행로 또는 다른 부스영역과 겹칩니다.");
				}else{
					data.booth[target.text()] = Object.assign({},divbox);
				}
				renderDiv();
			}
			save();
		}
		function onMousedownDiv(e){
			divdrag = true;
			divbox = { p1:getPos(e) , p2: getPos(e) };
			target = $(this);
		}
		function onClickDataChange(){
			data = Object.assign({},savelist[$(this).index()]);
			renderCanvas(TypeList[data.type]);
			renderDiv();
		}
		function onClickSave(){
			renderBooth(data);
			savelist.push(Object.assign({},data));
			alert("저장되었습니다.");
			renderCanvas(TypeList[data.type]);
			save();
		}
		function onClickDelete(){
			$("#layout .container>div").remove();
			data.booth = defaultBooth();
			renderCanvas(TypeList[data.type]);
			save();
		}
		function onClickSpanDelete(){
			$(this).data("idx");
		}
		// check
		function sizeCheck(){
			return divbox.max.x-divbox.min.x+1 < 2 || divbox.max.y-divbox.min.y+1 < 2;
		}
		function layerCheck(check){
			let array = TypeList[data.type] , is = check == "canvas" ? select : target.text();
			if( divbox.min.x < 0 || divbox.min.y < 0 || divbox.max.x > 79 || divbox.max.y > 39 ) return true;
			for(let y=divbox.min.y; y<= divbox.max.y; y++){
				for(let x=divbox.min.x; x<= divbox.max.x; x++){
					if( array[y][x] == "block" ) return true;
				}
			}
			return  Object.entries(data.booth).filter( f => f[0] != is && Object.entries(f[1]).length ).some( v =>{
				vitem = v[1];
				let left = vitem.min.x < divbox.min.x ? vitem.max.x < divbox.min.x  :  divbox.max.x < vitem.min.x , 
				top = vitem.min.y < divbox.min.y ? vitem.max.y < divbox.min.y  :  divbox.max.y < vitem.min.y ;
				return !left && !top;
			})				
		}
		// render
		function renderCanvas(array){
			ctx.clearRect(0,0,canvas.width,canvas.height);
			array.forEach( (y,yidx) =>{
				y.forEach( (x,xidx) =>{
					if( x === "block" ) draw(xidx*15,yidx*15,15,15);
					if( yidx ) draw(xidx*15,yidx*15,15,1,"lightgray");
					if( xidx ) draw(xidx*15,yidx*15,1,15,"lightgray");
				});
			})
			ctx.beginPath();
			ctx.rect(0,0,canvas.width,canvas.height);
			ctx.stroke();
		}
		function renderType(array){
			renderCanvas(array);
			$("#type .img-list").append(`<img src="${canvas.toDataURL()}"></img>`);
		}
		function renderBooth(data,idx=savelist.length){
			let array = JSON.parse(JSON.stringify(TypeList[data.type]));
			renderCanvas(array);
			Object.entries(data.booth).filter( f => Object.entries(f[1]).length ).forEach( v =>{ // array booth setting
				for(let y = v[1].min.y; y<= v[1].max.y; y++){
					for(let x = v[1].min.x; x<= v[1].max.x; x++){
						array[y][x] = v[0];
					} 
				} 
			});
			array.forEach( (y,yidx) =>{
				y.forEach( (x,xidx) =>{
					if( x != "" && x != "block" ) draw(xidx*15,yidx*15,15,15,color[x]);
				})
			})
			$("#layout .save-list").append(`<span data-idx="${idx}">x</span>`);
			$("#layout .save-list").append(`<img src="${canvas.toDataURL()}" data-idx="${idx}"></img>`);
		}
		function renderOption(){
			let colorwrap = $("#color");
			for(let i in color){
				let option = new Option(i,i);
				colorwrap.append(option);
			}
			colorwrap.val(select);
			renderSize();
			onColorChange();
		}
		function renderDiv(){
			$("#layout .container>div").remove();
			Object.entries(data.booth).filter( f => Object.entries(f[1]).length ).forEach( v => {
				$("#layout .container").append(`<div>${v[0]}</div>`);
				$("#layout .container>div:last-child").css({ left:v[1].min.x*15,top:v[1].min.y*15,width:(v[1].max.x-v[1].min.x+1)*15,height:(v[1].max.y-v[1].min.y+1)*15,background:color[v[0]] });
			} );
		}
		function renderSize(){
			let selectbooth = data.booth[select];	
			$("#layout .work p.size").text(`${ Object.entries(selectbooth).length ? (selectbooth.max.x-selectbooth.min.x+1)*(selectbooth.max.y-selectbooth.min.y+1): 0}㎡`);
		}
		function minmax(){ 
			return Object.assign({},{
				min : { x : Math.min(divbox.p1.x,divbox.p2.x) , y : Math.min(divbox.p1.y,divbox.p2.y) },
				max : { x : Math.max(divbox.p1.x,divbox.p2.x) , y : Math.max(divbox.p1.y,divbox.p2.y) }
			});
		}
		function save(){
			localStorage.setItem("data",JSON.stringify(data));
			localStorage.setItem("savelist",JSON.stringify(savelist));
			localStorage.setItem("select",select);
		}
		init();
	}
	function draw(x,y,w,h,color="black"){
		ctx.beginPath();
		ctx.fillStyle = color;
		ctx.rect(x,y,w,h);
		ctx.fill();
	}
	function getPos(e){
		return Object.assign({},{
			x:Math.floor((e.pageX-$("#layout .container").offset().left)/15),
			y:Math.floor((e.pageY-$("#layout .container").offset().top)/15)
		})
	}
	function defaultBooth(){
		return Object.assign({},{"A1":{},"A2":{},"A3":{},"A4":{},"A5":{},"B1":{},"B2":{},"B3":{},"B4":{},"B5":{},"C1":{},"C2":{},"C3":{},"C4":{},"C5":{}});
	}
	$.getJSON("plan.json",getJSON);
}
window.onload = function(){
	App();
}