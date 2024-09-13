/**
 * Drawing Module
 * Breina Kelly
 * 
 * Practicing and learning drawing functions in p5
 */

"use strict";

/**
 * OH LOOK I DIDN'T DESCRIBE SETUP!!
*/
function setup() {
    createCanvas(640,640);

}


/**
 * OOPS I DIDN'T DESCRIBE WHAT MY DRAW DOES!
*/
function draw() {
background(150,150,150);

//the red part
push();
fill(255,0,0);
stroke(255);
ellipse(320,320,480);
pop();

//the whit5 part
push();
fill("white");
noStroke();
ellipse(320,320,140,140);
pop();

//the little hole
push();
fill("#000000");
noStroke();
ellipse(320,320,20,20);
pop();

}