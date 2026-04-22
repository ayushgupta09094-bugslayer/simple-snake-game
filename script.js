const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
const grid = 20;
let speed = 7;
let count = 0;
let score = 0;
let level = 1;
const scoreEl = document.getElementById("score");
const levelEl = document.getElementById("level");
let snake = {
    x: 200,
    y: 200,
    dx: grid,
    dy: 0,
    cells: [],
    maxCells: 4
};
let apple = {
    x: 300,
    y: 300
};
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
function resetGame() {
    alert("Game Over! Score: " + score);
    snake.x = 200;
    snake.y = 200;
    snake.cells = [];
    snake.maxCells = 4;
    snake.dx = grid;
    snake.dy = 0;
    score = 0;
    level = 1;
    speed = 7;
    scoreEl.textContent = score;
    levelEl.textContent = level;
}
function gameLoop() {
    requestAnimationFrame(gameLoop);
    if (++count < speed) return;
    count = 0;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    snake.x += snake.dx;
    snake.y += snake.dy;
    if (snake.x < 0) {
        snake.x = canvas.width - grid;
    } else if (snake.x >= canvas.width) {
        snake.x = 0;
    }
    if (snake.y < 0) {
        snake.y = canvas.height - grid;
    } else if (snake.y >= canvas.height) {
        snake.y = 0;
    }
    snake.cells.unshift({x: snake.x, y: snake.y});
    if (snake.cells.length > snake.maxCells) {
        snake.cells.pop();
    }
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(apple.x + grid/2, apple.y + grid/2, grid/2 - 2, 0, Math.PI * 2);
    ctx.fill();
    snake.cells.forEach(function(cell, index) {
        ctx.fillStyle = `hsl(${index * 10}, 100%, 50%)`;
        ctx.fillRect(cell.x, cell.y, grid-2, grid-2);
        if (cell.x === apple.x && cell.y === apple.y) {
            snake.maxCells++;
            score++;
            scoreEl.textContent = score;
            if (score % 5 === 0) {
                level++;
                speed = Math.max(2, speed - 1);
                levelEl.textContent = level;
            }
            apple.x = getRandomInt(0, canvas.width / grid) * grid;
            apple.y = getRandomInt(0, canvas.height / grid) * grid;
        }
        for (let i = index + 1; i < snake.cells.length; i++) {
            if (cell.x === snake.cells[i].x &&
                cell.y === snake.cells[i].y) {
                resetGame();
            }
        }
    });
}
document.addEventListener("keydown", function(e) {
    if (e.key === "ArrowLeft" && snake.dx === 0) {
        snake.dx = -grid;
        snake.dy = 0;
    }
    else if (e.key === "ArrowUp" && snake.dy === 0) {
        snake.dy = -grid;
        snake.dx = 0;
    }
    else if (e.key === "ArrowRight" && snake.dx === 0) {
        snake.dx = grid;
        snake.dy = 0;
    }
    else if (e.key === "ArrowDown" && snake.dy === 0) {
        snake.dy = grid;
        snake.dx = 0;
    }
});
requestAnimationFrame(gameLoop);