const celdas = [];
const RETICULA = 4; //mayuscula es estático no varia
const azulejos = [];
const NA = 5; //Numero de azulejos
const reglas = [
  //Reglas de los bordes de cada azulejo
  {
    //tile 0
    UP: 0,
    RIGHT: 0,
    DOWN: 0,
    LEFT: 0,
  },
  {
    //tile 1
    UP: 0,
    RIGHT: 1,
    DOWN: 1,
    LEFT: 0,
  },
  {
    //tile 2
    UP: 1,
    RIGHT: 1,
    DOWN: 1,
    LEFT: 1,
  },
  {
    //tile 3
    UP: 0,
    RIGHT: 0,
    DOWN: 1,
    LEFT: 1,
  },
  {
    //tile 4
    UP: 0,
    RIGHT: 1,
    DOWN: 1,
    LEFT: 1,
  }
];

function preload(){ //carga las imagenes
  for(let i = 0; i < NA; i++) {
    azulejos[i] = loadImage('azulejos/tile' + i + '.png');
  }
}

function setup() {
  createCanvas(1080, 1080);
  let optInit = [];
  for (let i = 0; i < azulejos.length; i++ ){
    optInit.push(i);
  }

  for (let i = 0; i < RETICULA * RETICULA; i ++){
    celdas [i] = {
      colapsada: false,
      opciones: optInit,
    };
  }
  print(celdas);
}

function draw() {
  
}
