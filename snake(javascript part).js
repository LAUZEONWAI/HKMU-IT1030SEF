const canvas = document.getElementById('snakeGame');
const ctx = canvas.getContext('2d');
const restartButton = document.getElementById('restartButton');

const box = 20; // size of each block
let snake = [];
snake[0] = {
    x: 9 * box,
    y: 10 * box
};
let score = 0;
let d;
let game;

// Create food
let food = {
    x: Math.floor(Math.random() * 17 + 1) * box,
    y: Math.floor(Math.random() * 15 + 3) * box
};

// control snake
document.addEventListener('keydown', direction);

function direction(event) {
    if (event.keyCode == 37 && d != "RIGHT") {
        d = "LEFT";
    } else if (event.keyCode == 38 && d != "DOWN") {
        d = "UP";
    } else if (event.keyCode == 39 && d != "LEFT") {
        d = "RIGHT";
    } else if (event.keyCode == 40 && d != "UP") {
        d = "DOWN";
    }
}

// Check for collisions
function collision(head, array) {
    for (let i = 0; i < array.length; i++) {
        if (head.x == array[i].x && head.y == array[i].y) {
            return true;
        }
    }
    return false;
}

// Draw on canvas
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = (i == 0) ? "green" : "white";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
        
        ctx.strokeStyle = "red";
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }
    
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, box, box);
    
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;
    
    if (d == "LEFT") snakeX -= box;
    if (d == "UP") snakeY -= box;
    if (d == "RIGHT") snakeX += box;
    if (d == "DOWN") snakeY += box;
    
    // If the snake eats food
    if (snakeX == food.x && snakeY == food.y) {
        score++;
        food = {
            x: Math.floor(Math.random() * 17 + 1) * box,
            y: Math.floor(Math.random() * 15 + 3) * box
        };
    } else {
        snake.pop();
    }
    
    // Snake crossing border logic
    if (snakeX < 0) {
        snakeX = canvas.width - box;
    }
    if (snakeX >= canvas.width) {
        snakeX = 0;
    }
    if (snakeY < 0) {
        snakeY = canvas.height - box;
    }
    if (snakeY >= canvas.height) {
        snakeY = 0;
    }
    
    let newHead = {
        x: snakeX,
        y: snakeY
    };
    
    if (collision(newHead, snake)) {
        clearInterval(game);
        restartButton.style.display = 'block';
    }
    
    snake.unshift(newHead);
    
    ctx.fillStyle = "white";
    ctx.font = "45px Changa one";
    ctx.fillText(score, 2 * box, 1.6 * box);
}

// game loop
function startGame() {
    d = "RIGHT"; // default direction
    snake = [{x: 9 * box, y: 10 * box}]; // reset snake
    score = 0; // reset score
    game = setInterval(draw, 110);
    restartButton.style.display = 'none';
}

restartButton.addEventListener('click', function() {
    clearInterval(game); // Clear current game loop
    startGame(); // restart game
});

startGame(); // Initialize the game
