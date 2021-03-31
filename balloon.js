class Balloon {
    constructor(x, y) {
        var options = {restitution : 0, density : 1.3, friction : 0.9, isStatic : false};
        this.body = Bodies.circle(x, y, 25, options);
        this.x = x;
        this.y = y;
        this.radius = 25;
        World.add(world, this.body);
        this.trajectory = [];
    }
    display(colour) {
        var pos = this.body.position;

        fill(colour);
        ellipseMode(CENTER);
        ellipse(pos.x, pos.y, 50, 50);

        if(this.body.velocity.x > 15 && pos.y < 430 && pos.y > 0 && pos.x > 180 && pos.x < 1220){
            var position = [pos.x, pos.y];
            this.trajectory.push(position);
        }

        else if(this.body.velocity.x < -15 && pos.y < 430 && pos.y > 0 && pos.x > 180 && pos.x < 1220){
            var position = [pos.x, pos.y];
            this.trajectory.push(position);
        }

        for(var i = 0; i < this.trajectory.length; i++) {
            fill("white");
            ellipse(this.trajectory[i][0], this.trajectory[i][1], 5, 5);
        }
    }
}