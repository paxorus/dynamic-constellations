class Point {
	constructor() {
		this.SPEED = 1;
		this.ANGULAR_SPEED = 0.1;

		this.x = Math.floor(Math.random() * window.innerWidth);
		this.y = Math.floor(Math.random() * window.innerHeight);
		this.theta = Math.random() * 2 * Math.PI;
		
		const div = document.createElement("div");
		div.className = "point";
		document.body.appendChild(div);
		this.div = div;
	}

	move() {
		this.theta += this.ANGULAR_SPEED * (2 * Math.random() - 1);
		this.x = (this.x + this.SPEED * Math.cos(this.theta) + window.innerWidth) % (window.innerWidth - 1);
		this.y = (this.y + this.SPEED * Math.abs(Math.sin(this.theta)) + window.innerHeight) % (window.innerHeight - 1);
		this.div.style.left = this.x + "px";
		this.div.style.top = this.y + "px";
	}
}

const NUM_POINTS = 1000;
let status = "alive";

const points = [];
for (let i = 0; i < NUM_POINTS; i ++) {
	points.push(new Point());
}

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");


function animate() {
	for (let point of points) {
		point.move();
	}
	if (status == "alive") {
		window.requestAnimationFrame(animate);
	}
}
animate();

function kill() {
	status = "dead";
}
