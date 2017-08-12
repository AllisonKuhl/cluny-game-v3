//should eventually add loading screen...

var LOADING = 0;
var STARTPAGE = 1;
var PLAYING = 2;
var PRAYING = 3;
var gameState = STARTPAGE;

textbox = "";

//The canvas
var canvas = document.querySelector("canvas"); 
var ctx = canvas.getContext("2d");

//load spritesheet
var img = new Image();
img.src = "./images/spritesheet.png";

  img.onload = function() {
	  
	    //player starting position
	    monk.x = 200;
		monk.y = 250;
        createSpriteArray();
	
 };
 

 
/* 

may use this for mouse events in the future??
probably not though

 var mouseX = 0;
 var mouseY = 0;

 canvas.addEventListener("mousemove",function(event){
	 mouseX = event.pageX - canvas.offsetLeft;
	 mouseY = event.pageY- canvas.offsetTop;
 }, false);
 */
 
 
 //deals with click events. 
 //for now just used in start page
 
 canvas.addEventListener("click",function(event){
	 
	if (gameState == STARTPAGE){
	   for (i=0; i< startButtons.length;i++){
		  if (hitTestPoint(event.pageX,event.pageY,startButtons[i])){
			   startButtons[i].action();		  
		  }		  
	  }	
	}
 }, false);
 

//this is the main part here! It updates over and over again checking if anything has happened to the game.
 function update()
{ 

   //The animation loop
  requestAnimationFrame(update, canvas);

  
  if (gameState == STARTPAGE){
	  //draw start menu
	  renderStart();
	 	  
  }
  
  else if (gameState == PLAYING){
	  //deal with player interaction
	  move();  
	  //move camera
	  moveCamera();	  
	  //draw the game
	  render();
  }
	  
   else if (gameState == PRAYING){
	  //start praying mini-game
	  drawTypingGame();
  }
  
  
   
}

//creates start menu
function renderStart(){
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	    //background image
		ctx.drawImage(img,
		startBackground.sourceX,
		startBackground.sourceY,
		startBackground.width,
		startBackground.height,
		startBackground.x,
		startBackground.y,
		startBackground.width,
		startBackground.height);
	
	
	//draws the buttons
    for (i = 0; i< startButtons.length;i++){
		
		sButton = startButtons[i];
		// Green rectangle
		ctx.beginPath();
		ctx.rect(sButton.x, sButton.y, sButton.width, sButton.height);
		ctx.fillStyle = sButton.colour;
		ctx.fill();
		
		ctx.fillStyle = "black";
		ctx.font = "40px Arial";
		ctx.fillText(sButton.txt,sButton.x+40,sButton.y+60);
		
	} 
}

//draws background of monastary	  
function drawBackgroundMain() {
 
	for (i = 0; i< tiles.length; i++){
		
		ctx.drawImage(img,
		tiles[i].sourceX,
		tiles[i].sourceY,
		tiles[i].width,
		tiles[i].height,
		tiles[i].x,
		tiles[i].y,
		tiles[i].width,
		tiles[i].height);
	}
	 
}

window.addEventListener("keydown", function(event)
{
	
	if (gameState == PRAYING){
		if (event.keyCode == 32){//space key is pressed
		

		
		if (letter < psalm95[verse][word].length){
			
			for (i = 0; i < psalm95[verse][word].length - letter; i++){
				correctLetters.push(false);
				prayBackground.switchState(1);
				
			}
		}
	
	    //press space at end of verse instead of enter
	    if (psalm95[verse].length-1 == word){
			textbox= "";
			word = -5;
			letter = 0;
			prayBackground.switchState(1);

		}
		else{
			textbox= "";
			//we increase the word
			word+=1;
			letter=0;
		}
		}
		else if (event.keyCode ==13){// enter key is pressed
		

		if (word >= psalm95[verse].length-1 || word == -5){
			textbox= "";
			verse+=1;
			word = 0;
			letter = 0;
			correctLetters = [];
		}
			
			
			if (verse >= psalm95.length){
				//gameState = STARTPAGE;
				verse=0;
			}
		}//bizarre punctuation... doesn't work correctly for some reason...
		else if (event.keyCode == 188){//comma is pressed
		    textbox+=',';
				
		    if (psalm95[verse][word][letter] == ','){
			    correctLetters.push(true);
				prayBackground.switchState(0);
		    }else {
			    correctLetters.push(false);
				prayBackground.switchState(1);
		    }
		  
		    letter++;
		}
				
		else if (event.keyCode==49){//exclamation mark is pressed
				textbox+='!';
				if (psalm95[verse][word][letter] == '!'){
			        correctLetters.push(true);
					prayBackground.switchState(0);
		         }else {
			         correctLetters.push(false);
					 prayBackground.switchState(1);
		        }
				letter++;
		}
		else if (event.keyCode==190){ //period is pressed
				textbox+='.';
				if (psalm95[verse][word][letter] == '.'){
			correctLetters.push(true);
			prayBackground.switchState(0);
		  }else {
			  correctLetters.push(false);
			  prayBackground.switchState(1);
		  }
				letter++;
		}	   
	     //  GENERAL CASE
		else if (event.keyCode >= 65 && event.keyCode <= 90 || event.keyCode == 59){
			
		    wordLength = psalm95[verse][word].length;
        
	
	        //checks to make sure typed letter is correct
			if (letter < wordLength && String.fromCharCode(event.keyCode) == psalm95[verse][word][letter].toUpperCase() ){
  
				correctLetters.push(true);
				prayBackground.switchState(0);
				//console.log("CORRECT!");	
				
			}else{
				
				if (letter < wordLength){
				  correctLetters.push(false);
				  prayBackground.switchState(1);
				}
				
				//points decrease
				//console.log("FALSE!");
			}
			
			letter++;
			
			textbox+=String.fromCharCode(event.keyCode);
			
	
	}
	}
}, false);

var verse = 0;
var word = 0;
var wordLength = 0;
var letter = 0;
var textHeight = 50;
var correctLetters = [];

function drawTypingGame(){
	  ctx.clearRect(0, 0, canvas.width, canvas.height);
	  
	  ctx.textAlign="left";
	  ctx.textAlign="top";
      ctx.font = "35px monospace";
	  
	  var totalLetters = 0;
	  
	  var start = 100;
	  //goes through each word
	  for (i=0;i<psalm95[verse].length;i++){
		  
          //goes through each letter in each word
		  var verseArray = psalm95[verse][i];
		  
		 // console.log(verseArray);
		 // 
		 
		 if (start+verseArray.length*30 > canvas.width){
			 start = 100;
			 textHeight += 50;
		 }
		 
		  for (j=0;j<verseArray.length;j++){
			 // console.log(verseArray[j]);
			  start += 25;
			  
			  //colour
			  if (correctLetters[totalLetters] == true){
				ctx.fillStyle = 'green';
			  }else if (correctLetters[totalLetters] == false){
				  ctx.fillStyle = 'red';
			  }else {
				  ctx.fillStyle = 'black';
			  }
			  
			  
		      ctx.fillText(verseArray[j].toUpperCase(),start,textHeight);
			  totalLetters+=1;
		  }
         start += 40;
	  }
	  start = 100;
	  textHeight = 50;
	  
	  //text box
	  var textboxX = 280;
	  var textboxY = 200;
	  ctx.rect(textboxX, textboxY, 230, 50);
	  ctx.stroke();
	  ctx.font = "30px monospace";
	  
	  if (letter > wordLength){
		ctx.fillStyle = 'red';
		prayBackground.switchState(1);
	  }
	  
	  ctx.fillText(textbox,textboxX+5,textboxY+30);
	 
	  drawImage(prayBackground);
	
}


function drawImage(thisImg){
	ctx.drawImage(img,
	 thisImg.sourceX + thisImg.state*thisImg.sourceWidth,
	 thisImg.sourceY,
	 thisImg.sourceWidth,
	 thisImg.sourceHeight,
	 thisImg.x,
	 thisImg.y,
	 thisImg.width,
	 thisImg.height);
	
}

//draws monk and background
function render()
{ 
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  
  //Position the gameWorld inside the camera
  ctx.save();
  ctx.translate(-camera.x, -camera.y);
  
   
 drawBackgroundMain();
 
 //draw monk on top of background
 ctx.drawImage(img,
 monk.sourceX + monk.state*monk.sourceWidth,
 monk.sourceY,
 monk.sourceWidth,
 monk.sourceHeight,
 monk.x,
 monk.y,
 monk.width,
 monk.height);
 
  ctx.restore();
 
  
}

//game loop
update();
