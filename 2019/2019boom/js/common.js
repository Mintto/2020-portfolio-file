class Game{
	constructor(r,c){ // constructore
		// update
		this.rect = 40;
		this.row = Number(r);
		this.column = Number(c);
		this.plateArr = Array(this.column).fill(null).map( _ => Array(this.row).fill(null).map( v=> v = { num:"", click:false } )  );
		// canvas
		this.canvas = document.getElementById("Mycanvas");
		if( this.rect * this.row > window.innerWidth-200 ) this.rect = Math.floor((window.innerWidth-200)/this.row);
		if( this.rect * this.column > window.innerHeight-100 ){
			this.canvas.style.top = 0;
			this.canvas.style.transform	= "translate(-50%,0)";
		}
		this.canvas.width = this.rect * this.row;
		this.canvas.height = this.rect * this.column;
		this.ctx = this.canvas.getContext("2d");
		// event
		this.end = false;
		this.cNum = 0;
		this.up = false;
		this.cx , this.cy,
		this.rx , this.ry,
		this.btn;
		// boom
		this.boom_num = Math.floor(this.row * this.column / 8);
		// function event
		this.start();				
	}
	start(){
		this.boom();
		this.update();
		this.event();
	}
	event(){
		this.canvas.addEventListener('contextmenu',this.contextMenu.bind(this))
		this.canvas.addEventListener("click",this.click.bind(this));
		this.canvas.addEventListener("mouseup",this.mouseup.bind(this));
	}
	contextMenu(e){ // contextMenu
		if(this.end == true) return false;
		if( !this.up ) return false;
		this.rx = Math.floor(e.offsetX/this.rect) , this.ry = Math.floor(e.offsetY/this.rect);
		if( this.plateArr[this.ry][this.rx].click == true ) return false;
		this.plateArr[this.ry][this.rx].click = this.plateArr[this.ry][this.rx].click == "common" ? false : "common";
		this.update();
		return false;
	}
	mouseup(e){
		this.up = true;
		this.btn = e.button;
	}
	click(e){
		if( this.end == true ) return false;
		this.cx = Math.floor(e.offsetX/this.rect) , this.cy = Math.floor(e.offsetY/this.rect);
		if( this.plateArr[this.cy][this.cx].click == "common") return false;
		if( this.cNum == 0 ){
			for(let y=this.cy-1; y<this.cy+2; y++) for(let x=this.cx-1; x<this.cx+2; x++){
				if(y >= 0 && x>=0 && y <= this.column-1 && x <= this.row-1 ) if( this.plateArr[y][x].num == "ㅇ" || this.plateArr[this.cy][this.cx].num != 0 ){
					this.replay();
					return false;
				}else{
					this.plateArr[y][x].click = true;
				}
			}
		}
		this.plateArr[this.cy][this.cx].click = true;
		this.cNum++;
		this.Zero();
		this.update();
	}
	boom(){ // boom		
		for(let i=0; i<this.boom_num; i++) this.boomRandom();
			this.boomNum();
	}
	boomRandom(x,y){ // boomRandom
		x =  Math.floor(Math.random()*this.row)+0;
		y =  Math.floor(Math.random()*this.column)+0; 
		if( this.plateArr[y][x].num == "ㅇ" ) this.boomRandom();
		else this.plateArr[y][x].num = "ㅇ";
	}
	boomNum(num){ // boomNum
		this.plateArr.forEach( (y,y_pos) => this.plateArr[y_pos].forEach( (x,x_pos) =>{
			if(x.num != "ㅇ"){
				num = 0;
				for(let y = y_pos-1; y<y_pos+2; y++)  for(let x = x_pos-1; x<x_pos+2; x++) if(y >= 0 && x>=0 && y <= this.column-1 && x <= this.row-1 ) if(this.plateArr[y][x].num == "ㅇ") num++;
					x.num = num;
			}
		} ) )
	}
	replay(){
		this.plateArr = Array(this.column).fill(null).map( _ => Array(this.row).fill(null).map( v=> v = { num:"", click:false } )  );
		this.boom();
		for(let y=this.cy-1; y<this.cy+2; y++) for(let x=this.cx-1; x<this.cx+2; x++){
			if(y >= 0 && x>=0 && y <= this.column-1 && x <= this.row-1 ) if( this.plateArr[y][x].num == "ㅇ" || this.plateArr[this.cy][this.cx].num != 0 ){
				this.replay();
				return false;
			}else{
				this.plateArr[y][x].click = true;
			}
		}
		this.Zero();
		this.update();
		this.cNum++;
	}
	Zero(num){
		num = 0;
		this.plateArr.forEach( (y,y_pos) => this.plateArr[y_pos].forEach( (x,x_pos) => {
			if( x.num == 0 && x.click == true ){
				for(let y1 = y_pos-1; y1<y_pos+2; y1++ )  for(let x1= x_pos-1; x1<x_pos+2; x1++){
					if(y1 >= 0 && x1>=0 && y1 <= this.column-1 && x1 <= this.row-1 ) if( this.plateArr[y1][x1].num != "ㅇ" && this.plateArr[y1][x1].click == false){
						num++;
						this.plateArr[y1][x1].click = true;
					}
				}
			}
		} ) )
		if( num != 0 ) this.Zero();
	}
	winner(num,num2){
		num = 0 , num2 = 0;
		this.plateArr.forEach( (y,y_pos) =>  this.plateArr[y_pos].forEach( (x,x_pos)=>{
			if( x.num == "ㅇ" && x.click == "common") num++;
			if( x.num != "ㅇ" && x.click == true ) num2++;
		} ) )
		if( num == this.boom_num && num2 == this.row*this.column-this.boom_num || num2 == this.row*this.column-this.boom_num ){
			alert("클리어");
			this.end = true;
			return true;
		}
		else return false;
	}
	update(A1,B1,A2,B2){ // update 
		if( this.winner() == true) return false;
		this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
		this.plateArr.forEach( (y,y_pos) => this.plateArr[y_pos].forEach( (x,x_pos) => {
			A1=1,B1=1,A2=-2,B2=-2;
			//  box
			this.ctx.beginPath();
			this.ctx.rect(x_pos*this.rect, y_pos*this.rect, this.rect, this.rect);
			this.ctx.font = "14px 나눔고딕";
			this.ctx.fillStyle = "lightgray";
			// border-settings
			if( y_pos == 0 ) B1+=1 , B2-=1;
			if( y_pos == this.column-1 ) B2-=1;
			if( x_pos == 0 ) A1+=1, A2-=1;
			if( x_pos == this.row-1 ) A2-=1;
			

			this.ctx.fill();
			this.ctx.closePath();
			//  border 
			this.ctx.beginPath();
			if( x.num == "ㅇ" && x.click == true){
				this.ctx.fillStyle = "red";
				this.ctx.rect(x_pos*this.rect+A1, y_pos*this.rect+B1, this.rect+A2, this.rect+B2);
				this.end = true;
			}else if( x.click == false || x.click == "common"){
				this.ctx.fillStyle = "gray";
				this.ctx.rect(x_pos*this.rect+A1, y_pos*this.rect+B1, this.rect+A2, this.rect+B2);
			}else{
				this.ctx.fillStyle = "#fff";
				this.ctx.rect(x_pos*this.rect+A1, y_pos*this.rect+B1, this.rect+A2, this.rect+B2);
			}
			this.ctx.fill();
			this.ctx.closePath();
			// font
			if( x_pos == this.rx && this.y_pos == this.rx) console.log(x);
			this.ctx.beginPath();
			if( x.click == true && this.plateArr[y_pos][x_pos].num !== 0){
				this.ctx.fillStyle = "gray";
				this.ctx.fillText(this.plateArr[y_pos][x_pos].num,  (x_pos*this.rect)+(this.rect/2)-5, (y_pos*this.rect)+(this.rect/2)+5 );
			}else if( x.click == "common" ){
				this.ctx.fillStyle = "red";
				this.ctx.moveTo(x_pos*this.rect+this.rect/2,y_pos*this.rect+this.rect/2-5);
				this.ctx.lineTo(x_pos*this.rect+this.rect/2-5,y_pos*this.rect+this.rect/2+5);
				this.ctx.lineTo(x_pos*this.rect+this.rect/2+5,y_pos*this.rect+this.rect/2+5);
				this.ctx.fill();
			}
			this.ctx.closePath();
		} ) )
		if( this.end == true){
			alert("게임 아웃");
			if(  confirm("다시하시겠습니까?")){
				this.canvas.style.opacity = "0";
				this.canvas.style.transition = "1s";
				setTimeout( ()=>{
					location.reload();
				},1000)
			}
		}
		
	}
}


class App
{
	constructor(){
		// game play 
		this.play = 0;
		// check
		this.Ham_click = false;
		this.nav_Drag = false;
		// selector
		this.canvas = document.getElementById("Mycanvas");
		this.pointer = document.getElementById("pointer");
		this.nav = document.querySelector("nav");
		this.nav_btn = document.getElementById("nav_btn");

		this.row =  document.querySelector(`nav div input[name="row"]`);
		this.column =  document.querySelector(`nav div input[name="column"]`);
		this.row_title =  document.querySelector(`nav div span[title="row_title"]`);
		this.column_title =  document.querySelector(`nav div span[title="column_title"]`);

		// event
		this.event();
		this.firstScreen();
		// setTimeout
	}
	firstScreen(){ // firstScreen
		this.navRangeValue();
		this.nav.style.display = "block";
		setTimeout( ()=>{
			this.nav.style.transition = "1s";
			this.nav.style.opacity = "1";
		},500)
	}
	event(){ // event
		document.addEventListener("mousemove",this.pointerMove.bind(this));
		this.nav_btn.addEventListener("click",this.navBtnClick.bind(this));
		Array.from(document.querySelectorAll(`nav div input[type=range]`)).map( v=>{
			v.addEventListener('mousedown',this.navRangeMousedown.bind(this));
			v.addEventListener('mouseup',this.navRangeMouseup.bind(this));
			v.addEventListener('mousemove',this.navRangeMousemove.bind(this));
		})
	}
	navBtnClick(){
		this.nav.style.transition = "1s";
		this.nav.style.opacity = "0";
		setTimeout( ()=>{
			this.nav.style.display = "none";
			this.canvas.style.display = "block";
			new Game(this.row.value,this.column.value);
			this.canvas.style.transition = "1s";
			this.canvas.style.opacity = "1";
		},1000)
	}
	pointerMove(e){ // pointerMove
		if( this.Ham_click ) this.HammouseLeave();
		this.pointer.style.left = e.clientX+"px"; 
		this.pointer.style.top = e.clientY+"px"; 
	}
	navRangeValue(){ // navRangeValue
		this.row_title.innerHTML = this.row.value;
		this.column_title.innerHTML = this.column.value;
	}
	navRangeMousedown(){ // navRangemousedown

		this.nav_Drag = true;
	}
	navRangeMouseup(){ // navRangeMouseup
		this.nav_Drag = false;
		this.navRangeValue();
	}
	navRangeMousemove(){ // navRangemousemove
		if( !this.nav_Drag ) return false;
		this.navRangeValue();
	}
}

window.onload = _ => {
	new App();
}

