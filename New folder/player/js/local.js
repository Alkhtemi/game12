var Local = function(){

	var game;


	var INTERVAL = 500;

	var timer = null;


	var timeCount = 0;


	var time = 0;




	var bindKeyEvent = function(){
		document.onkeydown = function(e){
			if(e.keyCode === 38) { 
				game.rotate();

			} else if (e.keyCode === 39){ 
				game.right();

			} else if (e.keyCode === 40){ 

				game.down();

			} else if (e.keyCode === 37){ 

				game.left();

			} else if (e.keyCode === 32){
				game.fall();

			}
		}
	}




	var move = function(){
		timeFunc();
		if(!game.down()){
			game.fixed();
			var line = game.checkClear();
			if(line){
				game.addScore(line)
			}
			var gameOver = game.checkGameOver();
			if(gameOver){
				game.onGameover(false);
				stop();
			} else {
				game.performNext(generateType(), generateDir())
			}
			
		};
		
	}


 	var generateBottomLine = function(lineNum){
 		var lines =[];
 		for(var i =0; i< lineNum; i++){
 			var line = [];
 			for(var j=0; j< 10; j++){
 				line.push(Math.ceil(Math.random()*2)-1);
 			}
 			lines.push(line)
 		}

 		return lines;
 	}



	var timeFunc = function(){
		timeCount = timeCount + 1;
		if(timeCount ==5){
			timeCount = 0;
			time = time + 1
			game.setTime(time);
			if(time % 10 == 0){
				game.addTailLines(generateBottomLine(1));
			}
		}
	}




  var generateType = function () {
    return Math.ceil(Math.random() * 7) - 1; 
  }



 var generateDir = function () {
    return Math.ceil(Math.random() * 4) - 1; 
  }


var stop = function () {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
    document.onkeydown = null;
  }


	var start = function(){
		var doms = {
			gameDiv: document.getElementById('local_game'),
			nextDiv: document.getElementById('local_next'),
			timeDiv: document.getElementById('local_time'),
			scoreDiv:document.getElementById('local_score'),
			resultDiv:document.getElementById('local_gameover')
		}

		game = new Game();
		game.init(doms, generateType(),generateDir());
		bindKeyEvent();
		game.performNext(generateType(),generateDir())
		timer = setInterval(move, INTERVAL)

	}

	this.start = start
}