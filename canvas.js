function $(s){
	return document.querySelector(s);
}
var canvasImage = $('#image');
var ctx = canvasImage.getContext('2d');
function dr(ctx,startX,startY,r,style){
	r = r||2;
	ctx.beginPath();
	ctx.strokeStyle= style||'#1d7106';
	ctx.arc(startX,startY,r,0,2*Math.PI);
	ctx.stroke();
}

function drewRect(x,y,w,h){
	h = h||w;
	ctx.beginPath();
	ctx.moveTo(x,y);
	ctx.lineTo(x,y+h);
	ctx.lineTo(x+w,y+h);
	ctx.lineTo(x+w,y);
	ctx.closePath();
}

function grbg(){
	ctx.clearRect(0,0,30,30);
	drewRect(0,0,30);
	ctx.fillStyle='#2da80c';
	ctx.fill();
	dr(ctx,5,5);
	dr(ctx,25,25);
	dr(ctx,5,25);
	dr(ctx,25,5);
}

function qiang(){
	ctx.clearRect(0,0,30,30);
	drewRect(0,0,30);
	ctx.fillStyle='#d3d3d3';
	ctx.fill();
	drewRect(3,3,24);
	ctx.fillStyle = '#1e767f';
	ctx.fill();
}


function drewBox(){
	ctx.clearRect(0,0,30,30);
	drewRect(0,0,30);
	ctx.fillStyle='#efefef';
	ctx.fill();
	drewRect(3,2,6,26);
	ctx.fillStyle='#fac708';
	ctx.fill();
	drewRect(9,2,6,26);
	ctx.fillStyle = '#cd9c0f';
	ctx.fill();
	drewRect(15,2,6,26);
	ctx.fillStyle='#fac708';
	ctx.fill();
	drewRect(21,2,6,26);
	ctx.fillStyle='#cd9c0f';
	ctx.fill();
}
function drewPlayer(){
	ctx.clearRect(0,0,30,30);
	drewRect(0,0,30);
	ctx.fillStyle='#2da80c';
	ctx.fill();
	dr(ctx,15,6,4,'#fff');
	ctx.beginPath();
	ctx.moveTo(15,10);
	ctx.lineTo(15,22);
	ctx.stroke();
	ctx.beginPath();
	ctx.moveTo(5,15);
	ctx.lineTo(15,12);
	ctx.lineTo(25,15);
	ctx.stroke();
	ctx.beginPath();
	ctx.moveTo(5,25);
	ctx.lineTo(15,22);
	ctx.lineTo(25,25);
	ctx.stroke();
}
function drewTrap(){
	ctx.clearRect(0,0,30,30);
	drewRect(0,0,30);
	ctx.fillStyle='#2da80c';
	ctx.fill();
	dr(ctx,5,5);
	dr(ctx,25,25);
	dr(ctx,5,25);
	dr(ctx,25,5);
	dr(ctx,15,15,10,'#eea826');
	ctx.fillStyle = '#eea826';
	ctx.fill();
}

