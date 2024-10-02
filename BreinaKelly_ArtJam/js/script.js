/**
 * The shape of coding
 * Breina Kelly
 * 
 * Just like the movie the shape of water but instead of falling in love with a fish
 * the girl just like coded a program where her mouse leaves behind a trail of varying shapes and lines
 */

"use strict";

/**
 * the no background thing didnt work for me why
*/
function setup() {
    createCanvas(windowWidth, windowHeight); //i want my canvas to be the whole screen
    background(255);
}


/**
 * taking shapee :)
*/
function draw() {
    push();
    fill(
        map(mouseX, 0, width, 0, 255)
    );
    ellipse(mouseX, mouseY, 100);
    pop();
}