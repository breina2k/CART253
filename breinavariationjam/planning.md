# Planning

## Starting point

The initial idea:

> Frog needs to catch 3 specific items to unlock wizard outfit

## Experience design

The experience:

> user controls the frog at the bottom of the screen with their mouse, and shoots out its tongue when clicking the mouse. They will need to use the tongue to catch the three items, but try to avoid the bombs passing by as well. Once all three items  are caught, the user wins, but if they catch a bomb, they lose.

## Breaking it down

Basic things to do:

- Use circles to represent the three items
- Make sure these three items appear on screen once at a time
- Inlude a counter that is marked /3 to keep score
- Have win/lose conditions

Questions:

- What does the frog look like?
    - circle for draft
    - cute pixel frog guy (naked while playing, his clothes are in bubbles)
- How does the user control the frog?
    - User controls frog with the mouse position, just to the left and right
    - User launches the tongue with a mouse click
- How do the bombs move?
    - The bomb starts on the left at a random y position, and moves to the right in a line
- How do the items move?
    - One by one, starting on the left with a random y position and move to  the right in a line
- What does the tongue look like?
    - A red line coming out of the frog...
- What happens when the user catches all items
    - Win screen or pop up?
-  What happens  when the user catches a bomb
    -automatic lose screen no mercy they blew everything up
- What does it all look like on the screen? Layout?
    - Frog at the bottom, fly moving across, tongue shooting out of frog, one item and bomb on screen at a time, counter top right, cute pixel water bg

## The program starts to form....

What is there?

- The frog
    - Position and size
    - Position and size of tongue
    - What is the tongue doing?
    - Image
- The bomb
    - Position and the size
    - Velocity
    - Image
- The items
    - Position
    - Size
    - Velocity & speed
    - Delay
    - Image
- The  counter
    - Position
    - Size
    - Text
    - Image
ss