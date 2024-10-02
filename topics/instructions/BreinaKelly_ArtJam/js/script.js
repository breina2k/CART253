/**
 * The shape of coding
 * Breina Kelly
 * 
 * Just like the movie the shape of water but instead of falling in love with a fish
 * the girl just like coded a program where her mouse leaves behind a trail of varying shapes and lines
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
 * taking shape :)
*/
function draw() {
    if (shape === 'circle') {
        push();
        fill(
            map(mouseX, 0, width, 0, 255)
        );
        ellipse(mouseX, mouseY, circleSize);
        pop();
    }

    else if (shape === 'line') {
        push();
        stroke(
            map(mouseX, 0, width, 0, 255)
        );
        strokeWeight(lineWidth);
        line(0, mouseY, width, mouseY);
        pop();
    }

}

function keyPressed() {
    if (key === '1') {
        shape = 'circle';  // circle time
    } else if (key === '2') {
        shape = 'line';  // line time
    } else if (key === '0') {
        background(255);  // CLEAR
        shape = 'circle';
        circleSize = 100;
        lineWidth = 3;
    }


    if (shape === 'circle' && keyCode === UP_ARROW) {
        circleSize += 10;
    }
    if (shape === 'circle' && keyCode === DOWN_ARROW) {
        circleSize -= 10;
    }
    if (shape === 'line' && keyCode === UP_ARROW) {
        lineWidth += 1;
    }
    if (shape === 'line' && keyCode === DOWN_ARROW) {
        lineWidth -= 1;
    }
}