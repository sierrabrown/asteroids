(function(root) {
    var Asteroids = root.Asteroids = (root.Asteroids || {});
    var MovingObject = Asteroids.MovingObject;

    var Bullet = Asteroids.Bullet = function(pos, vel, radius) {
      var COLOR = "Blue";
      MovingObject.call(this, pos, vel, radius, COLOR);
    };
    
    Bullet.inherits(MovingObject);
  
}) (this);