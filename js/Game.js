class Game {

    constructor() {

       this.rank = createElement('h1');
       this.comment = createElement('h2');
    }

    getState() {

        var gameStateRef = database.ref('gameState');
        gameStateRef.on("value", function(data){

            gameState = data.val();
        });

    }

    update(state) {

        database.ref('/').update({

            gameState: state
        })
    }

    async start() {

        if(gameState === 0) {

            player = new Player();
            var playerCountRef = await database.ref('playerCount').once("value");
            if(playerCountRef.exists()) {

                playerCount = playerCountRef.val();
                player.getCount();
            }
            
            form = new Form();
            form.display();
        }

        car1 = createSprite(100, 200);
        car1.addImage(car1_image);
        car2 = createSprite(300, 200);
        car2.addImage(car2_image);
        car3 = createSprite(500, 200);
        car3.addImage(car3_image);
        car4 = createSprite(700, 200);
        car4.addImage(car4_image);

        cars = [car1, car2, car3, car4];
        
    }

    play() {

        form.hide();
        textSize(30);
        text("Game Start", 120, 100);
        Player.getPlayerInfo();
        player.getCarsAtEnd();
        if(allPlayers !== undefined) {

            background("#c68767");

            //console.log(-displayHeight*4);

            image(track, 0, -displayHeight*4, displayWidth, displayHeight*5);

            var display_position = 130;

            //index of the cars array
            var carIndex = 0;
            //x and y positions of the car
            var x = 190;
            var y;
            
            for(var plr in allPlayers) {
                //console.log("am here");
                carIndex += 1;
                //console.log(carIndex);
                //console.log(cars[carIndex-1]);
                x += 210;
                y = displayHeight - allPlayers[plr].distance;
                cars[carIndex-1].x = x;
                cars[carIndex-1].y = y;

                if(carIndex === player.index) {

                    //cars[carIndex-1].shapeColor ="red";
                    stroke(10);
                    fill("red");
                    ellipse(x, y, 60, 60);
                    camera.position.x = displayWidth/2;
                    camera.position.y = cars[carIndex-1].y;  
                    

                }
            
            }
            if(keyDown(UP_ARROW)&& player.index !== null) {

                player.distance += 50;
                player.update();
            }

            if(player.distance === 4350) {

                gameState = 2;
                player.rank += 1;
                Player.updateCarsAtEnd(player.rank);
            }

            drawSprites();
        }
    }

    end() {

        game.update(2);
        console.log(player.rank);

        if (gameState === 2) {

          //  var title = createElement('h2');
            //title.html("Leaderboard");
            //title.position(displayWidth/2-80, 0);

            this.rank.html("Your rank: " + player.rank);
            this.rank.position(displayWidth/2-70, displayHeight/4);

            if(player.rank === 1) {

                this.comment.html("wow!... you are the winner");
                this.comment.position(displayWidth/2-100, displayHeight/3);

            }
            
            if(player.rank === 2) {

                this.comment.html("very good!... you are the runner up");
                this.comment.position(displayWidth/2-100, displayHeight/3);

            }
            
            if(player.rank === 3) {

                this.comment.html("nice!... you have come third");
                this.comment.position(displayWidth/2-100, displayHeight/3);

            }
            
            if(player.rank === 4) {

                this.comment.html("better luck next time");
                this.comment.position(displayWidth/2-100, displayHeight/3);

            }
        }
    }
}
