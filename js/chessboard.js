// sets board size, width and height
var size = 8;

// creates a blank board
var board = "";

//sets x and y to be less than 8 chars in length
for (var x = 0; x < size; x++) {
    for (var y = 0; y < size; y++) {
        //alternates between hash and space on board
        if ((x + y) % 2 === 0) 
            board += " ";
         else 
            board += "#";
    }
    //adds a line break for each row
    board += "\n";
}

console.log(board);