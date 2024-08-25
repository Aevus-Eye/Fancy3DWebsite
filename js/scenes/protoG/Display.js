let cbstack = []
let rb;

function cbpush(fn) {
	cbstack.push(fn)
}

function cbpop(amount = 1) {
	for (let i = 0; i < amount; i++)
		cbstack.pop();
}

function resetArrays() {
	pxls = Array(mW * mH * 3.5).fill(color(0));
	//xtrs = Array(mW * mH * 3.5).fill(0);
	if (cbstack.length !== 0) {
		print("cbstack not fully poped")
		cbstack = []
	}
}

function setPixel(x, y, col, cbstackiteration = 0) {
	x = floor(x)
	y = floor(y)



	for (; cbstackiteration < cbstack.length; cbstackiteration++) {
		//if (frame === 10) {
		//	print("1", {
		//		x: x,
		//		y: y,
		//		it: cbstackiteration,
		//		col: col,
		//	})
		//}
		col = cbstack[cbstack.length - 1 - cbstackiteration](x, y, col, cbstackiteration + 1);
		if (!col)
			return
	}
	//if (frame === 10)
	//	print("2", {
	//		x: x,
	//		y: y,
	//		it: cbstackiteration,
	//		col: col,
	//	})
	//if (callback) {
	//col = callback(floor(x), floor(y), col);
	//}
	__setPixelNC(x, y, col);
}

function __setPixelNC(x, y, col) {
	let index = coordToIndex(x, y);
	if (index === undefined || col === undefined)
		return;
	if (!(col instanceof p5.Color))
		col = color(col);

	//handle alpha
	if (!pxls[index] || !col) //saftey checks for testing, should not be needed
		return;

	col = lerpColor(pxls[index], col, alpha(col) / 255);
	col.setAlpha(255);
	pxls[index] = col;
}

function getPixel(x, y, defaultColor) {
	let index = coordToIndex(x, y);
	if (index === undefined)
		return defaultColor;
	let col=pxls[index];
	return color(red(col),green(col),blue(col));//hack so modifying this does not change other colors
}

function coordToIndex(x, y) {
	x = floor(x);
	y = floor(y);
	if (pixelModeLong) {
		y = -y - 1
		if (x >= 0 && x < 64 && y >= -32 && y < 64) { //left stack of 3
			return x + (mH * 3 - (y + 32) - 1) * mW
		}
		if (x >= mW + mH && x < mH + mW + 64 && y >= -32 && y < 64) { //right stack of 3
			return mW + mH - x - 1 + ((y + 32) + 1) * mW
		}
		if (x >= mW && x < mH + mW && y >= -32 && y < 0) {
			x -= mW;
			y += 32;
			return 31 - x + y * 32 + mH * mW * 3
		}
		if (x >= mW && x < mH + mW && y >= 0 && y < 64) {
			x -= mW
			return (63 - y) + (31 - x) * 64 + mW * mH

		}

	} else {

		if (x < 0 || x >= mW + mH || y < 0 || y >= mW + mH)
			return;

		if (x < mW) {
			return x + y * mW;
		} else { //in m4
			x -= mW;
			switch (floor(y / mH)) {
				case 0:
					break;
				case 1:
					let xtemp = x;
					x = y - 32;
					y = 31 - xtemp;
					break;
				case 2:
					x = 31 - x;
					y = 31 - y + 64;
					break;
			}
			let i = x + y * 32;
			return i + mH * mW * 3;
		}
	}
	return;
}

function rimage(img, img_x, img_y, img_width, img_height, img_angle) {
	push()
	imageMode(CENTER);
	translate(img_x + img_width / 2, img_y + img_width / 2);
	rotate(PI / 180 * img_angle);
	image(img, 0, 0, img_width, img_height);
	pop()
}

function skewImage(img, x, y, sx, sy, scx, scy, rot) {
	push()
	rotate(rot);
	shearX(atan(sx))
	shearY(atan(sy))
	scale(scx, scy)

	//rect((x - sx * y) / scx, (y - sy * x) / scy, 64, 32)
	image(img, (x - sx * y) / scx, (y - sy * x) / scy)
	pop()
}

function headT(x, y, dir) {
	let sya = cos(dir / 2) / 2 //0.3495132 + 0.01551141*dir - 0.009347184*dir*dir//mouseY/100/*1/*0.5502703 + 0.02064316*dir - 0.04486418*dir*dir/*mouseY/100/*1/(dir*dir+1)*/ //cos(dir);

	skewImage(imgs[1], y, -x - 32, 0, -dir, sya, 1, PI / 2); //top
	if (dir > 0)
		skewImage(imgs[2], x, y, 0, 1 / dir, dir * sya, 1, 0); //left
	else
		skewImage(imgs[0], -x - 32, -y - 32, 0, 1 / dir, -dir * sya, 1, PI); //right
	rimage(imgs[3], x + dir * 64 * sya, y + 64 * sya, 32, 32, 180) //faceplate
}

//draw onto 4 images, then draw those to the screen
function drawMatrix() {
	background(100);
	convertToTexture();

	//left halve
	for (let i = 0; i < imgs.length - 1; i++)
		image(imgs[i], 0, i * 32 + i);
	image(imgs[3], mW + 1, 0);
	rimage(imgs[3], mW + 1, mH + 1, 32, 32, 90)
	rimage(imgs[3], mW + 1, mH * 2 + 2, 32, 32, 180)

	//right halve (2 of these could probably be for loops)
	rimage(imgs[0], 64 + 32 + 7 + 64 + 32 + 1, 64 - 16 + 2, 64, 32, 180)
	rimage(imgs[3], 64 + 32 + 7 + 64, 64 + 2, 32, 32, 180)
	image(imgs[2], 64 + 32 + 7 - 1, 64 + 2)
	rimage(imgs[1], 64 + 32 + 7 + 64 - 16, 0 - 1 + 2, 64, 32, 90)
	rimage(imgs[1], 64 + 32 + 7 - 1, 64 - 16 - 32 - 1 + 2, 64, 32, 0)
	rimage(imgs[1], 64 + 32 + 7 + 64 + 32 + 1, 64 - 16 - 32 - 1 + 2, 64, 32, 180)
	image(imgs[0], 102, 0);
	rimage(imgs[2], 200, -16, 64, 32, 180);

	//2 heads at the bottom
	headT(0, 100, 1);
	headT(100, 100, -1);
	headT(180, 100, ((mouseX / width) - 0.5) * 2.7); ///*3.5*/mouseW/100);//2.70

	rb.enq(frameRate());
	let avg=rb.average()
	let dbgstr="fps "+avg.toFixed(2)+"\nms "+(1/avg*100).toFixed(2)+"\nframe "+frame+"\ntime "+realTime.toFixed(2)
	text(dbgstr, 250, 120);
	text(dbgstr, 10, 200)
}

function convertToTexture() {
	for (let i = 0; i < imgs.length; i++)
		imgs[i].loadPixels();

	for (var i = 0; i < pxls.length; i++) {
		var matrix = floor(i / mW / mH);
		switch (matrix) {
			case 0:
			case 1:
			case 2:
				drawPixel(i % mW, floor(i / mW) % mH, pxls[i], matrix);
				break;

			case 3:
				var j = i - mW * mH * 3;
				//drawPixel(j % (mW / 2) + mW, floor(j / (mW / 2)), pxls[i],3);
				drawPixel(j % (32), floor(j / (32)), pxls[i], 3);
				//drawPixel(31 - floor(j / (mW / 2)) + mW, j % (mW / 2) + mH, pxls[i]);
				//drawPixel(31 - j % (mW / 2) + mW, 31 - floor(j / (mW / 2)) + mH * 2, pxls[i]);
				break;
		}
	}

	for (let i = 0; i < imgs.length; i++)
		imgs[i].updatePixels();
}

function drawPixel(x, y, col, m) {
	//return;
	let i = (x + y * imgs[m].width) * 4;
	imgs[m].pixels[i + 0] = red(col);
	imgs[m].pixels[i + 1] = green(col);
	imgs[m].pixels[i + 2] = blue(col);
	imgs[m].pixels[i + 3] = 255;
}