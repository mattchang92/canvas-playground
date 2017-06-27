// Initial Setup
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;


// Variables
let mouse = {
	x: innerWidth / 2,
	y: innerHeight / 2
};

const colors = [
	'#2185C5',
	'#7ECEFD',
	'#FFF6E5',
	'#FF7F66'
];


// Event Listeners
addEventListener("mousemove", function(event) {
	mouse.x = event.clientX;
	mouse.y = event.clientY;
});

addEventListener("resize", function() {
	canvas.width = innerWidth;
	canvas.height = innerHeight;

	init();
});


// Utility Functions
function randomIntFromRange(min,max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomColor(colors) {
	return colors[Math.floor(Math.random() * colors.length)];
}


// Objects
function Circle(x, y, radius, color) {
	this.x = x;
	this.y = y;
	this.radius = radius;
	this.color = color;

	this.update = function() {

		this.draw();
	};

	this.followMouse = function(obj) {
		if (this.isTouching(obj)) {
			this.color = 'red';
			obj.color = 'red';
		} else {
			this.color = 'blue';
			obj.color = 'blue';
		}
		this.x = mouse.x;
		this.y = mouse.y - this.radius;
		this.draw();
	};

	this.isTouching = (obj) => (
		distance((obj.x - this.x), (obj.y - this.y)) < (this.radius + obj.radius)
	)

	this.draw = function() {
		c.beginPath();
		c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
		c.fillStyle = this.color;
		c.fill();
		c.closePath();
	};
}

const distance = (x, y) => {
	x = parseInt(x);
	y = parseInt(y);
	return Math.sqrt((x * x) + (y + y));
}

let circle1;
let circle2;

// Implementation
function init() {
	circle1 = new Circle(300,300,80, 'blue');
	circle2 = new Circle(500,500,80, 'blue');
	// circle.draw();
}

// Animation Loop
function animate() {
	requestAnimationFrame(animate);
	c.clearRect(0, 0, canvas.width, canvas.height);
	// c.fillText("HTML CANVAS BOILERPLATE", mouse.x, mouse.y);
	circle1.update();
	circle2.followMouse(circle1);
}

init();
animate();
