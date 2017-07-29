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



//deals with camera movement


var canvas = document.querySelector("canvas"); 

console.log(map);

var gameWorld = {
	x:0,
	y:0,
	width: map[0].length*40,
	height: map.length*40
};

var camera = 
{
  x: 0,
  y: 0,
  width: canvas.width,
  height: canvas.height,
  
  //The camera's inner scroll boundaries
  rightInnerBoundary: function()
  {
    return this.x + (this.width / 2) + (this.width / 4);
  },
  leftInnerBoundary: function()
  {
    return this.x + (this.width / 2) - (this.width / 4);
  },
  topInnerBoundary: function()
  {
    return this.y + (this.height / 2) - (this.height / 4);
  },
  bottomInnerBoundary: function()
  {
    return this.y + (this.height / 2) + (this.height / 4);
  }	
}; 

var moveCamera = function() 
{ 
   //Scroll the camera
  if(monk.x < camera.leftInnerBoundary())
  {
    camera.x = Math.floor(monk.x - (camera.width / 4));
  }
  if(monk.y < camera.topInnerBoundary())
  {
    camera.y = Math.floor(monk.y - (camera.height / 4));
  }
  if(monk.x + monk.width > camera.rightInnerBoundary())
  {
    camera.x = Math.floor(monk.x + monk.width - (camera.width / 4 * 3));
  }
  if(monk.y + monk.height > camera.bottomInnerBoundary())
  {
    camera.y = Math.floor(monk.y + monk.height - (camera.height / 4 * 3));
  }
  
  //The camera's gameWorld boundaries
  if(camera.x < gameWorld.x)
  {
    camera.x = gameWorld.x;
  }
  if(camera.y < gameWorld.y)
  {
    camera.y = gameWorld.y;
  }
  if(camera.x + camera.width > gameWorld.x + gameWorld.width)
  {
    camera.x = gameWorld.x + gameWorld.width - camera.width;
  }
  if(camera.y + camera.height > gameWorld.height)
  {
    camera.y = gameWorld.height - camera.height;
  } 

};


