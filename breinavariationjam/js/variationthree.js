/**
 * Frog
 * Breina Kelly
 * 
 * VARIATION THREE
 * 
 * Pond City is in danger! Evil Frog is mad af and the player needs to collect wizard frogs costume so he can fight!
 * Wizard frog is naked and in the dark, his clothes are rrandomly placed somewhere on the screen and he has to go find them,
 * but avoid finding the bomb!
 * 
 * Instructions 
 * - Move the frog with the keyboard arrows!
 * - Find set of 3 randomly placed hidden clothing items
 * - x/3 counter up top right
 * - find all 3: congrats screen
 * - find bomb: Evil Frog won screen, restart game, no mercy, the fate of Pond City was in YOUR hands
 * - Send back to level menu
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

let lightSource = {
    x: 200,
    y: 200,
    size: 270, //flashlight size
};


let state = "wizard"; //starting title screen
let counter = 0; //current score
let bombImg, frogImg, winImg, loseImg, nakedFrogImg, bgImg;

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
    winImg = loadImage('assets/images/win.png');
    loseImg = loadImage('assets/images/lose.png');
    nakedFrogImg = loadImage('assets/images/nakedFrog.png');
    bgImg = loadImage('assets/images/gameBG.png');
} //preloading all images used & giving them names to call on

//creates a canvas and sets up the items off screen
function setup() {
    createCanvas(640, 480);
    spawnItems();
}

function draw() {

    if (state === "wizard") {
        background(bgImg);
        blackScreen();
        flashlight();
        moveFrog();

        drawCounter();
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

    frog.body.x = constrain(frog.body.x, 0, width);
    frog.body.y = constrain(frog.body.y, 0, height);
}


function resetGame() {
    //reset all the variables to default
    counter = 0;
    for (let item of wizardItems) {
        item.caught = false;
    }

    frog.body.x = 320;
    frog.body.y = 420;
    spawnItems();
    state = "title"; //bring back to titlescreen
}

function flashlight() { //thank you mathilde for this p5 example i'd be toast without it
    for (let i = 0; i < lightSource.size; i += 5) {
        let alpha = map(i, 0, lightSource.size, 150, 0);
        fill(0, alpha);
        noStroke();
        ellipse(frog.body.x, frog.body.y, i); //basically makes epeating elipses that get more transparent
    }
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

function spawnItems() {
    //first spawn items using for loop going through array
    for (let item of wizardItems) {
        item.caught = false;
        let validSpot = false;

        while (!validSpot) {//initially go through the while loop once and randomly place items
            validSpot = true;
            item.x = random(item.size, width - item.size);
            item.y = random(item.size, height - item.size);

            let d = dist(item.x, item.y, frog.body.x, frog.body.y); //check overlap with frog
            if (d < item.size + frog.body.size) {
                validSpot = false; //send back to while loop
                continue; //continue through testing
            }

            d = dist(item.x, item.y, width - 20, 20); //check overlap with counter
            if (d < item.size + 150) {
                validSpot = false;
                continue;
            }

            for (let otherItem of wizardItems) { //create otherItem to check overlap between items
                if (otherItem === item) continue; //make sue item isn't being compared w itslf
                d = dist(item.x, item.y, otherItem.x, otherItem.y);
                if (d < item.size + otherItem.size) {
                    validSpot = false;
                    break;// end check here
                }
            }
        }
    }

    //boolean check for bomb overlaps now
    let validSpot = false;
    while (!validSpot) { //same style while loop 
        validSpot = true;
        bomb.x = random(bomb.size, width - bomb.size);
        bomb.y = random(bomb.size, height - bomb.size);

        let d = dist(bomb.x, bomb.y, frog.body.x, frog.body.y);
        if (d < bomb.size + frog.body.size) {
            validSpot = false;
            continue;
        }

        d = dist(bomb.x, bomb.y, width - 20, 20);
        if (d < bomb.size + 150) {
            validSpot = false;
            continue;
        }

        // Check overlap with items
        for (let item of wizardItems) {
            d = dist(bomb.x, bomb.y, item.x, item.y);
            if (d < bomb.size + item.size) {
                validSpot = false;
                break;
            }
        }
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
    let d = dist(frog.body.x, frog.body.y, bomb.x, bomb.y);
    let myAlpha = d < lightSource.size / 2 ? map(d, 0, lightSource.size / 2, 255, 0) : 0;

    if (d < lightSource.size / 2) { //only draw when ovelapping with lightsource crazy i know
        push();
        tint(255, myAlpha); //custom alpha tint to the images
        image(bombImg, bomb.x, bomb.y, 80, 80);
        noTint(); //resets custom alpha tint
        pop();
    }
}

function drawWizardItems() {
    for (let item of wizardItems) {
        let d = dist(frog.body.x, frog.body.y, item.x, item.y);
        let myAlpha = d < lightSource.size / 2 ? map(d, 0, lightSource.size / 2, 255, 0) : 0; //once again thank you mathilde

        if (!item.caught) {
            if (d < lightSource.size / 2) {
                tint(255, myAlpha);
                image(item.img, item.x - item.size / 2, item.y - item.size / 2, item.size, item.size);
                noTint();
            }
        }
    }
}

function blackScreen() {
    //black screen
    push();
    fill(0);
    noStroke();
    rect(0, 0, width, height);
    pop();

    //transparent hole in black screen
    push();
    fill(0, 0, 0, 0);
    noStroke();
    ellipse(frog.body.x, frog.body.y, lightSource.size);
    pop();
}


function checkFrogBombOverlap() {
    const frogOverlapX = frog.body.x - 50;
    const d = dist(frogOverlapX, frog.body.y, bomb.x, bomb.y);
    const eaten = (d < frog.body.size / 2 + bomb.size / 2);
    if (eaten) {
        state = "lose";
        spawnItems(); //avoid any interference
    }
}

function checkFrogWizardItemsOverlap() {
    for (let item of wizardItems) {
        const d = dist(frog.body.x, frog.body.y, item.x, item.y);
        const eaten = (d < frog.body.size / 2 + item.size / 2);
        if (eaten && !item.caught) {
            item.caught = true;
            counter = counter + 1; //increase counter by one
            if (counter === wizardItems.length) {
                state = "win";
            }
        }
    }
}


function mousePressed() {

    if (state === "win" || state === "lose") {
        window.location.href = 'index.html'; // redirect back to the menu
    }
}

