//--- The sprite object

function spriteObject(sx,sy,x,y,width,height, solid){
  this.state = 0;
  this.sourceX = sx;
  this.sourceY = sy;
  this.sourceWidth = width;
  this.sourceHeight = height;
  this.width = width;
  this.height = height;
  this.x = x;
  this.y = y;
  this.vx = 0;
  this.vy = 0;
  this.solid = solid;
   
    //Getters
  this.centerX = function()
  {
    return this.x + (this.width / 2);
  };
  this.centerY = function()
  {
    return this.y + (this.height / 2);
  };
  this.halfWidth = function()
  {
    return this.width / 2;
  };
  this.halfHeight = function()
  {
    return this.height / 2;
  };
	
}



function Monk() {
	spriteObject.call(this,80,40,0,0,25,35,true);

  this.switchState = function(direction)
  {
	if (direction == "up") {
		this.state = 1;
	}
	if (direction == "down") {
		this.state = 0;
	}
	if (direction == "left") {
		this.state = 2;
	}
	if (direction == "right") {
		this.state = 3;
	}
  };
   
}

var tiles = [];

var createSpriteArray = function() 
{ 

	// load tile sheet
		var row = -40;
		var column = -40;
		for (i = 0; i < map.length; i++){
			row = -40;
			column += 40;
			for (j = 0; j < map[i].length; j++){
				row +=40;
			
			//grass
			if (map[i][j] == "G"){
				tiles.push(new spriteObject(80,0,row,column,40,40,false));
			}
			
			//floor
			if (map[i][j] ==  "F"){
				tiles.push(new spriteObject(40,0,row,column,40,40,false));
			}
			//wall	
			if (map[i][j] == "W"){
				tiles.push(new spriteObject(0,0,row,column,40,40,true));
			}
			
			//wood
			if (map[i][j] == "D"){
				tiles.push(new spriteObject(0,40,row,column,40,40,true));
			}
			
			//water
			if (map[i][j] == "B"){
				tiles.push(new spriteObject(40,40,row, column,40,40,true));
			}
		}		
	}

}


var monk = new Monk(80,40,25,35,true);

