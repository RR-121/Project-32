class Sling {
    constructor(bodyA, pointB) {
        var options = {bodyA : bodyA, pointB : pointB, stiffness : 0.01, length : 8};
        this.pointB = pointB;
        this.sling = Constraint.create(options);
    }
    display() {
        
    }
}