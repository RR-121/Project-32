class Catapult {
    constructor(bodyA, pointB) {
        var options = {bodyA : bodyA, pointB : pointB,  stiffness : 0.04, length : 8};
        this.pointB = pointB;
        this.sling = Constraint.create(options);
        this.image1 = loadImage("images/sling1.png");
        this.image2 = loadImage("images/sling2.png");
        World.add(world, this.sling);
    }

    attach(body) {
        this.sling.bodyA = body;
    }

    fly() {
        this.sling.bodyA = null;
    }

    display() {
        var pointB = this.pointB;

        image(this.image1, pointB.x, pointB.y-20, 40, 120);
        image(this.image2, pointB.x-27, pointB.y-20, 40, 70);
        image(this.image1, pointB.x, pointB.y-20, 40, 120);
        image(this.image2, pointB.x-27, pointB.y-20, 40, 70);
        if(this.sling.bodyA) {
            var pointA = this.sling.bodyA.position;
            push();
            if(pointB.x < 700) {
                stroke("blue");
                strokeWeight(4);
                line(pointA.x, pointA.y, pointB.x-10, pointB.y);
                line(pointA.x, pointA.y, pointB.x+30, pointB.y);
            }
            else {
                stroke("red");
                strokeWeight(4);
                line(pointA.x, pointA.y, pointB.x-10, pointB.y);
                line(pointA.x, pointA.y, pointB.x+30, pointB.y);
            }
            pop();
        }
    }
}