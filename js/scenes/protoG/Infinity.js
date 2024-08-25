
oats = []
pCount = 200;
pWisps = 40;

//tents=[]

function infSetup() {

	for (var i = 0; i < pCount; i++) {
		oats.push({
			x: random(-2, 2),
			y: random(-2, 2),
			ts: random(0.3, 1) /*map(i, 0, pCount, 0.3, 1)*/ ,
		});
	}
}


function infDraw(time) {
	cbpush(additive2);
	let col = color(0, 255, 255);
	for (var i = 0; i < pCount; i++) {
		p = GetPoint(time * oats[i].ts);

		p.x = p.x * 25 + 16 + oats[i].y; //+sin(time*20*oats[i].ts)*r;
		p.y = p.y * 25 + 32 + oats[i].x; //+cos(time*20*oats[i].ts)*r;

		//let x=floor(p.y);
		//let y=floor(p.x);
		let y = p.x + 32;
		let x = p.y;

		if (i < pCount - pWisps) {
			col.setAlpha(map(i, 0, pCount, 0, 200))
			setPixelSmooth(x, y, /*map(i, 0, pCount, 0, 80)*/ col);
		}
		//setPixel(x, y, map(i, 0, pCount, 0, 80));
		else {
			col.setAlpha(255);
			setPixelSmooth2(x + cos(time * 50 * oats[i - 1].ts) * 4, y + sin(time * 30 * oats[i - 1].ts) * 4, col);
		}
	}
	cbpop()
}

function setPixelSmooth(x, y, b) {
	let fx = floor(x);
	let fy = floor(y);
	let na = alpha(b);

	b.setAlpha(na * (1 - (x - fx)) * (1 - (y - fy)))
	setPixel(fx + 0, fy + 0, b);
	b.setAlpha(na * (0 + (x - fx)) * (1 - (y - fy)))
	setPixel(fx + 1, fy + 0, b);
	b.setAlpha(na * (1 - (x - fx)) * (0 + (y - fy)))
	setPixel(fx + 0, fy + 1, b);
	b.setAlpha(na * (0 + (x - fx)) * (0 + (y - fy)))
	setPixel(fx + 1, fy + 1, b);
}

function setPixelSmooth2(x, y, b) {
	let fx = floor(x);
	let fy = floor(y);
	let na = alpha(b)*2;

	b.setAlpha(na * (1 - (x - fx)) * (1 - (y - fy)))
	setPixel(fx + 0, fy + 0, b);
	b.setAlpha(na * (0 + (x - fx)) * (1 - (y - fy)))
	setPixel(fx + 1, fy + 0, b);
	b.setAlpha(na * (1 - (x - fx)) * (0 + (y - fy)))
	setPixel(fx + 0, fy + 1, b);
	b.setAlpha(na * (0 + (x - fx)) * (0 + (y - fy)))
	setPixel(fx + 1, fy + 1, b);
}

/*function setPixel(x, y, b) {
	x = floor(x);
	y = floor(y);
	b += cells[x + y * nbCellW];
	cells[x + y * nbCellW] = b;
	fill(171, 100, min(b, 100));
}*/

table = [{
		x: 0.08431941989052964,
		y: 0.9909155837118377
	},
	{
		x: 0.23769524355970442,
		y: 0.9210706809461855
	},
	{
		x: 0.34630976995732116,
		y: 0.7923652320063921
	},
	{
		x: 0.38842427635612337,
		y: 0.6291506244861089
	},
	{
		x: 0.36344399265383903,
		y: 0.46204288827079215
	},
	{
		x: 0.28863453992205634,
		y: 0.3100360008846108
	},
	{
		x: 0.18335539616692037,
		y: 0.1769102555288807
	},
	{
		x: 0.06266072355176594,
		y: 0.057372823961376405
	}, //8

];

//time 0..4
function GetPoint(time) {
	t = time * table.length * 4;
	f = floor(t);
	p1 = GetTableEntry(f);
	p2 = GetTableEntry(f + 1);

	return PLerp(p1, p2, t - f);
}

function GetTableEntry(entry) {
	entry = entry % (table.length * 4);
	switch (floor(entry / table.length)) {
		case 0:
			return table[entry];
		case 1:
			p = table[table.length - entry % (table.length) - 1];
			return {
				x: -p.x,
					y: -p.y
			};
		case 2:
			p = table[entry % (table.length)];
			return {
				x: p.x,
					y: -p.y
			};
		case 3:
			p = table[table.length - entry % (table.length) - 1];
			return {
				x: -p.x,
					y: p.y
			};
	}
}

function PLerp(p1, p2, t) {
	return {
		x: lerp(p1.x, p2.x, t),
		y: lerp(p1.y, p2.y, t),
	}
}














//