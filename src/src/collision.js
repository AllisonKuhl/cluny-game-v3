//from "Foundation Game Design"
//by Rex van Spuy

function hitTestPoint(pointX, pointY, sprite)
{  
  var hit 
    = pointX > sprite.x && pointX < sprite.x + sprite.width
    && pointY > sprite.y && pointY < sprite.y + sprite.height;
    
  return hit;
}

//hitTestCircle

function hitTestCircle(c1, c2)
{
  //Calculate the vector between the circles’ center points
  var vx = c1.centerX() - c2.centerX();
  var vy = c1.centerY() - c2.centerY();
  
  //Find the distance between the circles by calculating
  //the vector's magnitude (how long the vector is)  
  var magnitude = Math.sqrt(vx * vx + vy * vy);
  
  //Add together the circles' total radii
  var totalRadii = c1.halfWidth() + c2.halfWidth();
  
  //Set hit to true if the distance between the circles is
  //less than their totalRadii
  var hit = magnitude < totalRadii;
  
  return hit;
}

//blockCircle

function blockCircle(c1, c2)
{  
  //Calculate the vector between the circles’ center points
  var vx = c1.centerX() - c2.centerX();
  var vy = c1.centerY() - c2.centerY();
  
  //Find the distance between the circles by calculating
  //the vector's magnitude (how long the vector is) 
  var magnitude = Math.sqrt(vx * vx + vy * vy);
  
  //Add together the circles' combined half-widths
  var combinedHalfWidths = c1.halfWidth() + c2.halfWidth();
  
  //Figure out if there's a collision
  if(magnitude < combinedHalfWidths)
  {
    //Yes, a collision is happening.
    //Find the amount of overlap between the circles 
    var overlap = combinedHalfWidths - magnitude;
    
    //Normalize the vector.
    //These numbers tell us the direction of the collision
    dx = vx / magnitude;
    dy = vy / magnitude;

    //Move circle 1 out of the collision by multiplying
    //the overlap with the normalized vector and add it to 
    //circle 1's position
    c1.x += overlap * dx; 
    c1.y += overlap * dy;
  }
}

//hitTestRectangle

function hitTestRectangle(r1, r2)
{
  //A variable to determine whether there's a collision
  var hit = false;
  
  //Calculate the distance vector
  var vx = r1.centerX() - r2.centerX();
  var vy = r1.centerY() - r2.centerY();
  
  //Figure out the combined half-widths and half-heights
  var combinedHalfWidths = r1.halfWidth() + r2.halfWidth();
  var combinedHalfHeights = r1.halfHeight() + r2.halfHeight();

  //Check for a collision on the x axis
  if(Math.abs(vx) < combinedHalfWidths)
  {
    //A collision might be occuring. Check for a collision on the y axis
    if(Math.abs(vy) < combinedHalfHeights)
    {
      //There's definitely a collision happening
      hit = true;
    }
    else
    {
      //There's no collision on the y axis
      hit = false;
    }   
  }
  else
  {
    //There's no collision on the x axis
    hit = false;
  }
  
  return hit;
}

//blockRectangle

function blockRectangle(r1, r2)
{
  //A variable to tell us which side the 
  //collision is occurring on
  var collisionSide = "";
  
  //Calculate the distance vector
  var vx = r1.centerX() - r2.centerX();
  var vy = r1.centerY() - r2.centerY();
  
  //Figure out the combined half-widths and half-heights
  var combinedHalfWidths = r1.halfWidth() + r2.halfWidth();
  var combinedHalfHeights = r1.halfHeight() + r2.halfHeight();
    
  //Check whether vx is less than the combined half widths 
  if(Math.abs(vx) < combinedHalfWidths) 
  {
    //A collision might be occurring! 
    //Check whether vy is less than the combined half heights 
    if(Math.abs(vy) < combinedHalfHeights)
    {
      //A collision has occurred! This is good! 
      //Find out the size of the overlap on both the X and Y axes
      var overlapX = combinedHalfWidths - Math.abs(vx);
      var overlapY = combinedHalfHeights - Math.abs(vy);
        
      //The collision has occurred on the axis with the
      //*smallest* amount of overlap. Let's figure out which
      //axis that is
        
      if(overlapX >=  overlapY)
      {
        //The collision is happening on the X axis 
        //But on which side? vy can tell us
        if(vy > 0)
        {
          collisionSide = "top";
            
          //Move the rectangle out of the collision
          r1.y = r1.y + overlapY;
        }
        else 
        {
          collisionSide = "bottom";
          
          //Move the rectangle out of the collision
          r1.y = r1.y - overlapY;
        }
      } 
      else 
      {
        //The collision is happening on the Y axis 
        //But on which side? vx can tell us
        if(vx > 0)
        {
          collisionSide = "left";
            
          //Move the rectangle out of the collision
          r1.x = r1.x + overlapX;
        }
        else 
        {
          collisionSide = "right";
            
          //Move the rectangle out of the collision
          r1.x = r1.x - overlapX;
        }
      } 
    }
    else 
    {
      //No collision
      collisionSide = "none";
    }
  } 
  else 
  {
    //No collision
    collisionSide = "none";
  }
  
  return collisionSide;
}