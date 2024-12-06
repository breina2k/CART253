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

//the wizarrd hat you need to catch
const wizardHat = {
    x: 0,
    y: -100, // starting off the top
    size: 80,
    velocity: {
        x: 0,
        y: 0
    }, // the starting velocity aka not moving
    speed: 8, // how fast it'll go
    fill: "#ff0000", // red
    minDelay: 3000, // delay is how long the item will wait before it starts moving
    maxDelay: 7000,
    moving: false, // when items are moving, other items will not appear
};

//the wand you need to catch
const wizardWand = {
    x: 0,
    y: -100, // starting off the top
    size: 80,
    velocity: {
        x: 0,
        y: 0
    }, // the starting velocity aka not moving
    speed: 8, // how fast it'll go
    fill: "#4287f5", // blue
    minDelay: 3000, // delay is how long the item will wait before it starts moving
    maxDelay: 7000,
    moving: false, // when items are moving, other items will not appear
};

//the cape you need to catch
const wizardCape = {
    x: 0,
    y: -100, // starting off the screen
    size: 80,
    velocity: {
        x: 0,
        y: 0
    }, // the starting velocity aka not moving
    speed: 8, // how fast it'll go
    fill: "#ffdd00", // yellow
    minDelay: 3000, // delay is how long the item will wait beefore it starts moving
    maxDelay: 7000,
    moving: false, // when items are moving, other items will not appear
};

let state = "title"; //starting title screen
let counter = 0; //current score
let wizardWin = false; //youve gotta work for it
let resetButton;
let wizardHatImg, wizardWandImg, wizardCapeImg, bombImg, frogImg, titleImg, winImg, loseImg, nakedFrogImg, bgImg;

function preload() {
    wizardHatImg = loadImage('assets/images/wizardHatBubble.png');
    wizardWandImg = loadImage('assets/images/wizardWandBubble.png');
    wizardCapeImg = loadImage('assets/images/wizardCapeBubble.png');
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
    resetWizardHat();
    resetWizardWand();
    resetWizardCape();
}

function draw() {

    if (state === "title") {
        title(); //title page
    }
    else if (state === "wizard") {
        background(bgImg);
        moveBomb();
        moveFrog();
        moveWizardHat();
        moveWizardWand();
        moveWizardCape();

        drawProgressBar();
        drawBomb();
        drawFrog();
        drawWizardHat();
        drawWizardWand();
        drawWizardCape();

        checkTongueBombOverlap();
        checkTongueWizardHatOverlap();
        checkTongueWizardWandOverlap();
        checkTongueWizardCapeOverlap();
        // all functions used in gameplay

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


// function moveBomb() {
//     // moves bomb across the screen w speed
//     bomb.y += bomb.speed;
//     if (bomb.y > height) {
//         resetBomb(); // reset bomb to left off the screen
//     }
// }

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


// function moveWizardHat() {
//     wizardHat.y += wizardHat.velocity.y; //move hat along x axis w set velocity
//     if (wizardHat.y > height) {
//         resetWizardHat(); //reset hat when it moves off the  screen
//     }
// }

// function moveWizardWand() {
//     wizardWand.y += wizardWand.velocity.y; //move hat along x axis w set velocity
//     if (wizardWand.y > height) {
//         resetWizardWand(); //reset hat when it moves off the  screen
//     }
// }

// function moveWizardCape() {
//     wizardCape.y += wizardCape.velocity.y; //move hat along x axis w set velocity
//     if (wizardCape.y > height) {
//         resetWizardCape(); //reset hat when it moves off the  screen
//     }

// }



function resetGame() {
    //reset all the variables to default
    progressBar = 0;
    wizardHat.caught = false;
    wizardWand.caught = false;
    wizardCape.caught = false;
    resetBomb();
    resetWizardHat();
    resetWizardWand();
    resetWizardCape();
    state = "title"; //bring back to titlescreen
}


function resetBomb() {
    bomb.x = random(50, width - 50); //evenly distributes the random bombs
    bomb.y = -100; // start bomb off screen
}

function resetWizardHat() {
    // stops moving
    wizardHat.velocity.y = 0;
    wizardHat.x = random(50, width - 50); //gives item random x value
    wizardHat.y = -100; //starts itemoff screen
    wizardHat.moving = false;
    // calculates a new delay
    const delay = random(wizardHat.minDelay, wizardHat.maxDelay);
    setTimeout(startWizardHat, delay);
}


function resetWizardWand() {
    wizardWand.velocity.y = 0;
    wizardWand.x = random(50, width - 50);
    wizardWand.y = -100;
    wizardWand.moving = false;
    const delay = random(wizardWand.minDelay, wizardWand.maxDelay);
    setTimeout(startWizardWand, delay);
}

function resetWizardCape() {
    wizardCape.velocity.y = 0;
    wizardCape.x = random(50, width - 50);
    wizardCape.y = -100;
    wizardCape.moving = false;
    const delay = random(wizardCape.minDelay, wizardCape.maxDelay);
    setTimeout(startWizardCape, delay);
}

// function startWizardHat() {
//     if (!wizardWand.moving && !wizardCape.moving) { //if wizard hat isnt caught and the others arent moving
//         wizardHat.velocity.y = wizardHat.speed; //change the velocity from 0 to set speed
//         wizardHat.moving = true;

//     }

//     else {
//         resetWizardHat(); //reset so it waits for its turn and keeps checking w start function
//     }

// }

// function startWizardWand() {
//     if (!wizardHat.moving && !wizardCape.moving) { //if wizard wand isnt caught and the others arent moving
//         wizardWand.velocity.y = wizardWand.speed; //change the velocity from 0 to set speed
//         wizardWand.moving = true;
//     }

//     else {
//         resetWizardWand();
//     }

// }

// function startWizardCape() {
//     if (!wizardHat.moving && !wizardWand.moving) { //if wizard cape isnt caught and the others arent moving
//         wizardCape.velocity.y = wizardCape.speed; //change the velocity from 0 to set speed
//         wizardCape.moving = true;
//     }

//     else {
//         resetWizardCape();
//     }

// }


function drawCounter() {
    push();
    fill("white");
    noStroke();
    textSize(64);
    textStyle(BOLD);
    textAlign(RIGHT, TOP);
    text(counter + " / 3", width - 20, 20); //this setup lets me embed my counter variable into a  string of text! atleast thats what google told me
}


function drawBomb() {
    push();
    noStroke();
    image(bombImg, bomb.x, bomb.y, 80, 80); //loading bomb img andddd ensuring width & height are set
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

function drawWizardHat() {
    push();
    image(wizardHatImg, wizardHat.x, wizardHat.y, 80, 80); //loading bubble imagess
    pop();
}

function drawWizardWand() {
    push();
    image(wizardWandImg, wizardWand.x, wizardWand.y, 80, 80);
    pop();
}

function drawWizardCape() {
    push();
    image(wizardCapeImg, wizardCape.x, wizardCape.y, 80, 80);
    pop();
}


function checkTongueBombOverlap() {
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

function checkTongueWizardHatOverlap() {
    const d = dist(frog.body.x, frog.body.y, wizardHat.x, wizardHat.y);
    const eaten = (d < frog.body.size / 2 + wizardHat.size / 2);

    if (eaten && wizardHat.moving) { //item gets stuck in an infinite caught loop if i dont do this...wtf
        counter = counter + 1; //increase the counter by one
        wizardHat.moving = false; // state that it is no longer moving
        resetWizardHat();
        if (progressBar >= 10) {
            state = "win"; //check if all three are true, then change state
            wizardWin = true;
        }
    }
}

function checkTongueWizardWandOverlap() {
    const d = dist(frog.body.x, frog.body.y, wizardWand.x, wizardWand.y);
    const eaten = (d < frog.body.size / 2 + wizardWand.size / 2);

    if (eaten && wizardWand.moving) {
        counter = counter + 1; //increase the counter by one
        wizardWand.moving = false;
        resetWizardWand();
        if (progressBar >= 10) {
            state = "win";
            wizardWin = true;
        }
    }
}

function checkTongueWizardCapeOverlap() {
    const d = dist(frog.body.x, frog.body.y, wizardCape.x, wizardCape.y);
    const eaten = (d < frog.body.size / 2 + wizardCape.size / 2);

    if (eaten && wizardCape.moving) {
        counter = counter + 1; //increase the counter by one
        wizardCape.moving = false;
        resetWizardCape();
        if (progressBar >= 10) {
            state = "win";
            wizardWin = true;
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


