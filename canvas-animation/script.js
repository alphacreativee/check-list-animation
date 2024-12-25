const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

let engine;
let items = [];
let lastMouseX = -1;
let lastMouseY = -1;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  engine = Engine.create();

  engine.world.gravity.y = 0;
  addBoundaries();

  for (let i = 0; i < 12; i++) {
    let x = random(100, width - 100);
    let y = random(100, height - 100);
    items.push(new Item(x, y, `./images/img${i + 1}.webp`));
  }
}

function addBoundaries() {}
