function contextStroke(){
	var cnvs = document.getElementById('cnvs4');
	var ctx = cnvs.getContext('2d');
	var isDraw = false;
	var dot = 1;
	var color = 'rgb(0, 0, 0)';
	var lastX=cnvs.width/2, lastY=cnvs.height/2;
	var canvasImg = new Image();

	var img = _('.thumbnail img'),
	canvas = _('#cs'),
	preview = _('.preview'),x = '',y = '';
	var lineImg = canvasImg.addEventListener('load', function(e){
		ctx.drawImage(canvasImg , 300, -cnvs.height / 100 + 100, cnvs.width / 2, cnvs.height * 0.7);
	});
	canvasImg.src="4.png";


	$('#dot').bind('change', function(){  
		dot = $('#dot').val(); 
	});
	$("#cnvs4").mousemove(function(e){
		if (isDraw) draw(e);        
	});
	$("#cnvs4").mousedown(function(e){  
		if (e.button===0) {
			ctx.beginPath();
			isDraw = true;
			strokeLine(e);
			ctx.moveTo(x, y);
			draw(e);
		}
	});
	$("#cnvs4").mouseup(function(e){
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

        function clickColor(){
        	$('.color').css({"visibility":"visible"}) 
        }

        $(contextStroke)
        .on('click', '.colorBtn', clickColor)