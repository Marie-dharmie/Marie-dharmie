Day 1: We all assembled with our tutors and we were ta, then we were shared to our various rooms.... then we had the session with our teachers and we had to pitch our game ideas.. i pitched my game idea and it was way too big now that i actually think about it. Thankfully the teacher was there to help and then he told me to do a simple  jump and run and see how i can implement that first and then from there, we can see what else can be added and implemented based on my idea.
Day2: i eventually came up with a jump and run idea where there is an endless run for the player, everything was going well untill i decided to use chatgpt and write all it said without understanding what it meant. The Game got Spoilt, Crashed, Destroyed!!! anything you can bad about that happened to the game on this day!!!! i was just about to cry in the empty room around 8pm while looking at my overused chatgpt destroyed game that was doing the complete opposite of what a game should do.... Then one of the teachers walked in and asked me about my codes... Perfect Timing... i was unable to answer most of the questions he asked and that made me realise so much needed to be done, learnt nd corrected. i am grateful for that session.
Day3: Deteremined to not give up, i started to watch some youtube videos to relearn so many things, had another sesssion with the same teacher because he said to rethink my game idea and read up on collisions, i showed him and once gain he advised and helped in motivation too.
Day4: Then officially i started , first i added my background for the static game, then  first created my player using direct on the canvas, gave it a pink color, and added gravity to it, so that it lands on the button of the camvas and does not go below the canvas. i then procedded to draw the platforms and the boxes that would become the obstacles... this gave me a view and a clear concept of what i was going to be making. i was happy that i was learning and it was falling in place.
Day5: At day 5, it was already coming togther and i decided to replace my box with the image png for the boxes that i made with 3d and then rendered it as a 2d picture, and did the same with the platforms too.
Day 6: It was time to add collision, so i added collision  for the player against the boxes which are the collisions that would later on become the factor for deducting player's health(ie, if player hits collision, the health drops), doing this one was kinda hard because the collision was acting up especially with the blocks that was on top to serve as the falling obstacles, beause the collision i had put for the other boxes didnt have collision for the buttom of the boxes, and now it was for me to add collision for the top of the player against the buttom of the box.... and then i asked cht gpt on what to do, he gave me some wrong ideas too amongs the right ideas but thankfully i had watched tutorials so i knew to an extent which lines of codes should not be there. i struggled with this until day 7!!!
Day7: it eventually worked around 9pm on sunday night.... i also then implemented gravity to my platformers and created a function of static element for it so that it does not move..... it really was all coming to place......
At the end of the first week, i had the collisions and gravity, a pink box as the player but the images as the boxs and platformers. now week 2;
Day 8: i implemented the falling boxes and defined it in the constructor and called it in the if (isFalling) this.startFalling(); the bugs in getting this to work was not so much except that the fall speed was so fast and the game was unwinable... so i adjusted it in the this.fallSpeed and in the setTimeout() .
Day 9: i made a score board, and it was time to make the collectables that would affect the score board...so  i drew the collectibles in my game aclass,(which is called class coin) using the draw rect and later changed it to the drawimage() to add the png from one of the images drawn on blender 2d  and i  added a function to which the scoreboard increases 10 point when player interacts and touches a coin, which is;
let score=0;
 update(player) {
    if (!this.collected && isColliding(player, this)) {
      this.collected = true; // Mark the coin as collected
      score += 10; // Add 10 points for collecting the coin
    }}

Day 10: i made a timer for the game of 4 minitues, by saying let timeLeft = 4 * 60; // 4 minutes in seconds and if timer goes to 0,it is game over,i then implemented, R as the restart button to get back to the start page, i forgot to mention that i created my window.addeventlisteners functions on day 4 with W For Jump, A for move left, D for move Right.

Day 11: it was time to make my home page, the background was made in zbrush, rendered as a png and used as a 2d environment for my game, so i made another html for that, because my home page connected to another page before then eventually moving to the game page, andnow my home page has one html, javascript and its own css.... i got told this was wrong by many peple, i tired fixing it and broke it but thankfully Control +z exist s i pressed it and left it that way sadly..... an I Decided to add a background music because i was really trying to get the my sprite but time was not so much on my side to get my sprite. so what i did was implement on my code that when  W is pressed, a picture of my drawn player holding a sword is shown and when he is on the ground and not in air, the sanding picture shows

Day12: The presentation and the game fair!!!!! The best day ever!!!! me and my classmates mae presentations of how the whole process was... and we displayed our game and it was a gam fair and a great way to network.


I am really grateful for this experience, i really learnt alot, made new friends and even got motivated to Join the game jam!!!!!  it was a great experience and i would forever be grateful to all the teachers and tutors that helped me, the classmates now turned friends that made it fun and were helpful and grateful to God for ensuring thst i did not give up. because i almost did. lol






