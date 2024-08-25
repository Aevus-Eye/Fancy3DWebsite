//framerate dependant

let rainParts=[]

function initRain(){
	for(let i=0;i<100;i++)
	rainParts.push({x:random(160),y:random(-16,32)});
}

function dRain(){
	cbpop(10)
	pixelModeLong=true;
	//start @-16 height
	//end @32 height
	//from 0 to 64+64+32 x =160x
	for(let i=0;i<rainParts.length;i++){
		rainParts[i].x++;
		rainParts[i].x++;
		rainParts[i].y++;
		rainParts[i].y++;
		
		if(rainParts[i].x>160){
			rainParts[i].x-=160;
		}
		if(rainParts[i].y>32){
			rainParts[i].y-=32+16
		}
		
		rainDrawD(rainParts[i].x, rainParts[i].y)
	}
	
	
	pixelModeLong=false;
}

function rainDrawD(x,y){
	let col=color(0,100,255,150)
	
	//let col=getPixel(x,y,color("black"))
	//col.setBlue(blue(col)+200)
	setPixel(x,y,col);

	//col=getPixel(x-1,y-1,color("black"))
	//col.setBlue(blue(col)+200)
	setPixel(x-1,y-1,col);
}











//