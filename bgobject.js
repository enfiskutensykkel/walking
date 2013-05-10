(function (namespace) {


	/*
	 * Background object
	 */
	function BGObject(background, image, x, y, speed, offset) {
		this.bg = background;
		this.image = image;
		this.x = x;
		this.y = y;
		this.v = speed;
		this.offset = offset;

		this.draw();
	}


	/* 
	 * Draw the background object to the screen 
	 */
	BGObject.prototype.draw = function () {
		this.bg.draw(this);
	};


	/* 
	 * Move the background object, and wrap around if it reaches the end 
	 */
	BGObject.prototype.move = function () {
		this.x -= this.v;

		if (this.x <= -(this.image.width + this.offset * this.bg.width)) {
			this.x = this.bg.width;
		} 
	};


	/* Expose on the namespace */
	namespace.BGObject = BGObject;

})(window);



(function (namespace) {
  
  	var img = new Image();
	img.src = 'img/cloud.png';

	function Cloud(background, x, y, speed, offset) {
		namespace.BGObject.call(this, background, img, x, y, speed, offset);
	}

	/* Inherit from the BGObject class */
	Cloud.prototype = (function derived(baseProto) {
		if (!baseProto) {
			return;
		}

		derived.prototype = baseProto;
		return new derived();

	})(namespace.BGObject.prototype);

	Cloud.prototype.constructor = Cloud;

	/* Expose on the namespace */
	namespace.Cloud = Cloud;

})(window);



(function (namespace) {
 
 	var img = new Image();
	img.src = 'img/tree.png';

	function Tree(background, x, y, speed, offset) {
		namespace.BGObject.call(this, background, img, x, y, speed, offset);
	}

	/* Inherit from the BGObject class */
	Tree.prototype = (function derived(baseProto) {
		if (!baseProto) {
			return;
		}

		derived.prototype = baseProto;
		return new derived();

	})(namespace.BGObject.prototype);

	Tree.prototype.constructor = Tree;


	/* Expose on the namespace */
	namespace.Tree = Tree;

})(window);
