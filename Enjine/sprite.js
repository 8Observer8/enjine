/**
	Represents a simple static sprite.
	Code by Rob Kleffner, 2011
*/

$e.Sprite = function() {
	this.x = 0;
	this.y = 0;
	this.xPivot = 0.5;
	this.yPivot = 0.5;
	this.angle = 0;
	this.xScale = 1;
	this.yScale = 1;
	this.image = null;
};

$e.Sprite.prototype = new $e.Drawable();

$e.Sprite.prototype.draw = function(context, camera) {
	this.angle += 0.1;
	context.save();
	context.translate(this.x, this.y);
	context.scale(this.xScale, this.yScale);
	context.rotate(this.angle);
	context.drawImage(this.image, -this.image.width * this.xPivot, -this.image.height * this.yPivot);
	context.restore();
};