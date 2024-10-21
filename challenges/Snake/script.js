const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const gridSize = 20;
const canvasSize = 400;
let snake, direction, apple, score, gameOver;

document.getElementById('startButton').addEventListener('click', startGame);
document.getElementById('resetButton').addEventListener('click', resetGame);
document.addEventListener('keydown', changeDirection);

function startGame() {
    document.getElementById('titlePage').style.display = 'none';
    canvas.style.display = 'block';
    document.getElementById('resetButton').style.display = 'block';
    resetGame();
    gameLoop();
}

function resetGame() {
    snake = [{ x: gridSize * 5, y: gridSize * 5 }];
    direction = { x: gridSize, y: 0 }; // Start moving to the right
    apple = { x: gridSize * 10, y: gridSize * 10 };
    score = 0;
    gameOver = false;
    draw(); // Ensure the initial state is drawn
}

function changeDirection(event) {
    const keyPressed = event.key;
    if (keyPressed === 'ArrowUp' && direction.y === 0) {
        direction = { x: 0, y: -gridSize };
    } else if (keyPressed === 'ArrowDown' && direction.y === 0) {
        direction = { x: 0, y: gridSize };
    } else if (keyPressed === 'ArrowLeft' && direction.x === 0) {
        direction = { x: -gridSize, y: 0 };
    } else if (keyPressed === 'ArrowRight' && direction.x === 0) {
        direction = { x: gridSize, y: 0 };
    }
}

function draw() {
    if (gameOver) {
        ctx.fillStyle = 'red';
        ctx.font = '50px Arial';
        ctx.fillText('Game Over', canvasSize / 4, canvasSize / 2);
        return;
    }

    ctx.clearRect(0, 0, canvasSize, canvasSize);

    // Draw snake
    ctx.fillStyle = 'green';
    snake.forEach(segment => {
        ctx.fillRect(segment.x, segment.y, gridSize, gridSize);
    });

    // Draw apple
    ctx.fillStyle = 'red';
    ctx.fillRect(apple.x, apple.y, gridSize, gridSize);

    // Draw score
    document.getElementById('score').innerText = `Score: ${score}`;
}

function update() {
    if (gameOver) return;

    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

    // Check for collisions with walls
    if (head.x < 0 || head.x >= canvasSize || head.y < 0 || head.y >= canvasSize) {
        gameOver = true;
    }

    // Check for collisions with self
    snake.forEach((segment, index) => {
        if (index !== 0 && head.x === segment.x && head.y === segment.y) {
            gameOver = true;
        }
    });

    snake.unshift(head);

    // Check for apple collision
    if (head.x === apple.x && head.y === apple.y) {
        score++;
        apple = {
            x: Math.floor(Math.random() * (canvasSize / gridSize)) * gridSize,
            y: Math.floor(Math.random() * (canvasSize / gridSize)) * gridSize
        };
    } else {
        snake.pop();
    }
}

function gameLoop() {
    update();
    draw();
    if (!gameOver) {
        setTimeout(gameLoop, 100);
    }
}