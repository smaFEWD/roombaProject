
// declared variables 
var arrayofStrings = [];
var totalNumOfPatches = 0;
var arrayOfPatches = [];
var cleanedPatches = [];
var nPatchesCleaned = 0;

// taking in the input.txt file - resources: https://stackoverflow.com/questions/6156501/read-a-file-one-line-at-a-time-in-node-js

require('fs').readFileSync('input.txt', 'utf-8').split(/\r?\n/).forEach(function(line){
  arrayofStrings.push(line);
});


// figuring out the dimension given from input.txt file, converting the array of strings to an array of integers
dimensionStrings = arrayofStrings[0].split(" ");
var dimensions = [];
dimensions[0] = parseInt(dimensionStrings[0]);
dimensions[1] = parseInt(dimensionStrings[1]);
// console.log("Dimensions are : " + dimensions[0] + "," + dimensions[1]);

// figuring out the initial position given from input.txt file - on the 2nd line, converting the array of strings to an array of integers
var initialPosStrings = arrayofStrings[1].split(" ");
var initialPos = [];
initialPos[0] = parseInt(initialPosStrings[0]);
initialPos[1] = parseInt(initialPosStrings[1]);
// console.log("Initial positions are: " + initialPos[0]+ "," +initialPos[1]);


// figuring out how many "dirty patches" from the input.txt file, from the 3rd and second to last lines, and converting the patches to an array of integers. 

for (let i = 2; i < arrayofStrings.length-1; i++){
	var patchPositions = arrayofStrings[i].split(" ");
	// console.log("This is patch #"+[i-1] + " and dimension are: " + patchPositions[0] + "," + patchPositions[1]);
	arrayOfPatches.push(patchPositions);
	cleanedPatches.push(false);
};

for(var i = 0; i < arrayOfPatches.length; i++) {
    var individualPatchArray = arrayOfPatches[i]
    for(var j = 0; j < individualPatchArray.length; j++) {
    	individualPatchArray[j] = parseInt(individualPatchArray[j]);
	}
};

// console.log (arrayOfPatches);

// taking the given directions, from last line of text seen on input.tx file, converting it to individual strings, then converting them to individual sets of arrays. 

var indexOfdirection = arrayofStrings.length - 1 
var directions  = arrayofStrings[indexOfdirection].split(" ");
// console.log("Directions are: " + directions);


totalNumOfPatches = arrayofStrings.length - 3;
// console.log("Total number of patches: " + totalNumOfPatches);

var lastItem = arrayofStrings[arrayofStrings.length-1];
// console.log(lastItem);
// converting : NNESEESWNWW to ['N', 'N', 'E', 'S','E', 'E', 'S', 'W','N', 'W', 'W']
var arrayOfNESW = lastItem.split('');

// console.log(arrayOfNESW);

// creating a coordinate object 
var coords = {
	n: [0,1],
	e: [1,0],
	s: [0,-1],
	w: [-1,0]
};

// converting ['N', 'N', 'E', 'S','E', 'E', 'S', 'W','N', 'W', 'W'] to [ 0, 1 ],  [ 0, 1 ], [ 1, 0 ],  [ 0, -1 ],[ 1, 0 ], [ 1, 0 ],[ 0, -1 ], [ -1, 0 ],[ 0, 1 ],  [ -1, 0 ], [ -1, 0 ]]
var arrayDirectionCoords = arrayOfNESW.map(function(letter){
	if (letter === 'N') {
		return letter = coords.n;
	} else if (letter === 'E') {
		return letter = coords.e 
	} else if (letter === 'S') {
		return letter = coords.s 
	} else if (letter === 'W') {
		return letter = coords.w
	}
});

// console.log( arrayDirectionCoords);

// creating a function to check if the dirty patch matches the movement of the roomba as it adds or subtracts positions from the initial position. 

function isDirtyPatch(nPos){
	for (let i=0; i<arrayOfPatches.length; i++){
		if (arrayOfPatches[i][0] === nextPos[0] && arrayOfPatches[i][1] === nextPos[1])
		{
			if(!cleanedPatches[i])
			{
				cleanedPatches[i]=true;
				return true;
			}
		}
	};
	return false;
};

// creating a function to determine if the move is valid. Roomba might be on the wall, so it can't move further (negative)

function isValidMove(currentPos, move){
		// checking left wall
	if((nextPos[0] === 0 && move[0] === -1) ||
		// checking right wall 
		(nextPos[0] === dimensions[0]-1 && move[0] === 1)||
		// checking bottom wall
		(nextPos[1] === 0 && move[1] === -1) ||
		// checking top wall 
		(nextPos[1] === dimensions[1]-1 && move[1] === 1)) {
			return false;
		}

		return true; 

};

// need to make it check the last action, this is needed to account for the roomba landing and checking to see if the last patch landed is dirty 
// we need to now do two checks - determine if roomba has a validMove and also if it has encountered a dirtyPatch, to account for it in our output of this file. 

var nextPos = initialPos
for (var i = 0; i<=arrayDirectionCoords.length; i++)
{
	if (isDirtyPatch(nextPos))
	{
		// console.log("Patch cleaned : " + nextPos)
		nPatchesCleaned++;
	};
	
	if(i != arrayDirectionCoords.length && isValidMove(nextPos, arrayDirectionCoords[i])){
		nextPos[0] += arrayDirectionCoords[i][0];
		nextPos[1] += arrayDirectionCoords[i][1];
	};
};


console.log(nextPos[0] + " " + nextPos[1]);
console.log(nPatchesCleaned);


