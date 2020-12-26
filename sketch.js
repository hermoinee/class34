var ball;
var database;
var position;

function setup(){
    createCanvas(500,500);
    database=firebase.database();

    //.ref(); is used to refer the location of the database 
    //.on(); is used to create a listener which keeps listening to the changes in the database 

    var locofchild= database.ref('ball/position');
    locofchild.on("value",readposition,showerror);


    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";
}

function draw(){
    background("white");
    if(keyDown(LEFT_ARROW)){
        writePostion(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        writePostion(1,0);
    }
    else if(keyDown(UP_ARROW)){
        writePostion(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        writePostion(0,+1);
    }
    drawSprites();
}

function writePostion(x,y){
   // ball.x = ball.x + x;
    //ball.y = ball.y + y;
  database.ref('ball/position').set({
      x:ball.x+x,
      y:ball.y+y
  });

}
function readposition(data){
    position=data.val();
    console.log(position.x);
    console.log(position.y);
    ball.x=position.x;
    ball.y=position.y;
}
function showerror(){
    console.log("error in reading")
}