var item = new Image();
item.src = "item.png";

var type = 0;
var stage = 0;

var engine = new Audio("engine.mp3");
var crash = new Audio("crash.mp3");
var win = new Audio("win.mp3");

typeOne.onclick = function() {
	type = 0
	gameStarter();
}
typeTwo.onclick = function() {
	type = 1
	gameStarter();
}
typeThree.onclick = function() {
	type = 2
	gameStarter();
}
typeFour.onclick = function() {
	type = 3
	gameStarter();
}
typeFour.onmouseover = function() {
	roverZero.src = "rover1stage1.png";
}
typeFour.onmouseout = function() {
	roverZero.src = "rover1stage0.png";
}
typeFive.onclick = function() {
	type = 4;
	gameStarter();
}

function gameStarter() {
	typeFive.remove();
	typeFour.remove();
	typeThree.remove();
	typeTwo.remove();
	typeOne.remove();
	
	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");

	var gravity = 0.01;

	var landerIMG = new Image()
	if(type == 0){landerIMG.src = "lander.png";}
	if(type == 1){landerIMG.src = "lander2.png";}
	if(type == 2){landerIMG.src = "lander3.png";}
	if(type == 4){landerIMG.src = "lander4.png";}
	if(type == 3 && stage == 0){landerIMG.src = "rover1stage0.png";}
	if(type == 3 && stage == 1){landerIMG.src = "rover1stage1.png";}

	var lander = {
		x: 150,
		y: -200,
		ySpeed: 0,
		xSpeed: 0
	}
	
	if(type == 0){var fuel = 675;}
	if(type == 1){var fuel = 450}
	if(type == 2){var fuel = 360}
	if(type == 3){var fuel = 300}
	if(type == 4){var fuel = 250}

	var dirtY = 400;

	function main() {
		ctx.clearRect(0,0,400,400);
		
		//RoverX
		
		lander.x += lander.xSpeed
		
		if(lander.xSpeed > 0){lander.xSpeed -= 1;}
		if(lander.xSpeed < 0){lander.xSpeed += 1;}
		
		//Other
		if(type != 2) {
			ctx.fillText(`Fuel remaing: ${fuel}`, 10, 10);
			ctx.fillText(`Height: ${Math.floor(349-lander.y)}`, 100, 10);
			ctx.fillText(`Speed: ${String(lander.ySpeed).slice(0,4)}`, 160, 10);
		}
		if(type == 2) {
			ctx.fillText(`Fuel remaing: ${fuel}`, 10, 10);
			ctx.fillText(`Height: ${String(347-lander.y).slice(0,6)}`, 120, 10);
			ctx.fillText(`Speed: ${String(lander.ySpeed).slice(0,5)}`, 200, 10);
		}
		lander.y += lander.ySpeed
		
		if(lander.y < 380){lander.ySpeed += gravity;}
		if(type != 0 && type != 3 && stage != 1){
			if(lander.y + 23 >= dirtY && lander.ySpeed < 2) {
				clearInterval(game);
				win.play()
				lander.y = dirtY - 23;
				lander.ySpeed = 0;
				setTimeout(function() {alert("You Win!"); window.location.href = "../index.html";}, 800);
			}
			if(lander.y + 23 >= dirtY && lander.ySpeed >= 2) {
				clearInterval(game);
				crash.play()
				alert("You crashed!")
				window.location.href = "../index.html";
			}
		}
		if(type == 0){
			if(lander.y + 23 >= dirtY && lander.ySpeed < 3) {
				clearInterval(game);
				win.play()
				lander.y = dirtY - 23;
				lander.ySpeed = 0;
				setTimeout(function() {alert("You Win!"); window.location.href = "../index.html";}, 800);
			}
			if(lander.y + 23 >= dirtY && lander.ySpeed >= 3) {
				clearInterval(game);
				crash.play()
				alert("You crashed!")
				window.location.href = "../index.html";
			}
		}
		if(type == 3 && stage == 0){
			if(lander.y + 23 >= dirtY && lander.ySpeed < 3) {
				var but = document.createElement("button");
				but.id = "endMission";
				but.innerHTML = "End Mission";
				
				gui.prepend(but)
				
				endMission.addEventListener("click", function() {
					win.play()
					alert("You win!");
					window.location.href = "../index.html";
				});
				
				win.play()
				lander.y = dirtY - 23;
				lander.ySpeed = 0;
				stage = 1;
				landerIMG.src = "rover1stage1.png"
				setTimeout(function() {alert("You Landed!");}, 800);
			}
			if(lander.y + 23 >= dirtY && lander.ySpeed >= 3) {
				clearInterval(game);
				crash.play()
				alert("You crashed!")
				window.location.href = "../index.html";
			}
		}
		if(lander.y + 23 >= dirtY && lander.ySpeed < 3) {
			lander.y = dirtY - 23;
			lander.ySpeed = 0;
		}
		
		//X
		
		if(lander.x <= 0) {
			ctx.drawImage(item,-6, 80);
		}
		if(lander.x >= 400) {
			ctx.drawImage(item,400 - 22, 80);
		}
		
		//Dirt Render
		if(lander.y >= 320 && lander.ySpeed > 0) {
			dirtY -= lander.ySpeed
		}
		if(lander.y >= 320 && lander.ySpeed < 0) {
			dirtY += lander.ySpeed
		}
		//rendering
		
		ctx.fillStyle = "gray";
		ctx.fillRect(0, dirtY, 400, 100);
		ctx.fillStyle = "black";
		if(lander.y >= 240) {ctx.drawImage(landerIMG,lander.x, lander.y - 105)}
		else {ctx.drawImage(landerIMG, lander.x, 245 - 105);}
	}

	document.addEventListener("keydown", function (event) {
		if(event.keyCode == 38 && fuel >= 75 && type == 0) {
			lander.ySpeed -= 0.3
			fuel -= 75;
		}
		if(event.keyCode == 38 && fuel >= 50 && type == 1) {
			lander.ySpeed -= 0.6
			fuel -= 50;
		}
		if(event.keyCode == 38 && fuel >= 20 && type == 2) {
			lander.ySpeed -= 0.2
			fuel -= 20;
		}
		if(event.keyCode == 38 && fuel >= 20 && type == 3 && stage == 0) {
			lander.ySpeed -= 0.3
			fuel -= 20;
		}
		
		
		if(stage == 0){engine.play()}
		var ranAction = Math.floor(Math.random() * 2);
		if(type == 1) {
			if(ranAction == 0) {
				return
			}
			else {
				fuel += 25
			}
		}
		if(type == 4) {
			if(ranAction == 0) {
				return
			}
			else {
				lander.ySpeed -= 0.6
			}
		}
		
		if(event.keyCode == 38 && fuel >= 25 && type == 4) {
			lander.ySpeed -= 0.6
			fuel -= 25;
		}
		
		if(event.keyCode == 37 && type == 3 && stage == 1) {
			lander.xSpeed -= 3;
		}
		if(event.keyCode == 39 && type == 3 && stage == 1) {
			lander.xSpeed += 3
		}
	})

	var game = setInterval(main, 20);
}