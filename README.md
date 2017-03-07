### nonoGrid -- Frontend

This is the frontend for the nonoGrid project (#4)

A nonoGrid (https://en.wikipedia.org/wiki/Nonogram) is a puzzle game where the gamer must reconstruct an image based on clues given for each row and column in a grid. For example if "2 3" is given in the header of a grid row that means in the row there are two groups, one of two contiguous blocks and another of three blocks that are separated by at least one block. Each column header
provides a similar clue for that column. Using logic, it is the user's task to reconstruct the grid image.

Backend:
- https://github.com/dmozzoni/nono-back

## User Stories

- A User is presented with a welcome page.
- The user can sign-up or sign-in.
-- A User can edit their profile.
- Once signed-in a user can select a nonoGrid puzzle to play.
- The user can use the mouse to click on a square to cycle through filled-in, empty, and unknown states.
-- Right click cycles in opposite direction.
-- User can hold and move to change the state of multiple squares.
-- An Undo list is presented next to the grid, clicking an item will revert the grid to that move.
- The user can create a new puzzle and publish it, which will be available for all users to play..
-- Only the author of a puzzle can edit a puzzle.
-- The User can set the size of the grid.
- A User can favorite/unfavorite a puzzle.
- ...

## Technologies used:

- React
- Node.js
- Passport (Local)

Based off:
- https://github.com/GoThinkster/react-redux-realworld-example-app
- https://github.com/gothinkster/node-express-realworld-example-app
- https://facebook.github.io/react/tutorial/tutorial.html
