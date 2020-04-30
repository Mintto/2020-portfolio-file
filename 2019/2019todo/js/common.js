const one = Element => document.querySelector(Element);
const all = Element => Array.from(document.querySelectorAll(Element));

const create = Element => document.createElement(Element);

class App{
	constructor(){
		this.key;
		this.list;
		this.list2;
		this.count;
		this.filter;

		// function
		this.init();
	}
	init(){ // init
		this.getLocalStorage();
		this.settings();
		this.listPackage();
		this.event();
	}
	settings(){ // settings
		one(".search input").focus();
		one(`.${this.filter}`).style.border = "1px solid black";
	}
	event(){ // event
		one("input.key").addEventListener("keydown",this.Keydown.bind(this));
		document.addEventListener("click",this.Click.bind(this));
		document.addEventListener("dblclick",this.dblClick.bind(this));
		document.addEventListener("mousedown",this.mousedown.bind(this));
	}
	mousedown(e){ // mousedown
		if( e.target.getAttribute("class") != "ba"){
			all(".ba").forEach(v=> {
				let idx = v.parentNode.getAttribute("data-idx");
				let key = v.value;
				v.parentNode.removeChild(v);
				one(`.list li[data-idx="${idx}"]>span`).textContent = key;
				this.list[idx].key = key;
				this.setLocalStorage();
			} );
		}
	}
	dblClick(e){ // dblClick
		if( e.target.getAttribute("class") == "list_text" ){
			let idx = e.target.parentNode.getAttribute("data-idx");
			all(".ba").forEach(v=> v.parentNode.removeChild(v) );
			let input = create("input");
			input.setAttribute("class","ba");
			input.setAttribute("type","text");
			input.setAttribute("value",`${this.list[idx].key}`);
			one(`.list li[data-idx="${idx}"]`).append(input)
			input.focus();
			input.addEventListener("keydown",this.Keydown2.bind(this));
		}		
	}
	Keydown2(e){ // Keydown2
		let key = e.target.value; 
		let idx = e.target.parentNode.getAttribute("data-idx");
		if( e.keyCode == "13" && key.trim() == "" ){
			one(`.list li[data-idx="${idx}"]`).parentNode.removeChild(one(`.list li[data-idx="${idx}"]`));
			this.list.splice(e.target.parentNode.getAttribute("data-idx"),1);
			this.count += -1;
			this.setLocalStorage();
			this.listPackage();
		}else if( e.keyCode == "13" && key.trim() != "" ){
			e.target.parentNode.removeChild(e.target);
			one(`.list li[data-idx="${idx}"]>span`).textContent = key;
			this.list[idx].key = key;
			this.setLocalStorage();
		}
	}
	Click(e){ // Click
		let idx;
		switch( e.target.getAttribute("class") ){
			case "list_btn" : // list_btn off 
			idx = Number(e.target.parentNode.getAttribute("data-idx"));
			this.list[idx].click = this.list[idx].click ? false : true;
			this.listPackage();
			break;
			case "search_btn" : // search_btn on
			if( this.list.every( v=> v.click ) ) this.list.forEach( v=> v.click = false );
			else this.list.filter( f => !f.click ).forEach( v=> v.click = true );
			this.listPackage();
			break;
			case "clear": // claer on
			this.list = this.list.filter( f=> !f.click);
			this.count = this.list.length;
			this.listPackage();
			break;
			case "all": // all ,active , com on 
			case "active":
			case "com":
			all(".all , .active , .com").forEach( v=> v.style.border = "0px" )
			e.target.style.border ="1px solid black";
			this.filter = e.target.getAttribute("class");
			this.listPackage();
			break;
			case "list_del": // list_del on
			console.log(e.target.parentNode.getAttribute("data-idx"));
			this.list.splice(e.target.parentNode.getAttribute("data-idx"),1);
			console.log(this.list);
			this.count += -1;
			this.setLocalStorage();
			this.listPackage();
			break;
		}
	}
	Keydown(e){ // Mousedown
		this.key = one("input.key").value.trim();
		if( e.keyCode == "13" && this.key != ""){		
			one("input.key").value = "";
			this.list[this.count] = { key : this.key , click : false , idx : this.count };
			this.count++;
			this.listPackage();
		}
	}
	listPackage(){ // listPackage
		this.setLocalStorage();
		this.listAll();
		this.listNum();
	}
	listAll(){ // listAll
		one("section ul.list").innerHTML = "";
		if( this.filter == "active" ) this.list2 = this.list.filter( f => !f.click);
		else if( this.filter == "com" ) this.list2 = this.list.filter( f => f.click);
		else if( this.filter == "all" ) this.list2 = this.list;
		console.log(this.list2);
		this.list2.forEach( (v,idx)=>{

			let li = create("li");
			li.setAttribute('data-idx',v.idx);
			li.innerHTML = `
			<input type="checkbox" id="list${v.idx}">
			<label for="list${v.idx}" class="list_btn"><span>❯</span></label>
			<span class="list_text">${v.text}</span>
			<button class="list_del">X</button> `
			one(".list").prepend(li);
			this.listText(v.idx,idx);
		} )		
	}
	listNum(){ // listNum
		if(this.list.length){
			one(".search_btn").style.display ="block";
			one(".box_footer").style.display ="block";
			one(".box_footer .num").innerHTML = this.list.filter( f=> !f.click ).length;
		}else{
			one(".search_btn").style.display ="none";
			one(".box_footer").style.display ="none";
			one(".box_footer .num").innerHTML = "";
		}

		if( this.list.every( v => v.click ) ) one(".search_btn>span").style.color ="#737373";
		else one(".search_btn>span").style.color ="#e6e6e6";

		if( this.list.some( v => v.click )) one(".clear").style.display = "block"
			else one(".clear").style.display = "none";		
	}
	listText(idx,vidx){ // listText
		// console.log(idx,this.list)
		one(`.list li[data-idx="${idx}"] .list_text`).textContent=this.list[vidx].key;
		if( this.list2[vidx].click ){
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
	}
	getLocalStorage(){ // getLocalStorage
		this.list = localStorage.getItem('list') == null ? [] : JSON.parse(localStorage.getItem('list'));
		this.count = this.list.length;
		this.filter =  localStorage.getItem('filter') == null ? "all" : localStorage.getItem('filter'); 
	}
	setLocalStorage(){ // setLocalStorage
		localStorage.setItem('list',JSON.stringify(this.list));	
		localStorage.setItem('count',this.count);	
		localStorage.setItem('filter',this.filter);	
	}


}

window.onload = () =>{
	new App();
}