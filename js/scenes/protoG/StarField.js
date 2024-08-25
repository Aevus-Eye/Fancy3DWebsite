const chunkSize = 16;
const mwbc = 64 / chunkSize;
const mhbc = 32 * 3 / chunkSize;

let usedHack = {}

function drawLine3d(p1, p2, col) {
	//callback = function(x, y, col) {

	//}
}

function starOffset(cid) {
	return {
		x: noise(cid.x, cid.y, realTime/2) * 2 /* * sin(time)*/ ,
		y: noise(cid.x + 100, cid.y, realTime/2 ) * 2 /* * cos(time)*/ ,
	};
}

function starPos(cid) {
	off = starOffset(cid);
	return {
		x: (cid.x + off.x) * chunkSize,
		y: (cid.y + off.y) * chunkSize,
	};
}

function drawStar(cid) {
	let cur = starPos(cid);
	for (let x = -1; x <= 1; x++) {
		for (let y = -1; y <= 1; y++) {
			if (x === y && x === 0)
				continue;

			let other = starPos({
				x: cid.x + x,
				y: cid.y + y
			});

			//if(distsq(cur,other)<16*16)
			let d = sqrt(distsq(cur, other));
			let a = map(d, 0, 16, 255, 0);

			//let ti={p1:cur,p2:other};
			//print(usedHack[ti]);
			//if(!usedHack[ti]){
			//	usedHack[ti]=true;
			drawLine(cur.x, cur.y, other.x, other.y, color(255, 255, 0, a));
			//}

		}
	}
	setPixel(cur.x, cur.y, "white");
}

function distsq(p1, p2) {
	return (p1.x - p2.x) * (p1.x - p2.x) + (p1.y - p2.y) * (p1.y - p2.y);
}

class StarFieldEffect {
	constructor() {}

	getoffset(x, y) {
		return {
			x: noise(x / chunkSize, y / chunkSize),
			y: noise(x / chunkSize + 10, y / chunkSize)
		}
	}

	update() {
		usedHack = {};
		
		cbpush(additive)
		
		//callback = function(x, y, col) {
		//	if (x < 0 || x >= mW + mH || y < 0 || y >= mW + mH)
		//		return "black";
		//	//print(col);
		//	return additive(x, y, col);
		//	//return '#' + floor(noise(x * 0.01, y * 0.01) * 0xfff).toString(16) //interesting visuals, keep this in mind
		//	//return [x/64*255,y/32/3*255,0,255];
		//}

		for (let x = 0; x < mwbc; x++) {
			for (let y = 0; y < mhbc; y++) {
				drawStar({
					x: x,
					y: y
				});

			}
		}
		//drawLine(10, 32 + 16, 63, 32 + 16 + sin(time * 10) * 30, "magenta");
		//callback = null;
		cbpop()
	}
}




















//