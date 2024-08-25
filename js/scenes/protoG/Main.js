p5.disableFriendlyErrors = true;//speeds the program up by a factor of 2

let pxls; //, xtrs;
let pxlW;
let pxlH;
let mW = 64;
let mH = 32;
//let pcb;
let starField
//let callback
let imgs;
let pixelModeLong = false;
let frame = 0;
let mouseZ = 0;
let mouseW = 0;
let realTime = 0;
let dTime=0;
let selected=-1;
let slider;
let effects;

function setup() {
	//print("test")
	directions = [
		createVector(0, 1),
		createVector(1, 1),
		createVector(1, 0),
		createVector(1, -1),
		createVector(0, -1),
		createVector(-1, -1),
		createVector(-1, 0),
		createVector(-1, 1),
	];
	wireCol = color(218, 190, 124);
	wireWispCol = color(235, 157, 23);
  fonts=[fat_marker_rust_1,ConsolasBold16,ConsolasBold10]
  rb=new RingBuffer(20)
	//createCanvas(cellW * mW*1.5, cellH * 32*4);
	//colorMode(HSL, 360, 1, 1);
	//colorMode(RGB, 1, 1, 1);
	createCanvas(windowWidth, windowHeight);
	colorMode(RGB, 255, 255, 255, 255);
	noSmooth() //interpolation nearest neighbour
	noStroke()

	pxlW = (width) / (mW * 4 + 12);
	pxlH = (height) / (mH * 3 + 4 + 66);
	pxlH = pxlW = min(pxlW, pxlH);

	scale(pxlW, pxlH);
	translate(2, 2)


	resetArrays();
	//print(pxls.length);
	textSize(10);
	//print(color(0) instanceof p5.Color)
	//noStroke();
	imgs = [createImage(64, 32), createImage(64, 32), createImage(64, 32), createImage(32, 32), ]

	//pcb=new PCBEffect();
	starField = new StarFieldEffect();
	initFire();
	initSnow();
	infSetup();
	initRain()
	//print('test')
	tttReset()
	heartSetup();
	pawSetup();
	imgSetup();
	setupCube();
	initBlackSun();
	nsSetup();
	htSetup();
	ssSetup()

  effects=[
	//pcb.update.bind(pcb),
	()=>starField.update(),
	()=>drawFire(),
	()=>drawtpt(realTime),
	()=>drawSnow(),
	()=>drawFace(),
	()=>drawGravitas(realTime/10),
	()=>infDraw(realTime/7),
	()=>infDrawH(realTime/10),
	()=>infDrawP(realTime/10),
	()=>dRain(),
	()=>tttDraw(),
	()=>drawNoiseBG(30,255,255,150,50,realTime*10),
	()=>drawCoinFlip(dTime*2),
	()=>drawBlueScreen(dTime*10),
	()=>drawFaceMeme(),
	()=>drawCube(realTime,floor(mouseY/height*3)),
	()=>drawBlackSun(realTime),
	()=>drawStartup((realTime/4)),
	()=>drawNightSky(realTime/2),
	()=>drawHillTop(realTime),
	]

		
	slider=createSlider(0,effects.length-1,effects.length-1);
	slider.position(0,pxlH*mH*5);
	slider.style("width",(~~(pxlW*mW*4.15))+"px");

}

function mouseClicked(event) {
	let px=mouseX / pxlW,py=mouseY / pxlH;
	print({
		px: px,
		py: py,
		rx: mouseX,
		ry: mouseY,
		nx: mouseX/width,
		ny: mouseY/height,
		pxc: ~~(px<64+32+4?px-2:px-(64+32+7)),
		pyc: ~~(px<64+32+4?py-2:py-2-64),
		z: mouseZ,
		w: mouseW,
		pxlW: pxlW,
	});
	startCoinFlip();
	tttSet(~~(mouseX/width*3),~~(mouseY/height*3),(((mouseW/3+1)%3)+3)%3)
}

function mouseWheel(event) {
	if (keyIsDown(SHIFT))
		mouseZ += event.delta;
	else
		mouseW += event.delta;
	//return false;
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    selected--;
  } else if (keyCode === RIGHT_ARROW) {
    selected++;
  }
}

function draw() {
	frame++;
	dTime=deltaTime/1000
	realTime+=dTime;
	//time += 0.01;
	resetArrays();
	//print(frame)

	/*let effects=[
	//pcb.update.bind(pcb),
	starField.update.bind(starField),
	drawFire.bind(null),
	drawtpt.bind(null,realTime),
	drawSnow.bind(null),
	drawFace.bind(null),
	drawGravitas.bind(null,realTime/10),
	infDraw.bind(null,realTime/7),
	infDrawH.bind(null,realTime/10),
	infDrawP.bind(null,realTime/10),
	dRain.bind(null),
	tttDraw.bind(null),
	drawNoiseBG.bind(null,30,255,255,150,50,realTime*10),
	drawCoinFlip.bind(null,dTime*2),
	drawBlueScreen.bind(null,dTime*10),
	drawFaceMeme.bind(null),
	drawCube.bind(null,realTime,floor(mouseY/height*3)),
	drawBlackSun.bind(null,realTime),
	drawStartup.bind(null,(realTime/4)),
	drawNightSky.bind(null,realTime/2),
	drawHillTop.bind(null,realTime),
	]*/
	effects[slider.value()]();
	
	//pcb.update();
	//starField.update();
	//drawFire();
	//drawtpt();
	//drawSnow();
	//drawFace()
	//drawGravitas(realTime/10);
	//infDraw(realTime/7)
	//infDrawH(realTime/10)
	//infDrawP(realTime/10)
	//dRain()
	//tttDraw()
	//drawNoiseBG(30,255,255,150,50,realTime*10)
	//drawCoinFlip(dTime*2)
	//drawBlueScreen(dTime*10);
	//drawFaceMeme();
	//drawCube(realTime,floor(mouseY/height*3));
	//drawBlackSun(realTime)
	//drawStartup((realTime/4));
	//drawNightSky(realTime/2);
	//drawHillTop(realTime);
	//drawSS(realTime)
	
	//dRain()
	
	push()
	//scale(mouseX/100)
	//scale(width / (4 * 64 + 10))
	scale(pxlW, pxlH);
	translate(2, 2)
	drawMatrix();
	pop()
	//print(getPixel(32,32))
}











//