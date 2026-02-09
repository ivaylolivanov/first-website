const canvas = document.getElementById("game-canvas");
const context = canvas.getContext("2d");

const playerWidth  = 70;
const playerHeight = 100;

let playerX = 400;
let playerY = 300;
let playerSpeed = 5;

let buttonADown = false;
let buttonDDown = false;
let buttonWDown = false;
let buttonSDown = false;

addEventListener("keydown", (event) => {
    buttonADown = (event.key === "a");
    buttonDDown = (event.key === "d");
    buttonWDown = (event.key === "w");
    buttonSDown = (event.key === "s");
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
});

function update()
{
    if (buttonADown)
        playerX -= playerSpeed;

    if (buttonDDown)
        playerX += playerSpeed;

    if (buttonWDown)
        playerY -= playerSpeed;

    if (buttonSDown)
        playerY += playerSpeed;

    if ((playerX + (playerWidth/2)) >= canvas.width)
    {
        playerX = canvas.width - (playerWidth/2);
    }

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = "#2A2C24";
    context.fillRect(
        playerX - (playerWidth  / 2),
        playerY - (playerHeight / 2),
        playerWidth,
        playerHeight);

    requestAnimationFrame(update);
}

update();
