// Game constants & variables
let inputDir = { x: 0, y: 0 };
const foodSound = new Audio("food.wav");
const gameOverSound = new Audio("gameover.wav");
const moveSound = new Audio("move.mp3");
const musicSound = new Audio("music.wav");
const scoreBox = document.getElementById("scoreBox");
const hi_scoreBox = document.getElementById("Hi_scoreBox");
let speed = 10;
let prevkey = "";
let score = 0;
let high_score = 0;
let musicplay = true;
let lastPaintTime = 0;
let snakeArr = [
	{
		x: 13,
		y: 15,
	},
];

food = { x: 6, y: 7 };

// Game Functions

function main(ctime) {
	window.requestAnimationFrame(main);
	console.log(ctime);
	if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
		return;
	}
	lastPaintTime = ctime;
	gameEngine();
}

function isCollide(snake) {
	// if you bump into yourself
	// if you bump into the wall
	for (let i = 1; i < snake.length; i++) {
		if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
			return true;
		}
	}
	if (snake[0].x > 18 || snake[0].x < 0 || snake[0].y > 18 || snake[0].y < 0) {
		return true;
	}
}

function gameEngine() {
	// Part 1: updating the snake array and food
	if (isCollide(snakeArr)) {
		gameOverSound.play();
		musicSound.pause();
		inputDir = { x: 0, y: 0 };
		score = 0;
		scoreBox.innerHTML = "Score: " + score;
		alert("GameOver!!! Press any key to play again!");
		snakeArr = [{ x: 13, y: 15 }];
		musicSound.play();
	}
	// if you have eaten the food increment the score and regenerate the food
	if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
		foodSound.play();
		score += 1;
		scoreBox.innerHTML = "Score: " + score;
		
		if (high_score < score) {
			high_score = score;
			hi_scoreBox.classList.remove("hidden");
		}
		hi_scoreBox.innerHTML = "Hi Score: " + high_score;

		snakeArr.unshift({
			x: snakeArr[0].x + inputDir.x,
			y: snakeArr[0].y + inputDir.y,
		});
		let a = 2;
		let b = 16;
		food = {
			x: 2 + Math.round(a + (b - a) * Math.random()),
			y: 2 + Math.round(a + (b - a) * Math.random()),
		};
	}

	//Moving the snake
	for (let i = snakeArr.length - 2; i >= 0; i--) {
		// const element = array[i];
		snakeArr[i + 1] = { ...snakeArr[i] };
	}
	snakeArr[0].x += inputDir.x;
	snakeArr[0].y += inputDir.y;

	// Part 2: display the snake
	// how will be display, so first of all we will grab the board
	board.innerHTML = "";
	snakeArr.forEach((e, index) => {
		snakeElement = document.createElement("div");
		snakeElement.style.gridRowStart = e.y;
		snakeElement.style.gridColumnStart = e.x;
		if (index === 0) {
			snakeElement.classList.add("head");
		} else {
			snakeElement.classList.add("snake");
		}
		board.appendChild(snakeElement);
	});

	// Part 3: Display the food
	foodElement = document.createElement("div");
	foodElement.style.gridRowStart = food.y;
	foodElement.style.gridColumnStart = food.x;
	foodElement.classList.add("food");
	board.appendChild(foodElement);
}

// Main logic starts here
window.requestAnimationFrame(main);
window.addEventListener("keydown", (e) => {
	// start the game
	if (musicplay) {
		musicSound.play();
	}
	moveSound.play();
	// now i will try to find out which key has been fired

	switch (e.key) {
		case "ArrowUp":
			inputDir.x = 0;
			inputDir.y = -1;
			prevkey = "ArrowUp";
			break;
		case "ArrowDown":
			inputDir.x = 0;
			inputDir.y = 1;
			prevkey = "ArrowDown";
			break;
		case "ArrowLeft":
			inputDir.x = -1;
			inputDir.y = 0;
			prevkey = "ArrowLeft";
			break;
		case "ArrowRight":
			inputDir.x = 1;
			inputDir.y = 0;
			prevkey = "ArrowRight";
			break;

		case "m":
			if (musicplay) {
				musicSound.pause();
				musicplay = false; // Update musicplay status
			} else {
				musicSound.play();
				musicplay = true; // Update musicplay status
			}
			break;

		default:
			break;
	}
});
