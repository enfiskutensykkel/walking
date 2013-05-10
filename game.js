(function main() {
	/* Set up game */
	var context = document.getElementsByTagName('canvas')[0].getContext('2d');
	var background = new Background(context, 640, 450);
	var man = new Man(context, background, 640/2-50, 480-200);

	/* Catch user input */
	document.onkeydown = function (evt) {
		if (evt.keyCode == 37 && man.state == 'right') {
			man.walk(update);
		} else if (evt.keyCode == 39 && man.state == 'left') {
			man.walk(update);
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
		context.fillText('' + (man.distance)/5 + ' steps', 10, 470);
	}


	/* Create clouds */
	new Cloud(background, 70, 30, .07, .2);
	new Cloud(background, 500, 90, .1, .3);
	new Cloud(background, 200, 120, .2, 1);

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
	context.fillText("Press left and right arrow to walk", 12, 120)

	update();
})();
