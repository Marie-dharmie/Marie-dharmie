let timeLeft = 4 * 60; // 4 minutes in seconds
let timerInterval; 
let animationFrame;
let score=0;
let gameOver= false;

document.addEventListener("DOMContentLoaded", function () {
  // const currentPage = localStorage.getItem('currentPage');
  /* Redirect back to the start page if the state isn't 'inGame'
    if (currentPage !== 'inGame') {
        window.location.href = '../Front page/index.html'; 
        return; // Stop further script execution
    }*/
});

const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
/*class player is the container that contains all the players attributes and constructor is to store all the attributes for the position so that we can easily call the function.*/

let gravity = 0.5;
//added collision detection to the ground so that it slams to either the platform or the ground for the ones that fly.
class Block {
    constructor({ x, y, width, height, imagesrc, isFalling = false, targetY = canvas.height }) {
        this.startPosition = { x: x, y: y }; // Store the initial position
        this.position = { x: x, y: y };
        this.width = width;
        this.height = height;
        this.image = new Image();
        this.image.src = imagesrc;
        this.isFalling = isFalling;
        this.fallSpeed = 0; // Start with no vertical velocity
        this.gravity = 0.2; // Gravity to accelerate the block downward
        this.targetY = targetY; // Target position where the block should stop
        this.isSlamming = false; // Whether the block is in the process of slamming
        this.isResting = false; //   for resting state
        this.restDuration = 50000; // Rest duration in milliseconds
        this.resetTimer = null; // Timer for resetting position
        this.fallInterval = null; // Interval for falling logic
        if (isFalling) this.startFalling();
    
    
    }
  
    draw() {
      c.fillStyle = "green";
      c.drawImage(
        this.image,
        this.position.x,
        this.position.y,
        this.width,
        this.height
      );
    }
  
    update() {
        if (this.isSlamming) {
            this.fallSpeed += this.gravity;
            this.position.y += this.fallSpeed;

            // Stop the block when it hits the target
            if (this.position.y + this.height >= this.targetY) {
                this.position.y = this.targetY - this.height;
                this.fallSpeed = 0; 
                this.isSlamming = false; // Stop slamming
                this.isResting = true;

                setTimeout(() => {
                    this.resetPosition();
                    this.isResting = false;
                }, this.restDuration);
            }}
    }
   

    startFalling() {
        // Start falling every 5 seconds
        this.fallInterval = setInterval(() => {
            if (!this.isSlamming) {
                this.position.y = this.startPosition.y; // Reset to the initial position
                this.fallSpeed = 0; // Reset speed
                this.isSlamming = true; // Start slamming again
            }
        }, 900); // Repeat every 1 second
    }

    resetPosition() {
        // Reset the block after 5 seconds
        if (this.resetTimer) clearTimeout(this.resetTimer);
        this.resetTimer = setTimeout(() => {
            this.isSlamming = true; // Restart slamming
            this.position.y = this.startPosition.y; // Reset position to the top
        }, 5000);
    }
}
  
//function that checks for collission between the player and the block
function isColliding(rect1, rect2) {
  return (
    rect1.position.x < rect2.position.x + rect2.width &&
    rect1.position.x + rect1.width > rect2.position.x &&
    rect1.position.y < rect2.position.y + rect2.height &&
    rect1.position.y + rect1.height > rect2.position.y
  );
}

class Player {
  constructor(position) {
    this.position = position;
    this.velocity = {
      /*this is for the gravity and determies how fast the player moves verticaly and horizontally.*/
      x: 2,
      y: 1,
    };
    this.height = 190;
    this.width = 130;
    this.health = 250; // Player starts with 100 health
    this.isJumping = false;
    this.jumpCount=0;
    this.lastDamaged = 0; // Track when the player was last damaged
    this.damageCooldown = 1000; // Cooldown time in milliseconds
    this.standingImage = new Image();
    this.standingImage.src = "../images/man.png";

    this.jumpingImage = new Image();
    this.jumpingImage.src = "../images/pose.png";

    // State variable to track if the player is jumping
    


  }
  draw() {
   if (this.isJumping) {
      c.drawImage(this.jumpingImage, this.position.x, this.position.y, this.width, this.height);
    } else {
      c.drawImage(this.standingImage, this.position.x, this.position.y, this.width, this.height);
    }


     /* for fixing the position and the size of the rect(position x, position y, height, width)*/
     }
     decreaseHealth(amount) {
      const now = Date.now(); // Get current time
      if (now - this.lastDamaged >= this.damageCooldown) {
        // Only allow damage after cooldown
        this.health -= amount;
        this.lastDamaged = now; // Update last damaged time
        if (this.health < 0) this.health = 0;
        if (this.health === 0) {
          showGameOverScreen();
          cancelAnimationFrame(animationFrame); // Stop the game loop
        }
      }
    }
  update() {
    this.draw();
    this.position.x += this.velocity.x;
    this.position.y +=
      this.velocity.y; /* we add the velocity to the position so that the updated position would be influenced by the velocity and  will be added each time the update function is called.*/

    if (this.position.y + this.height + this.velocity.y < canvas.height){
      this.velocity.y += gravity;

    }
      
    else {this.velocity.y = 0;
    // Player has landed
    if (this.position.y + this.height >= canvas.height) {
      this.position.y = canvas.height - this.height; // Prevent falling through the floor
      this.isJumping = false; // Reset jump state when hitting the ground
      this.jumpCount = 0;
    }
    }
   

    // Prevent player from moving outside the right edge
    if (this.position.x + this.width > canvas.width) {
      this.position.x = canvas.width - this.width;
    }

    if (this.position.x < 0) {
      this.position.x = 0; 
    }

  
    if (this.position.y < 0) {
      this.position.y = 0;
      this.velocity.y = 0; // Reset vertical velocity when hitting the top
    }
    if (this.position.y + this.height >= this.targetY) {
        this.position.y = this.targetY - this.height;
        this.fallSpeed = -10;
      
        // Pause briefly before falling again
        setTimeout(() => {
          this.fallSpeed = 0; // Reset speed to start falling again
        }, 500); // Pause for 500ms
      }
      
  }
}

function drawTimer() {
  const x = canvas.width - 120; // Position on the canvas
  const y = 20;

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const timeString = `${minutes}:${seconds.toString().padStart(2, "0")}`;
  // Timer box
  c.fillStyle = "black";
  c.fillRect(x - 20, y - 10, 120, 30);

  // Timer text
  c.fillStyle = "white";
  c.font = "20px Arial";
  c.fillText(`Time: ${timeString}`, x, y + 10);
}

function startTimer(){
  timerInterval = setInterval(() => {
    timeLeft--;
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      showGameOverScreen();
      cancelAnimationFrame(animationFrame); // Stop the game loop
    }
  }, 1000);
  }
  


function drawHealthBar(health) {
 
  const x = 20;
  const y = 20;

  // Text
  c.fillStyle = "white";
  c.font = "20px Arial";
  c.fillText(`Health: ${health}`, x + 5, y + 15);
}


class Platform {
  //for the stairs/stands that the player climbs on, so i am trying to make two.
  constructor({ x, y, width, height, imagesrc }) {
    this.position = {
      x: x,
      y: y,
    };
    this.width = width;
    this.height = height;
    this.image = new Image();
    this.image.src = imagesrc;
  }
  draw() {
    c.fillStyle = "grey";
    c.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }
}
class Coin {
  //for the stairs/stands that the player climbs on, so i am trying to make two.
  constructor({ x, y, width, height, imagesrc }) {
    this.position = {
      x: x,
      y: y,
    };
    this.width = width;
    this.height = height;
    this.image = new Image();
    this.image.src = imagesrc;
    this.collected= false;
  }
  draw() {
    if (!this.collected) {
    c.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }
  }
  update(player) {
    if (!this.collected && isColliding(player, this)) {
      this.collected = true; // Mark the coin as collected
      score += 10; // Add 10 points for collecting the coin
    }}
}



/*to create a new instance of an object using a constructor function*/
const player = new Player({
  x: 30,
  y: 200,
});

const platform1 = new Platform({
  //border between obstacles1 and 2.
  x: 300,
  y: 350,
  width: 1700,
  height: 50,
  imagesrc: "../images/plank1.png",
});


const block1 = new Block({
  //Obstacle
  x: 200,
  y: 800,
  width: 100,
  height: 120,
  imagesrc: "../images/boxx.png",
});

const block2 = new Block({
  //Obstacle2 and this is the dropping obstcale
  x: 395,
  y: 400,
  width: 120,
  height: 120,
  imagesrc: "../images/boxx.png",
  isFalling: true,
  targetY: canvas.height, // Slam onto the ground
});

const block3 = new Block({
  //Obstacle3
  x: 650,
  y: 800,
  width:  100,
  height:  100,
  imagesrc: "../images/boxx.png",
});

const block4 = new Block({
  //Obstacle4 and this is the dropping obstcale
  x: 870,
  y: 400,
  width:  120,
  height:  120,
  imagesrc: "../images/boxx.png",
  isFalling: true,
  targetY: canvas.height, // Slam onto the ground
});

const block5 = new Block({
  //Obstacle5
  x: 1150,
  y: 800,
  width:  100,
  height: 100,
  imagesrc: "../images/boxx.png",
});

const block6 = new Block({
  //Obstacle6 and this is the dropping obstcale
  x: 1400,
  y: 400,
  width:  120,
  height:  120,
  imagesrc: "../images/boxx.png",
  isFalling: true,
  targetY: canvas.height, // Slam onto the ground
});

const block7 = new Block({
  //Obstacle7
  x: 1700,
  y: 800,
  width: 100,
  height: 100,
  imagesrc: "../images/boxx.png",
});
const block15 = new Block({
    //Obstacle15 and this is the dropping obstcale
    x: 2000,
    y: 400,
    width:  120,
    height:  120,
    imagesrc: "../images/boxx.png",
    isFalling: true,
    targetY: canvas.height, // Slam onto the ground
  });

//Top obstacles.....
const block8 = new Block({
  //Obstacle8
  x: 1700,
  y: 250,
  width: 100,
  height: 100,
  imagesrc: "../images/boxx.png",
});

const block9 = new Block({
  //Obstacle9
  x: 1450,
  y: 250,
  width: 100,
  height: 100,
  imagesrc: "../images/boxx.png",
});

const block10 = new Block({
  //Obstacle10 and this is the falling obstcale thats on the top of the canvas
  x: 1200,
  y: 6,
  width: 120,
  height: 100,
  imagesrc: "../images/boxx.png",
  isFalling: true,
  targetY: platform1.position.y, // Slam onto the platform
});

const block11 = new Block({
  //Obstacle11
  x: 1000,
  y: 250,
  width: 100,
  height: 100,
  imagesrc: "../images/boxx.png",
});

const block12 = new Block({
  //Obstacle12 and this is the falling obstcale thats on the top of the canvas
  x: 750,
  y: 6,
  width: 120,
  height: 100,
  imagesrc: "../images/boxx.png",
  isFalling: true,
  targetY: platform1.position.y, // Slam onto the platform
});

const block13 = new Block({
  //Obstacle13
  x: 450,
  y: 250,
  width: 100,
  height: 100,
  imagesrc: "../images/boxx.png",
});

const block14 = new Block({
    //which is the game platform2
    x: 30000,
    y: 140,
    width: 100,
    height: 15,
    imagesrc: "../images/plank1.png",
  });


  const coin1 = new Coin({
    
    x: 900,
    y: 100,
    width: 50,
    height: 130,
    imagesrc: "../images/sword.png",
  });

  const coin2 = new Coin({
    
    x: 310,
    y: 60,
    width: 80,
    height: 80,
    imagesrc: "../images/untitled.png",
  });

  const coin3 = new Coin({
    
    x: 700,
    y: 500,
    width: 50,
    height: 130,
    imagesrc: "../images/sword.png",
  });

  const coin4 = new Coin({
    
    x: 1000,
    y: 700,
    width: 80,
    height: 80,
    imagesrc: "../images/untitled.png",
  });

  const coin5 = new Coin({
    
    x: 1350,
    y: 700,
    width: 50,
    height: 130,
    imagesrc: "../images/sword.png",
  });

  const coin6 = new Coin({
    
    x: 1500,
    y: 700,
    width: 80,
    height: 80,
    imagesrc: "../images/untitled.png",
  });

  const coin7 = new Coin({
    
    x: 1650,
    y: 700,
    width: 50,
    height: 130,
    imagesrc: "../images/sword.png",
  });

  const coin8 = new Coin({
    
    x: 400,
    y: 500,
    width: 80,
    height: 80,
    imagesrc: "../images/untitled.png",
  });

  const coin9 = new Coin({
    
    x: 1200,
    y: 100,
    width: 80,
    height: 80,
    imagesrc:"../images/untitled.png",
  });

  const coin10 = new Coin({
    
    x: 1500,
    y: 100,
    width: 50,
    height: 130,
    imagesrc: "../images/sword.png",
  });

  const coin11 = new Coin({
    
    x: 1700,
    y: 100,
    width: 80,
    height: 80,
    imagesrc: "../images/untitled.png",
  });
  const coin12 = new Coin({
    
    x: 500,
    y: 100,
    width: 50,
    height: 130,
    imagesrc: "../images/sword.png",
  });




const keys = {
  //to stop our players from moving continuously,so we created a constructor for the keys)
  d: {
    pressed: false,
  },

  a: {
    pressed: false,
  },
};


const backgroundMusic = new Audio('../images/ambience.mp3');
backgroundMusic.loop = true;
backgroundMusic.volume = 0.4; 
backgroundMusic.play(); // Start playing music


const muteButton = document.getElementById('muteButton');

function toggleMute() {
  isMuted = !isMuted;

  // If muted, set volume to 0, otherwise set to original volume
  if (isMuted) {
      backgroundMusic.volume = 0; // Mute music
      muteButton.textContent = "Unmute"; // Change button text
  } else {
      backgroundMusic.volume = 0.9; // Restore original volume
      muteButton.textContent = "Mute"; // Change button text
  }
}

muteButton.addEventListener('click', toggleMute);

function drawStaticElements() {
  // this function is to ensure that regardless of the platform.draw being called in the function animate, it wwould be static.
  platform1.draw();

  block1.draw();
  block2.draw();
  block3.draw();
  block4.draw();
  block5.draw();
  block6.draw();
  block7.draw();
  block8.draw();
  block9.draw();
  block10.draw();
  block11.draw();
  block12.draw();
  block13.draw();
  block14.draw();
  block15.draw();
  coin1.draw();
  coin2.draw();
  coin3.draw();
  coin4.draw();
  coin5.draw();
  coin6.draw();
  coin7.draw();
  coin8.draw();
  coin9.draw();
  coin10.draw();
  coin11.draw();
  coin12.draw();
 
}

/* for drawing the player,(c.fillstyle and c.fill) (the function animate is for player movement and creating the animation*/
const coins = [
  coin1,
  coin2,
  coin3,
  coin4,
  coin5,
  coin6,
  coin7,
  coin8,
  coin9,
  coin10,
  coin11,
  coin12
];

function drawScore() {
  const x = canvas.width - 450; // Position on the canvas
  const y = 30;

 ;

  // Score text
  c.fillStyle = "yellow";
  c.font = "25px Arial";
  c.fillText(`Score: ${score}`, x, y + 10);
}




function animate() {
  animationFrame= window.requestAnimationFrame(animate);
  c.clearRect(
    0,
    0,
    canvas.width,
    canvas.height
  ); /* to clear the rect for the animation so that new frames are not drawn over the old ones and you do not have to see the old positions as the rectangle moves*/
  drawStaticElements();
  drawHealthBar(player.health); // Draw health bar
  drawTimer()
  drawScore();
  player.update();

  coins.forEach((coin) => {
    coin.update(player); // Check if player collects the coin
    coin.draw(); // Draw the coin
  });
  
  if (allCoinsCollected()) {
    showYouWinScreen(); // Show win screen if all coins are collected
    return; // Stop further game updates once the game is won
  }


  player.velocity.x = 0;
  if (keys.d.pressed)
    player.velocity.x = 3; //this means player velocity starts at 0 but if key d is presssed then player's velocity towards the x position is then equal to 1 meaning movement but  if not(else if) a is pressed, player moves in the negative position of the x.
  else if (keys.a.pressed) player.velocity.x = -3;

  //the  collision detection for the plaform
  if (
    player.position.y + player.height <= platform1.position.y &&
    player.position.y + player.height + player.velocity.y >=
      platform1.position.y &&
    player.position.x + player.width >= platform1.position.x &&
    player.position.x <= platform1.position.x + platform1.width
  ) {
    player.velocity.y = 0; // stops player from falling.
  }

 

  // Bottom collision (this prevents player from jumping through platforms)
  if (
    player.position.y <= platform1.position.y + platform1.height && // Player's top is below platform's bottom
    player.position.y + player.height >
      platform1.position.y + platform1.height && // Player's bottom is above the platform
    player.position.x + player.width >= platform1.position.x && // Player's right is within the platform's horizontal range
    player.position.x <= platform1.position.x + platform1.width && // Player's left is within the platform's horizontal range
    player.velocity.y < 0 // Player is moving upward
  ) {
    player.velocity.y = 0; // Stop upward motion
    player.position.y = platform1.position.y + platform1.height; // Reposition below the platform
  }

  

  //a constructor is made for all the blocks just like the constructor was made for the platformers.
  const blocks = [
    block1,
    block2,
    block3,
    block4,
    block5,
    block6,
    block7,
    block8,
    block9,
    block10,
    block11,
    block12,
    block13,
    block14,
    block15,
  ];


  //if statements for the collsions.
  blocks.forEach((block) => {
    block.update();
    if (isColliding(player, block)) {
      // Decrease health if a collision occurs
      player.decreaseHealth(10);
  
      
    }

    if (isColliding(player, block)) {
      // Check vertical collisions first
      if (
        player.velocity.y > 0 &&
        player.position.y + player.height <= block.position.y + block.height
      ) {
        // Landing on top of the block
        player.velocity.y = 0;
        player.position.y = block.position.y - player.height;
      } else if (
        player.velocity.y < 0 &&
        player.position.y <= block.position.y + block.height && (player.position.x + player.width - 5 > block.position.x && player.position.x <= block.position.x + block.width - 5)
      ) {
        
        // Hitting the bottom of the block
        console.log("hello")
        player.velocity.y = 0;
        player.position.y = block.position.y + block.height;
      }

      // Check horizontal collisions only if no vertical collision occurred
      if (
        player.position.y + player.height > block.position.y &&
        player.position.y < block.position.y + block.height
      ) {
        if (
          player.velocity.x > 0 &&
          keys.d.pressed &&
          player.position.x + player.width <= block.position.x + block.width
        ) {
          // Hitting the left side of the block
          player.velocity.x = 0;
          player.position.x = block.position.x - player.width;
        } else if (
          player.velocity.x < 0 &&
          keys.a.pressed &&
          player.position.x >= block.position.x
        ) {
            console.log("test");
          // Hitting the right side of the block
          player.velocity.x = 0;
          player.position.x = block.position.x + block.width;
        }
      }
      if (
        player.position.y <= block.position.y + block.height &&
        player.position.y > block.position.y &&
        player.position.x + player.width >= block.position.x &&
        player.position.x <= block.position.x + block.width &&
        player.velocity.y < 0 // Moving upwards
      ) {
        console.log("test1")
        player.velocity.y = 0; // Stop upward motion
      }
    }
  });
}

animate();
startTimer();

window.addEventListener("keydown", (event) => {
  switch (
    event.key // used to check for the specific key that is being pressed.//
  ) {
    case "d":
      keys.d.pressed = true; //we call the function in the constructor keys and set the value to true.

      //  player.velocity.x=1 the program listens for the key 'd' to be pressed, and if the key  d is pressed, the player changes position and moves foward towards the positive x axis.//
      break;

    case "a":
      keys.a.pressed = true;
      //the player.velocity.x=-1,  program listens for the key 'a' to be pressed, and if the key a is pressed, the player changes position and moves towards the negative x axis position.//
      break;

    case "w":
      if (player.jumpCount<99999999) { //put this 9999999 value because game was restricting jumps. // Only allow jump if not already jumping
        player.velocity.y = -20; // Apply upward velocity to start the jump
        player.isJumping = true; // Set jump state to true
        player.jumpCount++;  // Increment jump count
      }
  
      break;
  }
  if (event.key === "r" || event.key === "R") {
    window.location.href = '../Front page/index.html'; // Redirect to the start screen
}

});

window.addEventListener("keyup", (event) => {
  switch (
    event.key // used to check for the specific key that is being pressed.//
  ) {
    case "d":
      keys.d.pressed = false;
      break;

    case "a":
      keys.a.pressed = false;
      break;
    //we call the function in the constructor keys and set the value to false so that when that key is not pressed, it does not move.
  }
});

function allCoinsCollected() {
  return coins.every(coin => coin.collected);
}

function showYouWinScreen() {
  // Clear the canvas
  c.clearRect(0, 0, canvas.width, canvas.height);

  // Overlay background
  c.fillStyle = "rgba(0, 0, 0, 0.7)"; // Semi-transparent black
  c.fillRect(0, 0, canvas.width, canvas.height);

  // Display "You Win!" text
  c.fillStyle = "white";
  c.font = "60px Arial";
  c.textAlign = "center";
  c.fillText("You did it!!!!!!! You really did!!!!!!", canvas.width / 2, canvas.height / 2 - 20);

  // Display "Restart" instructions
  c.font = "30px Arial";
  c.fillText("Press R to Restart", canvas.width / 2, canvas.height / 2 + 40);
}



function showGameOverScreen() {
  // Clear the canvas
  c.clearRect(0, 0, canvas.width, canvas.height);

  // Overlay background
  c.fillStyle = "rgba(0, 0, 0, 0.7)"; // Semi-transparent black
  c.fillRect(0, 0, canvas.width, canvas.height);

  // Display "Oh my!! You were doing so well but try " text
  c.fillStyle = "white";
  c.font = "60px Arial";
  c.textAlign = "center";
  c.fillText("Game Over! You Lost!;", canvas.width / 2, canvas.height / 2 - 20);

  // Display "Restart" instructions
  c.font = "30px Arial";
  c.fillText("Press R to Restart", canvas.width / 2, canvas.height / 2 + 40);
}
//R AUTOMATICALLY RESTARTS THE GAME




