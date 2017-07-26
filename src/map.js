
var map = [
['G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G'],
['G','G','W','W','W' ,'W','W','W','G','G','G','G','G','G','G','G','G','G','G','G','G','G'],
['G','G','W','F','F','F','F','W','G','G','G','G','G','G','G','G','G','G','G','G','G','G'],
['G','G','W','F','F','F','F','W','G','G','G','G','G','G','G','G','G','G','G','G','G','G'],
['G','G','W','F','D','D','F','W','G','G','G','G','G','G','G','G','G','G','G','G','G','G'],
['W','W','W','F','F','F','F','W','W','W','G','W','W','W','W','W','W','W','W','W','G','G'],
['W','F','F','F','F','F','F','F','F','W','G','W','F','F','F','F','F','F','F','W','G','G'],
['W','F','F','F','F','F','F','F','F','W','G','W','F','W','F','W','F','W','F','W','G','G'],
['W','F','F','F','F','F','F','F','F','W','G','W','F','F','G','G','G','F','F','W','G','G'],
['W','W','W','F','F','F','F','W','W','W','W','W','F','W','G','B','G','W','F','W','G','G'],
['G','G','W','F','F','F','F','F','F','F','F','F','F','F','G','G','G','F','F','W','G','G'],
['G','G','W','F','F','F','F','W','W','W','W','W','F','W','F','W','F','W','F','W','G','G'],
['G','G','W','F','F','F','F','W','G','G','G','W','F','F','F','F','F','F','F','W','G','G'],
['G','G','W','F','F','F','F','W','G','G','G','W','W','W','F','F','W','W','W','W','G','G'],
['G','G','W','F','F','F','F','W','G','G','G','G','G','W','F','F','W','G','G','G','G','G'],
['G','G','W','F','F','F','F','W','G','G','G','W','W','W','F','F','W','W','W','G','G','G'],
['G','G','W','W','D','D','W','W','G','G','G','W','F','F','F','F','F','F','W','G','G','G'],
['G','G','G','G','G','G','G','G','G','G','G','W','D','D','F','F','D','D','W','G','G','G'],
['G','G','G','G','G','G','G','G','G','G','G','W','F','F','F','F','F','F','W','G','G','G'],
['G','G','G','G','G','G','G','G','G','G','G','W','D','D','F','F','D','D','W','G','G','G'],
['G','G','G','G','G','G','G','G','G','G','G','W','F','F','F','F','F','F','W','G','G','G'],
['G','G','G','G','G','G','G','G','G','G','G','W','D','D','F','F','D','D','W','G','G','G'],
['G','G','G','G','G','G','G','G','G','G','G','W','F','F','F','F','F','F','W','G','G','G'],
['G','G','G','G','G','G','G','G','G','G','G','W','W','W','W','W','W','W','W','G','G','G'],
['G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G']]


var canvas = document.querySelector("canvas"); 


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




