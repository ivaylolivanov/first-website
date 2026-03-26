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

class Vector2
{
    constructor(x, y)
    {
        this.x = x;
        this.y = y;
    }

    static add(a, b)
    {
        var result = new Vector2(a.x + b.x, a.y + b.y);
        return result;
    }

    static diff(a, b)
    {
        var result = new Vector2(a.x - b.x, a.y - b.y);
        return result;
    }

    normalize()
    {
        let magnitude = Math.sqrt(this.x * this.x + this.y * this.y);
        if (magnitude === 0)
            return new Vector2(0, 0);

        let normalized = new Vector2(this.x / magnitude, this.y / magnitude);
        return normalized;
    }

    scale(fraction)
    {
        this.x *= fraction;
        this.y *= fraction;
    }
}

class Entity
{
    constructor(type, pos, w, h, speed)
    {
        this.type     = type;
        this.position = pos;
        this.height   = h;
        this.width    = w;
        this.speed    = speed;
    }

    move(step)
    {
        this.position = Vector2.add(this.position, step);
    }
}

const player = new Entity(
    "player",
    new Vector2(playerX, playerY),
    playerWidth,
    playerHeight,
    playerSpeed);

const enemy = new Entity(
    "enemy",
    new Vector2(enemyX, enemyY),
    enemyWidth,
    enemyHeight,
    enemySpeed);

const game_entities = [];
game_entities.push(player);
game_entities.push(enemy);
game_entities.push(new Entity(
    "enemy",
    new Vector2(Math.random() * 100, Math.random() * 100),
    enemyWidth,
    enemyHeight,
    enemySpeed
));

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

    let moveDirection = new Vector2(0, 0);
    if (buttonADown)
        moveDirection.x -= player.speed;

    if (buttonDDown)
        moveDirection.x += player.speed;

    if (buttonWDown)
        moveDirection.y -= player.speed;

    if (buttonSDown)
        moveDirection.y += player.speed;

    moveDirection.scale(deltaTime);
    player.move(moveDirection);

    if (buttonSpaceDown)
    {
        bulletRequired = true;
        bulletX = player.position.x;
        bulletY = player.position.y
    }

    if ((player.position.x + (player.width / 2)) >= canvas.width)
    {
        player.position.x = canvas.width - (player.width / 2);
    }

    if ((player.position.x - (player.width / 2)) < 0)
    {
        player.position.x = player.width / 2;
    }

    if ((player.position.y + (player.height / 2)) >= canvas.height)
    {
        player.position.y = canvas.height - (player.height / 2);
    }

    if ((player.position.y - (player.height / 2)) < 0)
    {
        player.position.y = player.height / 2;
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

    for (entity of game_entities)
    {
        if (entity.type === "enemy")
        {
            context.fillStyle = "red";
            let direction = Vector2.diff(player.position, entity.position);
            let dirNormalized = direction.normalize();
            dirNormalized.scale(entity.speed * deltaTime);
            entity.move(dirNormalized);
        }

        if (entity.type === "player")
            context.fillStyle = "#2A2C24";

        context.fillRect(
            entity.position.x - (entity.width  / 2),
            entity.position.y - (entity.height / 2),
            entity.width,
            entity.height);
    }

    timeLast = timeCurrent;

    requestAnimationFrame(update);
}

requestAnimationFrame(update);
