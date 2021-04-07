class Ball {
    constructor(x, y) {
        var options = {restitution : 1, density : 5, friction : 0.9, isStatic : false};
        this.body = Bodies.circle(x, y, 25, options);
        this.x = x;
        this.y = y;
        this.radius = 25;
        World.add(world, this.body);
        this.visibility = 255;
    }
    display(colour) {
        var pos = this.body.position;

        fill(colour);
        ellipseMode(CENTER);
        ellipse(pos.x, pos.y, 50, 50);

        if(this.body.speed < 1 && pos.x > 20 && pos.x < 270 && pos.y < 250 && pos.y > 180) {
            push();
            this.visibility = this.visibility - 5;
            tint(255, this.visibility);
            pop();
            if(this.visibility < 0 && this.visibility > -20/3)
            ReScore = ReScore + 10;
        }

        else if(this.body.speed < 1 && pos.x > 1120 && pos.x < 1370 && pos.y < 250 && pos.y > 180) {
            push();
            this.visibility = this.visibility -5;
            tint(255, this.visibility);
            pop();
            if(this.visibility < 0 && this.visibility > -20/3)
            BlScore = BlScore + 10;
        }
    }
}