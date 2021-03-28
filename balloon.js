class Balloon {
    constructor(x, y, radius) {
        var options = {restitution : 0, density : 0.3, friction : 0.9, isStatic : false};
        this.body = Bodies.circle(x, y, 25, options);
        this.x = x;
        this.y = y;
        this.radius = 25;
        World.add(world, this.body);
    }
    display(colour) {
        var pos = this.body.position;

        fill(colour);
        ellipseMode(CENTER);
        ellipse(pos.x, pos.y, 50, 50);
    }
}