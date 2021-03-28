class Ground {
    constructor(x, y) {
        var options = {isStatic : true};
        this.body = Bodies.rectangle(x, y, 1400, 10, options);
        this.x = x;
        this.y = y;
        this.width = 1400;
        this.height = 10;
        World.add(world, this.body);
    }
    display(colour) {
        var pos = this.body.position;
        
        push();
        translate(pos.x, pos.y);
        fill(colour);
        rectMode(CENTER);
        rect(0, 0, 1400, 10);
        pop();
    }
}