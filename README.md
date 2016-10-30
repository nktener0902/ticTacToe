![Tic Tac Toe](./capture1.png)

# ticTacToe

Tic Tac Toe app. This program is created for my Javascript skill up.

# How to play

* Install npm, nodejs and MongoDB.
* `git clone https://github.com/nktener0902/ticTacToe.git`
* Move to this direcotry in your terminal.
* `set DEBUG=app:* & npm start` (Windows)
* `DEBUG=app:* npm start` (Mac)
* Open browser, and http://localhost:3000/

# Release note

## version 2.4

Add a logout function.

## version 2.3

Add a login page. Session is managed by MongoDB and express-session.
This script requires an installation and activation of MongoDB.

## version 2.2

Add a new function that enables players to go to a next game.

## version 2.1

Add draw case where there is no blank cell.

## version 2.0
Add web server on nodejs (express). Starting web server by a following command.

`set DEBUG=app:* & npm start`  
(windows)

## version 1.1
Modified index.html and game.js. Functions of this app is not changed.

## version 1.0
In the check of win/loose, only vertical and horizon line are checked. Slanting line is not checked.
