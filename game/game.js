const canvas = document.getElementById("game-canvas");
const context = canvas.getContext("2d");

const playerWidth  = 70;
const playerHeight = 100;

const enemyWidth  = 60;
const enemyHeight = 70;

const targetFPS = 60;

let timeLast = 0;

let playerX = 400;
let playerY = 300;
let playerSpeed = 125;

let enemyX = 100;
let enemyY = 100;
let enemySpeed = 125;

let bulletX = 400;
let bulletY = 300;
let bulletSpeed = 500;

let bulletRequired = false;

let buttonADown = false;
let buttonDDown = false;
let buttonWDown = false;
let buttonSDown = false;
let buttonSpaceDown = false;

class Entity
{
    constructor(type, x, y, w, h, speed)
    {
        this.type   = type;
        this.x      = x;
        this.y      = y;
        this.height = h;
        this.width  = w;
        this.speed  = speed;
    }

    move(dX, dY)
    {
        this.x += dX;
        this.y += dY;
    }
}

const player = new Entity("player", 400, 300, 70, 100, 125);

addEventListener("keydown", (event) => {
    if (event.key === "a")
        buttonADown = true;

    if (event.key === "d")
        buttonDDown = true;

    if (event.key === "w")
        buttonWDown = true;

    if (event.key === "s")
        buttonSDown = true;

    if (event.key === " ")
        buttonSpaceDown = true;
});

addEventListener("keyup", (event) => {
    if (event.key === "a")
        buttonADown = false;

    if (event.key === "d")
        buttonDDown = false;

    if (event.key === "w")
        buttonWDown = false;

    if (event.key === "s")
        buttonSDown = false;

    if (event.key === " ")
        buttonSpaceDown = false;
});

function update(timeCurrent)
{
    const deltaTime = (timeCurrent - timeLast) / 1000;
    const singleFrameTime = (1000 / targetFPS) / 1000;

    // console.log(`${deltaTime} < ${singleFrameTime}`);

    if (deltaTime < singleFrameTime)
    {
        requestAnimationFrame(update);
        return;
    }

    if (buttonADown)
        player.move(-player.speed * deltaTime, 0);

    if (buttonDDown)
        player.move(player.speed * deltaTime, 0);

    if (buttonWDown)
        player.move(0, -player.speed * deltaTime);

    if (buttonSDown)
        player.move(0, player.speed * deltaTime);

    if (buttonSpaceDown)
    {
        bulletRequired = true;
        bulletX = player.x;
        bulletY = player.y
    }

    if ((player.x + (player.width / 2)) >= canvas.width)
    {
        player.x = canvas.width - (player.width / 2);
    }

    if ((player.x - (player.width / 2)) < 0)
    {
        player.x = player.width / 2;
    }

    if ((player.y + (player.height / 2)) >= canvas.height)
    {
        player.y = canvas.height - (player.height / 2);
    }

    if ((player.y - (player.height / 2)) < 0)
    {
        player.y = player.height / 2;
    }

    context.clearRect(0, 0, canvas.width, canvas.height);

    if (bulletRequired)
    {
        bulletX -= bulletSpeed * deltaTime;

        context.fillStyle = "black";
        const bullet = new Path2D();
        bullet.arc(
            bulletX,
            bulletY,
            15,
            0,
            Math.PI * 2);
        context.fill(bullet);
    }

    context.fillStyle = "red";
    context.fillRect(
        enemyX - (enemyWidth  / 2),
        enemyY - (enemyHeight / 2),
        enemyWidth,
        enemyHeight);

    context.fillStyle = "#2A2C24";
    context.fillRect(
        player.x - (player.width  / 2),
        player.y - (player.height / 2),
        player.width,
        player.height);

    timeLast = timeCurrent;

    requestAnimationFrame(update);
}

requestAnimationFrame(update);
