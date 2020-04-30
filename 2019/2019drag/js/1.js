const one = Element => document.querySelector(Element);
const all = Element => document.querySelectorAll(Element);

const offsetLeft = element => window.pageXOffset + element.getBoundingClientRect().left
const offsetTop = element => window.pageYOffset + element.getBoundingClientRect().top


class App
{
	constructor(){
		this.drag = false , this.enter = false , this.In = true;
		this.item ;
		this.x , this.y;
		this.downX , this.downY ;
		this.moveX , this.moveY ;
		this.resultX , this.resultY;
		this.idx = { item:"" , enter : "" }
		this.init();
	}
	init(){
		Array.from(all(".message>a")).forEach( (v,idx)=> v.setAttribute('data-idx',idx) );
		this.event();
	}
	event(){
		Array.from(all(".message>a")).forEach( v=> {
			v.addEventListener("mousedown",(e)=>this.AMouseDown(v,e));
		} )
		document.addEventListener("mousemove",this.MouseMove.bind(this))
		document.addEventListener("mouseup",this.MouseUp.bind(this));
	}	
	AMouseDown(item,e){
		this.idx.item = item.getAttribute("data-idx");
		this.idx.enter = Number(item.getAttribute("data-idx"))+1;
		this.item = item;		
		this.drag = true;
		this.downX  = e.screenX , this.downY  = e.screenY;
		this.x = offsetLeft(this.item);
		this.y = offsetTop(this.item);
		let y = this.y		
		if( window.scrollY != 0) y -= window.scrollY ;
		this.item.style.pointerEvents = "none";
		this.item.style.position = "fixed";
		this.item.style.zIndex = "9999"
		this.item.style.top = y+"px";
		one(`.message>a[data-idx="${Number(this.idx.item)+1}"]`).style.marginTop = `${ (this.item.offsetHeight+8) }px`;
	}
	MouseUp(item,e){
		if( this.drag){
			this.drag = false;
			this.item.style.top = offsetTop(this.item)+"px";
			this.item.style.transform = `translate(0px,0px)`;
			this.item.style.position = "absolute";
			this.item.style.left = this.x+"px";
			this.item.style.top = this.y+"px";
			this.item.style.transition = "0.5s";			

			Array.from(all(".message>a")).forEach( (v,idx)=>{
				if( Number(this.idx.item)+1 == idx){
					v.style.marginTop = `${(this.item.offsetHeight+8)*(idx-this.idx.item) }px`;
					v.style.transition = '0.5s';
				}
			})
			setTimeout( ()=> {
				Array.from(all(".message>a")).forEach( (v,idx)=> v.removeAttribute('style') );
			},500)
		}

	}
	MouseMove(e){
		if( this.drag) {
			this.moveX = e.screenX ,  this.moveY = e.screenY;
			this.resultX = this.moveX-this.downX , this.resultY = this.moveY-this.downY;
			this.item.style.transform = `translate(${this.resultX}px,${this.resultY}px)`;
			this.item.style.transition = "0s";
			let ix = offsetLeft(this.item) + this.item.offsetWidth/2;
			let iy = offsetTop(this.item) + (this.item.offsetHeight+8)/2;
			Array.from(all(".message>a")).map( (v,idx)=> {
				if( v.getAttribute("data-idx") != this.idx.item ){
					let vx = offsetLeft(v) + v.offsetWidth/2;
					let vy = offsetTop(v) + (v.offsetHeight+8)/2;
					let x = ix > vx ? ix-vx : vx-ix;
					let y = iy > vy ? iy-vy : vy-iy;
					let line = Math.sqrt(Math.pow(x,2)+Math.pow(y,2));
					line = line < 0 ? -line : line;
					if( line <= this.item.offsetWidth/2 && y <= this.item.offsetHeight/2 ){						
							if( iy > vy ){ // up
								this.idx.enter = v.getAttribute("data-idx");
							}else if(iy < vy){ // down
								let a = idx+1 >=Array.from(all(".message>a")).length-1 ? idx+1 : Array.from(all(".message>a")).length-1;
								this.idx.enter = Array.from(all(".message>a"))[a];
							}
						this.In = true;
					}
				}
				
			})
		}
		
	}
}

window.onload = () =>{
	new App();

}


