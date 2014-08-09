(function(root) {
    var Asteroids = root.Asteroids = (root.Asteroids || {});
    var MovingObject = Asteroids.MovingObject;

		var Bullet = Asteroids.Bullet = function (pos, vel, radius, game) {
			this.pos = pos;
			this.vel = vel;
			this.radius = radius;
			this.color = 'Black'
			this.game = game;
			return this;
		};
    
    Bullet.inherits(MovingObject);
		
		Bullet.prototype.draw = function (ctx){
			var pos = this.pos;
			var rad = this.radius;
			
			ctx.beginPath();
			
      ctx.arc(
        this.pos[0],
        this.pos[1],
        this.radius,
        0,
        2 * Math.PI, 
        false
      );
			ctx.lineWidth = 1;
			ctx.stroke();
		}
		
	  Bullet.prototype.collideWith = function (otherObject) {
	    if (otherObject instanceof Asteroids.Asteroid) {
				debugger
				this.game.remove(this)
	      this.game.remove(otherObject)
	    }
	  };
  
}) (this);
