let directions = [];
let wireCol;
let wireWispCol;

class PCBWire {
	constructor() {
		let startPoint=createVector(random(1,63),random(1,32*3-1));
		
		this.path = [startPoint];
		let length = random(5, 30);
		let dir = floor(random(directions.length));
		for (let i = 0; i < length; i++) {
			this.path.push(p5.Vector.add(this.path[i], directions[dir]));
		}
		
		let isOob=function(p){return p.x<1||p.x>=63||p.y<1||p.y>=32*3-1}
		this.path=this.path.filter(p => !isOob(p))
	}

	update() {
		for (let i = 0; i < this.path.length; i++) {
			setPixel(this.path[i].x, this.path[i].y, wireCol);
		}
		this.drawVia(this.path[0]);
		this.drawVia(this.path[this.path.length - 1]);
	}
	
	drawVia(pos) {
		setPixel(pos.x + 1, pos.y, wireCol);
		setPixel(pos.x - 1, pos.y, wireCol);
		setPixel(pos.x, pos.y + 1, wireCol);
		setPixel(pos.x, pos.y - 1, wireCol);

		setPixel(pos.x, pos.y, 0);
	}
}

//todo: maybe store the extras here
class PCBEffect {
	constructor() {
		this.wires = [];
		for (let i = 0; i < 20; i++)
			this.wires.push(new PCBWire());
	}
	showWires() {
		this.wires.forEach(function(w) {
			w.show()
		});
	}

	update() {
		this.wires.forEach(function(w) {
			w.update()
		});
	}
}









//