/**
 * Frog
 * Breina Kelly
 * 
 * Pond City is in danger! Evil Frog is mad af and the player needs to collect wizard frogs costume so he can fight!
 *  They'll do this by catching the correct set of items by moving the center frog and launching the tongue to capture the item.
 * Catch the three right items and you've won! Catch the wrong item and Evil Frog wins :(
 * 
 * Instructions (for me, real instructions will be in Read Me):
 * - Start game screen... where you start the game
 * - Real quick run down screen
 * - Move the frog with your mouse
 * - Click to launch the tongue
 * - Catch set of 3 correct item bubbles
 * - Bubble pop animation may kill me, I'll see what I can do
 * - x/3 counter up top right
 * - If right set: congrats screen, then back to unlock screen
 * - If wrong set: Evil Frog won screen, restart game, no mercy, the fate of Pond City was in YOUR hands
 * - If wrong set: they believed in you... (guilt trip player)
 * - Once all four frogs are unlocked: super cool cut scene of Super Frogs beating Evil Frog, no animation just picture, who do u think i am
 * - Game Over
 * 
 * Made with p5
 * https://p5js.org/
 */

"use strict";

// Our frog
const frog = {
    // The frog's body has a position and size
    body: {
        x: 320,
        y: 420,
        size: 100,
    },
};

//the bomb you have to avoid
const bomb = {
    x: 0,
    y: 0, // Will be random
    size: 80,
    speed: 10 // it was too easy to win, bombs can run now
};


let state = "title"; //starting title screen
let progressBar = 0; //current score
let wizardWin = false; //youve gotta work for it
let resetButton;
let bombImg, frogImg, titleImg, winImg, loseImg, nakedFrogImg, bgImg;

let wizardItems = [
    { x: 0, y: 0, size: 80, caught: false, img: null }, // wizard Hat
    { x: 0, y: 0, size: 80, caught: false, img: null }, // wizard Wand
    { x: 0, y: 0, size: 80, caught: false, img: null }, // wizard Cape
];

function preload() {
    wizardItems[0].img = loadImage('assets/images/wizardHatBubble.png');
    wizardItems[1].img = loadImage('assets/images/wizardWandBubble.png');
    wizardItems[2].img = loadImage('assets/images/wizardCapeBubble.png');
    bombImg = loadImage('assets/images/bomb.png');
    frogImg = loadImage('assets/images/wizardFrog.png');
    titleImg = loadImage('assets/images/title.png');
    winImg = loadImage('assets/images/win.png');
    loseImg = loadImage('assets/images/lose.png');
    nakedFrogImg = loadImage('assets/images/nakedFrog.png');
    bgImg = loadImage('assets/images/gameBG.png');
} //preloading all images used & giving them names to call on

//creates a canvas and sets up the items off screen
function setup() {
    createCanvas(640, 480);

    // start positions
    resetBomb();
    resetWizardItems();
}

function draw() {

    if (state === "title") {
        title(); //title page
    }
    else if (state === "wizard") {
        background(bgImg);
        moveFrog();

        drawProgressBar();
        drawFrog();
        drawBomb();
        drawWizardItems();

        checkFrogWizardItemsOverlap();
        checkFrogBombOverlap();

    }

    //win page
    else if (state === "win") {
        win();
    }

    //lose page
    else if (state === "lose") {
        lose();
    }

}

function title() {
    push();
    image(titleImg, 0, 0, width, height); //fullscreen
    pop();
}

function win() {
    push();
    image(winImg, 0, 0, width, height);
    pop();
}

function lose() {
    push();
    image(loseImg, 0, 0, width, height);
    pop();
}

/**
 * Displays the tongue (tip and line connection) and the frog (body)
 */
function drawFrog() {
    // Draw the frog's body
    push();
    fill("#c2d64f");
    noStroke();
    image(nakedFrogImg, frog.body.x - 125, frog.body.y - 105, 250, 250); //picture anchorpoint was wonky needed to adjust
    pop();
}


function moveFrog() {
    if (keyIsDown(LEFT_ARROW)) {
        frog.body.x -= 3; // moves frog left when left arrow is held down
    }
    if (keyIsDown(RIGHT_ARROW)) {
        frog.body.x += 3; // moves frog right when right arrow is held down
    }
    if (keyIsDown(UP_ARROW)) {
        frog.body.y -= 3; // moves frog up when up arrow is held down
    }
    if (keyIsDown(DOWN_ARROW)) {
        frog.body.y += 3; // moves frog down when down arrow is held down
    }
}


function resetGame() {
    //reset all the variables to default
    progressBar = 0;
    wizardHat.caught = false;
    wizardWand.caught = false;
    wizardCape.caught = false;
    resetBomb();
    resetWizardItems();
    state = "title"; //bring back to titlescreen
}


function resetBomb() {
    bomb.x = random(50, width - 50); //evenly distributes the random bombs
    bomb.y = -100; // start bomb off screen
}

function resetWizardItems() {
    for (let item of wizardItems) {
        item.x = random(0, width);
        item.y = random(0, height);
        item.caught = false;
    }
}



function drawProgressBar() {
    push();
    //progress bar outline
    noFill();
    stroke(255);
    strokeWeight(4);
    rect(450, 20, width / 4, 20, 10); //top left, 1/4 of the screen width with rounded corners!

    //progress bar fill apparently i can draw both of these in the same function! cool!
    fill("white");
    noStroke();
    rect(450, 20, (progressBar / 10) * (width / 4), 20, 10);
    pop();
}


function drawBomb() {
    push();
    noStroke();
    image(bombImg, bomb.x, bomb.y, 80, 80); //loading bomb img andddd ensuring width & height are set
    pop();
}

function drawWizardItems() {
    for (let item of wizardItems) {
        if (!item.caught) {
            image(item.img, item.x - item.size / 2, item.y - item.size / 2, item.size, item.size);
        }
    }
}





function checkFrogBombOverlap() {
    const frogOverlapX = frog.body.x - 50; // adjusted for centering overlap
    // Get distance from tongue to fly
    const d = dist(frogOverlapX, frog.body.y, bomb.x, bomb.y);
    // Check if it's an overlap
    const eaten = (d < frog.body.size / 2 + bomb.size / 2);
    if (eaten) {
        state = "lose";
        // Reset the bomb
        resetBomb();
    }
}

function checkFrogWizardItemsOverlap() {
    for (let item of wizardItems) {
        const d = dist(frog.body.x, frog.body.y, item.x, item.y);
        const eaten = (d < frog.body.size / 2 + item.size / 2);
        if (eaten && !item.caught) {
            item.caught = true;
            progressBar++;
            if (progressBar === wizardItems.length) { // <-- Corrected to check progressBar
                state = "win";
            }
        }
    }
}


function mousePressed() {

    if (state === "title") {
        state = "wizard"; //if state is title, swicth to gameplau on click
    }
    else if (state === "win" || state === "lose") {
        resetGame();
        state = "title"; //if player is on the win orr lose screen, click to restart the game
    }
}


