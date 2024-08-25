function drawLine(x0, y0, x1, y1, color) {
	x0 = floor(x0);
	x1 = floor(x1);
	y0 = floor(y0);
	y1 = floor(y1);
	var dx = Math.abs(x1 - x0),
		sx = x0 < x1 ? 1 : -1;
	var dy = Math.abs(y1 - y0),
		sy = y0 < y1 ? 1 : -1;
	var err = (dx > dy ? dx : -dy) / 2;

	while (true) {
		setPixel(x0, y0, color);
		if (x0 === x1 && y0 === y1) break;
		var e2 = err;
		if (e2 > -dx) {
			err -= dy;
			x0 += sx;
		}
		if (e2 < dy) {
			err += dx;
			y0 += sy;
		}
	}
}

function drawRect(x, y, w, h, col) {
	for (let xo = 0; xo < w; xo++) {
		for (let yo = 0; yo < h; yo++) {
			setPixel(x + xo, y + yo, col);
		}
	}
}

function drawCirclePart(xc, yc, x, y, col) {
	setPixel(xc + x, yc + y, col);
	setPixel(xc - x, yc + y, col);
	setPixel(xc + x, yc - y, col);
	setPixel(xc - x, yc - y, col);
	setPixel(xc + y, yc + x, col);
	setPixel(xc - y, yc + x, col);
	setPixel(xc + y, yc - x, col);
	setPixel(xc - y, yc - x, col);
}

// Function for circle-generation 
// using Bresenham's algorithm 
function drawCircle(xc, yc, r, col) {
	let x = 0,
		y = r;
	let d = 3 - 2 * r;
	drawCirclePart(xc, yc, x, y, col);
	while (y >= x) {
		// for each pixel we will 
		// draw all eight pixels 

		x++;

		// check for decision parameter 
		// and correspondingly  
		// update d, x, y 
		if (d > 0) {
			y--;
			d = d + 4 * (x - y) + 10;
		} else
			d = d + 4 * x + 6;
		drawCirclePart(xc, yc, x, y, col);
	}
}

function drawFilledCircle(xo,yo,r,col,fc=0){//optimise this +-2 is just a guess
	for (let y = -r - 2; y < r + 2; y++) {
		for (let x = -r - 2; x < r + 2; x++) {
			if(x*x+y*y<r*r+fc)
			setPixel(x + xo, y + yo, col);
		}
	}
}

function additive(x, y, col, it) {
	//print (col)
	let old = getPixel(x, y);
	let s = alpha(col) / 255;
	//print(old)
	if (old === undefined)
		return
	return color(red(col) * s + red(old), green(col) * s + green(old), blue(col) * s + blue(old));
}

function additive2(x, y, col, it) {
	//print (col)
	let old = getPixel(x, y);
	let s = alpha(col) / 255;
	//print(old)
	if (old === undefined)
		return

	let c = blue(col) * s + blue(old);
	let r = red(old);
	if (c > 255)
		r += c - 255
	return color(r, c, c);
}

function additive3(x, y, col, it) {
	//print (col)
	let old = getPixel(x, y);
	let s = alpha(col) / 255;
	//print(old)
	if (old === undefined)
		return

	let c = red(col) * s + red(old);
	let r = blue(old);
	if (c > 255)
		r += c - 255
	return color(c, r, r);
}

function additive4(x, y, col, it) {
	//print (col)
	let old = getPixel(x, y);
	let s = alpha(col) / 255;
	//print(old)
	if (old === undefined)
		return

	let r = red(col) * s + red(old);
	let g = green(col) * s + green(old);
	let b = blue(col) * s + blue(old);
	if (r > 255) {
		g += r - 255
		b += r - 255
	}
	if (g > 255) {
		r += g - 255
		b += g - 255
	}
	if (b > 255) {
		r += b - 255
		g += b - 255
	}
	return color(r, g, b);
}

function mirror(x, y, col, it) {
	if (pixelModeLong === false) {
		setPixel(x, 32 + 32 + 32 - 1 - y, col, it)
	} else
		setPixel(64 + 32 + 64 - 1 - x, y, col, it)
	return col
}

//i need to figure out how to stack these
function outline(x, y, col, it) {

}



function glitch(x, y, col, it) {
	if (glitch.mode === undefined) {
		glitch.mode = false;
		glitch.next = -1;
	}
	glitch.next--;

	if (glitch.next < 0) {
		glitch.next = glitch.mode ? random(1000, 2000) : random(100, 200);
		glitch.mode = !glitch.mode;
		glitch.h = random(-20, 20);
	}

	if (glitch.mode) {
		setPixel(x, y + glitch.h, col, it);
		return
	}
	return col;
}

function glitch2(x, y, col, it) {
	if (glitch2.next === undefined) {
		glitch2.next = -1;
	}

	glitch2.next--;
	if (glitch2.next < 0) {
		glitch2.next = random(200, 300) * 2
		glitch2.x = random(64 + 64 + 32);
		glitch2.y = random(32 + 32 + 32);
		glitch2.w = random(50, 100)
		glitch2.h = random(50, 100)
		glitch2.r = random(-20, 20)
		glitch2.rc = color(random(255), random(255), random(255))
	}

	if (x >= glitch2.x && x < glitch2.x + glitch2.w && y >= glitch2.y && y < glitch2.y + glitch2.h) {
		//col=color(red(glitch2.rc)-red(col),green(glitch2.rc)-green(col),blue(glitch2.rc)-blue(col))
		col = color(255 - red(col), 255 - green(col), 255 - blue(col))
		setPixel(x, y + glitch2.r, col, it)
		return
	}

	return col
}

function cbRando(x, y, col, it) {
	setPixel(x + (random() < 0.1), y + (random() < 0.1), col, it);
}

function cbSinR(x, y, col, it) {
	setPixel(x, y + sin(x / 10 + realTime) * 3, col, it)
}

function offset(offx, offy, x, y, col, it) {
	setPixel(x + offx, y + offy, col, it)
}

function offBind(x, y) {
	return offset.bind(null, x, y)
}

function copypx(x, y, col, it) {
	setPixel(x + 64 + 32, y, col, it);
	return col;
}

function squishV(scale, center, x, y, col, it) {
	setPixel(x, y - (y - center) * (1-scale), col, it)
	//setPixel(x,y*scale,col,it)
}

function squishH(scale, center, x, y, col, it) {
	setPixel(x - (x - center) * (1-scale),y , col, it)
	//setPixel(x,y*scale,col,it)
}

//scale 0= normal, 1=maximum scqish, 2= reversed normal
function bindSquishV(scale, center) {
	return squishV.bind(null, scale, center)
}

//h is 0 .. 1
function hue_to_rgb(h) {
	i = ~~(h * 6)
	f = (h * 6) - i;
	i %= 6
	if (i === 0) return [255, f * 255, 0]
	if (i === 1) return [255 - f * 255, 255, 0]
	if (i === 2) return [0, 255, f * 255]
	if (i === 3) return [0, 255 - f * 255, 255]
	if (i === 4) return [f * 255, 0, 255]
	if (i === 5) return [255, 0, 255 - f * 255]
}

function rot90CCW(x, y, col, it) {
	setPixel(y, 32 * 3 - 1 - x, col, it);
}

function maxc(x, y, col) {
	bgpx = getPixel(x, y, color(0, 0, 0));
	return color(max(red(bgpx), red(col)), max(green(bgpx), green(col)), max(blue(bgpx), blue(col)))
}

//needs long mode to work
function onlyFaceCenter(faceIndex,x,y,col,it){
	switch(faceIndex){
		case 0:
			x+=32;
			y+=16;
			if(x<0||x>=64||y<0||y>=32)
				return
			setPixel(x,y,col,it);
			break
		case 1:
			x+=64+16
			y+=-64+32
			if(x<64||x>=64+32||y<-64||y>=0)
				return
			setPixel(x,y,col,it);
			break
		case 2:
			x+=64+32+32
			y+=16
			if(x<64+32||x>=64+32+64||y<0||y>=32)
			  return
			setPixel(x,y,col,it)
			break
		case 3:
			x+=64+16
			y+=16
			if(x<64||x>=64+32||y<0||y>=32)
			  return
			setPixel(x,y,col,it)
			break;
	}
}

//needs long mode off to work
function bigFaceCenterCut(x,y,col,it){
	x+=32;
	y+=32+16
	//if(x>=64)
	//  return
	setPixel(x,y,col,it)
}

function drawSimpleFilledTriangle(x,y,w,h,col){
	cbpush(function(xc,yc,col,it){setPixel(x-(xc-x),yc,col,it);return col})
	cbpush(function(xc,yc,col,it){while(yc<y+h){setPixel(xc,yc,col,it);yc++}})
	drawLine(x,y,x+w,y+h,col);
	cbpop(2)
}




//color(red(col), green(col), blue(col))












//