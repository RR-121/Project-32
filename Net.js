class Net {
    constructor(x, y) {
        var options = {isStatic : true};
        this.body = Bodies.rectangle(x, y, 7, 120, options);
        this.x = x;
        this.y = y;
        this.width = 7
        this.height = 120;
        World.add(world, this.body);
    }
    display(colour) {
        var position = this.body.position;

        push();
        translate(position.x, position.y);
        fill(colour);
        rectMode(CENTER);
        rect(0, 0, 7, 120);
        pop();
    }
}