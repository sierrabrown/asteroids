(function(root) {
    var Asteroids = root.Asteroids = (root.Asteroids || {});
    var MovingObject = Asteroids.MovingObject;

    var Asteroid = Asteroids.Asteroid = function(pos, vel, radius, game) {
      var COLOR = "white";
      MovingObject.call(this, pos, vel, radius, COLOR, game);
    };
    
    Asteroid.inherits(MovingObject);
    
    
    Asteroid.randomAsteroid = function(dimX,dimY, game){
      var test = Math.floor(Math.random()*4);
      var pos;
      if (test === 0) {
        pos = [ dimX * Math.random(), 0];
      } else if (test === 1) {
        pos = [ 0, dimY * Math.random()];
      } else if (test === 2) {
        pos = [ dimX * Math.random(), dimY];
      } else {
        pos = [ dimX, dimY * Math.random()];      
      }
      
      var radius = 25 * Math.random() + 5;
      var vel = [(Math.random() * 50 / radius) - 25 / radius, (Math.random() * 50 / radius)- 25 / radius]; 
      return new Asteroid(pos, vel, radius, game);
    };
		
	  Asteroid.prototype.collideWith = function (otherObject) {
	    if (otherObject instanceof Asteroids.Ship) {
	      otherObject.relocate();
	    }
	  };

    
})(this);