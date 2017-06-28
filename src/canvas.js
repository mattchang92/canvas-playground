
// Initial Setup
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
const addNewBtn = document.getElementById('do-add-ball');
const addAtomBtn = document.getElementById('do-add-atom');
const makeBubblesBtn = document.getElementById('do-make-bubbles');
const clearCanvasBtn = document.getElementById('do-clear-canvas');


canvas.width = innerWidth;
canvas.height = innerHeight * 0.975;


// Variables
let mouse = {
	x: innerWidth / 2,
	y: innerHeight / 2
};
const Circle = require('./models/circle')(canvas, c, mouse);
const Atom = require('./models/atom')(canvas, c);
const Bubble = require('./models/bubble')(canvas, c, mouse);

const colors = [
	'#2185C5',
	'#7ECEFD',
	'#FFF6E5',
	'#FF7F66'
];

const GRAVITY = 0.4;
const FRICTION = 0;
// const FRICTION = 0.1;


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

let circle1;
let circle2;
let circles = [];
let atom;
let timer = 0;
let makeBubbles = false;
let bubbles = [];
// Implementation
function init() {
	addNewBtn.addEventListener('click', () => {
		circles.push(new Circle(100,100,80, 'blue'));
	})

	addAtomBtn.addEventListener('click', () => {
		atom = new Atom(canvas.width/2, canvas.height/2, 10, '#F2F3F4')
	})

	makeBubblesBtn.addEventListener('click', () => {
		makeBubbles = true;
	})
	// atom = new Atom(canvas.width/2, canvas.height/2, 10, '#F2F3F4')

	clearCanvasBtn.addEventListener('click', () => {
		circles = [];
		atom = null;
		makeBubbles = false;
	})

}

// Animation Loop
function animate() {
	timer++;
	requestAnimationFrame(animate);
	c.clearRect(0, 0, canvas.width, canvas.height);
	// c.fillText("HTML CANVAS BOILERPLATE", mouse.x, mouse.y);
	// circle1.update();
	// circle2.followMouse(circle1);
	circles.forEach((circle) => {
		circle.update();
	});

	if (circles.length > 1) {
		for (let i = 0; i < circles.length - 1; i++) {
			for (let j = i + 1; j < circles.length; j++) {
				circles[i].detectCollision(circles[j]);
			}
		}
	}

	circles.forEach((circle) => {
		circle.collisionUpdated = false;
	})

	if (atom) atom.update(timer);

	if (makeBubbles) {
		const randColor = Math.floor(3 * Math.random());

		bubbles.push(new Bubble(50, randColor));
		bubbles.forEach((bubble) => {
			bubble.update();
			if (bubble.destroy()) {
				bubbles.shift();
			}
		})

	}
}

init();
animate();
