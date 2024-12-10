"use strict";

let levelSelection;
let state = "title";
let titleImg, bgImg;
let canvas;

function preload() {
    titleImg = loadImage('assets/images/title.png');
    bgImg = loadImage('assets/images/gameBG.png');
}

function setup() {
    canvas = createCanvas(640, 480);
    centerCanvas(); // center canvas function so html and css doesnt mess it up (it was messing it up)
    canvas.style('z-index', '1'); //canvas stays in the background
    canvas.style('position', 'absolute'); // canvas stays in place

    levelSelection = document.getElementById('levelSelection');
    levelSelection.style.display = 'none'; //menu starts out hidden for title screen
}

function draw() {
    if (state === "title") {
        title();
    } else if (state === "levels") {
        background(bgImg);
        levels();
    }
}

function title() {
    push();
    image(titleImg, 0, 0, width, height);
    pop();
}

function levels() {
    levelSelection.style.display = 'block'; //show levels menu
}

function mousePressed() {
    if (state === "title") {
        state = "levels";
    }
}

function goToLevel(level) { //this function is embedded in each level button in the html
    window.location.href = level; //the level html file linked in each button in the html
}

function centerCanvas() {
    const x = (windowWidth - width) / 2;
    const y = (windowHeight - height) / 2;
    canvas.position(x, y); //the position keept messing up this is a precautionary measure i just want it to stay centered
}

function windowResized() {
    centerCanvas(); // recenter the canvas whenever the window is resized
}
