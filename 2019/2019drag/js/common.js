const one = Element => document.querySelector(Element);
const all = Element => Array.from(document.querySelectorAll(Element));

const offsetLeft = element => window.pageXOffset + element.getBoundingClientRect().left
const offsetTop = element => window.pageYOffset + element.getBoundingClientRect().top

HTMLElement.prototype.offsetCenterX = element =>  offsetLeft(element) + element.offsetWidth/2;
HTMLElement.prototype.offsetCenterY = element =>  offsetTop(element) +  (element.offsetHeight+8)/2;


class App{
	constructor(){
		// settings 
		this.drag = false , this.In = false;
		this.item;
		this.scroll = null;
		this.idx = { item : null , next : null };
		this.offset = { downX : null , downY : null , moveX : null , moveY : null };
		this.result = { x : null , y : null };
		this.last = { x : null , y : null , firstY : null , lastY : null };
		// selector
		this.list = all(".message>a");
		this.max = this.list.length-1;
		// function 
		all(".message>a").forEach( (v,idx)=>{
			v.setAttribute("data-idx",idx)
		})
		this.event();
	}

	event(){ // event
		this.list.forEach( (v,idx) => {
			v.addEventListener("mousedown",(e)=> this.AMouseDown(v,idx,e)  )
		} );
		document.addEventListener("mousemove",this.MouseMove.bind(this));
		document.addEventListener("mouseup",this.MouseUp.bind(this));
	}
	AMouseDown(item,idx,e){ // AMouseDown
		if( $(".message>a").is(":animated") ) return false;
		this.list = all(".message>a");
		for(let vidx in this.list){
			let v = this.list[vidx];
			if( idx == v.getAttribute("data-idx")){
				idx = vidx;
				idx = Number(idx);
				break;
			}
		}
		this.drag = true;
		this.item = item;
		this.idx.item = idx;
		this.idx.next = idx+1;
		this.offset.downX = e.screenX;
		this.offset.downY = e.screenY;
		this.last.x = offsetLeft(this.item);
		this.last.y = offsetTop(this.item);
		this.last.firstY = this.last.y;
		this.In = true;
		this.scroll = setInterval(()=>{
			if( window.scrollY+50 > offsetTop(this.item) ){
				window.scrollBy(0,-3);
			}else if( window.scrollY+window.innerHeight-50 < offsetTop(this.item)+this.item.offsetHeight  ){
				window.scrollBy(0,3);
			}
		},5)
		console.log(this.scroll);
		// style 
		this.item.style.pointerEvents = "none";
		this.item.style.position = "fixed";
		this.item.style.zIndex = "9999"
		this.item.style.top = (this.last.y-window.scrollY)+"px";
		this.ListBottom(false);
	}
	MouseMove(e){ // MouseMove
		if( this.drag ){
			this.offset.moveX = e.screenX;
			this.offset.moveY = e.screenY;
			this.result.x = this.offset.moveX - this.offset.downX;
			this.result.y = this.offset.moveY - this.offset.downY;
			if( this.idx.item == this.list.length-1 ) this.last.lastY = offsetTop(this.list[this.max-1]) + this.list[this.max-1].offsetHeight+8 + ((this.item.offsetHeight+8)/2) ;
			else this.last.lastY = offsetTop(this.list[this.max]) + this.list[this.max].offsetHeight+8 + ((this.item.offsetHeight+8)/2);
			this.MoveEnter(); 
			// item move style 
			this.item.style.transform = `translate(${this.result.x}px,${this.result.y}px)`;
			if( this.In ){
				one(".message").style.background = "rgba(255,235,230)";
				this.ListBottom(true);
			}else{
				one(".message").style.background = "rgba(230,250,255)";
				this.list.forEach( (v,idx) => {
					if( this.idx.item != idx ){
						v.style.transform = `translate(0px,0px)`;
						v.style.transition = '0.1s';
					}
				}  )
			}

		}
	}
	MouseUp(){ // MouseUp
		if( this.drag){
			clearInterval(this.scroll);
			one(".message").style.background = "rgba(235,236,240)";
			let x = offsetLeft(this.item) , y = offsetTop(this.item)
			this.item.style.position = "absolute";
			this.item.style.transform = `translate(0px,0px)`;
			this.item.style.left = x+'px'
			this.item.style.top = y+'px'
			
			if( this.idx.next == null  ){
				$(this.item).animate({ left: this.last.x+"px", top: this.last.firstY+"px" },100,function(){ Array.from(all(".message>a")).forEach( (v,idx)=> v.removeAttribute('style') ); } )
				this.idx.next = this.idx.item+1;
				this.ListBottom(true);
			}else if( this.idx.next == 12 ){
				$(this.item).animate({ left: this.last.x+"px", top: this.last.lastY-((this.item.offsetHeight+8)/2)+"px" },100,function(){Array.from(all(".message>a")).forEach( (v,idx)=> v.removeAttribute('style') );} )
			}else{
				this.last.y = offsetTop(this.list[this.idx.next]) - this.item.offsetHeight-8;
				$(this.item).animate({ left: this.last.x+"px", top: this.last.y+"px" },100,function(){Array.from(all(".message>a")).forEach( (v,idx)=> v.removeAttribute('style') );});
			}

			setTimeout( ()=> {
				one(".message").insertBefore(all(".message>a")[this.idx.item],all(".message>a")[this.idx.next])
				Array.from(all(".message>a")).forEach( (v,idx)=> v.removeAttribute('style') );
				this.drag = false , this.In = false;
				this.item;
				this.idx = { item : null , next : null };
				this.offset = { downX : null , downY : null , moveX : null , moveY : null };
				this.result = { x : null , y : null };
				this.last = { x : null , y : null , firstY : null , lastY : null };
			},100)
			this.drag = false;
		}
	}
	MoveEnter(){ // MoveEnter
		for(let idx in this.list ){
			idx = Number(idx);
			let v = this.list[idx];
			if( this.idx.item != idx  ){
				let x = (this.item.offsetCenterX(this.item) - v.offsetCenterX(v) ) < 0 ?  v.offsetCenterX(v) - this.item.offsetCenterX(this.item) : this.item.offsetCenterX(this.item) - v.offsetCenterX(v);
				let y = (this.item.offsetCenterY(this.item) - v.offsetCenterY(v) ) < 0 ?  v.offsetCenterY(v) - this.item.offsetCenterY(this.item) : this.item.offsetCenterY(this.item) - v.offsetCenterY(v);
				let y2 = (this.item.offsetCenterY(this.item) - (v.offsetCenterY(v) - v.offsetHeight+8 ) ) < 0 ?  v.offsetCenterY(v) - v.offsetHeight+8 - this.item.offsetCenterY(this.item)  : this.item.offsetCenterY(this.item) - v.offsetCenterY(v) - v.offsetHeight+8 ;
				let lasty = (this.item.offsetCenterY(this.item) - this.last.lastY ) < 0 ? this.last.lastY - this.item.offsetCenterY(this.item) : this.item.offsetCenterY(this.item) - this.last.lastY;
				if( x <= this.item.offsetWidth/2 && y <= (v.offsetHeight+8)/2 ){					
					if( this.item.offsetCenterY(this.item) - v.offsetCenterY(v) < 0  ){
						this.idx.next = idx;
					}else if( this.item.offsetCenterY(this.item) - v.offsetCenterY(v) > 0 ){
						this.idx.next = idx+1;
					}
					this.In = true;
					break;
				}else if( x <= this.item.offsetWidth/2 && lasty <= (v.offsetHeight+8)/2 ){
					this.In = true;
					this.idx.next = 12;
					break;
				}else if( this.In && x > this.item.offsetWidth/2 && y2 > (v.offsetHeight+8)/2  ){
					this.In = false;
					this.idx.next = null;
					break;
				}
			}
		}
	}
	ListBottom(animation){ // ListBottom
		this.list = all(".message>a");
		this.list.forEach( (v,vidx)=> {
			if( this.idx.item != vidx){
				if( this.idx.next <= vidx ) v.style.transform = `translate(0px,${this.item.offsetHeight+8}px)`;
				else v.style.transform = `translate(0px,0px)`;
				if( animation ) v.style.transition = "0.1s";
				else v.style.transition = "0s";
			}
		})
	}
}


window.onload = () =>{
	new App();

}


