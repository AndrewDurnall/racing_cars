class Car {
    constructor(p) {
        this.x = (p && p.x) || 950;
        this.y = (p && p.y) || 0;
        this.height = (p && p.height) || 200;
        this.bodyColour = (p && p.bodyColour) || "orange";
        this.windowColour = (p && p.windowColour) || "green";
        this.xDirection = (p && p.xDirection) || 0;
        this.yDirection = (p && p.yDirection) || 0;
        this.number = (p && p.number) || 0;
    }

    draw() {
        let c = this.height / 23;
        //car body
        ctx.beginPath();
        ctx.fillStyle = this.bodyColour;
        ctx.lineWidth = c;
        //top
        ctx.moveTo(this.x + (c * 7), this.y + (c * 2));
        //back window
        ctx.lineTo(this.x + (c * 24), this.y + (c * 2));
        //back bumper
        ctx.lineTo(this.x + (c * 28), this.y + (c * 10));
        //bottom
        ctx.lineTo(this.x + (c * 28), this.y + (c * 14));
        //front bumper
        ctx.lineTo(this.x + (c * 0), this.y + (c * 14));
        //bonnet
        ctx.lineTo(this.x + (c * 0), this.y + (c * 7.7));
        //front window bottom
        ctx.lineTo(this.x + (c * 4), this.y + (c * 7));
        //front window top
        ctx.lineTo(this.x + (c * 7.3), this.y + (c * 1.8));
        ctx.fill();
        ctx.stroke();

        //front window
        ctx.beginPath();
        ctx.fillStyle = this.windowColour;
        //start
        ctx.moveTo(this.x + (c * 8), this.y + (c * 3.1));
        //left
        ctx.lineTo(this.x + (c * 5.5), this.y + (c * 7));
        //bottom
        ctx.lineTo(this.x + (c * 14), this.y + (c * 7));
        //right
        ctx.lineTo(this.x + (c * 14.6), this.y + (c * 3.1));
        //top
        ctx.lineTo(this.x + (c * 7.7), this.y + (c * 3.1));
        ctx.fill();
        ctx.stroke();

        //rear window
        ctx.beginPath();
        ctx.fillStyle = this.windowColour;
        //start
        ctx.moveTo(this.x + (c * 17), this.y + (c * 3.1));
        //left
        ctx.lineTo(this.x + (c * 16.4), this.y + (c * 7));
        //bottom
        ctx.lineTo(this.x + (c * 25), this.y + (c * 7));
        //right
        ctx.lineTo(this.x + (c * 23), this.y + (c * 3.1));
        //top
        ctx.lineTo(this.x + (c * 16.5), this.y + (c * 3.1));
        ctx.fill();
        ctx.stroke();

        //wheels
        //front
        this.drawCircle(this.x + (c * 7), this.y + (c * 14), c * 3.7);
        ctx.stroke();
        //inner axle
        this.drawCircle(this.x + (c * 7), this.y + (c * 14), c * 0.5);
        ctx.stroke();

        //back
        this.drawCircle(this.x + (c * 22), this.y + (c * 14), c * 3.7);
        ctx.stroke();
        //inner axle
        this.drawCircle(this.x + (c * 22), this.y + (c * 14), c * 0.5);
        ctx.stroke();
    
        //car number
        ctx.fillStyle = "black";
        ctx.strokeStyle = "white";
        ctx.lineWidth = 1.5;
        ctx.font = `${c * 7}px sans-serif`;
        ctx.textAlign = "center";
        ctx.fillText(this.number, this.x + (c * 15), this.y + (c * 13));
        ctx.strokeText(this.number, this.x + (c * 15), this.y + (c * 13));

        //resets the outlines of the car to black
        ctx.strokeStyle = "black";
    }

    drawCircle(x, y, size) {
        ctx.beginPath();
        ctx.fillStyle = "grey";
        ctx.arc(x, y, size, 0, 2 * Math.PI);
        ctx.fill();
    }

    move() {
        this.x += this.xDirection;
            //if car hits left side it wins
            if (this.x <= 0) {
                comment.innerText = "Car Number " + this.number + " Is The Winner, Press The \"Restart The Race\" Button To Start Again!";
                resetBtn.disabled = false;
                x = false;
            }
    }

}

const startBtn = document.getElementById("start");
const resetBtn = document.getElementById("reset");
let comment = document.getElementById("commentator");
let canvas = document.getElementById('canvas');
let ctx = canvas.getContext("2d");
let cars = [];
let x = true;

initialise();

startBtn.addEventListener("click", begin);
resetBtn.addEventListener("click", reset);

resetBtn.disabled = true;

function begin(){
    animateCar();
    startBtn.disabled = true;
    comment.innerText = "Look At Them GO!";
}

function animateCar() {
    let animation
    if (x == false) {
        cancelAnimationFrame(animation);
    }
    else{
    ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    //loop through cars array and animate them all
    for (let index = 0; index < cars.length; index++) {
    cars[index].draw();
    cars[index].move();
    cars[index].xDirection = random(0,-6);   
    }

    animation = requestAnimationFrame(animateCar);
    }
}

function random(min, max) {
    //return random value in range min - max
    return num = Math.floor(Math.random() * (max - min + 1)) + min;
}

function createCar(colors) {
    let body = 0;
    let window = 1;
    let position = 0;
    let carNum = 1;
    while (cars.length < 4) {
        car = new Car({
            y: position,
            xDirection:random(0,-6),
            bodyColour:"#" + colors[body].hex,
            windowColour:"#" + colors[window].hex,
            number: carNum,
        });

        position += 210;
        body++;
        window++;
        carNum++;
        cars.push(car);
    }

}

function initialise() {
    fetch("https://www.colr.org/json/colors/random/6")
        .then(function (response) {response.json()    
        .then(function (json) {
            createCar(json.colors);
            //loops through cars array to initially draw them.
            for (let index = 0; index < cars.length; index++) {
                cars[index].draw();
            }
        });
    });
}

function reset(){
    location.reload();
}