//based off this https://www.google.com/imgres?imgurl=https://cdn.dribbble.com/users/722246/screenshots/2273454/night_hill.gif&imgrefurl=https://dribbble.com/shots/2273454-Night-Hill-Animated&tbnid=DDDNzuI7EqUwYM&vet=1&docid=ID8XsBU11qP1GM&w=800&h=600&itg=1&hl=de-CH&source=sh/x/im

let htMoon = {
	x: 64 + 16,
	y: -32
}
const htc1 = {
	r: 12,
	g: 140,
	b: 165
};
const htc2 = {
	r: 22,
	g: 68,
	b: 101
};
let htops;
let htstars = []

function htSetup() {
	while (htstars.length < 20) {
		htstars.push({
			x: random(1, 63),
			y: random(-64 + 16 - 5, 32 - 16 + 5),
			to: random(2 * PI)
		})
	}

	for (let i = 0; i < 3; i++){ //put 3 stars in the front plate
		htstars.push({
			x: random(64, 64 + 32),
			y: random(0, 16),
			to: random(2 * PI)
		})
	}
}

function drawHillTop(t) {
	//htMoon={x:mouseX,y:mouseY-100}
	//htMoon={x:91,y:84-100}
	htMoon = {
		x: 64 + 16,
		y: 84 - 100
	}
	htops = sin(t / 1.5)
	pixelModeLong = true;

	drawHTStars(t)
	cbpush(function(x, y, col) {
		let v = (~~((200 + htops * 12 - sqrt(sqd(x - htMoon.x - red(col), y - htMoon.y))) / 20)) * 20
		return color(
			map(v, 0, 200 - 50, htc2.r, htc1.r),
			map(v, 0, 200 - 50, htc2.g, htc1.g),
			map(v, 0, 200 - 50, htc2.b, htc1.b)
		)
	})
	cbpush(function filldownsb(x, y, col, it) {
		while (y < 32) {
			setPixel(x, y, col, it);
			y++;
		}
	})
	drawHTHill(0, 16, 1.3, 100);
	drawHTHill(64 + 64 + 32, 16, 1.3, 200);
	drawHTHill(64 + 16, 15, 1.1, 0);
	cbpop(2)

	pixelModeLong = false;
	drawHTMGlow();
	pixelModeLong = true;
	drawHTmoon()
	dTreeHT(9,23-23);
	dTreeHT(39,27-23);
	dTreeHT(78,23-23);
	dTreeHT(121,27-23);
	dTreeHT(153,23-23);
	pixelModeLong = false;
}

function drawHTHill(x, y, f, c) {
	let xs = x;
	let leftover = 0;
	for (let w = 10; y < 32; w /= f, y++) {
		let i;
		for (i = 1; i < w + leftover; i++, x++) {
			setPixel(x, y, c);
			setPixel(xs - (x - xs), y, c);
		}
		leftover = fract(w + leftover);
	}
}

function drawHTmoon() {
	drawFilledCircle(64 + 16, -30, 7, "white")
	drawRect(64+16-2,-30+3,2,3,225)
	drawRect(64+16+2,-30+1,3,2,215)
	drawRect(64+16,-30-3,2,2,  200)
	drawRect(64+16-3,-30-4,1,2,220)
	drawRect(64+16-3+1,-30-4+2+2,1,1,210)
}

function drawHTMGlow() {
	let mx = 64 - 30
	let my = 32 + 15
	cbpush(additive)
	cbpush(function(x, y, col) {
		let v = (30 + htops * 2 - sqrt(sqd(mx - x, my - y))) / 30
		v = (~~(v * 5)) / 5
		//return v-red(getPixel(x,y))
		//return color(255,255,255,v)
		return color(v * 76, v * 163, v * 180)
	})
	drawFilledCircle(mx, my, 30)
	cbpop(2)
}

function drawHTStars(t) {
	cbpush(additive)
	for (let i = 0; i < htstars.length; i++) {
		let v = sin(htstars[i].to + t) * 255;
		setPixel(htstars[i].x, htstars[i].y, v);
		setPixel(htstars[i].x + 1, htstars[i].y, v - 90);
		setPixel(htstars[i].x - 1, htstars[i].y, v - 90);
		setPixel(htstars[i].x, htstars[i].y + 1, v - 90);
		setPixel(htstars[i].x, htstars[i].y - 1, v - 90);
	}
	cbpop()
}

function dTreeHT(x,y){
	let c=color(4, 37, 70);
	drawSimpleFilledTriangle(x,y+6+6,6,7,color(4+6, 37+20, 70+20));
	drawSimpleFilledTriangle(x,y+6,5,7,color(4, 37+10, 70+10));
	drawSimpleFilledTriangle(x,y,3,7,color(4, 37, 70));
	drawRect(x-1,y+6+6+7,2,4,color(4, 37, 70))
}












//