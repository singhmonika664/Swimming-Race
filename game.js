class Game {
  
  constructor(){
  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    swimmer1 = createSprite(200,200);
    swimmer1.addImage("swimmer1",swimmer1_img);
    swimmer1.scale = 0.5;
    swimmer2 = createSprite(600,200);
    swimmer2.addImage(swimmer2_img);
    swimmer2.scale = 0.5;
    fish=createSprite(100,400);
    fish.addImage("fish",fishImg);
    fish.scale=0.4;
    octopus=createSprite(700,300);
    octopus.addImage("octopus",octopusImg);
    octopus.scale=0.4;
    swimmers = [swimmer1,swimmer2];
   
  }

  play(){
    form.hide();
    
    Player.getPlayerInfo();

    player.getSwimmersAtEnd();
    
    if(allPlayers !== undefined){
      background(rgb(198,135,103));
      image(lake, 0,-displayHeight*4,displayWidth, displayHeight*5);
      
      //var display_position = 100;
      
      //index of the array
      var index = 0;

      //x and y position of the  swimmer
      var x = 0 ;
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        x = x + 600;
        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distance;
        swimmers[index-1].x = x;
        swimmers[index-1].y = y;
       // console.log(index, player.index)

       
        if (index === player.index){
          camera.position.x = displayWidth/2;
          camera.position.y = swimmers[index-1].y;
        }
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=10
      player.update();
    }

    if(player.distance > 3860){
      gameState = 2;
      player.rank += 1;
      Player.updateSwimmersAtEnd(player.rank);
    }
   
    drawSprites();
  }

  end(){
    console.log("Game Ended");
    console.log(player.rank);
  }
}
