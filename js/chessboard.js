var size = 8;

var board = "";

for (var x = 0; x < size; x++) {
    for (var y = 0; y < size; y++) {
        if ((x + y) % 2 === 0) 
            board += " ";
         else 
            board += "#";
    }
    board += "\n";
}

console.log(board);