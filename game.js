(function(root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});
    
  var Game = Asteroids.Game = function(ctx) {
    this.ctx = ctx;
    this.asteroids = this.addAsteroids(10);
    this.ship = this.addShip();
		this.bullets = []
  };
  
  Game.FPS = 20;
  Game.DIM_X = 500;
  Game.DIM_Y = 500;
  
  Game.prototype.addAsteroids = function(numAsteroids) {
    var arr = [];
    for (var i = 0; i < numAsteroids ; i++){
      arr.push(Asteroids.Asteroid.randomAsteroid(Game.DIM_X, Game.DIM_Y, this));
    }
    return arr;
  };
	
  Game.prototype.allObjects = function () {
    return []
      .concat(this.ship)
      .concat(this.asteroids)
      .concat(this.bullets);
  };
	
  Game.prototype.remove = function (object) {
		debugger
    if (object instanceof Asteroids.Bullet) {
      this.bullets.splice(this.bullets.indexOf(object), 1);
    } else if (object instanceof Asteroids.Asteroid) {
      var idx = this.asteroids.indexOf(object);
      this.asteroids[idx] = Asteroids.Asteroid.randomAsteroid(Game.DIM_X, Game.DIM_Y, this);
    } else if (object instanceof Asteroids.Ship) {
      this.ships.splice(this.ships.indexOf(object), 1);
    } else {
      throw "wtf?";
    }
  };
	
	
	Game.prototype.addBullet = function() {
		this.bullets.push(this.ship.addBullet(this))
	};
  
  Game.prototype.addShip = function() {
    var pos = [Game.DIM_X/2, Game.DIM_Y/2];
    var vel = [0,0];
    return new Asteroids.Ship(pos,vel, 10, "Black");
  };
    
  Game.prototype.draw = function() {
    var ctx = this.ctx;
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    this.asteroids.forEach(function(asteroid) {
      asteroid.draw(ctx);
    });
    this.bullets.forEach(function(bullet) {
      bullet.draw(ctx);
    });
    this.ship.draw(ctx);
  };
    
  Game.prototype.move = function() {
    this.asteroids.forEach(function(asteroid) {
      asteroid.move();
    });
    this.bullets.forEach(function(bullet) {
      bullet.move();
    });
    this.ship.move();
  };
    
  Game.prototype.step = function() {
    this.move();
    this.draw();
    this.checkCollisions();
    this.ship.decelerate();
  };
    
  Game.prototype.start = function() {
    var that = this;
    this.clock = setInterval(that.step.bind(that), Game.FPS);
  };
  
  Game.prototype.checkCollisions = function() {
		var game = this;

		 this.allObjects().forEach(function (obj1) {
			 var obj1 = obj1
		   game.allObjects().forEach(function (obj2) {
		     if (obj1 == obj2) {
		       // don't allow self-collision
		       return;
		     }
		     if (obj1.isCollidedWith(obj2)) {
		       obj1.collideWith(obj2);
		     }
		    });
		 });
  };
  
  Game.prototype.stop = function() {
    clearInterval(this.clock);
  };
  
  Game.prototype.bindKeyHandlers = function(){
    
  };
  
  
}) (this);