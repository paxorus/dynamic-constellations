const DISTANCE_THRESHOLD = 50;

class Canvas {
	constructor(elementId) {
		const canvas = document.getElementById(elementId);
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;

		this.canvas = canvas;
		this.ctx = canvas.getContext("2d");
	}

	clear() {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
	}

	drawPoint(point) {
		this.ctx.beginPath();
		this.ctx.fillStyle = "#0088ff";
		this.ctx.arc(point.x, point.y, point.RADIUS, 0, 2 * Math.PI);
		this.ctx.fill();
	}

	drawLine(point, other, distance) {
		this.ctx.beginPath();
		this.ctx.strokeStyle = this.temperature(distance);
		this.ctx.moveTo(point.x, point.y);
		this.ctx.lineTo(other.x, other.y);
		this.ctx.stroke();
	}

	temperature(distance) {
		// 0 to 75 pixels is red to blue. 255-0-0 to 0-204-255.
		const red = Math.floor(255 * (1 - distance / DISTANCE_THRESHOLD));
		const green = Math.floor(204 * distance / DISTANCE_THRESHOLD);
		const blue = Math.floor(255 * distance / DISTANCE_THRESHOLD);
		return "rgb(" + red + "," + green + "," + blue + ")";
	}
}

class Point {
	constructor() {
		this.SPEED = 0.5;
		this.ANGULAR_SPEED = 0.1;
		this.RADIUS = 1;

		this.x = Math.floor(Math.random() * window.innerWidth);
		this.y = Math.floor(Math.random() * window.innerHeight);
		this.theta = Math.random() * 2 * Math.PI;
	}

	move() {
		this.theta += this.ANGULAR_SPEED * (2 * Math.random() - 1);
		// console.log(Math.sin(this.theta));
		this.x = (this.x + this.SPEED * Math.cos(this.theta) + window.innerWidth) % window.innerWidth;
		this.y = (this.y + this.SPEED * Math.sin(this.theta) + window.innerHeight) % window.innerHeight;
	}

	distanceTo(other) {
		return Math.sqrt(Math.pow(this.x - other.x, 2) + Math.pow(this.y - other.y, 2));
	}
}

const NUM_POINTS = 200;
let status = "alive";

const canvas = new Canvas("canvas");

const points = [];
for (let i = 0; i < NUM_POINTS; i ++) {
	points.push(new Point());
}

function animate() {
	canvas.clear();
	for (let point of points) {
		point.move();
		canvas.drawPoint(point);

		for (let other of points) {
			const distance = point.distanceTo(other);
			if (distance < DISTANCE_THRESHOLD) {
				canvas.drawLine(point, other, distance);
			}
		}
	}

	if (status == "alive") {
		window.requestAnimationFrame(animate);
	}
}
animate();

function kill() {
	status = "dead";
}
