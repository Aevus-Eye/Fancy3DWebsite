let ssstars=[];
const ssstarsCount=60

function ssSetup() {
	while (ssstars.length < ssstarsCount) {
		ssstars.push({
			x: ~~random(0, 64),
			y: ~~random(0,32*3),
			//to: random(2 * PI)
		})
	}
}

function drawSS(t){
	ssstars.forEach(function(e,i){
		let v=map(i,0,ssstarsCount-1,30,250);
		//setPixelSmooth(mod(e.x-t*map(i,0,ssstarsCount-1,2,20),64+16),e.y,color(v))
		let x=e.x-t*map(i,0,ssstarsCount-1,60,200)
		let y=mod(e.y+sin(t*2)*map(i,0,ssstarsCount-1,10,30),32*3)
		let col=color(hue_to_rgb(map(i,0,ssstarsCount-1,20/360,1)))
		setPixel(mod(x,64),y,255)
		setPixel(mod(x+1,64),y,col)
	})
	//drawFilledCircle(64+16,16,15,0);
	//drawCircle(64+16,16,15,250);
	//drawLine(64,16,64+31,16,255)
	//drawLine(64+16,0,64+16,31,255)
}