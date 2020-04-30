
//  App
class App{
    constructor (){
    	$("head title").text("정민석");
    	this.event();
    	this.list = [];
    	this.key = "";
    	this.wrap = "";
		this.line_num = { k:"공항철도" , b:"분당선",a:"공항철도",g:"경춘선",s:"신분당선",su:"수인선",i:"인천 1호선",e:"용인경전철",u:"의정부경전철",1:"1호선",2:"2호선",3:"3호선",4:"4호선",5:"5호선",6:"6호선",7:"7호선",8:"8호선",9:"9호선"};
		this.pos = -1;
		this.day = new Date().getDay();
		this.code = "";
		this.subfirst ="";
		this.sublast ="";
		this.check = "";
    	this.auto_wrap = $(".autocomplete>ul");
    	this.result_wrap = $(".result");
    	this.search_text = "";
    	this.time1;
    	this.time2;
    	this.time3;
    }
    // event
    event(){
    	$(document)
    	.on("keyup",this.keyup.bind(this))
    	.on("click","button",this.Enter.bind(this))
    	.on("mouseenter",".autocomplete>ul li",this.mousehover)
    }
    // mousehover
    mousehover(e){
    	this.pos = $(this).index();
    	$(".autocomplete>ul li").removeClass("active-menu").eq(this.pos).addClass("active-menu");
		this.text = $(".autocomplete>ul li.active-menu .name").text();
		$("input").val(this.text);
    }
    // keyup
    keyup(e){
    	this.key = $(e.target).val();
    	this.result_wrap.empty();
    	if( this.key == "") return this.auto_wrap.empty();
    	if( e.keyCode == 38 && $(".autocomplete>ul li") ){ return this.Up() }
    	if( e.keyCode == 40 && $(".autocomplete>ul li") ){ return this.Down(); }
    	if( e.keyCode == 13 && $(".autocomplete>ul li") ){ return this.Enter(); }
    	this.auto_wrap.empty();

    	this.pos = -1;
    	this.list = stationList.data.filter( f => f.station_nm.includes(this.key)).sort( (a,b) => b.station_nm > a.station_nm ? -1 : 1).slice(0,10).map( v=> {
    		this.auto_wrap.append(` <li data-code=${v.fr_code}><span class="name">${v.station_nm}</span> <span class="num">(${this.line_num[v.line_num]})</span></li> `)
			return v;
    	});

    	$(".autocomplete>ul li span.name").each(this.Each.bind(this));
    }
    // Each
	Each(idx,item){
		this.search_text = $(item).text();
		this.search_text = this.search_text.replace(this.key,`<span class="active-text">${this.key}</span>`);
		$(item).html(this.search_text);
	}
	// Up
	Up(){
		this.pos--;
		if( this.pos < 0 ) this.pos = $(".autocomplete>ul li").length-1 ;
		$(".autocomplete>ul li").removeClass("active-menu").eq(this.pos).addClass("active-menu");
		this.text = $(".autocomplete>ul li.active-menu .name").text();
		$("input").val(this.text);

	}
	// Down
	Down(){
		this.pos++;
		if( this.pos > $(".autocomplete>ul li").length-1 ) this.pos = 0;
		$(".autocomplete>ul li").removeClass("active-menu").eq(this.pos).addClass("active-menu");
		this.text = $(".autocomplete>ul li.active-menu .name").text();
		$("input").val(this.text);
	}
	// Enter
	Enter(){
		if( $(".autocomplete li").length == 0) return false;
		this.key = $("input").val();
		$(".timer").find("span").remove();
		this.time1 = new Date().getTime();
		this.result_wrap.empty();
		if( this.day == "1" || this.day == "2" || this.day == "3" || this.day == "4" || this.day == "5") this.day = 1;
		if( this.day == "6" ) this.day = 2;
		if( this.day == "0" ) this.day = 3;
		if($(".autocomplete>ul li").is(".active-menu")){
			 this.code = $(".autocomplete>ul li.active-menu").data("code");
			 this.list = stationList.data.filter( f=> f.fr_code == this.code).map( c=>  this.Append(c) )
		}else this.list = stationList.data.filter( f=> f.station_nm.includes(this.key)).sort( (a,b) => b.station_nm > a.station_nm ? -1 : 1).map( c=> this.Append(c))
		this.time2 = new Date().getTime();
		this.time3 = (this.time2 - this.time1)/1000;
		$(".timer").prepend(`<span>${this.time3}초</span>`)
	}
	Append(c){
		this.Append0(c);
	 	this.code = timeList.data.filter( f=> f.fr_code == c.fr_code && c.station_cd == f.station_cd && c.fr_code == f.fr_code && f.inout_tag == "1" && this.day == f.week_tag).map( v=>  this.Append1(c,v) );
		this.code = timeList.data.filter( f=> f.fr_code == c.fr_code && c.station_cd == f.station_cd && c.fr_code == f.fr_code && f.inout_tag == "2" && this.day == f.week_tag).map( v=>  this.Append2(c,v) );
		if( $(".result").find(`div[data-code=${c.fr_code}] ul`).length == 0 ) this.Append3(c); 
	}
	// Append0
	Append0(c){
		this.result_wrap.append(`
			<div data-code=${c.fr_code}>
					<p> <span class="name">${c.station_nm}</span> <span class="num">(${this.line_num[c.line_num]})</span></p>
			</div>
		`)
	}
	// Append1
	Append1(c,v){
		this.subfirst = stationList.data.filter( f=> f.station_cd == v.f_deststation );
		this.sublast = stationList.data.filter( f=> f.station_cd == v.l_deststation );
		$(".result").find(`div[data-code=${v.fr_code}]`).append(`
			<ul>
				<li> <span>상행성</span></li>
				<li> <span>첫차시간 </span> <span class="inout1_first">${this.subfirst[0].station_nm}역</span> <span class="inout1_first_time">${v.first_time}</span> </li>
				<li> <span>막차시간 </span> <span class="inout1_last">${this.sublast[0].station_nm}역</span> <span class="inout1_last_time">${v.last_time}</span>  </li>
			</ul>
		`)
	}
	// Append2
	Append2(c,v){
		this.subfirst = stationList.data.filter( f=> f.station_cd == v.f_deststation );
		this.sublast = stationList.data.filter( f=> f.station_cd == v.l_deststation );
		$(".result").find(`div[data-code=${v.fr_code}]`).append(`
			<ul>
				<li> <span>하행성</span></li>
				<li> <span>첫차시간 </span> <span class="inout2_first">${this.subfirst[0].station_nm}역</span> <span class="inout2_first_time">${v.first_time}</span> </li>
				<li> <span>막차시간 </span> <span class="inout2_last">${this.sublast[0].station_nm}역</span> <span class="inout2_last_time">${v.last_time}</span>  </li>
			</ul>
		`)
	}
	// Append3
	Append3(c){
		 $(".result").find(`div[data-code=${c.fr_code}]`).append(` <p>정보가 없습니다</p> `);
	 }
}

window.onload = _ => app = new App();



