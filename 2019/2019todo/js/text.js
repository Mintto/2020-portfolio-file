const one = Element => document.querySelector(Element);
const all = Element => Array.from(document.querySelectorAll(Element));

const create = Element => document.createElement(Element);

class App
{
	constructor(){
		this.key;
		this.len , this.count , this.list
		this.init();
	}

	init(){
		this.settings();
		this.event();
	}
	settings(){
		this.LocalStorage();
	}
	num(){
		if( this.len != 0 ){
			one(".box_footer").style.display = "block";
			one(".box_footer .num").innerHTML =  this.list.filter( v=> !v.click ).length;
		}
	}
	LocalStorage(){
		this.getLocalStorage();
		this.list.forEach( v =>{
			let li = create("li");
			li.setAttribute('data-idx',v.idx);
			li.innerHTML = `
			<input type="checkbox" id="list${v.idx}">
			<label for="list${v.idx}"><span>❯</span></label>
			<span>${v.text}</span>
			<button>X</button> `
			one(".list").prepend(li);
			if( v.click){
				one(`#list${v.idx}`).checked = true;
				one(`.list li[data-idx="${v.idx}"]>span`).style.textDecoration = "line-through";
				one(`.list li[data-idx="${v.idx}"]>span`).style.color = "#d9d9d9";
			}
		})
		this.num();

	}
	getLocalStorage(){
		this.list = localStorage.getItem('list') == null ? [] : JSON.parse(localStorage.getItem('list'));
		this.count =  localStorage.getItem('count') == null ? 0 : localStorage.getItem('count'); 
		this.len = localStorage.getItem('len') == null ? 0 : localStorage.getItem('len');
	}
	setLocalStorage(){
		localStorage.setItem('list',JSON.stringify(this.list));	
		localStorage.setItem('count',this.count);	
		localStorage.setItem('len',this.len);	
	}
	event(){
		one(".search input").addEventListener("keydown",this.Keydown.bind(this));
		all(".list li>label").forEach( (v,idx)=>{
			let len = this.list.length-1 - Number(idx);
			v.addEventListener("click",(e)=> this.numClick(v,len,e) );
		})
	}
	numClick(v,idx,e){		
		this.list[idx].click = this.list[idx].click ? false : true;
		if( this.list[idx].click ){
			one(`#list${idx}`).checked = true;
			one(`.list li[data-idx="${idx}"]>span`).style.textDecoration = "line-through";
			one(`.list li[data-idx="${idx}"]>span`).style.color = "#d9d9d9";
			one(`.list li[data-idx="${idx}"]>label>span`).style.display = "inline-block";
		}else{
			one(`#list${idx}`).checked = false;
			one(`.list li[data-idx="${idx}"]>span`).style.textDecoration = "none";
			one(`.list li[data-idx="${idx}"]>span`).style.color = "#4d4d4d";
			one(`.list li[data-idx="${idx}"]>label>span`).style.display = "none";
		}
		this.num();
		this.setLocalStorage();
	}
	Keydown(e){
		this.value();
		if( e.keyCode == 13 && this.key.trim() != "" ){
			one(".search input").value = "";
			let li = create("li");
			li.setAttribute('data-idx',this.count);
			li.innerHTML = `
			<input type="checkbox" id="list${this.count}">
			<label for="list${this.count}"><span>❯</span></label>
			<span>${this.key}</span>
			<button>X</button> `
			one(".list").prepend(li);
			this.list[this.count] = { text : this.key , idx : this.count ,click : false };

			this.count++;
			this.len++;
			this.num();
			this.setLocalStorage();
			return false;
		}
	}

	value(){
		this.key = one(".search input").value;
	}


}

window.onload = () =>{
	new App();
}