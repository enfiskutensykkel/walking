(function (namespace) {

	/*
	 * Create a background
	 */
	function Background(context, width, height) {
		this.ctx = context;
		this.width = width;
		this.height = height;
		this.objects = [];
	}


	/*
	 * Private helper function to draw a background object on to the background
	 */
	function draw(obj, bgObj) {
		obj.ctx.drawImage(bgObj.image, bgObj.x, bgObj.y);
	}


	/*
	 * Draw a background object
	 */
	Background.prototype.draw = function (bgObject) {
		var i;

		for (i = 0; i < this.objects.length; ++i) {
			if (bgObject == this.objects[i])
				break;
		}

		if (i == this.objects.length) {
			this.objects.push(bgObject);
		}

		draw(this, bgObject);
	};



	/*
	 * Move the background position
	 */
	Background.prototype.move = function () {
		for (var i = 0; i < this.objects.length; ++i) {
			this.objects[i].move();
		}
	};


	/*
	 * Redraw the background
	 */
	Background.prototype.refresh = function () {
		var oldstyle = this.ctx.fillStyle;

		// Draw sky 
		this.ctx.fillStyle = 'lightblue';
		this.ctx.fillRect(0, 0, this.width, this.height);

		// Draw ground
		this.ctx.fillStyle = 'brown';
		this.ctx.fillRect(
			0, 
			this.height - (this.height/2 - (this.height/2 % 100)), 
			this.width, 
			this.height / 2 - (this.height/2 % 100)
		);

		// Draw background objects
		for (var i = 0; i < this.objects.length; ++i) {
			draw(this, this.objects[i]);
		}

		this.ctx.fillStyle = oldstyle;
	};


	/* Expose on the namespace */
	namespace.Background = Background;

})(window);
