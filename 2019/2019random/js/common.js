const one = function(v){
	return document.querySelector(v);
}
function App(){ // App
	let container = one("main .container"),
	num = one("main .num"),
	maxBtn = one("main .max"),
	loop = null, max = null, data = null , result = null,
	startCheck= false;
	getData();
	document.addEventListener("click",Click);
	function Click(e){ 
		let target = e.target;
		let list = target.classList.value;
		if( list.includes("start") && list.includes("btn")){
			start();
		}else if( list.includes("stop") && list.includes("btn")){
			if( startCheck ){
				clearInterval(loop);
				stop();
				data.push(result);
				setData();
				startCheck = false;
			}
		}else if( list.includes("clear") && list.includes("btn")){
			data = [];
			setData();
		}
	}
	function reloadRandom(){
		result = num.textContent = Math.floor((Math.random()*(max))+1 );
		// num.style.fontSize = random(120,200)+"px";
	}
	function start(){
		max = Number(maxBtn.value);
		if( max <= 1) return alert("1이상의 최대 값을 입력해 주세요.");
		clearInterval(loop);
		startCheck = true;
		let arr = Array.from( Array(max) , (v,idx) => v = idx+1 );
		let check = arr.every( v => {
			return data.some( j => v == j );
		} );
		if( check ){
			data = [];
			setData();
		}
		loop = setInterval(reloadRandom,10);
	}
	function stop(){
		result = num.textContent = Math.floor(Math.random()*(max)+1);
		if ( data.some( v => v == result) ) stop();
	}
	function getData(){
		data = localStorage.getItem("data") == null ? [] : JSON.parse(localStorage.getItem("data"));
	}
	function setData(){
		localStorage.setItem("data",JSON.stringify(data));
	}
	function random(min,max){
		return Math.floor((Math.random()*(max-min+1)+min));
	}
}
window.onload = function(){
	App();
}