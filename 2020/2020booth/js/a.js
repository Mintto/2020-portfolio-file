/* type, save preview */
let canvas= document.createElement("canvas");
canvas.width= 800;
canvas.height= 400;
let ctx= canvas.getContext('2d');
/* get road block */
const getBlock= e =>{
	if(app.road == 0) return [];
	let block= [], p1= {}, p2= {}, before, now;
	Object.entries(Object.entries(road[app.road].sort((a,b) => a[0] == b[0]? a[1] - b[1]: a[0] - b[0]).reduce((obj, v) =>{obj[v[0]]=[...(obj[v[0]] || []), v[1]]; return obj;}, {})).map(v =>{v[1]= JSON.stringify(v[1]); return v;}).reduce((obj, v) =>{obj[v[0]]= v[1]; return obj;}, {})).map(v =>{v[0]--; return v;}).forEach((v, n) =>{
		now= v;
		if(n == 0){
			p1.x= v[0];
			p1.y= JSON.parse(v[1])[0]-1;
			before= now;
		}
		if(before[1] != now[1]){
			p2.x= before[0];
			p2.y= JSON.parse(before[1]).slice(-1)[0]-1;
			block.push({
				p1: {...p1},
				p2: {...p2},
				width: p2.x - p1.x+1,
				height: p2.y - p1.y+1
			});
			p1.x= now[0];
			p1.y= JSON.parse(now[1])[0]-1;
		}
		before= v;
	});
	p2.x= now[0];
	p2.y= JSON.parse(now[1]).slice(-1)[0];
	block.push({
		p1,
		p2,
		width: now[0] - p1.x,
		height: JSON.parse(now[1]).slice(-1)[0] - p1.y,
	})
	return block;
}
/* app */
class App {
	constructor (){ // init
		this.road= localStorage.road == undefined? "0": localStorage.road;
		this.bcode= localStorage.bcode == undefined? "A1": localStorage.bcode;
		this.now= localStorage.now == undefined? null: JSON.parse(localStorage.now);
		this.booth= localStorage.booth == undefined? this.defaultBooth: JSON.parse(localStorage.booth);
		this.save= localStorage.save == undefined? []: JSON.parse(localStorage.save);
		this.canvas= $("canvas").get(0);
		this.ctx= this.canvas.getContext('2d');
		this.ctx.font= "16px sans-serif";
		this.ctx.textBaseline= "middle";
		this.eve();
	}
	get defaultBooth (){ // defaultbooth
		return Object.assign({}, {"A1" : {},"A2" : {},"A3" : {},"A4" : {},"A5" : {},"B1" : {},"B2" : {},"B3" : {},"B4" : {},"B5" : {},"C1" : {},"C2" : {},"C3" : {},"C4" : {},"C5" : {}});
	}
	getPos (e){ // mouse pos
		return Object.assign({}, {
			x: Math.floor((e.pageX - $("#canvas").offset().left) / 15),
			y: Math.floor((e.pageY - $("#canvas").offset().top) / 15),
		});
	}
	get minmax (){ // get min, max
		return [Math.min(this.now.p1.x, this.now.p2.x), Math.min(this.now.p1.y, this.now.p2.y), Math.max(this.now.p1.x, this.now.p2.x), Math.max(this.now.p1.y, this.now.p2.y)];
	}
	eve (){ // event function
		$("#color").empty();
		for(let i in color){
			let op= new Option(i, i);
			op.style.color= color[i];
			$("#color").get(0).add(op);
		}
		this.renderType();
		$(document)
		.on("mousedown", "#canvas", this.onMouseDownCanvas.bind(this))
		.on("mousemove", this.onMouseMoveCanvas.bind(this))
		.on("mouseup", this.onMouseUpCanvas.bind(this))
		.on("mousedown", ".content div", this.onMouseDownDiv.bind(this))
		.on("mousemove", this.onMouseMoveDiv.bind(this))
		.on("mouseup", this.onMouseUpDiv.bind(this))
		.on("click", ".save_btn", this.onClickSave.bind(this))
		.on("click", ".delete_btn", this.onClickDelete.bind(this))

		window.onscroll= e =>{ localStorage.scroll= window.scrollY; console.log(localStorage.scroll); }
	}
	/* event listener */
	onClickSave (){
		this.save= [...this.save, [Object.assign({}, {...this.booth}), this.road]];
		this.Save();
		this.renderSave();
		setTimeout(e => alert("저장 완료!"), 0);
	}
	onClickDelete (){
		this.booth= this.defaultBooth;
		this.Save();
		this.renderCanvas();
		this.renderColor();
		setTimeout(e => alert("삭제 완료!"), 0);
	}
	onMouseDownCanvas (e){
		this.cdown= true;
		this.cpos= this.getPos(e);
		$(".work .content").append(`<div id="preview" style="position:absolute;background:#ffc500;opacity:0.5;z-index:5;"></div>`);
		$("#preview").css({left: this.cpos.x*15, top: this.cpos.y*15, width: 15, height: 15});
		this.now= {
			p1: this.cpos,
			p2: this.cpos
		};
	}
	onMouseMoveCanvas (e){
		if(!this.cdown) return;
		this.now.p2= this.getPos(e);
		let arr= this.minmax;
		$("#preview").css({left: arr[0]*15, top: arr[1]*15, width: (arr[2]-arr[0]+1)*15, height: (arr[3]-arr[1]+1)*15});
	}
	onMouseUpCanvas (e){
		if(!this.cdown) return;
		$("#preview").remove();
		this.cdown= false;
		this.now={
			p1: {
				x: this.minmax[0],
				y: this.minmax[1],
			},
			p2: {
				x: this.minmax[2],
				y: this.minmax[3],
			},
			width: this.minmax[2] - this.minmax[0]+1,
			height: this.minmax[3] - this.minmax[1]+1,
		};
		if(this.now.width < 2 || this.now.height < 2){
			this.now= null;
			this.Save();
			this.renderCanvas();
			this.renderColor();
			return alert("부스가 2x2 보다 작습니다.");
		}
		if(
			Object.entries(this.booth).filter(f => f[0] != this.bcode).map(v =>v[1]).concat(getBlock()).some((v,n) =>{
				return v.p1 == undefined? false: !(
					v.p1.x + v.width - 1 < this.now.p1.x ||
					v.p1.y + v.height - 1 < this.now.p1.y ||
					v.p1.x > this.now.p1.x + this.now.width - 1 ||
					v.p1.y > this.now.p1.y + this.now.height - 1
				)
			}) || (
				this.now.p1.x < 0 ||
				this.now.p1.y < 0 ||
				this.now.p1.x+this.now.width > 80 ||
				this.now.p1.y+this.now.height > 40
			)
		){
			this.now= null;
			this.Save();
			this.renderCanvas();
			this.renderColor();
			return alert("부스가 LAYOUT영역을 벗어났거나 통행로 또는 다른 부스영역과 겹칩니다.");
		}
		this.booth[this.bcode]= {...this.now};
		this.now= null;

		this.Save();
		this.renderCanvas();
		this.renderColor();
	}
	onMouseDownDiv (e){
		this.ddown= true;
		this.div= $(e.currentTarget);
		this.div.css({zIndex: 10});
		this.dcode= this.div.text();
		this.bcode= this.div.text();
		this.dpos= this.getPos(e);
		this.renderColor();
		this.Save();
	}
	onMouseMoveDiv (e){
		if(!this.ddown) return;
		this.dpos2= this.getPos(e);
		this.div.css({
			left: this.booth[this.dcode].p1.x*15 + (this.dpos2.x - this.dpos.x)*15 + "px",
			top: this.booth[this.dcode].p1.y*15 + (this.dpos2.y - this.dpos.y)*15 + "px",
		});
	}
	onMouseUpDiv (e){
		if(!this.ddown) return;
		this.ddown= false;
		if(
			Object.entries(this.booth).filter(f => f[0] != this.bcode).map(v =>v[1]).concat(getBlock()).some((v,n) =>{
				return v.p1 == undefined? false: !(
					v.p1.x + v.width-1 < parseInt(this.div.css("left"))/15 ||
					v.p1.y + v.height-1 < parseInt(this.div.css("top"))/15 ||
					v.p1.x > parseInt(this.div.css("left"))/15 + this.booth[this.dcode].width-1 ||
					v.p1.y > parseInt(this.div.css("top"))/15 + this.booth[this.dcode].height-1
				)
			}) || (
				parseInt(this.div.css("left"))/15 < 0 ||
				parseInt(this.div.css("top"))/15 < 0 ||
				(parseInt(this.div.css("left"))/15) + (this.booth[this.dcode].width-1) > 79 ||
				(parseInt(this.div.css("top"))/15) + (this.booth[this.dcode].height-1) > 39
			)
		){
			this.div= null;
			this.dcode= null;
			this.Save();
			this.renderCanvas();
			this.renderColor();
			return alert("부스가 LAYOUT영역을 벗어났거나 통행로 또는 다른 부스영역과 겹칩니다.");
		}
		this.booth[this.dcode].p1.x= parseInt(this.div.css("left"))/15;
		this.booth[this.dcode].p1.y= parseInt(this.div.css("top"))/15;
		this.booth[this.dcode].p2.x= (parseInt(this.div.css("left"))/15) + (this.booth[this.dcode].width-1);
		this.booth[this.dcode].p2.y= (parseInt(this.div.css("top"))/15) + (this.booth[this.dcode].height-1);
		this.div= null;
		this.dcode= null;
		this.renderCanvas();
		this.renderColor();
	}
	/* localStorage SAVE */
	Save (){
		localStorage.now= JSON.stringify(this.now);
		localStorage.save= JSON.stringify(this.save);
		localStorage.booth= JSON.stringify(this.booth);
		localStorage.bcode= this.bcode;
		localStorage.road= this.road;
	}
	/* render */
	renderCanvas (){
		this.ctx.drawImage($(`#type img[data-idx=${this.road}]`).get(0), 0, 0, 1200, 600);
		$(".content #booth").remove();
		for(let i in this.booth){
			if(this.booth[i].p1 == undefined) continue;
			$(".content").append(`<div id="booth" style="position:absolute;background:${color[i]};left:${this.booth[i].p1.x*15}px;top:${this.booth[i].p1.y*15}px;width:${this.booth[i].width*15}px;height:${this.booth[i].height*15}px">${i}</div>`);
		}
	}
	renderColor (){
		$("#color").on("change", e =>{
			this.bcode= e.target.value;
			this.renderColor();
			this.Save();
		});
		$("#color").val(this.bcode);
		$(".size").text(`${(this.booth[this.bcode].width*this.booth[this.bcode].height || 0)}㎡`);
		$(".color_box").css({background: color[this.bcode]});
	}
	renderType (){
		road.forEach((rv, rn) =>{
			ctx.fillStyle= "#fff";
			ctx.fillRect(0, 0, 800, 400);
			ctx.strokeStyle= "#000";
			[...new Array(81)].forEach((v,n) =>{
				ctx.beginPath();
				if(n <= 40){
					ctx.moveTo(0, n*10);
					ctx.lineTo(800, n*10);
				}
				ctx.moveTo(n*10, 0);
				ctx.lineTo(n*10, 400);
				ctx.stroke();
			});
			ctx.fillStyle= "#000";
			ctx.strokeStyle= "#fff";
			rv.forEach((v, n) =>{
				ctx.fillRect((v[0]-1)*10, (v[1]-1)*10, 10, 10);
				ctx.strokeRect((v[0]-1)*10, (v[1]-1)*10, 10, 10);
			});
			$("#type .flex").append(`<img src=${canvas.toDataURL()} data-idx=${rn}>`);
		});
		$("#type .flex img").on("click", e =>{
			this.road= e.target.dataset.idx;
			this.now= null;
			this.booth= this.defaultBooth;
			this.Save();
			this.renderCanvas();
			this.renderColor();
		});
		setTimeout(e =>{
			this.renderCanvas();
			this.renderColor();
			this.renderSave();
			$(window).scrollTop(localStorage.scroll);
		}, 0);
	}
	renderSave (){
		$(".save>div").html(this.save.map((v, n) =>{
			ctx.fillStyle= "#fff";
			ctx.fillRect(0, 0, 800, 400);
			ctx.strokeStyle= "#000";
			[...new Array(81)].forEach((v,n) =>{
				ctx.beginPath();
				if(n <= 40){
					ctx.moveTo(0, n*10);
					ctx.lineTo(800, n*10);
				}
				ctx.moveTo(n*10, 0);
				ctx.lineTo(n*10, 400);
				ctx.stroke();
			});
			ctx.fillStyle= "#000";
			ctx.strokeStyle= "#fff";
			road[v[1]].forEach(v =>{
				ctx.fillRect((v[0]-1)*10, (v[1]-1)*10, 10, 10);
				ctx.strokeRect((v[0]-1)*10, (v[1]-1)*10, 10, 10);
			});
			for(let i in v[0]){
				if(v[0][i].p1 == undefined) continue;
				ctx.fillStyle= color[i];
				ctx.fillRect(v[0][i].p1.x*10, v[0][i].p1.y*10, v[0][i].width*10, v[0][i].height*10);
				ctx.fillStyle= "#fff";
				ctx.fillText(i, v[0][i].p1.x*10 + v[0][i].width*5, v[0][i].p1.y*10 + v[0][i].height*5);
			}
			return `<div class="clear"><span class="right x" data-idx=${n} style="cursor:pointer;">X</span><img src=${canvas.toDataURL()} alt='iomg' data-idx=${n}>`;
		}).join(""));
		$(".save img").on("click", e =>{
			this.booth= {...this.save[e.currentTarget.dataset.idx][0]};
			this.road= this.save[e.currentTarget.dataset.idx][1];
			this.renderCanvas();
			this.renderColor();
			this.Save();
		});
		$(".save .x").on("click", e =>{
			this.save.splice(e.currentTarget.dataset.idx, 1);
			this.renderSave();
			this.Save();
		});
	}
}