/**
 * Frogfrogfrogfrog
 * Breina Kelly
 * 
 * Pond City is in danger! Evil Frog is mad af and the player needs to unlock a team of 4 Super Frogs by catching their 
 * respective costumes (a hat, clothing item, and accessory). They'll do this by choosing the frog they'd likee to unlock, 
 * then catching the correct set of items by moving the center frog and launching the tongue to capture the item.
 * Catch the three right items and you've unlocked a super frog! Catch the wrong item and Evil Frog wins :(
 * 
 * Instructions (for me, real instructions will be in Read Me):
 * - Start game screen... where you start the game
 * - Real quick run down screen
 * - Choose the frog you'd like to unlock
 * - Move the frog with your mouse
 * - Click to launch the tongue
 * - Catch set of 3 correct item bubbles (bubble pop sound)
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
        y: 520,
        size: 150
    },
    // The frog's tongue has a position, size, speed, and state
    tongue: {
        x: undefined,
        y: 480,
        size: 20,
        speed: 20,
        // Determines how the tongue moves each frame
        state: "idle" // State can be: idle, outbound, inbound
    }
};

// Our fly
// Has a position, size, and speed of horizontal movement
const fly = {
    x: 0,
    y: 200, // Will be random
    size: 10,
    speed: 3
};

const wizardHat = {
    x: -100, // starting off the screen
    y: 200,
    size: 50,
    velocity: {
        x: 0,
        y: 0
    }, // the starting velocity aka not moving
    speed: 6, // how fast it'll go
    fill: "#ff0000", // red
    minDelay: 1000, // delay is how long the item will wait beefore it starts moving
    maxDelay: 1000,
    caught: false, // item is currently not caught, when it is, itll stop appearing, and add 1 to counter
    moving: false, // when items are moving, other items will not appear
};

const wizardWand = {
    x: -100, // starting off the screen
    y: 200,
    size: 50,
    velocity: {
        x: 0,
        y: 0
    }, // the starting velocity aka not moving
    speed: 6, // how fast it'll go
    fill: "#4287f5", // blue
    minDelay: 1000, // delay is how long the item will wait beefore it starts moving
    maxDelay: 1000,
    caught: false, // item is currently not caught, when it is, itll stop appearing, and add 1 to counter
    moving: false, // when items are moving, other items will not appear
};

const wizardCape = {
    x: -100, // starting off the screen
    y: 200,
    size: 50,
    velocity: {
        x: 0,
        y: 0
    }, // the starting velocity aka not moving
    speed: 6, // how fast it'll go
    fill: "#ffdd00", // yellow
    minDelay: 1000, // delay is how long the item will wait beefore it starts moving
    maxDelay: 1000,
    caught: false, // item is currently not caught, when it is, itll stop appearing, and add 1 to counter
    moving: false, // when items are moving, other items will not appear
};

/**
 * Creates the canvas and initializes the fly
 */
function setup() {
    createCanvas(640, 480);

    // Start positions
    resetFly();
    resetWizardHat();
    resetWizardWand();
    resetWizardCape();
}

function draw() {
    background("#87ceeb");
    moveFly();
    moveFrog();
    moveTongue();
    moveWizardHat();
    moveWizardWand();
    moveWizardCape();

    drawFly();
    drawFrog();
    drawWizardHat();
    drawWizardWand();
    drawWizardCape();

    checkTongueFlyOverlap();
    checkTongueWizardHatOverlap();
    checkTongueWizardWandOverlap();
    checkTongueWizardCapeOverlap();
}

/**
 * Moves the fly according to its speed
 * Resets the fly if it gets all the way to the right
 */
function moveFly() {
    // Move the fly
    fly.x += fly.speed;
    // Handle the fly going off the canvas
    if (fly.x > width) {
        resetFly();
    }
}

/**
 * Moves the frog to the mouse position on x
 */
function moveFrog() {
    frog.body.x = mouseX;
}


/**
 * Handles moving the tongue based on its state
 */
function moveTongue() {
    // Tongue matches the frog's x
    frog.tongue.x = frog.body.x;
    // If the tongue is idle, it doesn't do anything
    if (frog.tongue.state === "idle") {
        // Do nothing
    }
    // If the tongue is outbound, it moves up
    else if (frog.tongue.state === "outbound") {
        frog.tongue.y += -frog.tongue.speed;
        // The tongue bounces back if it hits the top
        if (frog.tongue.y <= 0) {
            frog.tongue.state = "inbound";
        }
    }
    // If the tongue is inbound, it moves down
    else if (frog.tongue.state === "inbound") {
        frog.tongue.y += frog.tongue.speed;
        // The tongue stops if it hits the bottom
        if (frog.tongue.y >= height) {
            frog.tongue.state = "idle";
        }
    }
}

function moveWizardHat() {
    wizardHat.x += wizardHat.velocity.x; //move hat along x axis w set velocity
    if (wizardHat.x > width) {
        resetWizardHat(); //reset hat when it moves off the  screen
    }
}

function moveWizardWand() {
    wizardWand.x += wizardWand.velocity.x; //move hat along x axis w set velocity
    if (wizardWand.x > width) {
        resetWizardWand(); //reset hat when it moves off the  screen
    }
}

function moveWizardCape() {
    wizardCape.x += wizardCape.velocity.x; //move hat along x axis w set velocity
    if (wizardCape.x > width) {
        resetWizardCape(); //reset hat when it moves off the  screen
    }
}

/**
 * Draws the fly as a black circle
 */
function drawFly() {
    push();
    noStroke();
    fill("#000000");
    ellipse(fly.x, fly.y, fly.size);
    pop();
}

/**
 * Resets the fly to the left with a random y
 */
function resetFly() {
    fly.x = 0;
    fly.y = random(0, 300);
}

function resetWizardHat() {
    // Stop it moving (velocity to 0)
    wizardHat.velocity.x = 0;
    // Move the hat back to the left side
    wizardHat.x = -100;
    // Calculate a new delay
    const delay = random(wizardHat.minDelay, wizardHat.maxDelay);
    setTimeout(startWizardHat, delay);
}

function resetWizardWand() {
    // Stop it moving (velocity to 0)
    wizardWand.velocity.x = 0;
    // Move the hat back to the left side
    wizardWand.x = -100;
    // Calculate a new delay
    const delay = random(wizardWand.minDelay, wizardWand.maxDelay);
    setTimeout(startWizardWand, delay);
}

function resetWizardCape() {
    // Stop it moving (velocity to 0)
    wizardCape.velocity.x = 0;
    // Move the hat back to the left side
    wizardCape.x = -100;
    // Calculate a new delay
    const delay = random(wizardCape.minDelay, wizardCape.maxDelay);
    setTimeout(startWizardCape, delay);
}

function startWizardHat() {
    wizardHat.velocity.x = wizardHat.speed; //change the velocity from 0 to set speed
}

function startWizardWand() {
    wizardWand.velocity.x = wizardWand.speed; //change the velocity from 0 to set speed
}

function startWizardCape() {
    wizardCape.velocity.x = wizardCape.speed; //change the velocity from 0 to set speed
}

/**
 * Displays the tongue (tip and line connection) and the frog (body)
 */
function drawFrog() {
    // Draw the tongue tip
    push();
    fill("#ff0000");
    noStroke();
    ellipse(frog.tongue.x, frog.tongue.y, frog.tongue.size);
    pop();

    // Draw the rest of the tongue
    push();
    stroke("#ff0000");
    strokeWeight(frog.tongue.size);
    line(frog.tongue.x, frog.tongue.y, frog.body.x, frog.body.y);
    pop();

    // Draw the frog's body
    push();
    fill("#00ff00");
    noStroke();
    ellipse(frog.body.x, frog.body.y, frog.body.size);
    pop();
}

function drawWizardHat() {
    push();
    noStroke();
    fill(wizardHat.fill);
    ellipse(wizardHat.x, wizardHat.y, wizardHat.size);
    pop();
}

function drawWizardWand() {
    push();
    noStroke();
    fill(wizardWand.fill);
    ellipse(wizardWand.x, wizardWand.y, wizardWand.size);
    pop();
}

function drawWizardCape() {
    push();
    noStroke();
    fill(wizardCape.fill);
    ellipse(wizardCape.x, wizardCape.y, wizardCape.size);
    pop();
}

/**
 * Handles the tongue overlapping the fly
 */
function checkTongueFlyOverlap() {
    // Get distance from tongue to fly
    const d = dist(frog.tongue.x, frog.tongue.y, fly.x, fly.y);
    // Check if it's an overlap
    const eaten = (d < frog.tongue.size / 2 + fly.size / 2);
    if (eaten) {
        // Reset the fly
        resetFly();
        // Bring back the tongue
        frog.tongue.state = "inbound";
    }
}

function checkTongueWizardHatOverlap() {
    // Get distance from tongue to hat
    const d = dist(frog.tongue.x, frog.tongue.y, wizardHat.x, wizardHat.y);
    // Check if it's an overlap
    const eaten = (d < frog.tongue.size / 2 + wizardHat.size / 2);
    if (eaten) {
        // Set caught to true
        wizardHat.caught = true;
        // Stop it moving
        wizardHat.velocity.x = 0;
        // Move it off the screen?
        wizardHat.x = -10000;
        // Bring back the tongue
        frog.tongue.state = "inbound";
    }
}

function checkTongueWizardWandOverlap() {
    // Get distance from tongue to hat
    const d = dist(frog.tongue.x, frog.tongue.y, wizardWand.x, wizardWand.y);
    // Check if it's an overlap
    const eaten = (d < frog.tongue.size / 2 + wizardWand.size / 2);
    if (eaten) {
        // Set caught to true
        wizardWand.caught = true;
        // Stop it moving
        wizardWand.velocity.x = 0;
        // Move it off the screen?
        wizardWand.x = -10000;
        // Bring back the tongue
        frog.tongue.state = "inbound";
    }
}

function checkTongueWizardCapeOverlap() {
    // Get distance from tongue to hat
    const d = dist(frog.tongue.x, frog.tongue.y, wizardCape.x, wizardCape.y);
    // Check if it's an overlap
    const eaten = (d < frog.tongue.size / 2 + wizardCape.size / 2);
    if (eaten) {
        // Set caught to true
        wizardCape.caught = true;
        // Stop it moving
        wizardCape.velocity.x = 0;
        // Move it off the screen?
        wizardCape.x = -10000;
        // Bring back the tongue
        frog.tongue.state = "inbound";
    }
}

/**
 * Launch the tongue on click (if it's not launched yet)
 */
function mousePressed() {
    if (frog.tongue.state === "idle") {
        frog.tongue.state = "outbound";
    }
}