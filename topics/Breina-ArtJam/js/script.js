/**
 * Art Jam, my second favourite  kind next to blueberry
 * Breina Kelly
 * 
 * I WILL HAVE A DESCRIPTION HERE ONCE I KNOW WHAT IM DOING
 */

"use strict";



/**
 * OH LOOK I DIDN'T DESCRIBE SETUP!!
*/
function setup() {

    background();

}


/**
 * OOPS I DIDN'T DESCRIBE WHAT MY DRAW DOES!
*/
function draw() {

    push();
    fill(map(mouseX, 0, 100, 0, 255));
    ellipse(mouseX, mouseY, 100);
    pop();

}