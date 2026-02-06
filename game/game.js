const canvas = document.getElementById("game-canvas");
const context = canvas.getContext("2d");

const playerWidth  = 70;
const playerHeight = 100;

let playerX = 400;
let playerY = 300;

addEventListener("keydown", (event) => {
    if (event.key === "a")
        playerX -= 5;
    else if (event.key === "d")
        playerX += 5;
});

function update()
{
    if ((playerX + (playerWidth/2)) >= 800)
    {
        playerX = 800 - (playerWidth/2);
    }

    context.clearRect(0, 0, 800, 600);
    context.fillStyle = "#2A2C24";
    context.fillRect(
        playerX - (playerWidth  / 2),
        playerY - (playerHeight / 2),
        playerWidth,
        playerHeight);

    requestAnimationFrame(update);
}

update();
