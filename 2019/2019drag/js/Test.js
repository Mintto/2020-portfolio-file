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
		this.idx = { item : null , next : null };
		this.offset = { downX : null , downY : null , moveX : null , moveY : null };
		this.result = { x : null , y : null };
		this.last = { x : null , y : null , firstY : null , lastY : null };
		// selector
		this.list = all(".message>a");
		this.max = this.list.length-1;
		// function 
		this.event();
	}

	event(){ // event
		this.list.forEach( (v,idx) => v.addEventListener("mousedown",(e)=> this.AMouseDown(v,idx,e)  ) );
		document.addEventListener("mousemove",this.MouseMove.bind(this));
		document.addEventListener("mouseup",this.MouseUp.bind(this));
	}

	AMouseDown(item,idx,e){ // AMouseDown
		this.drag = true;
		this.item = item;
		this.idx.item = idx;
		this.idx.next = idx+1;
		this.offset.downX = e.screenX;
		this.offset.downY = e.screenY;
		this.last.x = offsetLeft(this.item);
		this.last.y = offsetTop(this.item);
		this.last.firstY = this.last.y;
		// style 
		this.item.style.pointerEvents = "none";
		this.item.style.position = "fixed";
		this.item.style.zIndex = "9999"
		this.item.style.top = (this.last.y-window.scrollY)+"px";
		this.ListBottom(false);
	}

	MouseMove(e){
		if( this.drag ){
			this.offset.moveX = e.screenX;
			this.offset.moveY = e.screenY;
			this.result.x = this.offset.moveX - this.offset.downX;
			this.result.y = this.offset.moveY - this.offset.downY;
			if( this.idx.item == this.list.length-1 ) this.last.lastY = offsetTop(this.list[this.max-1]) + this.list[this.max-1].offsetHeight+8 + ((this.item.offsetHeight+8)/2) ;
			else this.last.lastY = offsetTop(this.list[this.max]) + this.list[this.max].offsetHeight+8 + ((this.item.offsetHeight+8)/2);
			// console.log(this.last.lastY , offsetTop(this.item));
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
						v.style.transition = '0.2s';
					}
				}  )
			}

		}
	}
	MouseUp(){
		if( this.drag){
			one(".message").style.background = "rgba(235,236,240)";
			let x = offsetLeft(this.item) , y = offsetTop(this.item)
			this.item.style.position = "absolute";
			this.item.style.transform = `translate(0px,0px)`;
			this.item.style.left = x+'px'
			this.item.style.top = y+'px'
			if( this.idx.next == null  ){
				$(this.item).animate({ left: this.last.x+"px", top: this.last.firstY+"px" },500 )
				this.idx.next = this.idx.item+1;
				this.ListBottom(true);
			}else if( this.idx.next == 12 ){
				$(this.item).animate({ left: this.last.x+"px", top: this.last.lastY+"px" },500 )

			}else{
				this.last.y = offsetTop(this.list[this.idx.next]) - this.item.offsetHeight-8;
				$(this.item).animate({ left: this.last.x+"px", top: this.last.y+"px" },500 )
				this.idx.next = this.idx.item+1;
			}

			setTimeout( ()=> {
				Array.from(all(".message>a")).forEach( (v,idx)=> v.removeAttribute('style') );
				if( this.enter != null && this.enter != "Last"){
					// one(".message").insertBefore(all(".message>a")[this.item.idx],all(".message>a")[this.enter.idx])
				}else if( this.enter == "Last"){
					// one(".message").insertBefore(all(".message>a")[this.item.idx],all(".message>a")[this.max+1])
				}
			},500)
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
					this.idx.next == "last";
					break;
				}else if( this.In && this.idx.next != null || !this.In && this.idx.next != null){
					if( x > this.item.offsetWidth/2 && y2 > (v.offsetHeight+8)/2 ){
						this.In = false;
						this.idx.next = null;
					}else{
						this.In = true;
					}
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
				if( animation ) v.style.transition = "0.2s";
				else v.style.transition = "0s";
			}
		})
	}
}


window.onload = () =>{
	new App();

}


