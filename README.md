## Introduction to the Roomba Project 

Directions for this project can be found here: https://gist.github.com/alirussell/2d200d21f117f8d570667daa7acdbae5

This program navigates an imaginary robotic hoover (much like a [Roomba](https://en.wikipedia.org/wiki/Roomba)) through an equally imaginary room based on:

* room dimensions as [X and Y coordinates](https://en.wikipedia.org/wiki/Cartesian_coordinate_system), identifying the top right corner of the room rectangle. This room is divided up in a grid based on these dimensions; a room that has dimensions X: 5 and Y: 5 has 5 columns and 5 rows, so 25 possible hoover positions. The bottom left corner is the point of origin for our coordinate system, so as the room contains all coordinates its bottom left corner is defined by X: 0 and Y: 0.
* locations of patches of dirt, also defined by X and Y coordinates identifying the bottom left corner of those grid positions.
* an initial hoover position (X and Y coordinates like patches of dirt)
* driving instructions (as [cardinal directions](https://en.wikipedia.org/wiki/Cardinal_direction) where e.g. N and E mean "go north" and "go east" respectively) 

The room will be rectangular, has no obstacles (except the room walls), no doors and all locations in the room will be clean (hoovering has no effect) except for the locations of the patches of dirt presented in the program input.

Placing the hoover on a patch of dirt ("hoovering") removes the patch of dirt so that patch is then clean for the remainder of the program run. The hoover is always on - there is no need to enable it.

Driving into a wall has no effect (the robot skids in place).

## Goal

The goal of the program is to take the room dimensions, the locations of the dirt patches, the hoover location and the driving instructions as input and to then output the following:

* The final hoover position (X, Y)
* The number of patches of dirt the robot cleaned up

## Input

Program input will be received in a file with the format described here. 

The file will be named `input.txt` and reside in the same directory as your executable program / web page.

Given a an input file with these sample coordinates and data: 

```
5 5
1 2
1 0
2 2
2 3
NNESEESWNWW
```
#Contraints to the input file: 
* The first line(ex: 5 5) holds the room dimensions (X Y), separated by a single space (all coordinates needs to be be presented in this format)
* The second line holds the hoover position and needs to be within the dimensions of the room. (ex: 1 2)
* The subsequent lines (examples in lines 3-5) contain the zero or more positions of patches of dirt (one per line), also needs to be within the dimensions of the room. 
* The last line in this file always contains the driving instructions (example: NNESEESWNWW) 

## Output

Program output to the terminal will show: 

* The first line: X and Y coordinates marking the position of the hoover after processing all commands.
* The second line of the program output displays the number of patches of dirt the robot cleaned up.

Example (matching the input above):

```
1 3
1
```

## Deliverable

The program:

* is command-line / terminal application
* must run on Mac OS X, Linux (x86-64) or in a modern browser
* written using NodeJS/Javascript

## How to access / run the program in your terminal: 
* This program can be downloaded from Github: https://github.com/smaFEWD/roombaProject
* It contains both the "read-file.js" and the "input.txt" file. 
* Run on terminal in the file path of this program: `node read-file.js `
* Requires: Node.js®, which is a JavaScript runtime built on Chrome's V8 JavaScript engine.
* Can download Node.js from here: https://nodejs.org/en/
* Different .txt files are contained in this repo and can be run on this program provided that you update the line of code that requires the file. Update this line of code (in line #11) to run a different .txt file : `require('fs').readFileSync('input.txt', 'utf-8').split(/\r?\n/).forEach(function(line){
  arrayofStrings.push(line);
});`

