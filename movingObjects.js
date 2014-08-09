(function(root) {
    var Asteroids = root.Asteroids = (root.Asteroids || {});
    
    var MovingObject = Asteroids.MovingObject = function(pos, vel, radius, color) {
      this.pos = pos;
      this.vel = vel;
      this.radius = radius;
      this.color = color;
    }
    
    Function.prototype.inherits = function(superclass){
      function Surrogate() {}
      Surrogate.prototype = superclass.prototype;
      this.prototype = new Surrogate();
    };
    
    
    MovingObject.prototype.draw = function(ctx) {
      ctx.fillStyle = this.color;
          ctx.beginPath();

          ctx.arc(
            this.pos[0],
            this.pos[1],
            this.radius,
            0,
            2 * Math.PI, 
            false
          );
          ctx.fill();
    }
		
		MovingObject.prototype.Distance = function(point1, point2) {
			var xa = point1[1]
			var xb = point2[0]
			
			var ya = point1[0]
			var yb= point2[1]
			
			var dist = Math.pow(xa-xb, 2) + Math.pow(ya-yb, 2)
			return Math.sqrt(dist)
		}
    
    MovingObject.prototype.isCollidedWith = function(otherObject){
	    var centerDist = MovingObject.prototype.Distance(this.pos, otherObject.pos)
			return centerDist < (this.radius + otherObject.radius);
     // var x = (this.pos[0] - otherObject.pos[0]);
     // var y = (this.pos[1] - otherObject.pos[1]);
     // distance = Math.sqrt (x * x + y * y);
     //
     // return (distance < (this.radius + otherObject.radius));
    }
		
	  MovingObject.prototype.collideWith = function (otherObject) {
	    ; // default do nothing
	  };
    
    MovingObject.prototype.move = function() {      
      this.pos[0] += this.vel[0];
      this.pos[1] += this.vel[1];
      
      
      if (this.pos[0] > Asteroids.Game.DIM_X + this.radius){
        this.pos[0] = 0 - this.radius;
      }
      if (this.pos[0] < 0 - this.radius){
        this.pos[0] = Asteroids.Game.DIM_X + this.radius;
      }  if (this.pos[1] > Asteroids.Game.DIM_Y + this.radius){
        this.pos[1] = 0 - this.radius;
      }  if (this.pos[1] < 0 - this.radius){
        this.pos[1] = Asteroids.Game.DIM_Y - this.radius;
      }
      
    }
    
  
}) (this);