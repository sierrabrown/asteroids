(function(root) {
    var Asteroids = root.Asteroids = (root.Asteroids || {});
    var MovingObject = Asteroids.MovingObject;
		
	  function randomColor () {
			
			var colors = ["#6FFF00", "#FF00FF", "#FFFF00", "#FE0001", "#FF4105", "#993CF3"]
			return colors[Math.floor(Math.random() * colors.length)]
	  }

		var Bullet = Asteroids.Bullet = function (pos, vel, radius, game) {
			this.pos = pos;
			this.vel = vel;
			this.radius = radius;
			this.color = randomColor()
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
      ctx.fillStyle = this.color;
      ctx.fill();
			ctx.stroke();
		}
		
	  Bullet.prototype.collideWith = function (otherObject) {
	    if (otherObject instanceof Asteroids.Asteroid) {
				debugger
				this.game.remove(this)
	      this.game.remove(otherObject)
	    }
	  };
		
    Bullet.prototype.move = function() {      
      this.pos[0] += this.vel[0];
      this.pos[1] += this.vel[1];
      
      
      if (this.pos[0] > Asteroids.Game.DIM_X + this.radius){
        this.game.remove(this)
      }
      if (this.pos[0] < 0 - this.radius){
        this.game.remove(this)
      }  if (this.pos[1] > Asteroids.Game.DIM_Y + this.radius){
        this.game.remove(this)
      }  if (this.pos[1] < 0 - this.radius){
        this.game.remove(this)
      }
      
    }
  
}) (this);
