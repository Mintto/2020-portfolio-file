function siteLaod(){

}

function popupStyle() {
	var sel = document.getElementById("selVal");
	var val;
	var title = " 제목- ",
		text = " 내용- "
	for(i=0; i<sel.options.length; i++) {
		if(sel.options[i].selected == true) {
			val = sel.options[i].value;
			break;
		}
	}

	var titleVal = document.querySelector("#titleVal").value,
	textVal = document.querySelector("#textVal").value,
	listNode = document.querySelector("#list"),
	liNode = document.createElement("LI"),
	titleNod = document.createTextNode(val+title+titleVal+text+textVal);


	liNode.appendChild(titleNod);
	listNode.appendChild(liNode);
	
	$('#input_box').css({"display":"none"})	

}

function popupBlock(){
	$('#input_box').css({"display":"block"})	
}
