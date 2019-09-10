// var myArgs = process.argv.slice(2);
// console.log('myArgs: ', myArgs);
// if(myArgs.length < 1)
// {
// 	console.log ("Usage: <script-name> <file-name>");
// 	console.log ("Exiting.");
// 	return false;
// }
// var filename = myArgs[0];

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

// check if there is at least three lines of instruction
// check if the first two lines each have two numbers
// check if the starting position is inside the dimensions
// check if the third line -- in case of 3 lines -- is a valid direction set
// if there are more than 3 lines, that means there are patches
//	then check if there are two numbers for each patch coordinate
//	and check if the patches are located inside the grid map -- just like the initial-position-check


dimensionStrings = arrayofStrings[0].split(" ");
var dimensions = [];
dimensions[0] = parseInt(dimensionStrings[0]);
dimensions[1] = parseInt(dimensionStrings[1]);
// console.log(dimensions);
console.log("Dimensions are : " + dimensions[0] + "," + dimensions[1]);

var initialPosStrings = arrayofStrings[1].split(" ");
var initialPos = [];
initialPos[0] = parseInt(initialPosStrings[0]);
initialPos[1] = parseInt(initialPosStrings[1]);
// console.log(initialPos);
console.log("Initial positions are: " + initialPos[0]+ "," +initialPos[1]);


for (let i = 2; i < arrayofStrings.length-1; i++){
	var patchPositions = arrayofStrings[i].split(" ");
	console.log("This is patch #"+[i-1] + " and dimension are: " + patchPositions[0] + "," + patchPositions[1]);
	arrayOfPatches.push(patchPositions);
	cleanedPatches.push(false);
};

for(var i = 0; i < arrayOfPatches.length; i++) {

    var individualPatchArray = arrayOfPatches[i]

    for(var j = 0; j < individualPatchArray.length; j++) {

    	individualPatchArray[j] = parseInt(individualPatchArray[j]);
	}
};

console.log (arrayOfPatches);

var indexOfdirection = arrayofStrings.length - 1 
var directions  = arrayofStrings[indexOfdirection].split(" ");
console.log("Directions are: " + directions);


totalNumOfPatches = arrayofStrings.length - 3;
console.log("Total number of patches: " + totalNumOfPatches);


var lastItem = arrayofStrings[arrayofStrings.length-1];
console.log(lastItem);
var arrayOfNESW = lastItem.split('');
console.log(arrayOfNESW);

var coords = {
	n: [0,1],
	e: [1,0],
	s: [0,-1],
	w: [-1,0]
};

var newSet = arrayOfNESW.map(function(letter){
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

console.log( newSet);

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

var nextPos = initialPos

for (var i = 0; i<=newSet.length; i++)
{
	if (isDirtyPatch(nextPos))
	{
		console.log("Patch cleaned : " + nextPos)
		nPatchesCleaned++;
	};
	if(i != newSet.length && isValidMove(nextPos, newSet[i])){
		nextPos[0] += newSet[i][0];
		nextPos[1] += newSet[i][1];
	};
};

console.log(nextPos[0] + " " + nextPos[1]);
console.log(nPatchesCleaned);