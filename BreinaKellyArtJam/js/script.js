/**
 * The shape of coding
 * Breina Kelly
 * 
 * Just like the movie the shape of water but instead of falling in love with a fish
 * the girl just like codes a program where her mouse leaves behind a trail of varying shapes and lines
 */

"use strict";

let shape = 'circle';  // circle is default
let circleSize = 100; // 100 default circle size
let lineWidth = 3; // 3 default line width

/**
 * the no background thing didnt work for me why
*/
function setup() {
    createCanvas(windowWidth, windowHeight); //i want my canvas to be the whole screen
    background(255); //white bg
}


/**
 * taking shape
*/
function draw() {
    if (shape === 'circle') {
        push();
        fill(
            map(mouseX, 0, width, 0, 255)
        ); //colour maps in greyscale cuz im boring
        ellipse(mouseX, mouseY, circleSize); //circles follow mouse
        pop();
    }

    else if (shape === 'line') {
        push();
        stroke(
            map(mouseX, 0, width, 0, 255)
        );
        strokeWeight(lineWidth);
        line(0, mouseY, width, mouseY); //lines are made horizontally across the screen
        pop();
    }

    else if (shape === 'noshape') {
        push();
        pop();
    } //lets you move the mouse without drawing anything
}

//resets the screen
function reset() {
    background(255);  // CLEAR
    shape = 'circle';
    circleSize = 100;
    lineWidth = 3;
}

function keyPressed() {
    if (key === '1') {
        shape = 'circle';  // circle time
    } else if (key === '2') {
        shape = 'line';  // line time
    } else if (key === '3') {
        shape = 'noshape';  // so glad this works
    } else if (key === '0') {
        reset();
    }


    if (shape === 'circle' && keyCode === UP_ARROW) {
        circleSize += 10;
    } //makes circles bigger
    if (shape === 'circle' && keyCode === DOWN_ARROW) {
        circleSize -= 10;
    }//makes circles smaller
    if (shape === 'line' && keyCode === UP_ARROW) {
        lineWidth += 1;
    }//makes lines thicker
    if (shape === 'line' && keyCode === DOWN_ARROW) {
        lineWidth -= 1;
    }//makes lines thinner
}

/**
 *I've never actually seen the shape of water
 */