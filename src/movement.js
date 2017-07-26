//Arrow key codes
var UP = 38;
var DOWN = 40;
var RIGHT = 39;
var LEFT = 37;

//Directions
var moveUp = false;
var moveDown = false;
var moveRight = false;
var moveLeft = false;

//Add keyboard listeners
window.addEventListener("keydown", function(event)
{
  switch(event.keyCode)
  {
    case UP:
	    moveUp = true;
	    break;
	  
	  case DOWN:
	    moveDown = true;
	    break;
	    
	  case LEFT:
	    moveLeft = true;
	    break;  
	    
	  case RIGHT:
	    moveRight = true;
	    break; 
  }
}, false);

window.addEventListener("keyup", function(event)
{
  switch(event.keyCode)
  {
    case UP:
	    moveUp = false;
	    break;
	  
	  case DOWN:
	    moveDown = false;
	    break;
	    
	  case LEFT:
	    moveLeft = false;
	    break;  
	    
	  case RIGHT:
	    moveRight = false;
	    break; 
  }
}, false);

var move = function() 
{ 

   var speed = 2;
   
   //Up
  if(moveUp && !moveDown)
  {
    monk.vy = -speed;
	monk.switchState("up");
  }
  //Down
  if(moveDown && !moveUp)
  {
    monk.vy = speed;
	monk.switchState("down");
  }
  //Left
  if(moveLeft && !moveRight)
  {
    monk.vx = -speed;
	monk.switchState("left");
  }
  //Right
  if(moveRight && !moveLeft)
  {
    monk.vx = speed;
	monk.switchState("right");
  }
  
  if(!moveUp && !moveDown){
	  monk.vy = 0;
  }
  
   if(!moveRight && !moveLeft){
	  monk.vx = 0;
  }
  
  monk.x += monk.vx;
  monk.y += monk.vy;
  
  collision();
  
};

var collision = function(){
	

	for (i = 0; i< tiles.length; i++){
		if (tiles[i].solid){
			blockRectangle(monk, tiles[i]);
            
		}
	}	
	
};


