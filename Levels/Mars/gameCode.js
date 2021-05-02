var type = 0;
var stage = 0;

var phrases = ["Hmmm... It's dirt... RED!", "Bot no see a live.", "Scaning... Yes? I on a Mars?"];

var item = new Image();
item.src = "item.png";

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
typeFive.onclick = function() {
	type = 4
	gameStarter();
}
typeFive.onmouseover = function() {
	roverZero.src = "rover1stage1.png";
}
typeFive.onmouseout = function() {
	roverZero.src = "rover1stage0.png";
}
typeSix.onclick = function() {
	type = 5
	gameStarter();
}

function gameStarter() {
	typeSix.remove();
	typeFive.remove();
	typeFour.remove();
	typeThree.remove();
	typeTwo.remove();
	typeOne.remove();
	
	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");

	if(type != 3){var gravity = 0.02;}
	if(type == 3){var gravity = 0.008;}

	var landerIMG = new Image()
	if(type == 0){landerIMG.src = "lander.png";}
	if(type == 1){landerIMG.src = "lander2.png";}
	if(type == 2){landerIMG.src = "lander3.png";}
	if(type == 3){landerIMG.src = "lander4.png";}
	if(type == 5){landerIMG.src = "lander5.png";}
	if(type == 4 && stage == 0){landerIMG.src = "rover1stage0.png";}
	if(type == 4 && stage == 1){landerIMG.src = "rover1stage1.png";}

	var lander = {
		x: 150,
		y: -150,
		ySpeed: 0,
		xSpeed: 0
	}
	
	if(type == 0){var fuel = 675;}
	if(type == 1){var fuel = 450}
	if(type == 2){var fuel = 360}
	if(type == 3){var fuel = 300}
	if(type == 4){var fuel = 300}
	if(type == 5){var fuel = 250}

	var dirtY = 400;

	function main() {
		ctx.clearRect(0,0,400,400);
		if(type != 2) {
			ctx.fillText(`Fuel remaing: ${fuel}`, 10, 10);
			ctx.fillText(`Height: ${Math.floor(348-lander.y)}`, 100, 10);
			ctx.fillText(`Speed: ${String(lander.ySpeed).slice(0,4)}`, 160, 10);
		}
		if(type == 2) {
			ctx.fillText(`Fuel remaing: ${fuel}`, 10, 10);
			ctx.fillText(`Height: ${String(348-lander.y).slice(0,6)}`, 120, 10);
			ctx.fillText(`Speed: ${String(lander.ySpeed).slice(0,6)}`, 200, 10);
		}
		lander.y += lander.ySpeed
		lander.x += lander.xSpeed
		
		if(lander.y < 380){lander.ySpeed += gravity;}
		if(type != 0 && type != 4){
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
		if(type == 4 && stage == 0){
			if(lander.y + 23 >= dirtY && lander.ySpeed < 3) {
				landerIMG.src = "rover1stage1.png";
				var but = document.createElement("button");
				but.id = "endMission";
				but.innerHTML = "End Mission";
				gui.prepend(but)
				endMission.addEventListener("click", function() {
					win.play()
					alert("You win!");
					window.location.href = "../index.html";
				});
				var butt = document.createElement("button");
				butt.id = "dirtScan";
				butt.innerHTML = "Scan Dirt";
				gui.prepend(butt)
				dirtScan.addEventListener("click", function() {
					alert(phrases[Math.floor(Math.random() * phrases.length)]);
				});
				
				win.play()
				stage = 1
				lander.y = dirtY - 23;
				lander.ySpeed = 0;
				setTimeout(function() {alert("You Win!")}, 800);
			}
			if(lander.y + 23 >= dirtY && lander.ySpeed >= 3) {
				clearInterval(game);
				crash.play()
				alert("You crashed!")
				window.location.href = "../index.html";
			}
		}
		
		if(lander.y + 23 >= dirtY) {
			lander.y = dirtY - 23;
			lander.ySpeed = 0;
		}
		
		if(lander.xSpeed > 0){lander.xSpeed -= 1;}
		if(lander.xSpeed < 0){lander.xSpeed += 1;}
		
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
		
		ctx.fillStyle = "#c9431a";
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
			lander.ySpeed -= 0.4
			fuel -= 20;
		}
		if(event.keyCode == 38 && fuel >= 30 && type == 3) {
			lander.ySpeed -= 0.32
			fuel -= 30;
		}
		if(event.keyCode == 38 && fuel >= 20 && type == 4 && stage != 1) {
			lander.ySpeed -= 0.62
			fuel -= 20;
		}
		if(event.keyCode == 38 && fuel >= 25 && type == 5) {
			lander.ySpeed -= 1.12
			fuel -= 25;
		}
		
		if(event.keyCode == 37 && type == 4 && stage == 1) {
			lander.xSpeed -= 3;
		}
		if(event.keyCode == 39 && type == 4 && stage == 1) {
			lander.xSpeed += 3
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
		if(type == 5) {
			if(ranAction == 0) {
				return
			}
			else {
				lander.ySpeed -= 1.12
			}
		}
	})

	var game = setInterval(main, 20);
}