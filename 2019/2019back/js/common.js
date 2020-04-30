const App = new app();

function app(){

	/* start */
	this.init = _ =>{

		this.event();
		this.bg_ram();
		

		
		
	}
	/* event */
	this.event = _ =>{
		let alert_check = true;
		$(document)
		//  color 
		.on("click",".item>div",function(){
			let color = $(this).css("background-color");
			
		})
		.on("click",".color_box",function(){
			let color = $(this).css("background-color");
			
		})
		.on("click",".item .sub_item i",function(){
			$(this).toggleClass("active");
		})
		.on("click",".item span",function(){
			document.execCommand('copy'); 
			if(alert_check == true)
				alert("복사 되었습니다.");
			
		})
	}
	/* Random color box  */
	this.bg_ram = _ =>{
		let item = $(".item").eq(0).clone();  //  color box 클론 생성
		let item_max = 50; // color box 단 제한
		scroll(); // scroll 실행 



		// button page scroll 
		function scroll(){
			// scroll start
			var page_i = 0;
 			var i = 0;
			var start_check = true;
			var number = 4;
			var color_num = ["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F"];
			
			//  scroll event 
			$(window).scroll(function(){
				let wScroll = $(this).scrollTop();
				let wheight = $(window).height();
				let item_Height = ($(".item").outerHeight() - $(".item").height()) / 2 ;
			    let item_Scroll = $(`.item[data-idx=${i}]`).offset().top + item_Height + $(".item").height() - 15;
			    let start = $(".title").offset().top;

			    if( wScroll >= item_Scroll - wheight && start_check == true && wScroll >= start){
			    	$(`.item_content[data-idx=${page_i}]`).css({ display:"block"});
			    	fade_delay();
					Get_item();
					i = 1;
					Get_item();
					fade_delay();
					start_check = false;
				}else if( wScroll >= item_Scroll - wheight && i < item_max -1 && i != 0){
					Get_item();
					fade_delay();
				}
				
			})

			//  Get Item Color box 
			function Get_item(){
				if( i == 0){
					let temp = $(`.item[data-idx=0]`);
					for(let i =0; i < 3 ; i++){
						let result = "";
							for(let j = 0 ; j<6; j++){
								 let ram = Math.floor(Math.random() * color_num.length)+0;
								  ram = color_num[ram];
								  result = result + ram;
								  
								  temp.find(`div[data-number=${i+1}]`).css({ background: "#"+result});
								  temp.find(`div[data-number=${i+1}]`).find("code").text("#"+result)

								  temp.find(`div[data-number=${i+1}]`).find("span").text("#"+result).css({ color: "#"+result});
								  temp.find(`div[data-number=${i+1}]`).find("code").css({ color: "#"+result});
							}
					}
					return false;	
			}

				let temp = item.clone();
				// 단 하나에 color box 3개 
				for(let i =0; i < 3 ; i++){
					let result = "";
						//  color 랜덤 지정 
						for(let j = 0 ; j<6; j++){
							 let ram = Math.floor(Math.random() * color_num.length)+0;
							  ram = color_num[ram];
							  result = result + ram;
							  
							  temp.find(`div[data-number=${i+1}]`).css({ background: "#"+result});
							  temp.find(`div[data-number=${i+1}]`).find("code").text("#"+result)

							  temp.find(`div[data-number=${i+1}]`).find("span").text("#"+result).css({ color: "#"+result});
							  temp.find(`div[data-number=${i+1}]`).find("code").css({ color: "#"+result});
						}
				}

				temp.attr("data-idx",i);
				// temp.find('div[data-number=1]>span').html(number);
				number++;
				// temp.find('div[data-number=2]>span').html(number);
				number++;
				// temp.find('div[data-number=3]>span').html(number);
				number++;
				$(".content").find(".item_content").append(temp);
			// scroll end 
			}

			// scroll fade animation delay 
			function fade_delay(){
				for(let j = 0 ; j < 3 ; j++){
					let ram = Math.random()*0.4 ;
					$(`.item[data-idx=${i}]`).find(`div[data-number=${j+1}]`).addClass('fade').css({ "animation-delay": ram+"s" });
				}
			}

		}

	}

}






window.onload = function(){
	App.init();
}
