var dog;
var happydog;
var database;
var foodS;
var foodStock;
var dogimg;
var doghimg;
var bottle=20;
var feed;
var addFood;
var fedTime;
var lastFed;
var foodObj;

function preload()
{
  dogimg=loadImage("dogImg.png");
  doghimg=loadImage("dogImg1.png");
}

function setup() {
  database= firebase.database();
  console.log(database);

  createCanvas(500, 500);
  Dog = createSprite(250,250,10,10);
  Dog.addImage(dogimg);
  Dog.scale = 0.2;
  foodObj = new Food();
 
  foodStock=database.ref("Food");
  foodStock.on("value",readStock);

  feed= createButton("Feed the Dog")
  feed.position(700,95)
  feed.mousePressed(feedDog)

  addFood= createButton("Add food")
  addFood.position(800,95)
  addFood.mousePressed(addFoods)
}
  
function draw() {  

background("yellow")
  

//feed.display();
  
drawSprites();

fedTime=database.ref("FeedTime");
fedTime.on("value",function(data){
lastFed=data.val();
})

function readStock(data){ 
  foodS=data.val();
}
foodObj.display();
function writeStock(x){
  if(x<=0){
x=0;
  }else{
    x=x-1
  }
  
  database.ref("/").update({
    food:x
  })
}
}
function feedDog(){
  Dog.addImage(doghimg);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref("/").update({
    Food : foodObj.getFoodStock(),
    FeedTime :  hour()
  });
  
}

function addFoods(){
  foodS++;
  database.ref("/").update({
    Food:foodS
  })
}
function readStock(data){
foodS=data.val()
foodObj.updateFoodStock(foodS);
}