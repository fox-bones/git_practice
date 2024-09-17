// defining canvas elements and resources
const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");
const background = document.getElementById("background");
var sprite = document.getElementById("sprite");
var mSprite = document.getElementById("m-sprite");
var rat = document.getElementById("rat");
var upRat = document.getElementById("up-rat");
var leftRat = document.getElementById("left-rat");
var rightRat = document.getElementById("right-rat");
canvas.width = 1280;
canvas.height = 650;
canvas.style.border = "solid 1px black"

class Player {
    // defining spawn point and player dimensions
    constructor() {
        this.width = 70;
        this.height = 100;
        this.position = {
            x: (canvas.width / 2) - (this.width / 2),
            y: (canvas.height / 2) - (this.height / 2)
        }
        this.velocity = {
            x: 0,
            y: 0
        }
        this.image = sprite;
    }
    // spawns player based on constructor inputs
    draw() {
        c.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
    }
    // the update method allows for continuous movement
    update() {
        this.position.y += this.velocity.y;
        this.position.x += this.velocity.x;
    }
    // checks whether the player is on the edge of the canvas
    checkCollision() {
        if (this.position.x < 0) {
            this.position.x = 0;
        } 
        else if (this.position.x > (canvas.width - this.width)) {
            this.position.x = canvas.width - this.width;
        } 
        else if (this.position.y < 0) {
            this.position.y = 0;
        }
        else if (this.position.y > canvas.height - this.height) {
            this.position.y = canvas.height - this.height;
        }
    }
}
class Enemy {
    // similar to player, utilizing randomization to spawn
    constructor(direction, image) {
        this.width = 70,
        this.height = 100,
        this.position = {
            x: 0,
            y: 0
        },
        this.velocity = {
            x: 0,
            y: 0
        },
        this.rX = Math.floor(Math.random() * (canvas.width - this.width)), // generating random X value within canvas
        this.rY = Math.floor(Math.random() * (canvas.height - this.height)), // generating random Y value within canvas
        this.direction = direction, 
        this.image = image;
    }
    // trnaslates enemy direction, up, down, left, or right type into movement
    update() {
        if (this.direction == "down") { // properties of downward moving enemy
            this.velocity.y = 5;
            c.drawImage(this.image, this.rX, this.position.y - this.height, this.width, this.height);
            this.position.y += this.velocity.y;
        }
        else if (this.direction == "up") { // properties of upward moving enemy
            this.velocity.y = -5;
            c.drawImage(this.image, this.rX, this.position.y, this.width, this.height);
            this.position.y += this.velocity.y;
        }
        else if (this.direction == "left") {  // properties of leftward moving enemy
            this.velocity.x = -5;
            c.drawImage(this.image, this.position.x, this.rY, this.width, this.height);
            this.position.x += this.velocity.x;
            this.width = 100;
            this.height = 70;
        }
        else if (this.direction == "right") {
            this.velocity.x = 5;
            c.drawImage(this.image, this.position.x - this.width, this.rY, this.width, this.height);
            this.position.x += this.velocity.x;
            this.width = 100;
            this.height = 70;
        }
    }
    // rerolls random x and y values
    randomize() {
        this.rY = Math.floor(Math.random() * (canvas.height - this.height));
        this.rX = Math.floor(Math.random() * (canvas.width - this.width));
    }
    // resets enemy to a new, random point based on direction
    reset() {
        if (this.direction == "down") {
            if (this.position.y > canvas.height + this.height) {
                this.randomize();
                this.position.y = 0;
            }
        }
        else if (this.direction == "up") {
            if (upEnemy.position.y < (0 - upEnemy.height)) {
                this.randomize();
                this.position.y = canvas.height;
            }
        }
        else if (this.direction =="left") {
            if (leftEnemy.position.x < (0 - leftEnemy.width)) {
                this.randomize();
                this.position.x = canvas.width;
            }
        }
        else if (this.direction == "right") {
            if (rightEnemy.position.x > canvas.width + rightEnemy.width) {
                this.randomize();
                this.position.x = 0;
            }
        }
    }
}

// defining player and enemies 
const player = new Player();
const downEnemy = new Enemy("down", rat);
const upEnemy = new Enemy("up", upRat);
const leftEnemy = new Enemy("left", leftRat);
const rightEnemy = new Enemy("right", rightRat);
const enemyList = [downEnemy, upEnemy, leftEnemy, rightEnemy];
var playerX = document.getElementById("player-x"); // player x position tracker
var playerY = document.getElementById("player-y"); // player y position tracker

function game() { 
    window.requestAnimationFrame(game);
    c.drawImage(background, 0, 0, canvas.width, canvas.height); // redrawing canvas each frame

    // adding controls on arrow keys. Player velocity directly corresponds to player position. Movements are more fluid...
    document.addEventListener("keydown", (e) => {
        switch(e.key) {
            case "ArrowUp":
                player.velocity.y = -5;
                break;
            case "ArrowDown":
                player.velocity.y = 5;
                break;
            case "ArrowLeft":
                player.velocity.x = -5;
                player.image = mSprite;
                break;
            case "ArrowRight": 
                player.velocity.x = 5;
                player.image = sprite;
                break;
        }
    })
    document.addEventListener("keyup", (e) => {
        switch(e.key) {
            case "ArrowUp":
                player.velocity.y = 0;
                break;
            case "ArrowDown":
                player.velocity.y = 0;
                break;
            case "ArrowLeft":
                player.velocity.x = 0;
                break;
            case "ArrowRight": 
                player.velocity.x = 0;
                break;
        }
    })

    // redrawing player and checking for collisions 
    player.draw();
    player.update();
    player.checkCollision();

    // spawning enemies from list, and checking for respawn positions
    for (i = 0; i < enemyList.length; i++) {
        enemyList[i].update();
        enemyList[i].reset();
    }

    // updating position trackers
    playerX.innerText = "Player X: " + player.position.x;
    playerY.innerText = "Player Y: " + player.position.y;
}

// running the game
game();