(function (namespace) {

	/* Load all the animation images */
	var images = [];
	var faces = [];
	var messages = [];

	for (var i = 0; i < 10; ++i) {
		images[i] = new Image();

		if (i <= 5) {
			images[i].src = 'img/walk' + i + '.png';
		} else {
			images[i].src = 'img/walk' + (10-i) + '.png';
		}
	}

	for (var i = 0; i < 4; ++i) {
		faces[i] = new Image();
		if (i <= 2) {
			faces[i].src = 'img/face' + i + '.png';
		} else {
			faces[i].src = 'img/face' + (4-i) + '.png';
		}
	}

	for (var i = 0; i <= 6; ++i) {
		messages[i] = new Image();
		messages[i].src = 'img/message' + i + '.png';
	}


	/*
	 * Create a new walking man
	 */
	function Man(context, background, x, y) {
		this.state = 'left';
		this.moving = false;
		this.ctx = context;
		this.bg = background;
		this.x = x;
		this.y = y;
		this.current = 0;
		this.distance = 0;

		this.tmoving = false;
		this.tstate = 'in';
		this.tcurrent = 0;

		this.message = -1;
	}


	/*
	 * Make the man pout
	 */
	Man.prototype.pout = function () {
		if (!this.tmoving) {
			this.tmoving = true;
			this.draw();

			var man = this;
			function pouter() {
				man.tcurrent = (man.tcurrent + 1) % faces.length;
				man.draw();

				if (man.tstate == 'out' && man.tcurrent > 0 || man.tstate == 'in' && man.tcurrent < faces.length/2) {
					setTimeout(pouter, 120);
				} else {
					man.tmoving = false;
					man.tstate = man.tstate == 'in' ? 'out' : 'in';
				}
			}

			setTimeout(pouter, 120);
		}
	};


	/*
	 * Draw the man on the canvas
	 */
	Man.prototype.draw = function () {
		if (this.bg) {
			this.bg.refresh();
		}

		this.ctx.drawImage(images[this.current], this.x, this.y);
		this.ctx.drawImage(faces[this.tcurrent], this.x, this.y);

		if (this.message > -1) {
			this.ctx.drawImage(
				messages[this.message], 
				this.x + images[this.current].width - images[this.current].width / 4, 
				this.y - 2*(messages[this.message].height/3)
			);
		}
	};


	/*
	 * Show a speech bubble
	 */
	Man.prototype.speak = function () {
		if (this.message == -1) {
			this.message = Math.floor(Math.random()*10000) % messages.length;
			var man = this;
			setTimeout(function () { man.message = -1; man.draw(); }, 2000);
		}
	};


	/*
	 * Make the man walk
	 */
	Man.prototype.walk = function () {
		if (!this.moving) {
			this.moving = true;
			this.draw();

			var man = this;

			/* Animate a walk movement */
			function walker() {
				man.current = (man.current + 1) % images.length;
				man.bg.move();
				man.draw();

				++man.distance;

				if (man.state == 'right' && man.current > 0 || man.state == 'left' && man.current < images.length/2) {
					// continue animation
					setTimeout(walker, 70); 
				} else {
					// stop animation and notify
					man.moving = false;
					man.state = man.state == 'left' ? 'right' : 'left';
				}
			}

			setTimeout(walker, 70);
		}
	};


	/* Expose on the namespace */
	namespace.Man = Man;

})(window);
