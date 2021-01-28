const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;

 var engine,world;
var particles=[];
var divisions=[];
var plinkos=[];
var score=0;
var turn=0;
var gameState="play";
var particle;

var divisionHeight=250;

function setup() {
  createCanvas(480,685);
  

  engine = Engine.create();
  world = engine.world;

  ground = new Ground(240,677,800,10);
  for(var i=40;i<=width;i=i+50){
    plinkos.push(new Plinko(i,75));
  }

  for(var i=50;i<=width-10;i=i+50){
    plinkos.push(new Plinko(i,175));
  }

  for(var i=40;i<=width-10;i=i+50){
    plinkos.push(new Plinko(i,275));
  }

  for(var i=15;i<=width-10;i=i+50){
    plinkos.push(new Plinko(i,375));
  }

  for(var k=0;k<=width;k=k+80){
    divisions.push(new Division(k,height-divisionHeight/2,10,divisionHeight));
  }
}

function draw() {
  Engine.update(engine);

  if(frameCount%90===0){
    particles.push(new Particle(random(width/2-10,width/2+10),10,10));
  }
  background(0); 
  
  
  ground.display();
  for(var i=0;i<plinkos.length;i++){
    plinkos[i].display();
  }
  for(var k=0;k<divisions.length;k++){
    divisions[k].display();
  }
  for(var j=0;j<particles.length;j++){
    particles[j].display();
  }
  if(particle!=null){
    particle.display();
      if(particle.body.position.y>760){
        if(particle.body.position.x<300){
          score=score+500;
          particle=null;
          if(score>=5)gameState="end";
        }
        if(particle.body.position.x>301&&particle.body.position.x<600){
          score=score+100;
          particle=null;
          if(score>=5)gameState="end";
        }
        if(particle.body.position.x>600&&particle.body.position.x<900){
          score=score+200;
          particle=null;
          if(score>=5)gameState="end";
        }
       
      }
      score.display();
  }
  if(turn=5){
    textSize(5);
    text("Game Over",150,150);
  }

  drawSprites();
  textSize(25);
  text("SCORE:"+score,250,250);
}
function mousePressed(){
  if(gameState!=="end"){
    score++;
    particle=new Particle(mouseX,10,10,10);
  }}
