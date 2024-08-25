//idea stolen from here https://www.reddit.com/r/generative/comments/kjsdtv/black_sun/?utm_medium=android_app&utm_source=share 
let blsu;

function initBlackSun() {
	blsu = []
	const mountainCount = 20;
	for (let i = 0; i < mountainCount; i++)
	{
		blsu.push({
			tm: map(i, 0, mountainCount - 1, 10, 30),
			y: random(0, 25),
			x: random(0, 200),
			m: random(1, 0.4),
		})
	}
}

function drawBlackSun(t) {
	pixelModeLong = true
	
	cbpush(mirror)
	drawSun(32-6, 14, 15,t);
	cbpop()

	//drawHill(64+16,31-16, 1, color(200,255,255))
	
	for (let i = 0; i < blsu.length; i++) {
		let c = color(map(i, 0, blsu.length - 1, 100, 255))
		drawHill(((t * blsu[i].tm + blsu[i].x) % 200) - 20, blsu[i].y, blsu[i].m, c)
	}

	pixelModeLong = false
}

function drawHill(x, y, m, c) {
	cbpush(fillHillcb)
	let d = floor((31 - y) * m)
	drawLine(x, y, x + d, 31, c)
	drawLine(x, y, x - d, 31, c)

	cbpop()
}

function fillHillcb(x, y, col, it) {
	//col="white"
	//let cop=color(red(col), green(col), blue(col))
	const decreaseAmount = 40
	for (; y < 32; y++) {
		setPixel(x, y, col, it)
		col = color(red(col) - decreaseAmount, green(col) - decreaseAmount, blue(col) - decreaseAmount)
		//col = "black"
	}
	//return col;
}

function drawSun(xo, yo, r, t) {
	for (let y = -r - 2; y < r + 2; y++) {
		for (let x = -r - 2; x < r + 2; x++) {
			//let col ="white" /*color((r-sqrt(x * x + y * y))/r*255)*/
			//let col =color((r-sqrt(x * x + y * y)+5)/r*255)
			let col =color((r*r-x * x - y * y)*1.5)
			
			if(x*x+y*y<r*r && map(atan2(x,y)+t/2,-PI,PI, 0, 20)%4<1)
		  	setPixel(x + xo, y + yo, col);
		}
	}
	
	r=4
	drawFilledCircle(xo,yo,r,"black")
	drawCircle(xo,yo,r,"white")
}












//