var canvas = document.querySelector('#canvas');
var context = canvas.getContext('2d');
var leverNum = document.getElementById('leverNum');
var clickNum = document.getElementById('clickNum');
function clone(array) {
    var len = array.length,
        arr = [];
    for(var i = 0;i < len;i++) {
        var a = [];
        for(var j =0;j<array[i].length;j++){
            a.push(array[i][j]);
        }
        arr.push(a);
    }
    return arr;
}
function PlayGame(){
    this.level = 0;
    this.gamer = {
        x:0,
        y:0
    };
    this.trap = [];
    this.alllevel = 100;
    this.up = function(){
        if(this.level>0){
            this.level--;
            this.init();
        }
    }
    this.down = function(){
        if(this.level<this.alllevel){
            this.level++;
            this.init();
        }
    }
    this.init = function(){
        if(levels[this.level]){
            this.clickNum = 0;
            this.trap = [];
            leverNum.innerText = this.level+1;
            clickNum.innerHTML = this.clickNum;
            this.gameMapArray = clone(levels[this.level]);
            this.mapArray = clone(levels[this.level]);
            makeMap(this.mapArray);
        }
    }
    this.replace = function(){
        this.level = 0;
        this.init();
    }
}
var game = new PlayGame();
var gameMap = {
    width:300,
    height: 300,
    row:10,
    item:10,
    boxW:30,
    boxH:30
};
var gameOver = true;
var colors = [
    '#76e059',
    '#2da80c',
    '#0ae8d1',
    '#e8ac0a',
    '#e80a0a',
    '#e8ac0a'
];
function makeMap(map){
    context.clearRect(0,0,300,300);
    for(var i = 0;i<map.length;i++){
        for(var j = 0;j<map[i].length;j++){
            var index = map[i][j];//0 空地 1 墙 2陷阱 3箱子 4人 5初始化有箱子的陷阱
            if(index==4){
                game.gamer.x = i;
                game.gamer.y = j;
            }
            if(game.clickNum==0 && index==2){
                game.trap.push({
                    x:i,
                    y:j
                });
            }
            context.fillStyle=colors[index];
            context.fillRect(gameMap.boxW*j,gameMap.boxH*i,gameMap.boxW,gameMap.boxH);
        }
    }
    if(isgameOver()){
        console.log('游戏结束');
        game.level++;
        game.init();
    }
}
document.addEventListener('keydown',function(event){
    if(isgameOver()){
        return;
    }
    clickNum.innerHTML = game.clickNum;
    switch(event.keyCode){
        case 38:
            var p1 = game.mapArray[game.gamer.x-1][game.gamer.y];
            var p2 = game.mapArray[game.gamer.x-2][game.gamer.y];
            if(examine(p1,p2)){
                game.clickNum++;
                gamerMove({
                    x:game.gamer.x,
                    y:game.gamer.y,
                    x1:game.gamer.x-1,
                    y1:game.gamer.y,
                    x2:game.gamer.x-2,
                    y2:game.gamer.y
                });
            };
            break;
        case 37:
            var p1 = game.mapArray[game.gamer.x][game.gamer.y-1];
            var p2 = game.mapArray[game.gamer.x][game.gamer.y-2];
            if(examine(p1,p2)){
                game.clickNum++;
                gamerMove({
                    x:game.gamer.x,
                    y:game.gamer.y,
                    x1:game.gamer.x,
                    y1:game.gamer.y-1,
                    x2:game.gamer.x,
                    y2:game.gamer.y-2
                });
            };
            break;
        case 40:
            var p1 = game.mapArray[game.gamer.x+1][game.gamer.y];
            var p2 = game.mapArray[game.gamer.x+2][game.gamer.y];
            if(examine(p1,p2)){
                game.clickNum++;
                gamerMove({
                    x:game.gamer.x,
                    y:game.gamer.y,
                    x1:game.gamer.x+1,
                    y1:game.gamer.y,
                    x2:game.gamer.x+2,
                    y2:game.gamer.y
                });
            };
            break;
        case 39:
            var p1 = game.mapArray[game.gamer.x][game.gamer.y+1];
            var p2 = game.mapArray[game.gamer.x][game.gamer.y+2];
            if(examine(p1,p2)){
                game.clickNum++;
                gamerMove({
                    x:game.gamer.x,
                    y:game.gamer.y,
                    x1:game.gamer.x,
                    y1:game.gamer.y+1,
                    x2:game.gamer.x,
                    y2:game.gamer.y+2
                });
            };
            break;
    }
});
/**
 * 
 * 检测当前人物所在点的前面是不是可以移动；
 * 传入被检测点p1；
 */
function examine(p1,p2){
    //判断是不是墙
    if(p1==1) return false;
    if(p1==3 || p1==5){
        if(p2 == 1 || p2 == 3|| p2 == 5){
            return false;
        }
    }
    return true;
}

function isgameOver(){
    gameOver = true;
    for(var i = 0;i<game.trap.length;i++){
        if(game.mapArray[game.trap[i].x][game.trap[i].y]==2||game.mapArray[game.trap[i].x][game.trap[i].y]==4){
            gameOver = false;
        }
    }
    return gameOver;
}

function gamerMove(position){
    var xcode = getMapCode(position.x,position.y);
    if(xcode == 2 || xcode == 5){
        xcode = 2;
    }else{
        xcode = 0;
    }
    game.mapArray[position.x][position.y]  = xcode;
    if(game.mapArray[position.x1][position.y1]==3||game.mapArray[position.x1][position.y1]==5){
        game.mapArray[position.x2][position.y2]= 3;
    }
    game.mapArray[position.x1][position.y1] = 4;
    makeMap(game.mapArray);
}
function getMapCode(x,y){
    return game.gameMapArray[x][y];
}
game.init();