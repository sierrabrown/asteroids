(function(root) {
    var Asteroids = root.Asteroids = (root.Asteroids || {});
    var MovingObject = Asteroids.MovingObject;
		
	  function randomColor () {
			
			var colors = ["#6FFF00", "#FF00FF", "#FFFF00", "#FE0001", "#FF4105", "#993CF3"]
			return colors[Math.floor(Math.random() * colors.length)]
	  }

    var Ship = Asteroids.Ship = function(pos, vel, radius) {
      var COLOR = randomColor();
      this.heading = Math.PI;
      this.thrust = 0;
      MovingObject.call(this, pos, vel, radius, COLOR);
    };
    
    Ship.inherits(MovingObject);
    
    Ship.prototype.rotate = function(rad){
      this.heading += rad;
    };
    
    Ship.prototype.power = function(impulse){ 
      this.thrust = impulse;
      this.vel[0] += this.thrust * Math.cos(this.heading);
      this.vel[1] += this.thrust * Math.sin(this.heading);
    };
    
    Ship.prototype.decelerate = function(){
      this.vel[0] = this.vel[0] * .97;
      this.vel[1] = this.vel[1] * .97;
    };
		
		Ship.prototype.draw = function  (ctx){
			var pos = this.pos;
			var ang = this.heading;
			var pi = Math.PI;
			var leftVert = ang + (2.25 / 3) * pi;
			var rightVert = ang + (3.75 / 3) * pi;
			var rad = this.radius;
				
			
			ctx.beginPath();
			ctx.moveTo(pos[1] + rad * Math.sin(ang), pos[0] + rad * Math.cos(ang));
			ctx.lineTo(pos[1] + rad * Math.sin(leftVert), pos[0] + rad * Math.cos(leftVert));
			ctx.lineTo(pos[1] + rad * Math.sin(rightVert), pos[0] + rad * Math.cos(rightVert));
			ctx.closePath();
			ctx.lineWidth = 1;
      ctx.fillStyle = this.color;
      ctx.fill();
			ctx.stroke();
			
		};
		
		Ship.prototype.addBullet = function(game) {
			var pos = this.pos;
			var rad = this.radius;
			var ang = this.heading;
			var origin = [pos[1] + rad * Math.sin(ang), pos[0] + rad * Math.cos(ang)]
			var bulletVel = [];
			
			bulletVel[1] = 5 * Math.cos(ang) + this.vel[0];
			bulletVel[0] = 5 *  Math.sin(ang) + this.vel[1];
			
			return new Asteroids.Bullet(origin, bulletVel, 5, game);
		}
		
	  Ship.prototype.relocate = function () {
			this.color = randomColor()
	    this.pos = [500 * Math.random(), 500 * Math.random()]
	    this.vel = [0, 0];
	  };
  
}) (this);