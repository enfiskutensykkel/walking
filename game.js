(function main() {
	/* Set up game */
	var canvas = document.getElementsByTagName('canvas')[0];
	var context = canvas.getContext('2d');
	var background = new Background(context, 640, 450);
	var man = new Man(context, background, 640/2-50, 480-200);
	var timer = null;
	var counter = .0;

	/* Catch user input */
	canvas.onmousedown = function (evt) {
		evt.preventDefault();
		evt.stopPropagation();

		if (evt.x < 640/2 && man.state == 'right') {
			man.walk();
		} else if (evt.x > 640/2 && man.state == 'left') {
			man.walk();
		}
	};

	document.onkeydown = function (evt) {
		if (evt.keyCode == 37 && man.state == 'right') {
			man.walk();
		} else if (evt.keyCode == 39 && man.state == 'left') {
			man.walk();
		} else if (evt.keyCode == 40 && man.tstate == 'in') {
			man.pout();
		} else if (evt.keyCode == 38 && man.tstate == 'out') {
			man.pout();
		} 
	};

	/* Update step counter */
	function update() {
		context.font = '20px Helvetica';
		context.fillStyle = 'white';
		context.fillRect(0, 450, 640, 30);
		context.fillStyle = 'black';
		context.textAlign = 'left';
		context.fillText('' + Math.floor(man.distance/5) + ' steps', 10, 470);

		if (man.distance > 0) {
			++counter;

			if (counter % 2000 == 0) {
				man.speak();
			}
		}

		context.textAlign = 'right';
		context.fillText('' + Math.floor((counter/10)/60) + ' min ' + Math.floor((counter/10) % 60) + ' sec', 630, 470);

		timer = setTimeout(update, 100);
	}


	/* Create clouds */
	new Cloud(background, 70, 30, .07, .02);
	new Cloud(background, 500, 90, .1, .003);
	new Cloud(background, 200, 120, .2, .1);

	/* Create trees */
	new Tree(background, 100, 185, 2, 2);
	new Tree(background, 490, 190, 2, .2);
	new Tree(background, 170, 200, 2, .5);
	new Tree(background, 820, 205, 2, .1);
	new Tree(background, 690, 215, 2, .7);
	new Tree(background, 400, 220, 2, .3);
	new Tree(background, 740, 235, 2, 1.3);


	/* Create help text */
	background.refresh();
	man.draw();
	context.font = '30px Helvetica';
	context.fillStyle = 'purple';
	context.textAlign = 'center';
	context.fillText("Press left and right arrow to walk", 640/2, 120)

	update();
})();
