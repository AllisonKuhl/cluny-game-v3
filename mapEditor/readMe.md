Want to try making your own explorable Abbey? Well, NOW YOU CAN!! All you need to do is follow the few simple steps below.

# Create your own map in Excel

Download the excel file in this folder. This file will help you visualize the map you would like to create. Each number represents a different type of block. 
1 = grass
2 = the floor
3 = walls
and so forth. A complete legend can be found in the second sheet. 

Try typing in a 3 somewhere in the sheet. It will change colour to a dark grey. Congratulations! You have created a wall. 

# Save the map as a CSV

So after filling a rectangle up with the blocks of your choice, you now have a map that is ready to export! The first thing to do is to save your sheet as a csv file. (Comma seperated values). This should be as easy as a simple "Save as". It will warn you that you may experience a loss of value and you can only save one sheet, yada yada, just click okay. And you're a-ok.

# Open up the csv in Notepad ++. 

Now, open your csv in a text editor of your choice. Preferable Notepad++, but as long as it has a good search and replace tool it's fine. 

Your search will be for: \r\n
(Also, make sure that extended search is on! This is not just your basic search here. This is advanced searching.)

You will replace it with: ],\n[

Alright, go ahead and replace all. Now you should have something whose first lines looks something like this: 

1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],

Now at the top of file, on the very first line, type: var map = [[

It should look like:

var map = [[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],

Now go to the end of the file. It will look something like this: 

[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
[

Delete those last two characters there, we don't want them, they are garbage. Replace them with a nice conclusive ];

So now we have, on the final line of our file: 

[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
];

Beautiful. A beautifully formated array of arrays.  

# Save the file as myMap.js

This is very important. The name of the file must be myMap, and the extension must be .js  (a javascript file). Make sure it is in the same folder (mapEditor) as the excel file. 

# YOU DID IT!

Hopefully it should work now. Go ahead and open the main monkSimulator.html file. Now your monk will be able to explore your monastary!! Unless... there happens to be a wall where he spawns, haha. He will always show up in the same spot for now so make sure there is a floor in that area for him to walk around in... I will change this eventually. You can change his starting position in main.js. 

Also, there are currently only a few blocks that you can add to the map. Obviously this will change in the future. Let me know if you have any requests. Thanks for reading.



