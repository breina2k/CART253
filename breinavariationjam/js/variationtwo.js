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
        size: 200
    },
    // The frog's tongue has a position, size, speed, and state
    // tongue: {
    //     x: undefined,
    //     y: 480,
    //     size: 20,
    //     speed: 20,
    //     // Determines how the tongue moves each frame
    //     state: "idle" // State can be: idle, outbound, inbound
    // }
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
    caught: false, // item is currently not caught, when it is, itll stop appearing, and add 1 to counter
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
    caught: false, // item is currently not caught, when it is, itll stop appearing, and add 1 to counter
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
    caught: false, // item is currently not caught, when it is, itll stop appearing, and add 1 to counter
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
        // moveTongue();
        moveWizardHat();
        moveWizardWand();
        moveWizardCape();

        drawCounter();
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


function moveBomb() {
    // moves bomb across the screen w speed
    bomb.y += bomb.speed;
    if (bomb.y > height) {
        resetBomb(); // reset bomb to left off the screen
    }
}

function moveFrog() {
    frog.body.x = mouseX;
} //frog movees along x according to mouse position


// /**
//  * Handles moving the tongue based on its state
//  */
// function moveTongue() {
//     // Tongue matches the frog's x
//     frog.tongue.x = frog.body.x;
//     // If the tongue is idle, it doesn't do anything
//     if (frog.tongue.state === "idle") {
//         // Do nothing
//     }
//     // If the tongue is outbound, it moves up
//     else if (frog.tongue.state === "outbound") {
//         frog.tongue.y += -frog.tongue.speed;
//         // The tongue bounces back if it hits the top
//         if (frog.tongue.y <= 0) {
//             frog.tongue.state = "inbound";
//         }
//     }
//     // If the tongue is inbound, it moves down
//     else if (frog.tongue.state === "inbound") {
//         frog.tongue.y += frog.tongue.speed;
//         // The tongue stops if it hits the bottom
//         if (frog.tongue.y >= height) {
//             frog.tongue.state = "idle";
//         }
//     }
// }

function moveWizardHat() {
    wizardHat.y += wizardHat.velocity.y; //move hat along x axis w set velocity
    if (wizardHat.y > height) {
        resetWizardHat(); //reset hat when it moves off the  screen
    }
}

function moveWizardWand() {
    wizardWand.y += wizardWand.velocity.y; //move hat along x axis w set velocity
    if (wizardWand.y > height) {
        resetWizardWand(); //reset hat when it moves off the  screen
    }
}

function moveWizardCape() {
    wizardCape.y += wizardCape.velocity.y; //move hat along x axis w set velocity
    if (wizardCape.y > height) {
        resetWizardCape(); //reset hat when it moves off the  screen
    }

}



function resetGame() {
    //reset all the variables to default
    counter = 0;
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
    wizardHat.x = random(50, width - 50);
    // hat moves back to left side
    wizardHat.y = -100;
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

function startWizardHat() {
    if (!wizardHat.caught && !wizardWand.moving && !wizardCape.moving) { //if wizard hat isnt caught and the others arent moving
        wizardHat.velocity.y = wizardHat.speed; //change the velocity from 0 to set speed
        wizardHat.moving = true;

    }

    else {
        resetWizardHat(); //reset so it waits for its turn and keeps checking w start function
    }

}

function startWizardWand() {
    if (!wizardWand.caught && !wizardHat.moving && !wizardCape.moving) { //if wizard wand isnt caught and the others arent moving
        wizardWand.velocity.y = wizardWand.speed; //change the velocity from 0 to set speed
        wizardWand.moving = true;
    }

    else {
        resetWizardWand();
    }

}

function startWizardCape() {
    if (!wizardCape.caught && !wizardHat.moving && !wizardWand.moving) { //if wizard cape isnt caught and the others arent moving
        wizardCape.velocity.y = wizardCape.speed; //change the velocity from 0 to set speed
        wizardCape.moving = true;
    }

    else {
        resetWizardCape();
    }

}


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
    // // Draw the tongue tip
    // push();
    // fill("#b23657");
    // noStroke();
    // ellipse(frog.tongue.x, frog.tongue.y, frog.tongue.size);
    // pop();

    // // Draw the rest of the tongue
    // push();
    // stroke("#b23657");
    // strokeWeight(frog.tongue.size);
    // line(frog.tongue.x, frog.tongue.y, frog.body.x, frog.body.y);
    // pop();

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
    // Get distance from tongue to fly
    const d = dist(frog.body.x, frog.body.y, bomb.x, bomb.y);
    // Check if it's an overlap
    const eaten = (d < frog.body.size / 2 + bomb.size / 2);
    if (eaten) {
        state = "lose";
        // Reset the bomb
        resetBomb();
        // Bring back the tongue
        // frog.tongue.state = "inbound";
    }
}

function checkTongueWizardHatOverlap() {
    const d = dist(frog.body.x, frog.body.y, wizardHat.x, wizardHat.y);
    const eaten = (d < frog.body.size / 2 + wizardHat.size / 2);

    if (eaten) {
        counter = counter + 1;  // increase the counter
        wizardHat.caught = true; // set caught to true
        wizardHat.moving = false; // state that it is no longer moving
        if (wizardHat.caught && wizardWand.caught && wizardCape.caught) {
            state = "win"; //check if all three are true, then change state
            wizardWin = true;
        }
        // stop it from moving
        wizardHat.velocity.x = 0;
        // move it off the screen
        wizardHat.x = -10000;
        // // Bring back the tongue
        // frog.tongue.state = "inbound";
    }
}

function checkTongueWizardWandOverlap() {
    const d = dist(frog.body.x, frog.body.y, wizardWand.x, wizardWand.y);
    const eaten = (d < frog.body.size / 2 + wizardWand.size / 2);

    if (eaten) {
        counter = counter + 1; //increase counter by one
        wizardWand.caught = true; //declare it caught
        wizardWand.moving = false; //declare it not moving
        if (wizardHat.caught && wizardWand.caught && wizardCape.caught) {
            state = "win"; //check if all three conditions are met then change to win screen
            wizardWin = true;
        }

        wizardWand.velocity.x = 0;
        wizardWand.x = -10000;
        // frog.tongue.state = "inbound";
    }
}

function checkTongueWizardCapeOverlap() {
    const d = dist(frog.body.x, frog.body.y, wizardCape.x, wizardCape.y);
    const eaten = (d < frog.body.size / 2 + wizardCape.size / 2);

    if (eaten) {
        counter = counter + 1; //increase the counter by one
        wizardCape.caught = true; //set caught to true
        wizardCape.moving = false; //set moving to false
        if (wizardHat.caught && wizardWand.caught && wizardCape.caught) {
            state = "win"; //check if all three conditions are met then set state to win
            wizardWin = true;
        }

        wizardCape.velocity.x = 0;
        wizardCape.x = -10000;
        // frog.tongue.state = "inbound";
    }
}

// launch tongue on click
function mousePressed() {

    if (state === "title") {
        state = "wizard"; //if state is title, swicth to gameplau on click
    }
    // else if (state === "wizard") {
    //     if (frog.tongue.state === "idle") {
    //         frog.tongue.state = "outbound"; //if in gameplay state, launch tongue on click
    //     }
    // }
    else if (state === "win" || state === "lose") {
        resetGame();
        state = "title"; //if player is on the win orr lose screen, click to restart the game
    }
}


