
oatsP = []
pCountP = 200;
pWispsP = 20;

//tents=[]

function pawSetup() {

	for (var i = 0; i < pCountP; i++) {
		oatsP.push({
			x: random(-2, 2)*0.5,
			y: random(-2, 2)*0.5,
			ts: random(0.3, 1) /*map(i, 0, pCountP, 0.3, 1)*/ ,
		});
	}
}


function infDrawP(time) {
	cbpush(additive4);
	cbpush(function(x,y,col){//this doesent work for some reason		
		let nc=color(hue_to_rgb((x)*0.03+time))
		nc.setAlpha(alpha(col))
		return nc;
	})
	let col = color(10, 20, 20);
	for (var i = 0; i < pCountP; i++) {
		p = GetPointP(time * oatsP[i].ts);

		p.x = p.x * 25*1.2 + 16-15 + oatsP[i].y; //+sin(time*20*oatsP[i].ts)*r;
		p.y = p.y * 25*1.5 + 32-16 + oatsP[i].x; //+cos(time*20*oatsP[i].ts)*r;

		//let x=floor(p.y);
		//let y=floor(p.x);
		let y = p.x + 32;
		let x = p.y;

		if (i < pCountP - pWispsP) {
			col.setAlpha(map(i, 0, pCountP, 0, 200))
			setPixelSmooth(x, y, /*map(i, 0, pCountP, 0, 80)*/ col);
		}
		//setPixel(x, y, map(i, 0, pCountP, 0, 80));
		else {
			col.setAlpha(255);
			setPixelSmooth2(x + cos(time * 50 * oatsP[i - 1].ts) * 2, y + sin(time * 30 * oatsP[i - 1].ts) * 2, col);
		}
	}
	cbpop(2)
}


tableP = [
	{x:0.5651245816021199, y:0.8257811752860929},
{x:0.7555643449858429, y:0.8277114743072871},
{x:0.767905395283244, y:0.6284459223275691},
{x:0.800522428668319, y:0.5614132589588497},
{x:0.9598887863116696, y:0.4735320391095153},
{x:0.9264895922952135, y:0.2870097706660576},
{x:0.7501356969054389, y:0.3595925310765494},
{x:0.7399849574980808, y:0.5376025179815812},
{x:0.6096339036637765, y:0.39635531895112386},
{x:0.7103546104667131, y:0.3430969263555246},
{x:0.7748597632210217, y:0.15431538392758964},
{x:0.6405471769442564, y:0.04204123324378824},
{x:0.5241974175751205, y:0.20510659953024776},
{x:0.5793564537502104, y:0.37822228272681374},
]

//time 0..4
function GetPointP(time) {
	t = time * tableP.length * 4;
	f = floor(t);
	p1 = GetTableEntryP(f);
	p2 = GetTableEntryP(f + 1);

	return PLerp(p1, p2, t - f);
}

function GetTableEntryP(entry){
	entry=entry%(tableP.length*2);
	switch(floor(entry/tableP.length)){
		case 0:
			return tableP[entry];
		case 1:
			p=tableP[tableP.length-entry%(tableP.length)-1];
			return {x:1-p.x,y:p.y};
	}
}












//