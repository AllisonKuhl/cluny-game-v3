//should eventually add loading screen...

var LOADING = 0;
var STARTPAGE = 1;
var PLAYING = 2;
var PRAYING = 3;
var gameState = STARTPAGE;

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
	 
	if (gameState = STARTPAGE){
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
	  ctx.clearRect(0, 0, canvas.width, canvas.height);
	  ctx.fillText("Coming soon!",100,200);
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
function drawBackground() {
 
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

//draws monk and background
function render()
{ 
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  
  //Position the gameWorld inside the camera
  ctx.save();
  ctx.translate(-camera.x, -camera.y);
  
   
 drawBackground();
 
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
