function contextStroke(){
	var cnvs = document.getElementById('cnvs3');
	var ctx = cnvs.getContext('2d');
	var isDraw = false;
	var dot = 1;
	var color = 'rgb(0, 0, 0)';
	var lastX=cnvs.width/2, lastY=cnvs.height/2;
	var canvasImg = new Image();
    var canvasImg2 = new Image();
var w = window.innerWidth;
    var h = window.innerHeight;
	var img = _('.thumbnail img'),
	canvas = _('#cs'),
	preview = _('.preview'),x = '',y = '';
	if (w > 1000) {
        var lineImg = canvasImg.addEventListener('load', function(e){
            ctx.drawImage(canvasImg , 0, -cnvs.height / 100- 50, cnvs.width / 1, cnvs.height * 1);
        });
    }else if (w < 500) {
        var lineImg = canvasImg2.addEventListener('load', function(e){
            ctx.drawImage(canvasImg2 , 410, -cnvs.height / 100 + 100, cnvs.width / 3, cnvs.height * 0.7);
            
        });
    }
	canvasImg.src="2.png";
    canvasImg2.src="smail2.png";


	$('#dot').bind('change', function(){  
		dot = $('#dot').val(); 
	});
	$("#cnvs3").mousemove(function(e){
		if (isDraw) draw(e);        
	});
	$("#cnvs3").mousedown(function(e){  
		if (e.button===0) {
			ctx.beginPath();
			isDraw = true;
			strokeLine(e);
			ctx.moveTo(x, y);
			draw(e);
		}
	});
	$("#cnvs3").mouseup(function(e){
		isDraw = false;                 
	});
	function draw(e){   
		strokeLine(e);
		ctx.lineWidth = dot;
	}
	function strokeLine(e){
		x = e.offsetX;
		y = e.offsetY;
		ctx.lineTo(x, y);
		ctx.stroke();
	}
	function clearCanvas(){
		ctx.clearRect(0, 0, cnvs.width, cnvs.height);
		ctx.beginPath();
	}

	img.addEventListener('click', function(e){
		x = e.offsetX;
		y = e.offsetY; 
		ctx.beginPath();
		draw(e)
		useCanvas(canvas,img,function(){

			var p = canvas.getContext('2d')
			.getImageData(x, y, 1, 1).data;

			ctx.strokeStyle = rgbToHex(p[0],p[1],p[2]);
		});
	});

            // preview function mousemove
            img.addEventListener('mousemove', function(e){
            	x = e.offsetX;
            	y = e.offsetY; 
            	useCanvas(canvas,img,function(){
            		var p = canvas.getContext('2d')
            		.getImageData(x, y, 1, 1).data;

            		preview.style.background = rgbToHex(p[0],p[1],p[2]);
            	});
            });

            cnvs.addEventListener('mousewheel', function(e){
            	var x = e.offsetX, y = e.offsetY;
            })
            

            function useCanvas(el,image,callback){
              el.width = image.width; // img width
              el.height = image.height; // img height
                // draw image in canvas tag
                el.getContext('2d')
                .drawImage(image, 0, 0, image.width, image.height);
                return callback();
            }
            function _(el){
            	return document.querySelector(el);
            };

            function componentToHex(c) {
            	var hex = c.toString(16);
            	return hex.length == 1 ? "0" + hex : hex;
            }
            function rgbToHex(r, g, b) {
            	return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
            }

            // 지우기
            $('#btnDel').click(function(){
            	clearCanvas();
            });
      

            $(".select:nth-child(1)").on('click', function(){
            	$(".cnvs:nth-child(1)").addClass('focus')
        		$(".cnvs:not(:nth-child(1))").removeClass('focus')
            })
            $(".select:nth-child(2)").on('click', function(){
            	$(".cnvs:nth-child(2)").addClass('focus')
        		$(".cnvs:not(:nth-child(2))").removeClass('focus')
            })
            $(".select:nth-child(3)").on('click', function(){
            	$(".cnvs:nth-child(3)").addClass('focus')
        		$(".cnvs:not(:nth-child(3))").removeClass('focus')
            })
            $(".select:nth-child(4)").on('click', function(){
            	$(".cnvs:nth-child(4)").addClass('focus')
        		$(".cnvs:not(:nth-child(4))").removeClass('focus')
            })
        }

        function selectFont(){
        	for(var i = 2; i<=30; i++){
        		var templet = `<option value="${i}">${i}px</option>`
        		$('#dot').append(templet)
        	}

        }

        function clickColor(){
        	$('.color').css({"visibility":"visible"}) 
        }

        $(contextStroke)
        .on('click', '.colorBtn', clickColor)