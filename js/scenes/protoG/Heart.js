
oatsH = []
pCountH = 200;
pWispsH = 20;

//tents=[]

function heartSetup() {

	for (var i = 0; i < pCountH; i++) {
		oatsH.push({
			x: random(-2, 2),
			y: random(-2, 2),
			ts: random(0.3, 1) /*map(i, 0, pCountH, 0.3, 1)*/ ,
		});
	}
}


function infDrawH(time) {
	cbpush(additive3);
	let col = color(255, 20, 20);
	for (var i = 0; i < pCountH; i++) {
		p = GetPointH(time * oatsH[i].ts);

		p.x = p.x * 25 + 16-13 + oatsH[i].y; //+sin(time*20*oatsH[i].ts)*r;
		p.y = p.y * 25*1.5 + 32-16 + oatsH[i].x; //+cos(time*20*oatsH[i].ts)*r;

		//let x=floor(p.y);
		//let y=floor(p.x);
		let y = p.x + 32;
		let x = p.y;

		if (i < pCountH - pWispsH) {
			col.setAlpha(map(i, 0, pCountH, 0, 200))
			setPixelSmooth(x, y, /*map(i, 0, pCountH, 0, 80)*/ col);
		}
		//setPixel(x, y, map(i, 0, pCountH, 0, 80));
		else {
			col.setAlpha(255);
			setPixelSmooth2(x + cos(time * 50 * oatsH[i - 1].ts) * 4, y + sin(time * 30 * oatsH[i - 1].ts) * 4, col);
		}
	}
	cbpop()
}


tableH = [

{x:0.5015796428192975, y:0.20857007283726391},
{x:0.5515796428192975, y:0.10857007283726391},
{x:0.7124171674170575, y:0.0380622316511522},
{x:0.8761234843415406, y:0.10300979653897216},
{x:0.9576519439431747, y:0.25803541004847497},
{x:0.9250368839792646, y:0.43249659618488423},
{x:0.8102015911690101, y:0.5698332424393294},
{x:0.6758206432192427, y:0.6896372607618773},
{x:0.5531861271310026, y:0.8202521163104554},
{x:0.5031861271310026, y:0.90202521163104554},
]

//time 0..4
function GetPointH(time) {
	t = time * tableH.length * 4;
	f = floor(t);
	p1 = GetTableEntryH(f);
	p2 = GetTableEntryH(f + 1);

	return PLerp(p1, p2, t - f);
}

function GetTableEntryH(entry){
	entry=entry%(tableH.length*2);
	switch(floor(entry/tableH.length)){
		case 0:
			return tableH[entry];
		case 1:
			p=tableH[tableH.length-entry%(tableH.length)-1];
			return {x:1-p.x,y:p.y};
	}
}












//