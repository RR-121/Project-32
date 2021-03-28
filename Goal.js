class Goal {
    constructor(x, y, width, height) {
        var options = {isStatic : true};
        this.body = Bodies.rectangle(x, y, width, height, options);
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    display(colour) {
        var pos = this.body.position;

        push();
        translate(pos.x, pos.y);
        fill(colour);
        rectMode(CENTER);
        rect(0, 0, this.width, this.height);
        pop();
    }
}