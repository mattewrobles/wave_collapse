const celdas = [];
const RETICULA = 8; //mayuscula es estático no varia
let ancho; //ancho de celda
let alto; //altura de celda
const azulejos = [];
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
  },
  {
    //tile 5
    UP: 1,
    RIGHT: 0,
    DOWN: 0,
    LEFT: 1,
  },
  {
    //tile 6
    UP: 1,
    RIGHT: 1,
    DOWN: 1,
    LEFT: 0,
  },
  {
    //tile 7
    UP: 1,
    RIGHT: 0,
    DOWN: 1,
    LEFT: 1,
  },
  {
    //tile 8
    UP: 1,
    RIGHT: 1,
    DOWN: 0,
    LEFT: 0,
  },
  {
    //tile 9
    UP: 1,
    RIGHT: 1,
    DOWN: 0,
    LEFT: 1,
  },
  {
    //tile 10
    UP: 0,
    RIGHT: 0,
    DOWN: 0,
    LEFT: 0,
  },
  {
  //tile 11
    UP: 1,
    RIGHT: 0,
    DOWN: 1,
    LEFT: 0,
  },
  {
  //tile 12
    UP: 0,
    RIGHT: 1,
    DOWN: 0,
    LEFT: 1,
  },
  {
    //tile 13
      UP: 0,
      RIGHT: 0,
      DOWN: 0,
      LEFT: 1,
    },
    {
      //tile 14
        UP: 0,
        RIGHT: 1,
        DOWN: 0,
        LEFT: 0,
      },
      {
        //tile 15
          UP: 0,
          RIGHT: 0,
          DOWN: 0,
          LEFT: 0,
        },
];

const NA = reglas.length; //Numero de azulejos


function preload(){ //carga las imagenes
  for(let i = 0; i < NA; i++) {
    azulejos[i] = loadImage("azulejos/tile" + i + ".png");
  }
}

function setup() {
  let canvas = createCanvas(800, 800); // debe ser cuadrado para tener proporción de las imágenes
  canvas.id('myCanvas'); // Añadir id al canvas
  
  ancho = width / RETICULA; //divide el ancho y el alto para que se adapte con las baldosas
  alto = height / RETICULA;
  

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
}

function draw() {
  // background(100);
  const celdasConOpt = celdas.filter((celda) => {
    return celda.opciones.length > 0;
  });

  const celdasAct = celdasConOpt.filter((celda) => {
    return celda.colapsada == false;
    });
  if(celdasAct.length > 0){
    celdasAct.sort((a,b)=> {
      return a.opciones.length - b.opciones.length;
    });
    const celdaPorColapsar = celdasAct.filter((celda) => {
      return celda.opciones.length == celdasAct[0].opciones.length;
    });

    const celdaSelect = random(celdaPorColapsar);
    celdaSelect.colapsada = true;
    const opcionSelect = random(celdaSelect.opciones);
    celdaSelect.opciones= [opcionSelect];

//    print(celdaSelect);
  
  for (let x = 0; x < RETICULA; x++){
    for (let y = 0; y < RETICULA; y++){
      const celdaIndex = x + y * RETICULA;
      const celdaAct = celdas[celdaIndex];
      if(celdaAct.opciones.length < 1){
        fill(150, 0, 50, 20)
        rect (x * ancho, y * alto, ancho, alto)
      }


      if(celdaAct.colapsada){
        const tileIndex = celdaAct.opciones[0];
        const reglasAct = reglas[tileIndex];
        print(reglasAct);
        image(
          azulejos[tileIndex], 
          x * ancho, 
          y * alto,
          ancho,
          alto
        );
      
//           monitoriar UP
          if(y > 0){
            const indexUP = x + (y - 1) * RETICULA;
            const celdaUP = celdas[indexUP];
            if(!celdaUP.colapsada) {
              cambiarEntropia(
                celdaUP, 
                reglasAct['UP'], 
                'DOWN');

            }
          }
//          Mon. Right
          if(x < RETICULA - 1) {
            const indexRIGHT = x + 1 + y * RETICULA;
            const celdaRIGHT = celdas[indexRIGHT];
            if(!celdaRIGHT.colapsada){
              cambiarEntropia(
                celdaRIGHT, 
                reglasAct['RIGHT'], 
                'LEFT');
            }
          }
//           Mon. Down
          if(y < RETICULA -1){
            const indexDOWN = x + (y + 1) * RETICULA;
            const celdaDOWN = celdas[indexDOWN];
            if(!celdaDOWN.colapsada){
              cambiarEntropia(
                celdaDOWN, 
                reglasAct['DOWN'], 
                'UP');
            }
          }
//           Mont. left
          if(x > 0){
            const indexLEFT = x - 1 + y * RETICULA;
            const celdaLEFT = celdas[indexLEFT];
            if(!celdaLEFT.colapsada){
              cambiarEntropia(
                celdaLEFT, 
                reglasAct['LEFT'], 
                'RIGHT');
            }
          }
        } else{ 
        strokeWeight(5); //dibuja reticula base
        rect(
          x*ancho, 
          y*alto,
          ancho,
          alto);
      }
    }
  }
//    noLoop();
// } else {
//   for (let i = 0; i < RETICULA * RETICULA; i ++) {
//     celdas[i] = {
//       colapsada: false,
//       opciones: optInit,
//     };
//   }
// }
}

function cambiarEntropia(_celda, _regla, _opuesta) {
	const nuevasOpciones = [];
	for (let i = 0; i < _celda.opciones.length; i++) {
		if (_regla == reglas[_celda.opciones[i]][_opuesta]) {
			const celdaCompatible = _celda.opciones[i];
			nuevasOpciones.push(celdaCompatible);
		}
	}
	_celda.opciones = nuevasOpciones;
}
}
