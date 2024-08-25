let tttf = [
	[0, 0, 0],
	[0, 0, 0],
	[0, 0, 0]
]
let x, y

function tttReset() {
	tttf =
		/*[
		[1, 2, 1],
		[1, 1, 2],
		[1, 2, 1]
	]*/
		[
			[0, 0, 0],
			[0, 0, 0],
			[0, 0, 0]
		]
	x = y = 1
}

function tttDraw() {
	const s = 10;
	const col = 'white'

	pixelModeLong = true;
	cbpush(copypx)
	cbpush(offBind(17, 3))
	//cbpush(function(x, y, col, it) { //draw the board on the front plate (its not centered ahhhhhhhhhhh)
	//	setPixel(x + 32+17, y, col, it);
	//	return col;
	//})

	cbpush(offBind(-2, -2))
	drawRect(1, s, s * 3 - 1, 1, col);
	drawRect(1, s * 2, s * 3 - 1, 1, col);
	drawRect(s, 1, 1, s * 3 - 1, col);
	drawRect(s * 2, 1, 1, s * 3 - 1, col);
	cbpop()

	for (let y = 0; y < 3; y++)
		for (let x = 0; x < 3; x++) {
			cbpush(offBind(s * x, s * y))
			tttDS(tttf[y][x])
			cbpop()
		}

	cbpush(offBind(-2, -2))
	tttCheckForWin()
	cbpop()

	cbpop(3)
	pixelModeLong = false;
}

function tttDS(symbol) {
	let col = "white"
	if (symbol === 1) {
		drawLine(0, 0, 6, 6, col)
		drawLine(0, 6, 6, 0, col)
	} else if (symbol === 2) {
		drawCircle(3, 3, 3, col)
	}
}

function tttSet(x, y, sym) {
	tttf[y][x] = sym
}

function tttCheckForWin() {
	const s = 10;
	const col = color(255, 20, 30, map(sin(realTime  * 2), -1, 1, 100, 200))
	cbpush(function(x, y, col, it) {
		setPixel(x + 1, y, col, it);
		setPixel(x, y + 1, col, it);
		setPixel(x - 1, y, col, it);
		setPixel(x, y - 1, col, it);
		return col;
	})

	for (let x = 0; x < 3; x++) {
		if (tttf[0][x] === 0)
			continue;
		if (tttf[0][x] === tttf[1][x] && tttf[0][x] === tttf[2][x])
			drawLine(s * x + s / 2, 2, s * x + s / 2, s * 3 - 2, col);
		//return x;
	}
	for (let y = 0; y < 3; y++) {
		if (tttf[y][0] === 0)
			continue;
		if (tttf[y][0] === tttf[y][1] && tttf[y][0] === tttf[y][2])
			drawLine(2, s * y + s / 2, s * 3 - 2, s * y + s / 2, col);
		//return y + 3;
	}
	if (tttf[1][1] !== 0) {
		if (tttf[0][0] === tttf[1][1] && tttf[0][0] === tttf[2][2])
			drawLine(2, 2, s * 3 - 2, s * 3 - 2, col);
		//return 6;
		if (tttf[2][0] === tttf[1][1] && tttf[2][0] === tttf[0][2])
			drawLine(2, s * 3 - 2, s * 3 - 2, 2, col);
		//return 7;
	}
	cbpop()
	//return -1;
}






















//