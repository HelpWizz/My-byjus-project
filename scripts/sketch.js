var bgImg;
var form;
var playerName = "nothing",
    playerScore = 0;

var boulderImg,
    spaceImg,
    space1,
    astroidGroup,
    leftKeyActive = false;

var bullet, bulletGroup, bulletImg, blast, blastImg;
var debounce = true;
var life = 3;
var score = 0;
var mvoingBackground = true;
var game;

var PLAY = 1;
var END = 0;
var gameState = 1;
var ground, invisibleGround, groundImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;
var score;

function preload() {
    boulderImg = loadImage("./assests/boulder.png");
    bgImg = loadImage("./assests/background.png");
    spaceImg = loadImage("./assests/spaceShip.png")
    obstacle1 = loadImage("./assests/boulder.png");
    obstacle2 = loadImage("./assests/boulder.png");
    obstacle3 = loadImage("./assests/boulder.png");
    obstacle4 = loadImage("./assests/boulder.png");
    obstacle5 = loadImage("./assests/boulder.png");
    obstacle6 = loadImage("./assests/boulder.png");
    bulletImg = loadImage("./assests/bullet1.png");
    blastImg = loadImage("./assests/blast.png")
        // obstacle1Image = loadImage("./assets/boul.png");

}

function setup() {
    canvas = createCanvas(windowWidth, windowHeight);


    obstaclesGroup = createGroup();
    bulletGroup = createGroup();
    astroidGroup = createGroup();
    score = 0;
    space1 = createSprite(windowWidth / 2, windowHeight / 1.2, 10, 10)
    space1.addImage(spaceImg)
    space1.scale = 0.2;
    console.log(windowHeight)
    console.log(windowWidth)

}

function draw() {






    background(bgImg);
    invisibleGround = createSprite(0, windowHeight, 5000, 10);
    invisibleGround.visible = false;


    if (gameState == 1) {

        spawnObstacles();
        playerControlls();
        if (obstaclesGroup.collide(bulletGroup)) {
            astroidCollision(bulletGroup);
        }

        if (obstaclesGroup.collide(invisibleGround)) {
            loseALife(obstaclesGroup);
        }
    }
    drawSprites();

    textSize(30);
    text("Score: " + playerScore, 1400, 30);
    text("Life: " + life, 1400, 70)

}




function spawnObstacles() {
    if (frameCount % 60 === 0) {
        var randomPosX = Math.floor(Math.random() * 1000) + 1;
        var obstacle = createSprite(randomPosX, 0, 10, 50);
        obstacle.addImage(obstacle1)
        obstacle.scale = 0.2
        obstacle.velocityY = 6;
        obstacle.y = 0;
        obstacle.lifetime = 400;
        obstaclesGroup.add(obstacle)
        if (obstacle.position.y > windowHeight) {
            life -= 1
        }
    }

}


function playerControlls() {


    if (keyIsDown(LEFT_ARROW) && space1.x > 0) {
        leftKeyActive = true;
        if (leftKeyActive === true) {
            space1.position.x -= 10;
        }
    }
    if (keyDown("space")) {
        if (debounce === false) {
            debounce = true;
            return (debounce)
        } else
            debounce = false
        shootBullet();


    }

    if (keyIsDown(RIGHT_ARROW) && space1.x < 1500) {
        leftKeyActive = false;
        if (leftKeyActive === false) {
            space1.position.x += 10;
        }


    }
}

function shootBullet() {
    bullet = createSprite(space1.x, width / 2, 50, 20)
    bullet.y = space1.y
    bullet.addImage(bulletImg)
    bullet.scale = 0.12
    bullet.velocityY = -7
    bullet.rotate = 100
    bulletGroup.add(bullet)
}

function astroidCollision(astroidGroup) {
    if (life > 0) {
        playerScore = playerScore + 1;
    }

    blast = createSprite(bullet.x + 60, bullet.y, 50, 50);
    blast.addImage(blastImg)
    blast.scale = 0.3
    blast.life = 20;
    bulletGroup.destroyEach();
    astroidGroup.destroyEach();
}

function loseALife(astroidGroup) {

    life = life - 1;
    astroidGroup.destroyEach();
    if (life === 0) {
        gameState = 2;
        gameOver();
        obstaclesGroup.destroyEach();
        bulletGroup.destroyEach();
    }
}

function gameOver() {
    swal({
        title: `Game Over`,
        text: "Y ou suck, get better, reload the page....!!!",
        imageUrl: "https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png",
        imageSize: "100x100",
        confirmButtonText: "Thanks For Playing"
    });
}