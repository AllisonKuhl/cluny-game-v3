
//when document is loaded... 

//display main screen

//when clicked... play game! 


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

 function update()
{ 
  //The animation loop
  requestAnimationFrame(update, canvas);
  
  //deal with player interaction
  move();
  
  //move camera
  moveCamera();
  
  //draw the game
  render();

   
}



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


  
update();
